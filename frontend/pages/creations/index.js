import React, { useState, useEffect, useRef} from 'react';
import { FaTimes, FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/router'

const defaultServers = [
  { id: 1, user: "Nalin Angrish", name: 'Nallu Iron Farm', image:'iron_farm.jpg', description:"Gaming is more fun when shared with friends! Forge new connections, exchange ideas, and build lasting friendships within our Minecraft community. You never know, your next in-game ally might be just a click away.", categories: ['Category 1', 'Category 2'] },
  { id: 2, user: "user", name: 'Bitcoin', image:'/serverImage/bitcoin.jpeg', description:"lorem ipsum dolor sit on my lap lorem ipsum dolor sit on my lap", categories: ['Category 1']},
  { id: 3, user: "user", name: 'trees', image:'https://avatars.githubusercontent.com/u/70213353', description:"lorem ipsum dolor sit on my lap lorem ipsum dolor sit on my lap", categories: ['Category 2']},
  { id: 4, user: "user", name: 'WTF?', image:'https://avatars.githubusercontent.com/u/70213353', description:"lorem ipsum dolor sit on my lap lorem ipsum dolor sit on my lap", categories: ['Category 2']},
  { id: 5, user: "user", name: 'Swag', image:'https://avatars.githubusercontent.com/u/70213353', description:"lorem ipsum dolor sit on my lap lorem ipsum dolor sit on my lap", categories: ['Category 2']},
  { id: 6, user: "user", name: 'lorem', image:'https://avatars.githubusercontent.com/u/70213353', description:"lorem ipsum dolor sit on my lap lorem ipsum dolor sit on my lap", categories: ['Category 2']},
  { id: 7, user: "user", name: 'ipsum', image:'https://avatars.githubusercontent.com/u/70213353', description:"lorem ipsum dolor sit on my lap lorem ipsum dolor sit on my lap", categories: ['Category 2']},
  // ...
]

export default function Creations(){
    const router = useRouter()

    const servers = defaultServers

    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredServers, setFilteredServers] = useState(servers);
    const categories = [...new Set(servers.map(server => server.categories))];
  
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

    // Add a function to select a server
    const handleServerClick = (server) => {
        console.log(server.id)
        router.push('creations/'+server.id)
    };

    // Add a clear filter function
    const clearSearchAndFilter = () => {
        setSearchTerm('');
        setSelectedCategory('');        //Here empty string represent 'All'
    };

    return (
        <main>
        {/* // Top header */}
        <h1 className="text-center font-bold text-green-700 text-7xl p-5">
            Minecom Creations
        </h1> 

        {/* Input Box and category selector*/}
        <div className='w-full flex justify-center items-center gap-10'>
            <input 
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
                        ServerName={server.name} 
                        ImageLink={server.image} 
                        Description={server.description}
                        Member={server.user}
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

const Server = ( {ServerName,  ImageLink, Description, Member, onClick} ) => {



    return (
    <div w-full h-full>
   
   {/* The server grid cards */}
    <div onClick={onClick} className="w-64 my-8 hover:translate-y-0.5 hover:shadow-md hover:shadow-black transition-all ease-linear bg-gray-800 rounded-lg group">
        <img src={ImageLink} alt="Server Icon" className="w-full h-32 rounded-t-lg object-cover" />
        
        <div className="w-full h-44 relative">
            <p className="text-xl font-bold px-8 py-4">{ServerName}</p>
            <p className="text-m px-8">{Description}</p>
            <div className="p-2 group-hover:flex group-hover:bg-gradient-to-b from-transparent to-gray-900 hidden absolute bottom-0 w-full">
                <p>Created by: <b>{Member}</b></p>
            </div>
        </div>
    </div>

    </div>

    )
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`${process.env.BACKEND}/server/get`)
  const servers = (await res.json())['servers']

  // Pass data to the page via props
  // console.log(servers)
  return { props: { servers } }
}