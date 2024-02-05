import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import '@uiw/react-markdown-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

export default function App(){
  return (
    <div className="main_bg">
      <div className="h-[100vh] flex place-items-center">
        <div className='text-center px-32 flex flex-col justify-evenly place-items-center w-1/2 h-[100%]'>
          <p className="text-6xl whitespace-nowrap">M I N E C O M</p>
          <p>Welcome to <b>MINECOM</b>, the ultimate destination for Minecraft enthusiasts seeking like-minded players to embark on exciting adventures together! If you're passionate about crafting, building, and exploring the blocky world of Minecraft, you've come to the right place.</p>
        </div>
        <img src="minecraftgirls.jpeg" className="w-1/3 h-1/2"></img>
      </div>
      <Section add="flex-row-reverse bg-gradient-to-l from-blue-950 to-blue-400" heading="🎮 Find Your Minecraft Crew:" content="Are you tired of solo adventures in Minecraft? Connect with a vibrant community of players who share your passion. Whether you're into survival, creative mode, or unique modded experiences, our platform is the perfect hub to discover fellow gamers eager to team up and conquer the virtual realm together." image="1.jpg" grad_dir="img_right"/>
      <Section add="bg-gradient-to-r from-green-950 to-green-400" heading="🌐 Diverse Communities Await:" content="Explore various Minecraft communities tailored to different playstyles and interests. From hardcore survivalists to creative builders, we have a place for everyone. Browse through our diverse selection of groups and connect with players who match your gaming preferences." image="2.jpg" grad_dir="img_left"/>
      <Section add="flex-row-reverse bg-gradient-to-l from-red-950 to-red-400" heading="🤝 Make New Friends:" content="Gaming is more fun when shared with friends! Forge new connections, exchange ideas, and build lasting friendships within our Minecraft community. You never know, your next in-game ally might be just a click away." image="3.jpg" grad_dir="img_right"/>
      <Section add="bg-gradient-to-r from-slate-950 to-slate-400" heading="🏰 Showcase Your Creations:" content="Are you a master builder? Share your awe-inspiring creations with a community that appreciates the art of construction. Whether it's an elaborate castle, a bustling city, or a redstone masterpiece, get ready for your virtual architecture to be celebrated." image="4.jpg" grad_dir="img_left"/>
      <Section add="flex-row-reverse bg-gradient-to-l from-pink-950 to-pink-400" heading="🚀 Organize Events and Competitions:" content="Take your Minecraft experience to the next level by participating in or organizing events and competitions. From epic PvP battles to friendly build-offs, there's always something exciting happening in our community." image="5.jpg" grad_dir="img_right"/>
      <Section add="bg-gradient-to-r from-yellow-950 to-yellow-400" heading="🌍 Global Reach, Local Connections:" content="Connect with players from around the world or find fellow enthusiasts in your local area. Our platform facilitates both global and local connections, making it easy for you to build a community that suits your preferences." image="6.jpg" grad_dir="img_left"/>
      <Section add="flex-row-reverse bg-gradient-to-l from-cyan-950 to-cyan-400" heading="🛠️ Modded Madness:" content="If you love exploring Minecraft with mods, you're not alone! Join our modded Minecraft communities to share your favorite modpacks, discover new ones, and embark on thrilling adventures in custom-tailored game worlds." image="7.jpg" grad_dir="img_right"/>
    </div>
  )
}

const MarkdownEditor = dynamic(
  () => import("@uiw/react-markdown-editor").then((mod) => mod.default),
  { ssr: false }
);

const Box = ({content,BTNtext}) => {
  return (
    <div className="opacity-85 hover:opacity-100 hover:scale-105  duration-300 flex flex-col justify-evenly mt-10 px-10 w-[15%] h-[40vh] rounded-xl bg-gradient-to-b from-yellow-400 to-yellow-50 text-black shadow-sm shadow-yellow-50">
      <img src="photo.jpg"></img>
      <p className="text-center">
        {content}
      </p>
      <button className="py-1 text-sm  border-yellow-950 bg-gradient-to-r duration-300 via-yellow-400 from-yellow-600 to-yellow-950 hover:bg-gradient-to-t hover:transition-all rounded-xl shadow-md shadow-black font-bold">
        {BTNtext}
      </button>
    </div>
  )
}

const Section = ({add, heading, content, image, grad_dir}) => {
  return (
    <div className={`h-[70vh] flex place-items-center ${add}`}>
        
        <div className='text-center px-32 flex flex-col justify-evenly place-items-center w-1/2 h-[100%]'>
        <p className=" text-6xl">{heading}</p>
        <p>{content}</p>
        </div>
        <img className={`h-[70vh] w-[50%] ${grad_dir}`} src={image}></img>

    </div>
  )
}

const Link = ({text, goto}) =>{
  return (
    <a href={goto} className="hover:text-yellow-400 hover:underline">{text}</a>
  )
}