import { Html, Head, Main, NextScript } from 'next/document'
import Link from 'next/link';
import { GiPlagueDoctorProfile } from "react-icons/gi";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <div id="g_id_onload"
          data-client_id="241050613763-tnnn25debunpshr0ebmo9ih27jglq2dc.apps.googleusercontent.com"
          data-context="use"
          data-ux_mode="popup"
          data-login_uri="/api/login"
          data-auto_select="true"
          data-close_on_tap_outside="false"
          data-itp_support="true"
          data-skip_prompt_cookie="credential">
        </div>

        <div className="fixed z-10 opacity-80 w-[100%] flex bg-gradient-to-r via-yellow-950 from-red-950 to-red-950 place-items-center justify-between">
          <div className="flex place-items-center p-1">
            <img src="/logo.png" className="w-10 m-1" />
            <a href="/" className="m-1 bg-gradient-to-r from-red-500 to-green-500 font-bold bg-clip-text text-transparent">MINECOM</a>
          </div>
          <div className="flex space-x-16 justify-evenly h-full">
            <Link text="Discover Servers" href="/servers" className='flex items-center h-full hover:underline hover:text-yellow-400'>Discover Servers</Link>
            <Link text="Discover Creations" href="/creations" className='flex items-center h-full hover:underline hover:text-yellow-400'>Discover Creations</Link>
          </div>
          <div className="flex w-[15%] justify-evenly">
          <div className="flex hover:underline hover:text-yellow-400">
            <Link text="Profile" href="/profile" className='flex items-center h-full text-xl'>Profile</Link>
            <GiPlagueDoctorProfile className='mx-2 flex items-center h-full' size={25}/>
          </div>
            {/* <div className="g_id_signin mr-8"
                data-type="standard"
                data-shape="pill"
                data-theme="filled_black"
                data-text="continue_with"
                data-size="large"
                data-logo_alignment="left">
            </div> */}
          </div>
        </div>
        <div className='h-14'></div>
        <Main />
        <NextScript />
        <script src="//accounts.google.com/gsi/client" async></script>
      </body>
    </Html>
  )
}
