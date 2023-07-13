import React from 'react'
import ReactMarkdown from 'react-markdown'
import clsx from 'clsx'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import remarkSlug from 'remark-slug'
import remarkToc from 'remark-toc'
import './style.less'
import { IProps } from './types'

const Markdown: React.FC<IProps> = ({ className, children }) => {
  const remarkPlugins = [remarkGfm, remarkSlug, remarkToc]
  const rehypePlugins = [rehypeRaw, [rehypeHighlight, { ignoreMissing: true }]]
  return (
    <ReactMarkdown
      className={clsx('markdown-body', className)}
      remarkPlugins={remarkPlugins}
      rehypePlugins={rehypePlugins as any}
    >
      {children}
    </ReactMarkdown>
  )
}

export default Markdown
