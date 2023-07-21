declare namespace JsonSchema {
  interface SchemaDef {
    $ref?: string
    default?: any
    description?: string
  }
  interface TypedSchema extends SchemaDef {
    type: string
  }
  interface BasicSchema extends TypedSchema {
    type: 'string' | 'number' | 'boolean'
  }
  interface ArraySchema extends TypedSchema {
    type: 'array'
    items: Schema
  }
  interface LiteralSchema extends TypedSchema {
    type: 'string' | 'number' | 'boolean'
    const: any
  }
  interface EnumSchema extends TypedSchema {
    type: 'string' | 'number' | 'boolean'
    enum: any[]
  }
  interface ObjectSchema extends TypedSchema {
    type: 'object'
    properties?: Record<string, Schema>
    required?: string[]
  }
  interface UnionSchema extends SchemaDef {
    oneOf: Schema[]
    default?: any
    description?: string
  }
  interface MixedSchema extends SchemaDef {
    allOf: Schema[]
    default?: any
    description?: string
  }
  type Schema =
    | SchemaDef
    | BasicSchema
    | ArraySchema
    | LiteralSchema
    | EnumSchema
    | ObjectSchema
    | UnionSchema
    | MixedSchema
}

declare namespace Doc {
  interface Info {
    title: string
    version: string
    description?: string
  }
  interface Server {
    url: string
    description?: string
  }
  type Paths = Record<
    string,
    Doc.Path &
      Record<'get' | 'put' | 'post' | 'delete' | 'head' | 'patch', Doc.Endpoint>
  >
  interface Path {
    summary?: string
    description?: string
  }
  interface Endpoint {
    operationId?: string
    requestBody: RequestBody
    responses: Record<'default' | number, Response>
    parameters?: Parameter[]
    tags?: string[]
    summary?: string
    description?: string
    security?: Array<Record<string, any>>
    deprecated?: boolean
  }
  interface Parameter {
    name: string
    in: 'query' | 'header' | 'path' | 'cookie'
    description?: string
    required?: boolean
    deprecated?: boolean
    $ref?: string
    schema?: JsonSchema
  }
  interface RequestBody {
    content: Record<string, Content>
    description?: string
    $ref?: string
  }
  interface Content {
    schema?: JsonSchema
    examples?: Record<string, Example>
    example?: Example
  }
  interface Example {
    summary?: string
    description?: string
    value?: any
    $ref?: string
  }
  interface Response {
    description?: string
    headers?: Record<string, Header>
    $ref?: string
    content: Record<string, Content>
  }
  interface Header {
    description?: string
    required?: boolean
    deprecated?: boolean
    schema?: JsonSchema
  }
  interface Tag {
    name: string
    description?: string
  }
  interface Components {
    schemas?: Record<string, JsonSchema>
    securitySchemes?: Record<string, SecurityScheme>
  }
  interface SecurityScheme {
    type: 'apiKey'
    name: string
    in: 'header' | 'query' | 'cookie'
    description?: string
  }
}

type JsonSchema = JsonSchema.Schema

interface Doc {
  openapi: string
  info: Doc.Info
  servers?: Doc.Server[]
  paths: Doc.Paths
  components?: Doc.Components
  security?: Record<string, string[]>
  tags?: Doc.Tag[]
}
