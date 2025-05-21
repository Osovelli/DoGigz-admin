import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import CharacterCount from '@tiptap/extension-character-count';
import { Button } from '../ui/button';

const PrivacyPolicy = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      CharacterCount.configure({
        limit: 10000,
      }),
    ],
    content: `
      <h1>Lorem ipsum dolor</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel augue sit amet est molestie viverra. Nunc quis bibendum orci. Donec feugiat massa mi, at hendrerit mauris rutrum at. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel augue sit amet est molestie viverra. Nunc quis bibendum orci. Donec feugiat massa mi, at hendrerit mauris rutrum at. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel augue sit amet est molestie viverra. Nunc quis bibendum orci. Donec feugiat massa mi, at hendrerit mauris rutrum at.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eget diam eu nulla accumsan varius. Vestibulum luctus arcu urna. Proin et ante ac urna rutrum dictum sagittis et lectus. Nam lobortis, diam vitae dignissim consectetur, augue felis consectetur arcu, ut egestas odio eu lector massa. Suspendisse a lectus metus. Integer faucibus eu tellus id commodo. Maecenas pretium diam quis nibh pellentesque, sed cursus nisl pretium. Curabitur dolor velit, volutpat in eleifend fermentum, cursus sit amet nulla. Proin enim dui, tincidunt et sapien sit amet, vulputate sodales nisl.</p>
      <p>Ut pretium at arcu a ornare. Ut facilisis nisl turpis, vitae posuere lacus sagittis pretium. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin sed nisl faucibus, egestas nulla ac, viverra sapien. Nulla finibus massa in sem pellentesque hendrerit. Fusce rhoncus ullamcorper congue. Aliquam blandit feugiat nunc sit amet porta. Ut a iaculis ligula, non dignissim risus.</p>
      <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam sodales vulputate luctus. Sed ultricies dui, a tempus lacus fermentum sit amet. Proin ultricies ac ante pellentesque, id pharetra diam interdum.</p>
      <p>Aliquam sed eleifend dui. Vestibulum non porttitor mauris. Nam malesuada condimentum ex vitae venenatis. Duis aliquet augue non faucibus vestibulum. Suspendisse fermentum mi lectus, id fringilla lectus scelerisque nec. Fusce mi orci, aliquam sit amet lectus accumsan, tincidunt feugiat sem. Suspendisse ut rutrum justo, nec semper enim. Curabitur nec justo lacus. Vivamus eu massa vulputate ligula laoreet consequat. Praesent mattis turpis quis pellentesque commodo. Suspendisse fermentum lacus et sapien suscipit molestie. Fusce eu leo vel arcu tristique congue. Cras nec neque vel diam feugiat fermentum. Curabitur luctus feugiat quam vitae condimentum. Suspendisse elementum nibh quis congue eleifend. Aenean arcu ex, dignissim pretium mattis sit amet, sollicitudin sed justo.</p>
      <p>Integer sed laoreet lacus, vel rutrum elit. Sed cursus rhoncus ipsum ac tincidunt. Aenean imperdiet risus dictum iaculis tempus. Integer tincidunt felis at faucibus volutpat. Nulla facilisi. Curabitur rutrum maximus mi, quis dignissim metus pretium ut. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
    `,
  });

  if (!editor) {
    return <div>Loading editor...</div>;
  }

  const characterCount = editor.storage.characterCount.characters();
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Privacy Policy</h2>
      
      <div className="border border-gray-200 rounded-md">
        <div className="flex flex-wrap gap-2 p-2 border-b border-gray-200 editor-toolbar">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('bold') ? 'bg-gray-100' : ''}`}
            title="Bold"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
              <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
            </svg>
          </button>
          
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('italic') ? 'bg-gray-100' : ''}`}
            title="Italic"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <line x1="19" y1="4" x2="10" y2="4"></line>
              <line x1="14" y1="20" x2="5" y2="20"></line>
              <line x1="15" y1="4" x2="9" y2="20"></line>
            </svg>
          </button>
          
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('underline') ? 'bg-gray-100' : ''}`}
            title="Underline"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"></path>
              <line x1="4" y1="21" x2="20" y2="21"></line>
            </svg>
          </button>
          
          <button
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('paragraph') ? 'bg-gray-100' : ''}`}
            title="Paragraph"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M13 4v16"></path>
              <path d="M19 4v16"></path>
              <path d="M19 4H8.5a4.5 4.5 0 0 0 0 9H13"></path>
            </svg>
          </button>
          
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('bulletList') ? 'bg-gray-100' : ''}`}
            title="Bullet List"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <line x1="9" y1="6" x2="20" y2="6"></line>
              <line x1="9" y1="12" x2="20" y2="12"></line>
              <line x1="9" y1="18" x2="20" y2="18"></line>
              <circle cx="4" cy="6" r="2"></circle>
              <circle cx="4" cy="12" r="2"></circle>
              <circle cx="4" cy="18" r="2"></circle>
            </svg>
          </button>
          
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('orderedList') ? 'bg-gray-100' : ''}`}
            title="Ordered List"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <line x1="10" y1="6" x2="21" y2="6"></line>
              <line x1="10" y1="12" x2="21" y2="12"></line>
              <line x1="10" y1="18" x2="21" y2="18"></line>
              <path d="M4 6h1v4"></path>
              <path d="M4 10h2"></path>
              <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"></path>
            </svg>
          </button>
          
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('blockquote') ? 'bg-gray-100' : ''}`}
            title="Blockquote"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
              <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
            </svg>
          </button>
          
          <button
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className="p-2 rounded hover:bg-gray-100"
            title="Horizontal Rule"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
          
          <button
            onClick={() => editor.chain().focus().undo().run()}
            className="p-2 rounded hover:bg-gray-100"
            title="Undo"
            disabled={!editor.can().undo()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M3 7v6h6"></path>
              <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"></path>
            </svg>
          </button>
          
          <button
            onClick={() => editor.chain().focus().redo().run()}
            className="p-2 rounded hover:bg-gray-100"
            title="Redo"
            disabled={!editor.can().redo()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M21 7v6h-6"></path>
              <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"></path>
            </svg>
          </button>
        </div>
        
        <div className="p-4 min-h-[300px] prose max-w-none">
          <EditorContent editor={editor} className="outline-none" />
        </div>
        
        <div className="flex justify-between items-center p-4 border-t border-gray-200">
          <div className="text-sm text-gray-500">
            Total characters: {characterCount}
          </div>
          
          <Button>Save changes</Button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
