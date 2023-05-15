import { Input } from 'antd'
import { IZFormItemProps } from '@/components/z-form/types'

export const formPropsInfoFn = () => {
  const list: IZFormItemProps[] = [
    {
      props: {
        name: 'name',
        label: '昵称',
        rules: [
          {
            required: true,
            message: '请输入昵称'
          }
        ]
      },
      component: <Input />
    },
    {
      props: {
        name: 'molding',
        label: '造型',
        rules: [
          {
            required: true,
            message: '请输入造型'
          }
        ]
      },
      component: <Input />
    },
    {
      props: {
        name: 'sect',
        label: '门派',
        rules: [
          {
            required: true,
            message: '请输入门派'
          }
        ]
      },
      component: <Input />
    },
    {
      props: {
        name: 'level',
        label: '等级',
        rules: [
          {
            required: true,
            message: '请输入等级'
          }
        ]
      },
      component: <Input />
    },
    {
      colProps: {
        span: 16
      },
      props: {
        name: 'remark',
        label: '备注'
      },
      component: <Input.TextArea />
    }
  ]
  return {
    colProps: { span: 8 },
    type: 'detail' as 'detail',
    list
  }
}

export const formPropsEquipmentFn = () => {
  const list: IZFormItemProps[] = [
    {
      props: {
        name: ['equipment', 'arms'],
        label: '武器'
      },
      component: <Input />
    },
    {
      props: {
        name: ['equipment', 'helmet'],
        label: '头盔'
      },
      component: <Input />
    },
    {
      props: {
        name: ['equipment', 'necklace'],
        label: '项链'
      },
      component: <Input />
    },
    {
      props: {
        name: ['equipment', 'clothes'],
        label: '衣服'
      },
      component: <Input />
    },
    {
      props: {
        name: ['equipment', 'belt'],
        label: '腰带'
      },
      component: <Input />
    },
    {
      props: {
        name: ['equipment', 'shoe'],
        label: '鞋子'
      },
      component: <Input />
    },

    {
      props: {
        name: ['equipment', 'ring'],
        label: '戒指'
      },
      component: <Input />
    },
    {
      props: {
        name: ['equipment', 'bracelet'],
        label: '手镯'
      },
      component: <Input />
    },
    {
      props: {
        name: ['equipment', 'earring'],
        label: '耳饰'
      },
      component: <Input />
    },
    {
      props: {
        name: ['equipment', 'trimming'],
        label: '佩饰'
      },
      component: <Input />
    },
    {
      colProps: { span: 16 },
      props: {
        name: ['equipment', 'remark'],
        label: '备注'
      },
      component: <Input.TextArea />
    }
  ]
  return {
    colProps: { span: 8 },
    type: 'detail' as 'detail',
    list
  }
}

export const formPropsPetFn = (index: number) => {
  const list: IZFormItemProps[] = [
    {
      colProps: { span: 0 },
      props: {
        noStyle: true,
        name: ['pets', index, 'id']
      },
      component: null
    },
    {
      props: {
        name: ['pets', index, 'name'],
        label: '名称'
      },
      component: <Input />
    },
    {
      props: {
        name: ['pets', index, 'price'],
        label: '价格'
      },
      component: <Input />
    },
    {
      props: {
        name: ['pets', index, 'level'],
        label: '等级'
      },
      component: <Input />
    },
    {
      colProps: { span: 24 },
      props: {
        name: ['pets', index, 'remark'],
        label: '备注'
      },
      component: <Input.TextArea />
    }
  ]
  return {
    colProps: { span: 8 },
    type: 'detail' as 'detail',
    list
  }
}
