'use client'

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Editor, {
  BtnBold,
  BtnItalic,
  BtnRedo,
  BtnStrikeThrough,
  BtnUnderline,
  BtnUndo,
  ContentEditableEvent,
  Toolbar
} from 'react-simple-wysiwyg';

const buttonClassname = `px-3 py-1  cursor-pointer 
transition-all ease-in-out duration-200 
hover:bg-black data-[active=true]:border-accent/70 data-[active=true]:border data-[active=true]:bg-black data-[active=true]:text-accent/80
`

const RichTextEditor = ({ cancel }: { cancel: () => void }) => {
  const [html, setHtml] = useState("");

  const onChange = (e: ContentEditableEvent) => setHtml(e.target.value);

  return (
    <div className='space-y-2'>
      <Editor
        value={html}
        onChange={onChange}
        containerProps={{ style: { borderColor: "rgba(250, 250, 250, 0.15)" } }}
        placeholder='Add a comment'
        autoFocus
      >
        <Toolbar className='bg-secondary flex border-b border-zinc-50/15 pt-0.25'>
          <BtnUndo className={buttonClassname} />
          <BtnRedo className={buttonClassname} />
          <BtnBold className={buttonClassname} />
          <BtnItalic className={buttonClassname} />
          <BtnUnderline className={buttonClassname} />
          <BtnStrikeThrough className={buttonClassname} />
        </Toolbar>
      </Editor>
      <div className='flex justify-end gap-2 text-sm'>
        <Button className='text-xs font-semibold text-zinc-300 hover:text-zinc-100 rounded-2xl' variant="extra-cool-secondary" onClick={cancel}>Cancel</Button>
        <Button className='text-xs font-semibold text-zinc-300 hover:text-zinc-100 rounded-2xl' variant="default" onClick={cancel}>Comment</Button>
      </div>
    </div>
  )
}

export default RichTextEditor;
