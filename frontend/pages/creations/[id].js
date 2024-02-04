import React,{useState,useRef} from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import dynamic from 'next/dynamic';
import '@uiw/react-markdown-editor/markdown-editor.css';
import { useRouter } from 'next/router';

export default function Creation({server}){
    return (
        <main>
            <h1 className="text-center font-bold text-green-700 text-6xl p-5">
            {server.name}
            </h1> 
            <Section add="flex-row-reverse bg-gradient-to-l from-slate-950 to-slate-400" content={server.description} image={server.image} grad_dir="img_right"/>
            <div className="bg-slate-950">
                <p className="text-lg p-2">Created by: <b>{server.member}</b></p>
            </div>
        </main>
    )
}

const Section = ({add, content, image, grad_dir}) => {
    return (
      <div className={` flex place-items-center ${add}`}>
          
          <div className='text-center px-32 flex flex-col justify-evenly place-items-center w-1/2 h-[100%]'>
          <ReactMarkdown children={content}  className='Markdown' remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}/>
          </div>
          <img className={`h-[80vh] w-[50%] ${grad_dir}`} src={image}></img>
  
      </div>
    )
  }

export async function getServerSideProps(context) {
    let id = context.params.id;

    // Fetch data from external API
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/server/get`)
    const servers = (await res.json())['servers']

    for(let server of servers){
        console.log(server.name)
        if(server.id==id){
            return {props: {server}}
        }
    }

  }