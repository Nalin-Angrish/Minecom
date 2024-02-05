import React, { useState, useEffect, useRef} from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import dynamic from 'next/dynamic';
import { FaTimes, FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/router'
import '@uiw/react-markdown-editor/markdown-editor.css';
import Link from 'next/link';

export default function Discover({ servers }){
    const router = useRouter()

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

    // Add a function to select a server
    const handleServerClick = (server) => {
        router.push('servers/'+server.id)
    };

    // Add a clear filter function
    const clearSearchAndFilter = () => {
        textAreaFocusRef.current.focus();
        setSearchTerm('');
    };
    

    return (
        <main>
        {/* Top header */}
        <h1 className="text-center font-bold text-green-700 text-7xl p-5">
            Minecom
        </h1> 

        {/* Input Box and clear/search button */}
        <Link href='/servers/create' className='bg-green-500 p-2 rounded text-white mx-auto block w-min text-nowrap my-2 px-5 hover:bg-green-700 transition-all'>Create Server</Link>

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

            <div className="text-m px-8 h-[50%] overflow-hidden relative">
                <ReactMarkdown 
                    children={Description} 
                    className='Markdown'
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]} 
                />
                <div className='absolute left-0 bottom-0 w-full h-10 bg-gradient-to-t from-gray-800 to-transparent'></div>
              </div>

            <div className="font-thin text-gray-400 p-2 group-hover:flex group-hover:bg-gradient-to-b from-transparent to-gray-900 hidden absolute bottom-0 w-full">
                <p>{Ip}</p>
                <p className="text-right w-full">Max Players: {MaxPlayers}</p>
            </div>
        </div>
    </div>

    </div>

    )
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/server/get_all`)
  const servers = (await res.json())['servers']

  // Pass data to the page via props
  console.log(servers)
  return { props: { servers } }
}