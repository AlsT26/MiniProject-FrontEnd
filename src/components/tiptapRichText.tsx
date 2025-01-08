import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      BulletList,
      OrderedList,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="tiptap-container">
      {/* Toolbar */}
      <div className="toolbar">
        <select
          onChange={(e) => {
            const level = parseInt(e.target.value, 10) as 0 | 1 | 2 | 3;
            if (level === 0) {
              editor.chain().focus().setParagraph().run();
            } else {
              editor.chain().focus().toggleHeading({ level }).run();
            }
          }}
          className="toolbar-select"
        >
          <option value="0">Normal</option>
          <option value="1">Heading 1</option>
          <option value="2">Heading 2</option>
          <option value="3">Heading 3</option>
        </select>
        <button onClick={() => editor.chain().focus().toggleBold().run()} className={`toolbar-button ${editor.isActive("bold") ? "active" : ""}`}>
          Bold
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className={`toolbar-button ${editor.isActive("italic") ? "active" : ""}`}>
          Italic
        </button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={`toolbar-button ${editor.isActive("underline") ? "active" : ""}`}>
          Underline
        </button>
        <button onClick={() => editor.chain().focus().setTextAlign("left").run()} className={`toolbar-button ${editor.isActive({ textAlign: "left" }) ? "active" : ""}`}>
          Left Align
        </button>
        <button onClick={() => editor.chain().focus().setTextAlign("center").run()} className={`toolbar-button ${editor.isActive({ textAlign: "center" }) ? "active" : ""}`}>
          Center Align
        </button>
        <button onClick={() => editor.chain().focus().setTextAlign("right").run()} className={`toolbar-button ${editor.isActive({ textAlign: "right" }) ? "active" : ""}`}>
          Right Align
        </button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={`toolbar-button ${editor.isActive("bulletList") ? "active" : ""}`}>
          Bullet List
        </button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`toolbar-button ${editor.isActive("orderedList") ? "active" : ""}`}>
          Ordered List
        </button>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} className="editor" />

      <style jsx>{`
        .tiptap-container {
          border: 1px solid #ddd;
          padding: 16px;
          border-radius: 8px;
          background: #f9f9f9;
          width: 100%;
        }
        .toolbar {
          display: flex;
          gap: 8px;
          margin-bottom: 12px;
          flex-wrap: wrap;
        }
        .toolbar-select {
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
          cursor: pointer;
          background: #fff;
        }
        .toolbar-button {
          padding: 8px 12px;
          background: #fff;
          border: 1px solid #ddd;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.3s, transform 0.3s;
        }
        .toolbar-button:hover {
          background: #f0f0f0;
          transform: translateY(-2px);
        }
        .toolbar-button.active {
          background: #007bff;
          color: #fff;
        }
        .editor {
          min-height: 400px; /* Increased height */
          max-height: 600px; /* Optional max height */
          overflow-y: auto;
          border: 1px solid #ddd;
          padding: 16px; /* Added padding */
          border-radius: 8px; /* Rounded corners */
          background: #fff;
          font-size: 16px; /* Slightly larger font size */
          line-height: 1.8; /* Better line spacing */
        }
      `}</style>
    </div>
  );
}
