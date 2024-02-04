import React, { useState } from 'react';

const initialServers = [
    { id: 1, title: 'Minecraft', image:'/serverImage/minecraft.png', description:"lorem ipsum dolor sit on my lap lorem ipsum dolor sit on my lap", ip:"192.168.0.1:5555", member:"1000/5000" },
    { id: 2, title: 'Bitcoin', image:'/serverImage/bitcoin.jpeg', description:"lorem ipsum dolor sit on my lap lorem ipsum dolor sit on my lap"},
    { id: 3, title: 'trees', image:'https://avatars.githubusercontent.com/u/70213353', description:"lorem ipsum dolor sit on my lap lorem ipsum dolor sit on my lap"},
    { id: 4, title: 'WTF?', image:'https://avatars.githubusercontent.com/u/70213353', description:"lorem ipsum dolor sit on my lap lorem ipsum dolor sit on my lap"},
    { id: 5, title: 'Swag', image:'https://avatars.githubusercontent.com/u/70213353', description:"lorem ipsum dolor sit on my lap lorem ipsum dolor sit on my lap"},
    { id: 6, title: 'lorem', image:'https://avatars.githubusercontent.com/u/70213353', description:"lorem ipsum dolor sit on my lap lorem ipsum dolor sit on my lap"},
    { id: 7, title: 'ipsum', image:'https://avatars.githubusercontent.com/u/70213353', description:"lorem ipsum dolor sit on my lap lorem ipsum dolor sit on my lap"},
    // ...
  ];

export default function Discover(){
    const [search, setSearch] = useState('');
    const [servers, setServers] = useState(initialServers);

    const handleSearchChange = (event) => {
        setSearch(event.target.value);

        // Filter the servers based on the search query
        const filteredServers = initialServers.filter((server) =>
        server.title.toLowerCase().includes(event.target.value.toLowerCase())
        );

        setServers(filteredServers);
    };

    return (
        <main>
        <h1 className="text-center font-bold text-green-700 text-7xl p-5">
            Minecom
        </h1> 
        <div className='w-full flex justify-center items-center'>
            <input type="text" value={search} onChange={handleSearchChange} className='p-4 h-12 bg-transparent peer text-white rounded-lg w-96 placeholder:italic border-b-2 focus:outline-none' placeholder='Search to oblivion...'/> 
        </div>
        
        <div className="flex grid grid-cols-5 mx-auto justify-center place-items-center">
            {servers.map((server) => (
                <Server Key={server.id} ServerName={server.title} ImageLink={server.image} Description={server.description} Ip={server.ip} Member={server.member} />
            ))}
        </div>
        </main>
    )
};

const Server = ( {Key, ServerName,  ImageLink, Description, Ip, Member} ) => {

    const [showPopup, setShowPopup] = useState(false);
    const handleClick = () => {
        setShowPopup(!showPopup);
    };

    return (
    <div w-full h-full>
   
    <div onClick={handleClick} className="w-64 my-8 hover:translate-y-0.5 hover:shadow-md hover:shadow-black transition-all ease-linear bg-gray-800 rounded-lg group">
        <img src={ImageLink} alt="Server Icon" className="w-full h-32 rounded-t-lg object-cover" />
        
        <div className="w-full h-44 relative">
            <p className="text-xl font-bold px-8 py-4">{ServerName}</p>
            <p className="text-m px-8">{Description}</p>
            <div className="p-2 group-hover:flex group-hover:bg-gradient-to-b from-transparent to-gray-900 hidden absolute bottom-0 w-full">
                <p>{Ip}</p>
                <p className="text-right w-full">{Member}</p>
            </div>
        </div>
    </div>

    <div 
        className={`fixed z-10 top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-200 ease-in-out ${
            showPopup ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
    >

        <div 
            className={`relative w-96 h-64 bg-gray-800 p-4 rounded-lg flex flex-col items-center justify-center ${
            showPopup ? 'bounce-open' : 'opacity-0 pointer-events-none bounce-close'
        }`}>
            <div className='absolute inset-0 z-0 rounded-lg' style={{ 
                backgroundImage: `url(${ImageLink})`, 
                backgroundSize: 'auto', 
                backgroundPosition: 'center', 
                filter: 'brightness(0.5) blur(2px)'}}
            ></div>
            <div className='z-10 flex flex-col items-center justify-center'>
                <p className="text-center font-bold text-xl">{ServerName}</p>
                <p><strong>Server Description:</strong> {Description}</p>
                <p><strong>Server Ip:</strong> {Ip}</p>
                <p><strong>Server Member:</strong> {Member}</p>
                <button onClick={handleClick} className="bg-red-500 p-2 rounded text-white">Close</button>
            </div>
        </div>
    </div>

    </div>

    )
}