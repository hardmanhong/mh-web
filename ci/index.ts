/// <reference path="../jsonSchema.d.ts" />
import axios from 'axios'
import { readFileSync } from 'fs'
import path, { resolve } from 'path'
import { rimrafSync } from 'rimraf'
import shelljs from 'shelljs'
import { Project } from 'ts-morph'
import { capitalizeFirstLetter } from './utils'

const jsonPath = resolve(__dirname, './api.json')
const tsConfigFilePath = resolve(__dirname, '../tsconfig.json')
type GetType<T> = T extends (arg: infer P) => void ? P : string
type GetReturnType<T> = T extends (...args: any[]) => infer R ? R : never
type NormalSchema =
  | JsonSchema.BasicSchema
  | JsonSchema.ObjectSchema
  | JsonSchema.ArraySchema
class ApiDoc {
  private input: {
    jsonPath: string
    tsConfigFilePath: string
  }
  private file!: GetReturnType<Project['createSourceFile']>
  private output: string
  private apiJson!: Doc

  constructor(
    input: {
      jsonPath: string
      tsConfigFilePath: string
    },
    output: string
  ) {
    this.input = input
    this.output = output
  }
  async init() {
    rimrafSync(this.output)
    const { jsonPath, tsConfigFilePath } = this.input
    if (!jsonPath) return
    const regex = /^(https?):\/\//
    if (regex.test(jsonPath)) {
      this.apiJson = (await axios.get<Doc>(jsonPath)).data
    } else {
      this.apiJson = JSON.parse(readFileSync(jsonPath, 'utf-8'))
    }
    const project = new Project({
      tsConfigFilePath,
      skipAddingFilesFromTsConfig: true
    })
    this.file = project.createSourceFile(this.output, '', {
      overwrite: true
    })
    this.file.addImportDeclaration({
      defaultImport: 'request',
      moduleSpecifier: '@/api/request'
    })
  }
  generateDocs() {
    const info = this.apiJson.info
    const comment = `/**
 * 根据 jsonSchema 自动生成 🍺
 * 请勿修改
 * ${info.title}
 * version: ${info.version}
 */`
    this.file.insertStatements(0, comment)
    return this
  }
  generateModel() {
    const schemas = this.apiJson.components?.schemas
    if (!schemas) return this
    Object.keys(schemas).forEach((name) => {
      const schema = schemas[name] as JsonSchema.ObjectSchema
      if (schema.type !== 'object') return
      const inter = this.file!.addInterface({
        name,
        isExported: true
      })
      Object.keys(schema.properties || {}).forEach((key) => {
        if (schema.properties) {
          const obj = schema.properties[key]
          const isBasic = ['string', 'number', 'boolean'].includes(
            (obj as NormalSchema).type
          )
          const isArray = (obj as NormalSchema).type === 'array'
          const isObject = (obj as NormalSchema).type === 'object'
          const property: GetType<typeof inter.addProperty> = {
            hasQuestionToken: !schema.required?.includes(key),
            name: key
          }
          if (isBasic) property.type = (obj as NormalSchema).type
          if (isArray) {
            const item = (obj as JsonSchema.ArraySchema).items.$ref
              ?.split('/')
              .pop()
            property.type = `${item}[]`
          }
          if (isObject) {
            property.type = '{}'
          }
          if (!property.type && (obj as JsonSchema.MixedSchema).allOf.length) {
            property.type = (obj as JsonSchema.MixedSchema).allOf[0].$ref
              ?.split('/')
              .pop()
          }
          if (obj.description) property.docs = [obj.description]
          inter.addProperty(property)
        }
      })
    })
    return this
  }
  generateName(operationId: string) {
    return operationId
      ?.replace('Controller', '')
      ?.split('_')
      .map((name) => capitalizeFirstLetter(name, 'upper'))
      .join('')
  }
  generateParams(
    url: string,
    item: Doc.Endpoint
  ): {
    url: string
    parameters: any[]
    paramsName: string
    bodyName: string
  } {
    const pathParams = item.parameters?.filter((param) => param.in === 'path')
    const queryParams = item.parameters?.filter((param) => param.in === 'query')
    const bodyParams = item.requestBody
    const parameters: any[] = []

    const result = {
      url,
      parameters,
      paramsName: '',
      bodyName: ''
    }
    if (pathParams?.length) {
      // 处理地址中的动态参数 get put delete
      // post/{id} > `/post/${id}`
      pathParams.forEach((param) => {
        parameters.push({
          name: param.name,
          type: (param.schema as JsonSchema.TypedSchema).type
        })
        result.url = url.replace(`{${param.name}}`, '$' + `{${param.name}}`)
      })
    }

    // 处理地址中的查询参数 get
    // params:{page?:number;pageSize?:number}
    const queryObject: any[] = []
    const params = queryParams
      ?.map((param) => {
        const isRequired = param.required
        const regex = /(\w+)\[(\w+)\]/g
        const isArray =
          (param.schema as JsonSchema.ArraySchema).type === 'array'
        const isObject = regex.test(param.name)
        if (isObject) {
          const name = param.name.replace(regex, '$1')
          const property = param.name.replace(regex, '$2')
          const findObject = queryObject.find((item) => item.name === name)

          if (findObject) {
            findObject.properties.push({
              name: property,
              type: (param.schema as any).enum
                ? (param.schema as any).enum.map((t: any) => `"${t}"`).join('|')
                : (param.schema as JsonSchema.TypedSchema).type
            })
          } else {
            queryObject.push({
              name,
              properties: [
                {
                  name: property,
                  type: (param.schema as any).enum
                    ? (param.schema as any).enum
                        .map((t: any) => `"${t}"`)
                        .join('|')
                    : (param.schema as JsonSchema.TypedSchema).type
                }
              ]
            })
          }
          return
        }
        return `${param.name}${isRequired ? '' : '?'}:${
          isArray
            ? (
                (param.schema as JsonSchema.ArraySchema)
                  .items as JsonSchema.TypedSchema
              ).type + '[]'
            : (param.schema as JsonSchema.TypedSchema).type
        }`
      })
      .filter(Boolean)
    if (queryObject.length) {
      const qb = queryObject
        .map((item) => {
          return `${item.name}:{${item.properties.map(
            (prop: any) => `${prop.name}:${prop.type}`
          )}}`
        })
        .join(';')
      params?.push(qb)
    }

    if (params?.length) {
      parameters.push({
        name: 'params',
        type: `{${params.join(';')}}`
      })
    }

    // 处理 json 传参
    if (bodyParams) {
      const refName = bodyParams.content['application/json'].schema?.$ref
        ?.split('/')
        .pop()
      const name = capitalizeFirstLetter(refName || '', 'lower')
      parameters.push({
        name,
        type: refName
      })
      result.bodyName = bodyParams ? (name as string) : ''
    }
    result.paramsName = params?.length ? 'params' : ''

    return result
  }
  generateReturnType(schema: JsonSchema) {
    // 处理返回 list
    const allOf = (schema as JsonSchema.MixedSchema).allOf
    const returnType = []
    if (allOf) {
      allOf.map((item) => {
        const $ref = item.$ref
        if ($ref && /^#/.test($ref)) {
          returnType.push($ref.split('/').pop())
        }
        const properties = (item as JsonSchema.ObjectSchema).properties
        if (properties) {
          const obj = Object.entries(properties)
            .map(([key, value]) => {
              if ((value as JsonSchema.ArraySchema).type === 'array') {
                const item = (value as JsonSchema.ArraySchema).items.$ref
                  ?.split('/')
                  .pop()
                return `${key}:${item}[]`
              } else {
                return `${key}:${(value as JsonSchema.TypedSchema).type}`
              }
            })
            .filter(Boolean)
            .join(';')
          if (obj) {
            returnType.push(`{${obj}}`)
          }
        }
      })
    }

    // 处理返回单个
    const isBasic = ['string', 'number', 'boolean'].includes(
      (schema as NormalSchema).type
    )
    if (isBasic) {
      const normalSchema = schema as NormalSchema
      returnType.push(normalSchema.type)
    }

    // 处理返回对象
    const type = (schema as JsonSchema.TypedSchema).type
    if (type && /^#/.test(type)) {
      returnType.push(type.split('/').pop())
    }

    const isArray = (schema as JsonSchema.ArraySchema).type === 'array'
    if (isArray) {
      const item = (schema as JsonSchema.ArraySchema).items.$ref
        ?.split('/')
        .pop()
      returnType.push(`${item}[]`)
    }

    // 处理null
    if ((schema as any).nullable) {
      returnType.push('null')
    }
    return returnType.join('&')
  }
  generateStatements(
    url: string,
    method: string,
    paramsName: string,
    bodyName: string
  ) {
    const statements = [`url:\`${url}\``, `method:"${method}"`]
    if (method === 'get') {
      if (paramsName) {
        statements.push(`params`)
      }
    } else {
      if (bodyName) {
        statements.push(`data:${bodyName}`)
      }
    }
    return `{${statements.join(',')}}`
  }
  generateGetFunction(url: string, method: string, item: Doc.Endpoint) {
    const fnName = this.generateName(item.operationId as string)
    const {
      url: newUrl,
      parameters,
      paramsName,
      bodyName
    } = this.generateParams(url, item)
    const returnType = this.generateReturnType(
      item.responses[200].content['application/json'].schema as JsonSchema
    )
    const statements = this.generateStatements(
      newUrl,
      method,
      paramsName,
      bodyName
    )
    this.file
      .addFunction({
        isExported: true,
        docs: [item.summary || ''],
        name: capitalizeFirstLetter(fnName, 'lower'),
        parameters,
        returnType: `Promise<${returnType}>`,
        statements: (writer) => {
          writer.write(`
            return request(${statements})
          `)
        }
      })
      .addStatements([])
  }
  generateFunction() {
    const paths = this.apiJson.paths
    if (!paths) return this
    if (!this.file) return this
    Object.entries(paths).forEach(([url, item]) => {
      Object.entries(item).forEach(([method, func]: [string, Doc.Endpoint]) => {
        this.generateGetFunction(url, method, func)
      })
    })

    return this
  }
  done() {
    if (!this.file) return
    return this.file.save()
  }
  format() {
    const projectRoot = path.resolve(__dirname, '../')
    const formatCommand = `prettier --write ${projectRoot}/src/api/**/*.ts --loglevel silent`
    shelljs.exec(formatCommand)
    return this
  }
}
const apiDoc = new ApiDoc(
  {
    jsonPath: 'http://localhost:9000/api-json',
    // jsonPath,
    tsConfigFilePath: tsConfigFilePath
  },
  'src/api/index.ts'
)
apiDoc.init().then(() => {
  apiDoc
    .generateDocs()
    .generateModel()
    .generateFunction()
    .done()
    ?.then(() => {
      apiDoc.format()
    })
})
