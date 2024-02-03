import React,{useState,useRef} from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import dynamic from 'next/dynamic';
import '@uiw/react-markdown-editor/markdown-editor.css';
// import '@uiw/react-markdown-preview/markdown.css';

const MarkdownEditor = dynamic(
  () => import("@uiw/react-markdown-editor").then((mod) => mod.default),
  { ssr: false }
);

export default function App(){
  var updatedMD = "";
  const [md, setMD] = useState('');

  const mdClick = (updatedMD) => {
    setMD(updatedMD); 
  }

  return (
    <main>
      <h1 className="text-center font-bold text-green-700 text-7xl p-5">
        Minecom
      </h1>
     
      <div className="w-full h-full flex flex-col justify-center items-center">
        <MarkdownEditor 
          height = "150px"
          value={updatedMD}
          className="w-[50vw]"
          onChange={(value, viewUpdate) => {updatedMD=value}}
          enablePreview={false}
        />

      <button className="bg-green-500 w-1/6 mx-auto" onClick={()=>mdClick(updatedMD)}>Submit</button>

      <ReactMarkdown 
        children={md} 
        className='Markdown'
        remarkPlugins={[remarkGfm]} 
        rehypePlugins={[rehypeRaw]} 
      />

      </div>
    </main>
  )
};

