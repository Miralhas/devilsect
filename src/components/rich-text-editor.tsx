'use client'

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { CommentInput } from '@/types/threaded-comment';
import { Trash } from 'lucide-react';
import { useMemo, useState } from 'react';
import Editor, {
  BtnBold,
  BtnItalic,
  BtnRedo,
  BtnStrikeThrough,
  BtnUnderline,
  BtnUndo,
  ContentEditableEvent,
  createButton,
  Toolbar
} from 'react-simple-wysiwyg';

const buttonClassname = `
px-3 py-1 cursor-pointer transition-colors ease-in-out duration-200 
hover:text-accent data-[active=true]:text-accent
`

type Props = {
  onCancel: () => void;
  onSubmit: (commentInput: CommentInput) => void;
  initialData?: { message: string, isSpoiler: boolean };
}

const RichTextEditor = ({ onCancel, onSubmit, initialData }: Props) => {
  const [html, setHtml] = useState(initialData?.message ?? "");
  const [isSpoiler, setIsSpoiler] = useState(initialData?.isSpoiler ?? false);

  const hasHtml = html !== null && html !== undefined && html.trim() !== "" && html.trim() !== "<br>";

  const onChange = (e: ContentEditableEvent) => setHtml(e.target.value);
  const onClearAll = () => setHtml("");

  const handleSubmit = () => {
    onSubmit({ message: html, isSpoiler, parentCommentId: null });
    onCancel();
  }

  const ClearAllButton = useMemo(() => {
    return createButton("Clear All", <Trash className='size-4' />, "");
  }, []);

  return (
    <div className='space-y-2'>
      <Editor
        value={html}
        onChange={onChange}
        containerProps={{ style: { borderColor: "rgba(250, 250, 250, 0.15)" } }}
        className='text-zinc-300 min-h-[10vh]'
        placeholder='Add a comment'
        autoFocus
      >
        <Toolbar className='bg-secondary flex border-b border-zinc-50/15 flex-wrap items-center'>
          <BtnUndo className={buttonClassname} />
          <BtnRedo className={buttonClassname} />
          <BtnBold className={buttonClassname} />
          <BtnItalic className={buttonClassname} />
          <BtnUnderline className={buttonClassname} />
          <BtnStrikeThrough className={buttonClassname} />
          <ClearAllButton className={cn(buttonClassname, "px-1")} onClick={(e) => { e.preventDefault(); onClearAll() }} />
          <div className="ml-3 xs:ml-auto xs:pr-2 mt-0.25 flex items-center gap-2">
            <Label htmlFor='isSpoiler' className='text-xs text-muted-foreground whitespace-nowrap'>
              Is Spoiler
            </Label>
            <Switch id='isSpoiler' checked={isSpoiler} onCheckedChange={setIsSpoiler} />
          </div>
        </Toolbar>
      </Editor>
      <div className='flex justify-end gap-2 text-sm'>
        <Button className='text-xs font-semibold text-zinc-300 hover:text-zinc-100 rounded-2xl' variant="extra-cool-secondary" onClick={onCancel}>Cancel</Button>
        <Button
          className='text-xs font-semibold text-zinc-300 hover:text-zinc-100 rounded-2xl'
          variant="default"
          onClick={handleSubmit}
          disabled={!hasHtml}
        >
          Comment</Button>
      </div>
    </div>
  )
}

export default RichTextEditor;
