import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'
import { MdFormatClear, MdFormatListBulleted, MdHorizontalRule, MdUndo, MdRedo } from "react-icons/md";
import { GoListOrdered } from "react-icons/go";
import { RiH1, RiH2, RiBold, RiItalic, RiUnderline } from "react-icons/ri";
import Underline from "@tiptap/extension-underline";
import "../style/Editor.css"

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="control-group">
      <div className="button-group">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          <RiBold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          <RiItalic />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive('underline') ? 'is-active' : ''}
        >
          <RiUnderline />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
        >
          <RiH1 />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
        >
          <RiH2 />
        </button>
        <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
          <MdFormatClear />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
          <MdFormatListBulleted />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is-active' : ''}
        >
          <GoListOrdered />
        </button>
        <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          <MdHorizontalRule />
        </button>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <MdUndo />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <MdRedo />
        </button>
      </div>
    </div>
  );
}

const Editor = ({ formData, setFormData }) => {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: formData.description,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setFormData(prevData => ({
        ...prevData,
        description: html
      }));
    },
  });

  return (
    <div className="textEditor">
      <MenuBar editor={editor} />
      <div style={{height:'2vh'}}></div>
      <EditorContent className='edit_box' editor={editor} />
    </div>
  );
};

export default Editor;
