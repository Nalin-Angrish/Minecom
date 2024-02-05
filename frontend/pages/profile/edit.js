import React,{useState,useRef} from 'react';
import dynamic from 'next/dynamic';
import '@uiw/react-markdown-editor/markdown-editor.css';
import { parse } from 'cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';

// Used for making sure the MD editor works in nextjs
const MarkdownEditor = dynamic(
    () => import("@uiw/react-markdown-editor").then((mod) => mod.default),
    { ssr: false }
  );

export default function ProfileEdit({ username, description }){
    var updatedMD = description;
    const router = useRouter();
    const handleClick = (description) => {
        let form = document.getElementById('editProfile');
        let data = new FormData(form);
        data.append('description', description);
        data.append('credential', parse(document.cookie)['credential'])
        let json_data = {};
        data.forEach((value, key) => {json_data[key] = value});
        console.log(json_data);
    
        fetch(`${process.env.NEXT_PUBLIC_BACKEND}/profile/update`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(json_data)
        }).then(res => res.json()).then(data => {
          console.log(data);
          router.push('/profile');
        })
       }
    
  
    return (
      <main>
        <div className="bg-blue-500 h-[30vh] w-full top-0">

        <h1 className="text-center font-bold text-green-500 text-7xl p-5">
          Edit Profile
        </h1>
        </div>

        <form id="editProfile">
        <div className='w-full h-full flex flex-col justify-left items-start gap-4 pl-10 pt-10'>
            <label htmlFor="username" className="text-2xl font-bold">Username</label>
            <input
              type = "text"
              id = "username"
              name = "username"
              required
              className='bg-slate-700 text-white p-2 rounded-md'
              defaultValue={username}
            ></input>
        </div>
        
        <div className="w-full h-full flex flex-col pt-5 gap-4 pl-10">
          <label htmlFor="description" className="text-2xl font-bold">Description</label>
          <MarkdownEditor 
            height = "150px"
            value={updatedMD}
            className="w-[50vw]"
            onChange={(value, viewUpdate) => {updatedMD=value}}
            enablePreview={false}
            name="description"
          />
        
        <div className='mx-auto justify-center items-center flex gap-5'>
          <Link href="/profile" className="bg-red-500 mx-auto rounded-lg w-44 h-12 text-xl font-bold text-center grid place-content-center">Cancel</Link>
          <button className="bg-green-500 w-44 mx-auto rounded-lg h-12 text-xl font-bold" onClick={(e)=>{e.preventDefault(); handleClick(updatedMD)}}>Submit</button>
        </div>
        
        </div>
        </form>
      </main>
    )

}

export async function getServerSideProps(context) {
  let credential = parse(context.req.headers.cookie)['credential']
  // Fetch data from external API
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/profile/get_current`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ credential }),
  })
  const data = (await res.json())['data']

  return { 
    props: {
      username: data.username,
      description: data.description,
    }
  }

}