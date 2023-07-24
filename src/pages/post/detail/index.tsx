import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Fragment, jsx, jsxs } from 'react/jsx-runtime'
import { SaveOutlined } from '@ant-design/icons'
import { createStarryNight } from '@wooorm/starry-night'
import sourceCss from '@wooorm/starry-night/lang/source.css.js'
import sourceGfm from '@wooorm/starry-night/lang/source.gfm.js'
import sourceJs from '@wooorm/starry-night/lang/source.js.js'
import sourceTs from '@wooorm/starry-night/lang/source.ts.js'
import sourceTsx from '@wooorm/starry-night/lang/source.tsx.js'
import textHtmlBasic from '@wooorm/starry-night/lang/text.html.basic.js'
import { Anchor, Button, Col, Input, Row, Typography, message } from 'antd'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { toJsxRuntime } from 'hast-util-to-jsx-runtime'
// @ts-ignore
import { postCreate, postFindOne, postUpdate } from '@/api'
import { Markdown } from '@/components'
import { useBoolean, useRequest } from '@/hooks'
import EnhancedTextArea from './EnhancedTextArea'
import './style.less'
import { IProps } from './types'
import { AnchorItem, getAnchorTree } from './utils'

const grammars = [
  sourceCss,
  sourceJs,
  sourceGfm,
  sourceTs,
  sourceTsx,
  textHtmlBasic
]

const Post: React.FC<IProps> = () => {
  const params = useParams()
  const navigate = useNavigate()
  const isAdd = !params.id
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [highlight, setHighlight] = useState<JSX.Element>()
  const [editable, setEditable] = useBoolean(false)
  const [editing, setEditing] = useBoolean(isAdd)
  const markdownRef = useRef<HTMLDivElement>(null)
  const postRef = useRef<HTMLDivElement>(null)
  const starryNightRef = useRef<Awaited<ReturnType<typeof createStarryNight>>>()
  const [anchorTree, setAnchorTree] = useState<AnchorItem[]>([])
  const { data, run } = useRequest(postFindOne, {
    manual: true,
    params: Number(params.id || 0)
  })
  const renderHighLight = (text: string) => {
    if (!text) return
    if (starryNightRef.current) {
      const h = toJsxRuntime(
        starryNightRef.current.highlight(text, 'text.md'),
        {
          jsx,
          jsxs,
          Fragment
        }
      )
      setHighlight(h)
    }
  }

  useEffect(() => {
    if (params.id) {
      run(Number(params.id)).then((res) => {
        setTitle(res.title)
        setText(res.content)
      })
    }
  }, [params])
  useEffect(() => {
    createStarryNight(grammars).then((res) => {
      starryNightRef.current = res
      renderHighLight(text)
    })
  }, [])
  useEffect(() => {
    if (!editing) return
    renderHighLight(text)
  }, [text, editing])

  useEffect(() => {
    if (editing) return
    if (markdownRef.current) {
      const tree = getAnchorTree(markdownRef.current)
      setAnchorTree(tree)
    }
  }, [editing, text])
  const onAdd = () => {
    postCreate({
      title,
      content: text
    }).then((id) => {
      message.success('发布成功')
      navigate(`/post/${id}`, { replace: true })
    })
  }
  const onUpdate = () => {
    if (params.id) {
      postUpdate(Number(params.id), {
        title,
        content: text
      }).then(() => {
        message.success('更新成功')
        run()
      })
    }
  }
  return (
    <div className='page-post-detail'>
      <div className='header'>
        {isAdd ? (
          <Row gutter={20}>
            <Col flex={1}>
              <Input
                placeholder='文章标题'
                bordered={false}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Col>
            <Col>
              <Button type='primary' onClick={onAdd}>
                发布
              </Button>
            </Col>
          </Row>
        ) : (
          <>
            <Typography.Title
              level={4}
              onMouseEnter={() => {
                setEditable(true)
              }}
              onMouseLeave={() => {
                setEditable(false)
              }}
              ellipsis={{
                rows: 1
              }}
              editable={
                editing
                  ? {
                      icon: <SaveOutlined />,
                      tooltip: '保存',
                      editing: false,
                      onStart: () => {
                        setEditing(false)
                        setEditable(false)
                        onUpdate()
                      }
                    }
                  : editable
                  ? {
                      editing: false,
                      onStart: () => {
                        setEditing(true)
                      }
                    }
                  : false
              }
            >
              {data?.title}
            </Typography.Title>
            <Typography.Text type='secondary'>
              {dayjs(data?.createdAt).format('YYYY-MM-DD HH:mm')}
            </Typography.Text>
          </>
        )}
      </div>
      <Row className='content'>
        {editing && (
          <Col span={12} className='editor-wrapper'>
            <div className='editor'>
              <div className='highlight'>
                {highlight}
                {/\n[ \t]*$/.test(text) ? <br /> : undefined}
              </div>
              <EnhancedTextArea
                placeholder='请输入文章内容...'
                className='write'
                spellCheck={false}
                value={text}
                rows={(text?.split('\n') || []).length + 1}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
          </Col>
        )}
        <Col
          ref={postRef}
          span={editing ? 12 : 24}
          className={clsx('markdown-wrapper', editing && 'editing')}
        >
          <div ref={markdownRef} className='markdown-content'>
            <Markdown>{text}</Markdown>
          </div>
          {editing ? null : (
            <Anchor
              className='anchor'
              items={anchorTree}
              getContainer={() => postRef.current!}
            />
          )}
        </Col>
      </Row>
    </div>
  )
}

export default Post
