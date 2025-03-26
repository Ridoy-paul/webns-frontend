import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });

export default function TextAreaEditor({ oldContent, onEditorChange }) {
//npm install react-quill@2.0.0
    const [isLoading, setLoading] = useState(true);
    const [content, setContent] = useState(oldContent);

    const quillModules = {
        toolbar: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ align: [] }],
        [{ color: [] }],
        ['clean'],
        ],
    };

    const quillFormats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'align',
        'color',
    ];


    const handleEditorChange = (newContent) => {
        setContent(newContent);
        onEditorChange(newContent);
    };


  return (
    <main>
      <div className="h-screen w-screen flex items-center flex-col">
        <div className="h-full w-[90vw]">
          <QuillEditor
            value={content}
            onChange={handleEditorChange}
            modules={quillModules}
            formats={quillFormats}
            className="w-full h-[70%] mt-10 bg-white"
          />
        </div>
      </div>
    </main>
  );
}