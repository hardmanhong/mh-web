import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Link, useNavigate } from 'react-router-dom'
import {
  Button,
  Col,
  Divider,
  Input,
  List,
  Popconfirm,
  Row,
  Skeleton,
  Space,
  message
} from 'antd'
import dayjs from 'dayjs'
import { Post, deletePost, getPostList } from '@/api/post'
import { useBoolean, usePaginated } from '@/hooks'
import './style.less'

const PostList: React.FC<{}> = () => {
  const navigate = useNavigate()
  const [list, setList] = useState<Required<Post>[]>([])
  const [hasMore, setHasMore] = useBoolean(true)
  const { loading, params, error, run } = usePaginated(getPostList, {
    manual: true,
    defaultPageSize: 15,
    defaultData: { count: 0, list: [] }
  })

  const loadMoreData = () => {
    if (loading) {
      return
    }
    if (!hasMore) return
    params.page++
    run().then((res) => {
      setList((list) => [...list, ...res.list])
      if (list.length >= res.count) {
        setHasMore(false)
      }
    })
  }
  useEffect(() => {
    params.page = 0
    loadMoreData()
  }, [])
  const onAdd = () => {
    navigate(`/post/add`)
  }
  const onConfirm = (id: number) => {
    deletePost(id).then(() => {
      message.success('删除成功')
      params.page = 1
      run()
    })
  }
  const onSearch = (value: string) => {
    params.page = 1
    run({ ...params, title: value }).then((res) => {
      setList(res.list)
      if (list.length >= res.count) {
        setHasMore(false)
      }
    })
  }
  return (
    <div className='page-post-list'>
      <Col offset={8}>
        <Row justify='space-between'>
          <Col>
            <Input.Search
              placeholder='标题'
              allowClear
              enterButton
              onSearch={onSearch}
            />
          </Col>
          <Col>
            <Button type='primary' ghost onClick={onAdd}>
              添加
            </Button>
          </Col>
        </Row>
        <Space></Space>
      </Col>
      <div id='scrollableDiv' className='post-list'>
        <InfiniteScroll
          dataLength={list.length}
          next={loadMoreData}
          hasMore={hasMore}
          loader={error ? null : <Skeleton paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>到尽头了 🤐</Divider>}
          scrollableTarget={'scrollableDiv'}
        >
          <List
            itemLayout='horizontal'
            dataSource={list}
            renderItem={(item) => (
              <List.Item
                key={item.id}
                actions={[
                  <Popconfirm
                    title='删除文章'
                    description='确定要删除吗?'
                    onConfirm={(e) => {
                      e?.preventDefault()
                      onConfirm(item.id)
                    }}
                    onCancel={(e) => {
                      e?.preventDefault()
                    }}
                  >
                    <Button
                      key='list-loadmore-remove'
                      type='link'
                      danger
                      onClick={(e) => {
                        e.preventDefault()
                      }}
                    >
                      删除
                    </Button>
                  </Popconfirm>
                ]}
              >
                <List.Item.Meta
                  title={
                    <Link to={`/post/${item.id}`} key={item.id}>
                      {item.title}
                    </Link>
                  }
                  description={dayjs(item.createdAt).format('YYYY-MM-DD HH:mm')}
                />
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    </div>
  )
}

export default PostList
