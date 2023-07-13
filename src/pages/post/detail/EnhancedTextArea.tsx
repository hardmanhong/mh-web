import React, { useEffect, useRef } from 'react'
import { Input } from 'antd'
import { TextAreaProps } from 'antd/lib/input'

interface IProps extends TextAreaProps {}

const EnhancedTextArea: React.FC<IProps> = (props) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.focus()
    }
  }, [])
  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key == 'Tab' && textAreaRef.current) {
      e.preventDefault()
    }
  }
  return (
    <Input.TextArea
      {...props}
      style={{ boxShadow: 'none' }}
      ref={textAreaRef}
      onKeyDown={onKeyDown}
    />
  )
}

export default EnhancedTextArea
