import React, { useState, useEffect, useRef} from 'react';
import { FaTimes, FaSearch } from 'react-icons/fa';

const defaultServers = [
  { id: 1, name: 'Minecraft', image:'/serverImage/minecraft.png', description:"lorem ipsum dolor sit on my lap lorem ipsum dolor sit on my lap", ip:"192.168.0.1:5555", member:"1000/5000", categories: ['Category 1', 'Category 2'] },
  { id: 2, name: 'Bitcoin', image:'/serverImage/bitcoin.jpeg', description:"lorem ipsum dolor sit on my lap lorem ipsum dolor sit on my lap", categories: ['Category 1']},
  { id: 3, name: 'trees', image:'https://avatars.githubusercontent.com/u/70213353', description:"lorem ipsum dolor sit on my lap lorem ipsum dolor sit on my lap", categories: ['Category 2']},
  { id: 4, name: 'WTF?', image:'https://avatars.githubusercontent.com/u/70213353', description:"lorem ipsum dolor sit on my lap lorem ipsum dolor sit on my lap", categories: ['Category 2']},
  { id: 5, name: 'Swag', image:'https://avatars.githubusercontent.com/u/70213353', description:"lorem ipsum dolor sit on my lap lorem ipsum dolor sit on my lap", categories: ['Category 2']},
  { id: 6, name: 'lorem', image:'https://avatars.githubusercontent.com/u/70213353', description:"lorem ipsum dolor sit on my lap lorem ipsum dolor sit on my lap", categories: ['Category 2']},
  { id: 7, name: 'ipsum', image:'https://avatars.githubusercontent.com/u/70213353', description:"lorem ipsum dolor sit on my lap lorem ipsum dolor sit on my lap", categories: ['Category 2']},
  // ...
]

export default function Discover({ servers }){
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredServers, setFilteredServers] = useState(servers);
    const categories = [...new Set(servers.map(server => server.categories))];
    
    const textAreaFocusRef = useRef(null);
  
    // Get the search + text
    useEffect(() => {
      let filtered = servers;
  
      if (selectedCategory) {
        filtered = filtered.filter(server => server.categories.includes(selectedCategory));
      }
  
      if (searchTerm) {
        filtered = filtered.filter(server => 
          server.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          server.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
  
      setFilteredServers(filtered);
    }, [selectedCategory, searchTerm]);
  
    const handleCategoryChange = (event) => {
      setSelectedCategory(event.target.value);
    };
  
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
        setSelectedCategory('');        //Here empty string represent 'All'
    };
    
    // Add a function to close the popup
    const closePopup = () => {
        setSelectedServer(null);
    };
    

    return (
        <main>
        {/* // Top header */}
        <h1 className="text-center font-bold text-green-700 text-7xl p-5">
            Minecom
        </h1> 

        {/* Input Box and category selector and clear/search button */}
        <div className='w-full flex justify-center items-center gap-10'>
            <input 
                ref={textAreaFocusRef}
                type="text" 
                value={searchTerm} 
                onChange={handleSearchChange} 
                className='p-4 h-12 bg-gray-800 peer text-white rounded-lg w-96 placeholder:italic border-b-2 focus:outline-none' placeholder='Search to oblivion...'
                /> 

            <select className='h-12 bg-gray-800 dropdown border-b-2 p-2 rounded-lg' value={selectedCategory} onChange={handleCategoryChange} >
              <option value="">All</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <button className='w-10 h-10' onClick={clearSearchAndFilter}>
                {(searchTerm || selectedCategory !== '') ? <FaTimes /> : <FaSearch />}
            </button>
        </div>

        <br/>



        {filteredServers.length > 0 ? (
            <div className="flex grid grid-cols-5 gap-0 p-0 mx-auto justify-center place-items-center">
                {filteredServers.map(server => (
                    <Server 
                        Key={server.id} 
                        ServerName={server.name} 
                        ImageLink={server.image} 
                        Description={server.description} 
                        Ip={server.ip} 
                        Member={server.member}
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
                    Member={selectedServer.member} 
                    onClose={closePopup}
                    isOpen={selectedServer !== null}
                />
            )}

        
        </main>
    )
};

const Server = ( {Key, ServerName,  ImageLink, Description, Ip, Member, onClick} ) => {



    return (
    <div w-full h-full>
   
   {/* The server grid cards */}
    <div onClick={onClick} className="w-64 my-8 hover:translate-y-0.5 hover:shadow-md hover:shadow-black transition-all ease-linear bg-gray-800 rounded-lg group">
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

    </div>

    )
}


const ServerPopup = ({ ServerName, ImageLink, Description, Ip, Member, onClose, isOpen }) => {
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
                <p><strong>Server Member:</strong> {Member}</p>
                <button onClick={onClose} className="bg-red-500 p-2 rounded text-white">Close</button>
            </div>
            </div>
        </div>
        </>
    );
            }

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`${process.env.BACKEND}/server/get`)
  const servers = (await res.json())['servers']

  // Pass data to the page via props
  // console.log(servers)
  return { props: { servers } }
}