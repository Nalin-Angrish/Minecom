import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Link from 'next/link';
import { FaPencilAlt } from 'react-icons/fa';

const Servers = [
    { id: 1, name: 'Minecraft', image:'/serverImage/minecraft.png', description:"lorem ipsum dolor sit on my lap lorem ipsum dolor sit on my lap", ip:"192.168.0.1:5555", member:"1000/5000" },
    { id: 2, name: 'Bitcoin', image:'/serverImage/bitcoin.jpeg', description:"lorem ipsum dolor sit on my lap lorem ipsum dolor sit on my lap"},
    { id: 3, name: 'trees', image:'https://avatars.githubusercontent.com/u/70213353', description:"lorem ipsum dolor sit on my lap lorem ipsum dolor sit on my lap"},
    { id: 4, name: 'WTF?', image:'https://avatars.githubusercontent.com/u/70213353', description:"lorem ipsum dolor sit on my lap lorem ipsum dolor sit on my lap"},
]
const Creations = [ 
    { id: 1, name: 'Swag', image:'https://avatars.githubusercontent.com/u/70213353', description:"lorem ipsum dolor sit on my lap lorem ipsum dolor sit on my lap"},
    { id: 2, name: 'lorem', image:'https://avatars.githubusercontent.com/u/70213353', description:"lorem ipsum dolor sit on my lap lorem ipsum dolor sit on my lap"},
    { id: 3, name: 'ipsum', image:'https://avatars.githubusercontent.com/u/70213353', description:"lorem ipsum dolor sit on my lap lorem ipsum dolor sit on my lap"},
    // ...
  ]
const User = {name: "triman", username: "triman", image: "https://avatars.githubusercontent.com/u/70213353", description: "# lorem \n ipsum <u>dolor</u> ~~sit~~ on my lap lorem ipsum dolor sit on my lap", email:"trimantuteja@gmail.com"}


export default function Profile(){
    return(
    <main className=' overflow-y-auto'>

    <div className="flex flex-col items-center justify-center w-full h-full">
        {/* Blue Top */}
        <div className="bg-blue-500 h-[30vh] w-full absolute top-0"></div>

        {/* Edit Button */}
        <Link href='/profile/edit' className='absolute z-[1] top-5 right-5 bg-gray-900 rounded-lg h-12 w-12 place-items-center grid'><FaPencilAlt /></Link>

        {/* Profile Picture */}
        <div className="pt-[8vh] relative">
            <img src={User.image} className="rounded-full h-[40vh] z-[1]" alt="Profile Picture" />
        </div>

        {/* Profile Info */}
        <div className="flex flex-col items-center justify-center w-full h-full">
            <h1 className="text-3xl font-bold">{User.name}</h1>
            <p className="text-lg font-light">@ {User.username}</p>
        </div>

        {/* Profile Description */}
        <div className="flex flex-col items-center justify-center w-full h-full">
            <ReactMarkdown 
                children={User.description} 
                className='Markdown'
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]} 
            />
        </div>
    </div>
    
    {/* Servers */}
    <div className="flex flex-col pl-7 items-start justify-left w-full h-full">
        <h1 className="text-3xl font-bold">Servers</h1>
    </div>
    <div className="grid grid-cols-5 gap-0 p-0 mx-auto justify-center place-items-center">
        {Servers.map(Servers => (
            <ServerComponent
                Key={Servers.id} 
                ServerName={Servers.name} 
                ImageLink={Servers.image} 
                Description={Servers.description} 
                Ip={Servers.ip} 
                MaxPlayers={Servers.max_players}
            />
        ))}
    </div>

    <div className="flex flex-col pl-7 items-start justify-left w-full h-full">
        <h1 className="text-3xl font-bold">Creations</h1>
    </div>
    <div className="grid grid-cols-5 gap-0 p-0 mx-auto justify-center place-items-center">
        {Creations.map(Creations => (
            <ServerComponent
                Key={Creations.id} 
                ServerName={Creations.name} 
                ImageLink={Creations.image} 
                Description={Creations.description} 
                Ip={Creations.ip} 
                MaxPlayers={Creations.max_players}
            />
        ))}
    </div>

    </main>
    )
}

const ServerComponent = ( {Key, ServerName,  ImageLink, Description, Ip, MaxPlayers, onClick} ) => {

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
