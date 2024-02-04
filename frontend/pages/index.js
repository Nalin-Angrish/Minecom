import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import '@uiw/react-markdown-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

export default function App(){
  return (
    <div>
      <div className="flex bg-yellow-950 place-items-center justify-between">
        <div className="flex place-items-center p-1">
          <img src="logo.png" className="w-10 m-1"></img>
          <a href="/" class="m-1 bg-gradient-to-r from-red-500 to-green-500 font-bold bg-clip-text text-transparent">MINECOM</a>
        </div>
        <div className="flex w-[50%] justify-evenly">
          <Link text="Discover" goto="/discover"/>
          <Link text="Projects" goto="/projects"/>
          <Link text="Creations" goto="/creations"/>
        </div>
        <div className="flex w-[15%] justify-evenly">
          <Link text="Login" goto="/login"/>
          <Link text="Signup" goto="/signup"/>
        </div>
      </div>
      <div className="h-[92vh] flex place-items-center">
        <div className='text-center px-32 flex flex-col justify-evenly place-items-center w-1/2 h-[100%]'>
          <p className=" text-6xl">M I N E C O M</p>
          <p>Welcome to <b>MINECOM</b>, the ultimate destination for Minecraft enthusiasts seeking like-minded players to embark on exciting adventures together! If you're passionate about crafting, building, and exploring the blocky world of Minecraft, you've come to the right place.</p>
        </div>
        <img src="minecraftgirls.jpeg" className="w-1/3 h-1/2"></img>
      </div>
      {/* <img src="wood.jpg" className="absolute w-[100%] h-[51%] -z-10 opacity-80 blur-[2px]"></img> */}
      {/* <div className="flex justify-center"> */}
      {/* <Box content="Want to showcase your minecraft creations and flex, or get ideas from others?" BTNtext="Look Creations"/>
      <Box content="Want people with similar minds like you to share experiences or hang out with?" BTNtext="Join Community"/>
      <img src="wood.jpg" className="absolute w-[100%] h-[51%] -z-10 opacity-80 blur-[2px]"></img>
      <Box content="Want to hop into other players servers by finding them or publish your own?" BTNtext="Look Servers"/>
      <Box content="Want to host your own minecraft Project or collaborate with others?" BTNtext="Find Projects"/> */}
      {/* </div> */}
      <Section add="flex-row-reverse bg-gradient-to-l from-blue-50 to-blue-950" heading="🎮 Find Your Minecraft Crew:" content="Are you tired of solo adventures in Minecraft? Connect with a vibrant community of players who share your passion. Whether you're into survival, creative mode, or unique modded experiences, our platform is the perfect hub to discover fellow gamers eager to team up and conquer the virtual realm together." image="1.jpg" grad_dir="img_right"/>
      <Section add="bg-gradient-to-r from-red-50 to-red-950" heading="🌐 Diverse Communities Await:" content="Explore various Minecraft communities tailored to different playstyles and interests. From hardcore survivalists to creative builders, we have a place for everyone. Browse through our diverse selection of groups and connect with players who match your gaming preferences." image="2.jpg" grad_dir="img_left"/>
      <Section add="flex-row-reverse bg-gradient-to-l from-yellow-50 to-yellow-950" heading="🤝 Make New Friends:" content="Gaming is more fun when shared with friends! Forge new connections, exchange ideas, and build lasting friendships within our Minecraft community. You never know, your next in-game ally might be just a click away." image="3.jpg" grad_dir="img_right"/>
      <Section add="bg-gradient-to-r from-red-50 to-red-950" heading="🏰 Showcase Your Creations:" content="Are you a master builder? Share your awe-inspiring creations with a community that appreciates the art of construction. Whether it's an elaborate castle, a bustling city, or a redstone masterpiece, get ready for your virtual architecture to be celebrated." image="4.jpg" grad_dir="img_left"/>
      <Section add="flex-row-reverse bg-gradient-to-l from-blue-50 to-blue-950" heading="🚀 Organize Events and Competitions:" content="Take your Minecraft experience to the next level by participating in or organizing events and competitions. From epic PvP battles to friendly build-offs, there's always something exciting happening in our community." image="5.jpg" grad_dir="img_right"/>
      <Section add="bg-gradient-to-r from-red-50 to-red-950" heading="🌍 Global Reach, Local Connections:" content="Connect with players from around the world or find fellow enthusiasts in your local area. Our platform facilitates both global and local connections, making it easy for you to build a community that suits your preferences." image="6.jpg" grad_dir="img_left"/>
      <Section add="flex-row-reverse bg-gradient-to-l from-blue-50 to-blue-950" heading="🛠️ Modded Madness:" content="If you love exploring Minecraft with mods, you're not alone! Join our modded Minecraft communities to share your favorite modpacks, discover new ones, and embark on thrilling adventures in custom-tailored game worlds." image="7.jpg" grad_dir="img_right"/>
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
    <div className={`text-black h-[70vh] flex place-items-center ${add}`}>
        
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