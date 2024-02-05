import React,{useState,useRef} from 'react';
import { parse } from 'cookie';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import '@uiw/react-markdown-editor/markdown-editor.css';

const MarkdownEditor = dynamic(
  () => import("@uiw/react-markdown-editor").then((mod) => mod.default),
  { ssr: false }
);

export default function CreateCreation(){

  const [image, setImage] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      setImage('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the form. The image is available in the `image` state variable as a base64 string.
  };


  var updatedMD = "";
  const router = useRouter();
  const handleClick = (description) => {
    let form = document.getElementById('createCreation');
    let data = new FormData(form);
    data.append('description', description);
    data.append('image', image);
    data.append('credential', parse(document.cookie)['credential'])
    let json_data = {};
    data.forEach((value, key) => {json_data[key] = value});
    console.log(json_data);

    fetch(`${process.env.NEXT_PUBLIC_BACKEND}/creation/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(json_data)
    }).then(res => res.json()).then(data => {
      console.log(data);
      router.push('/creations');
    })
  }

  return(
    <>
    <div className="bg-blue-500 h-[30vh] w-full top-0">
      <h1 className="text-center font-bold text-green-500 text-7xl p-5">
        Add Creation
      </h1>
    </div>

    <form onSubmit={handleSubmit} id='createCreation'>
      
      <div className='w-full h-full flex flex-col justify-left items-start gap-4 pl-10 pt-10'>
        <label htmlFor="name" className="text-2xl font-bold">Username</label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          required 
          className='p-2 rounded-md bg-slate-700 text-white'
        ></input>
      </div>

      {/* Description */}
      <div className='w-full h-full flex flex-col justify-left items-start gap-4 pl-10 pt-10'>
      
      <label htmlFor="description" className="text-2xl font-bold">Description</label>
      <MarkdownEditor 
          height = "150px"
          value={updatedMD}
          className="bg-slate-800"
          onChange={(value, viewUpdate) => {updatedMD=value}}
          enablePreview={false}
          name="description"
        />
      </div>

  
      <div className='flex pt-10 items-center p-10'>
      <input 
        type="file" 
        accept='image/*' 
        name="image" 
        id="image" 
        className='block hover:file:bg-green-700 w-full text-sm file:mr-4 flie:py-2 file:px-4 file:rounded-lg file:bg-slate-700 file:border-0 file:text-white file:h-12' 
        required/>

      <button 
        type="submit" 
        className=' bg-green-500 my-2 ml-auto px-10 py-2 font-bold rounded-md h-12 w-56' 
        onClick={(e)=>{e.preventDefault(); handleClick(updatedMD)}}
      >Create Creation</button>
      
      </div>

      <input type="hidden" name="icon" id="" />
    </form>
    </>
  )
}