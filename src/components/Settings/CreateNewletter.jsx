import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import CharacterCount from '@tiptap/extension-character-count';
import { Bold, Italic, Underline, Heading2, List, ListOrdered, Quote, Minus, Link, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

const CreateNewsletter = () => {
  const [selectedRecipients, setSelectedRecipients] = useState('All Users');
  const navigate = useNavigate();
  
  const editor = useEditor({
    extensions: [
      StarterKit,
      CharacterCount.configure({
        limit: 10000,
      }),
    ],
    content: '<h1>Lorem ipsum dolor</h1><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel augue sit amet est molestie viverra. Nunc quis bibendum orci. Donec feugiat massa mi, at hendrerit mauris rutrum at.</p>',
    autofocus: true,
  });

  /* const characterCount = editor?.storage.characterCount.characters() || 0;
  const characterLimit = editor?.storage.characterCount.limit() || 10000; */

  const handleSend = () => {
    // Here you would implement the logic to send the newsletter
    // For now, we'll just navigate back to the newsletter list
    navigate('/settings/newsletter');
  };

  const handleButtonClick = (action) => {
    if (!editor) return;

    switch (action) {
      case 'bold':
        editor.chain().focus().toggleBold().run();
        break;
      case 'italic':
        editor.chain().focus().toggleItalic().run();
        break;
      case 'underline':
        editor.chain().focus().toggleUnderline().run();
        break;
      case 'heading':
        editor.chain().focus().toggleHeading({ level: 2 }).run();
        break;
      case 'bulletList':
        editor.chain().focus().toggleBulletList().run();
        break;
      case 'orderedList':
        editor.chain().focus().toggleOrderedList().run();
        break;
      case 'blockquote':
        editor.chain().focus().toggleBlockquote().run();
        break;
      case 'horizontalRule':
        editor.chain().focus().setHorizontalRule().run();
        break;
      case 'link':
        const url = window.prompt('URL');
        if (url) {
          editor.chain().focus().setLink({ href: url }).run();
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Create Newsletter</h1>
      
      <div className="mb-6 flex justify-between items-center">
        <div className="relative w-64">
          <select
            value={selectedRecipients}
            onChange={(e) => setSelectedRecipients(e.target.value)}
            className="w-full appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option>All Users</option>
            <option>Premium Users</option>
            <option>Free Users</option>
            <option>Inactive Users</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="flex flex-wrap gap-2 p-2 border-b border-gray-200 editor-toolbar">
          <button
            onClick={() => handleButtonClick('bold')}
            className={`p-2 rounded hover:bg-gray-100 ${editor?.isActive('bold') ? 'bg-gray-200' : ''}`}
            title="Bold"
          >
            <Bold size={18} />
          </button>
          <button
            onClick={() => handleButtonClick('italic')}
            className={`p-2 rounded hover:bg-gray-100 ${editor?.isActive('italic') ? 'bg-gray-200' : ''}`}
            title="Italic"
          >
            <Italic size={18} />
          </button>
          <button
            onClick={() => handleButtonClick('underline')}
            className={`p-2 rounded hover:bg-gray-100 ${editor?.isActive('underline') ? 'bg-gray-200' : ''}`}
            title="Underline"
          >
            <Underline size={18} />
          </button>
          <button
            onClick={() => handleButtonClick('heading')}
            className={`p-2 rounded hover:bg-gray-100 ${editor?.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''}`}
            title="Heading"
          >
            <Heading2 size={18} />
          </button>
          <button
            onClick={() => handleButtonClick('bulletList')}
            className={`p-2 rounded hover:bg-gray-100 ${editor?.isActive('bulletList') ? 'bg-gray-200' : ''}`}
            title="Bullet List"
          >
            <List size={18} />
          </button>
          <button
            onClick={() => handleButtonClick('orderedList')}
            className={`p-2 rounded hover:bg-gray-100 ${editor?.isActive('orderedList') ? 'bg-gray-200' : ''}`}
            title="Ordered List"
          >
            <ListOrdered size={18} />
          </button>
          <button
            onClick={() => handleButtonClick('blockquote')}
            className={`p-2 rounded hover:bg-gray-100 ${editor?.isActive('blockquote') ? 'bg-gray-200' : ''}`}
            title="Quote"
          >
            <Quote size={18} />
          </button>
          <button
            onClick={() => handleButtonClick('horizontalRule')}
            className="p-2 rounded hover:bg-gray-100"
            title="Horizontal Rule"
          >
            <Minus size={18} />
          </button>
          <button
            onClick={() => handleButtonClick('link')}
            className={`p-2 rounded hover:bg-gray-100 ${editor?.isActive('link') ? 'bg-gray-200' : ''}`}
            title="Link"
          >
            <Link size={18} />
          </button>
        </div>
        
        <div className="p-4">
          <EditorContent editor={editor} className="prose max-w-none min-h-[300px]" />
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-4">
        {/* <div className="text-sm text-gray-500">
          Total <span className="font-medium">{characterCount}</span> characters: <span className="font-medium">{characterLimit - characterCount}</span> remaining
        </div> */}
        <Button onClick={handleSend} className="bg-black text-white rounded-full px-6">
          Send
        </Button>
      </div>
    </div>
  );
};

export default CreateNewsletter;
