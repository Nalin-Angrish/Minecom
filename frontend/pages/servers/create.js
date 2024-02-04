import React,{useState,useRef} from 'react';
import { parse } from 'cookie';
import dynamic from 'next/dynamic';
import '@uiw/react-markdown-editor/markdown-editor.css';
// import '@uiw/react-markdown-preview/markdown.css';

const MarkdownEditor = dynamic(
  () => import("@uiw/react-markdown-editor").then((mod) => mod.default),
  { ssr: false }
);

export default function CreateServer(){
  var updatedMD = "";

  const handleClick = (description) => {
    let form = document.getElementById('createServer');
    let data = new FormData(form);
    data.append('description', description);
    data.append('credential', parse(document.cookie)['credential'])
    let json_data = {};
    data.forEach((value, key) => {json_data[key] = value});
    console.log(json_data);

    fetch(`${process.env.NEXT_PUBLIC_BACKEND}/server/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(json_data)
    }).then(res => res.json()).then(data => {
      console.log(data);
      if(data.success){
        window.location.href = '/server';
      }
    })
  }

  return(
    <>
    <h1 className='text-3xl font-bold text-center my-8'>Create a Server</h1>
    <form className='flex flex-col w-[90%] mx-auto' id='createServer'>
      <label htmlFor="name">Server Name</label>
      <input type="text" id="name" name="name" required className='p-2 rounded-md bg-slate-700 text-white' />
      {/* IP and port */}
      <label htmlFor="ip">IP Address</label>
      <input type="text" id="ip" name="ip" required className='p-2 rounded-md bg-slate-700 text-white' />
      <label htmlFor="port">Port</label>
      <input type="number" id="port" name="port" required className='p-2 rounded-md bg-slate-700 text-white' />
      {/* Max Users */}
      <label htmlFor="maxUsers">Max Players</label>
      <input type="number" id="max_players" name="max_players" required className='p-2 rounded-md bg-slate-700 text-white' />
      {/* Description */}
      <label htmlFor="description">Description</label>
      
      <MarkdownEditor 
          height = "150px"
          value={updatedMD}
          className="bg-slate-800"
          onChange={(value, viewUpdate) => {updatedMD=value}}
          enablePreview={false}
          name="description"
        />
      <button type="submit" className=' bg-green-500 my-2 ml-auto px-10 py-2 font-bold rounded-md' onClick={(e)=>{e.preventDefault(); handleClick(updatedMD)}}>Create Server</button>
    
      <input type="hidden" name="icon" id="" />
    </form>
    </>
  )
}