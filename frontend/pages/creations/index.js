import React, { useState, useEffect, useRef} from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import dynamic from 'next/dynamic';
import { FaTimes, FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/router'
import '@uiw/react-markdown-editor/markdown-editor.css';
import Link from 'next/link';

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

export default function Creations({creations}){
    const router = useRouter()

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCreations, setFilteredCreations] = useState(creations);
  
    // Get the search + text
    useEffect(() => {
      let filtered = creations;
  
      if (searchTerm) {
        filtered = filtered.filter(creation => 
          creation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          creation.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
  
      setFilteredCreations(filtered);
    }, [searchTerm]);
  
    const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
    };

    // Add a function to select a creation
    const handleCreationClick = (creation) => {
        router.push('creations/'+creation.id)
    };

    // Add a clear filter function
    const clearSearch = () => {
        setSearchTerm('');      //Here empty string represent 'All'
    };

    return (
        <main>
        {/* // Top header */}
        <h1 className="text-center font-bold text-green-700 text-7xl p-5">
            Minecom Creations
        </h1> 

        <div className='mx-auto justify-center items-center flex gap-5 p-5'>
          <Link href='/creations/create' className='bg-green-500 mx-auto rounded-lg w-44 h-12 text-xl font-bold text-center grid place-content-center'>Add creation</Link>
        </div>
        {/* Input Box*/}
        <div className='w-full flex justify-center items-center gap-10'>
            <input 
                type="text" 
                value={searchTerm} 
                onChange={handleSearchChange} 
                className='p-4 h-12 bg-gray-800 peer text-white rounded-lg w-96 placeholder:italic border-b-2 focus:outline-none' placeholder='Search to oblivion...'
                /> 

            <button className='w-10 h-10' onClick={clearSearch}>
                {(searchTerm) ? <FaTimes /> : <FaSearch />}
            </button>
        </div>

        <br/>



        {filteredCreations.length > 0 ? (
            <div className="grid grid-cols-5 gap-0 p-0 mx-auto justify-center place-items-center">
                {filteredCreations.map(creation => (
                    <Creation 
                        CreationName={creation.name} 
                        ImageLink={creation.image} 
                        Description={creation.description}
                        Member={creation.author.username}
                        onClick={() => handleCreationClick(creation)}
                    />
                ))}
            </div>
        ) : (
            <p className='text-center text-5xl italic my-14'>No creations found</p>
        )}        
        </main>
    )
};

const Creation = ( {CreationName,  ImageLink, Description, Member, onClick} ) => {



    return (
    <div w-full h-full>
   
   {/* The creation grid cards */}
   <div onClick={onClick} className="w-64 my-8 hover:translate-y-0.5 hover:shadow-md hover:shadow-black transition-all ease-linear bg-gray-800 rounded-lg group">
        <img src={ImageLink || 'https://via.placeholder.com/250x150'} alt="Creation Icon" className="w-full h-32 rounded-t-lg object-cover" />
        
        <div className="w-full h-44 relative">
            <p className="text-xl font-bold px-8 py-4">{CreationName}</p>
            <div className="text-m px-8 h-[50%] overflow-hidden relative">
                <ReactMarkdown 
                    children={Description} 
                    className='Markdown'
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]} 
                />
                <div className='absolute left-0 bottom-0 w-full h-10 bg-gradient-to-t from-gray-800 to-transparent'></div>
            </div>
            <div className="font-thin text-gray-400 p-2 group-hover:flex group-hover:bg-gradient-to-b from-transparent to-gray-900 hidden absolute bottom-0 w-full rounded-lg">
                <p>Created By: </p>
                <p className="text-right">{Member}</p>
            </div>
        </div>
    </div>
    </div>

    )
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/creation/get_all`)
  const creations = (await res.json())['creations']

  // Pass data to the page via props
  // console.log(creations)
  return { props: { creations } }
}