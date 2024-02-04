import React, { useState, useEffect, useRef} from 'react';
import { FaTimes, FaSearch } from 'react-icons/fa';
import Link from 'next/link';

export default function Discover({ servers }){
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredServers, setFilteredServers] = useState(servers);
    
    const textAreaFocusRef = useRef(null);
  
    // Get the search + text
    useEffect(() => {
      let filtered = servers;
  
      if (searchTerm) {
        filtered = filtered.filter(server => 
          server.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          server.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
  
      setFilteredServers(filtered);
    }, [searchTerm]);
  
    const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
    };

    // Add state for the currently selected server
    const [selectedServer, setSelectedServer] = useState(null);

    // Add a function to select a server
    const handleServerClick = (server) => {
        setSelectedServer(server);
    };

    // Add a clear filter function
    const clearSearchAndFilter = () => {
        textAreaFocusRef.current.focus();
        setSearchTerm('');
    };
    
    // Add a function to close the popup
    const closePopup = () => {
        setSelectedServer(null);
    };
    

    return (
        <main>
        {/* Top header */}
        <h1 className="text-center font-bold text-green-700 text-7xl p-5">
            Minecom
        </h1> 

        {/* Input Box and clear/search button */}
        <Link href='/server/create' className='bg-green-500 p-2 rounded text-white mx-auto block w-min text-nowrap my-2 px-5 hover:bg-green-700 transition-all'>Create Server</Link>

        {/* Input Box selector*/}
        <div className='w-full flex justify-center items-center gap-10'>
            <input 
                ref={textAreaFocusRef}
                type="text" 
                value={searchTerm} 
                onChange={handleSearchChange} 
                className='p-4 h-12 bg-gray-800 peer text-white rounded-lg w-96 placeholder:italic border-b-2 focus:outline-none' placeholder='Search to oblivion...'
                /> 

            <button className='w-10 h-10' onClick={clearSearchAndFilter}>
                {(searchTerm) ? <FaTimes /> : <FaSearch />}
            </button>
        </div>

        <br/>



        {filteredServers.length > 0 ? (
            <div className="grid grid-cols-5 gap-0 p-0 mx-auto justify-center place-items-center">
                {filteredServers.map(server => (
                    <Server 
                        Key={server.id} 
                        ServerName={server.name} 
                        ImageLink={server.image} 
                        Description={server.description} 
                        Ip={server.ip} 
                        MaxPlayers={server.max_players}
                        onClick={() => handleServerClick(server)}
                    />
                ))}
            </div>
        ) : (
            <p className='text-center text-5xl italic my-14'>No servers found</p>
        )}
            {/* Render the popup */}
            {selectedServer && (
                <ServerPopup 
                    ServerName={selectedServer.name} 
                    ImageLink={selectedServer.image} 
                    Description={selectedServer.description} 
                    Ip={selectedServer.ip} 
                    MaxPlayers={selectedServer.max_players} 
                    onClose={closePopup}
                    isOpen={selectedServer !== null}
                />
            )}

        
        </main>
    )
};

const Server = ( {Key, ServerName,  ImageLink, Description, Ip, MaxPlayers, onClick} ) => {



    return (
    <div w-full h-full>
   
   {/* The server grid cards */}
    <div onClick={onClick} className="w-64 my-8 hover:translate-y-0.5 hover:shadow-md hover:shadow-black transition-all ease-linear bg-gray-800 rounded-lg group">
        <img src={ImageLink || 'https://via.placeholder.com/250x150'} alt="Server Icon" className="w-full h-32 rounded-t-lg object-cover" />
        
        <div className="w-full h-44 relative">
            <p className="text-xl font-bold px-8 py-4">{ServerName}</p>
            <p className="text-m px-8 h-full overflow-hidden">{Description}</p>
            <div className="font-thin text-gray-400 p-2 group-hover:flex group-hover:bg-gradient-to-b from-transparent to-gray-900 hidden absolute bottom-0 w-full">
                <p>{Ip}</p>
                <p className="text-right w-full">Max Players: {MaxPlayers}</p>
            </div>
        </div>
    </div>

    </div>

    )
}


const ServerPopup = ({ ServerName, ImageLink, Description, Ip, MaxPlayers, onClose, isOpen }) => {
    if (!isOpen) {
        return null;
    }


    // Stops closing if clicked on popup
    const stopPropagation = (event) => {
        event.stopPropagation();
    };

    return (
        <>
        <div onClick={onClose} className="fixed z-10 top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-200 ease-in-out">
            <div onClick={stopPropagation} className="relative w-96 h-64 bg-gray-800 p-4 rounded-lg flex flex-col items-center justify-center bounce-open">
            <div className='absolute inset-0 z-0 rounded-lg' style={{ 
                backgroundImage: `url(${ImageLink})`, 
                backgroundSize: 'auto', 
                backgroundPosition: 'center', 
                filter: 'brightness(0.5) blur(2px)'}}
            ></div>
            {/* Content of bg */}
            <div className='z-10 flex flex-col items-center justify-center'>
                <p className="text-center font-bold text-xl">{ServerName}</p>
                <p><strong>Server Description:</strong> {Description}</p>
                <p><strong>Server Ip:</strong> {Ip}</p>
                <p><strong>Max Players:</strong> {MaxPlayers}</p>
                <button onClick={onClose} className="bg-red-500 p-2 rounded text-white">Close</button>
            </div>
            </div>
        </div>
        </>
    );
            }

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/server/get_all`)
  const servers = (await res.json())['servers']

  // Pass data to the page via props
  console.log(servers)
  return { props: { servers } }
}