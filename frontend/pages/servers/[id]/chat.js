import React, { useState, useEffect } from 'react';
import Picker from 'emoji-picker-react';
import { parse } from 'cookie';

const InputComponent = ({ initialChat, id, myname }) => {
  let i = null;
  var [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState(initialChat);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  const handleSend = (event) => {
    // inputValue = inputValue.replace(/\n/g, '<br/>');
  
    let json_data = {
      "id": id,
      "message": inputValue,
      'credential': parse(document.cookie)['credential']
    }

    fetch(`${process.env.NEXT_PUBLIC_BACKEND}/chat/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(json_data)
    }).then(res => res.json()).then(data => {
      console.log(data);
    })
    setInputValue(''); // Clear the textarea
    document.getElementById("inputBox").value = '';
    console.log(items)
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && event.ctrlKey) {
      setInputValue(inputValue + '\n');
      document.getElementById("inputBox").value = inputValue + '\n';
    }
    else if (event.key === 'Enter') {
      event.preventDefault();
      handleSend(event);
    }
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const EmojiInputter = () => {
    const [chosenEmoji, setChosenEmoji] = useState(null);
    const [showPicker, setShowPicker] = useState(false);
  }
    const onEmojiClick = (event, emojiObject) => {
      setChosenEmoji(emojiObject);
      let initial = document.getElementById("inputBox").value;
      let emoji_code = emojiObject.target.src.split('/').pop().split('.')[0];
      let emoji = String.fromCodePoint(parseInt(emoji_code, 16));
      setInputValue(initial + emoji);
      document.getElementById("inputBox").value = initial + emoji;
      console.log(emoji);
    };

    useEffect(()=>{
      clearInterval(i)
      i = setInterval(()=>{
        fetch(`${process.env.NEXT_PUBLIC_BACKEND}/chat/get?id=${id}`).then(res => res.json()).then(data => {
          setItems(data['messages']);
        })
      }, 1000)
    }, [])

    return (
      <main>
        {/* For importing all chat bubbles */}
        <div className="flex flex-col items-center overflow-y-auto h-[80vh] w-[80vw] mx-auto p-5">
          {items.map(item => (
            <Bubble item={item} myname={myname}/>
          ))}
        </div>

        {/* For the emoji picker */}
        <div className='flex fixed inset-0-x bottom-[4rem] p-[4rem] z-10'>
          {showPicker && <Picker theme='dark' onEmojiClick={onEmojiClick} />}
        </div>

        <div className="flex fixed inset-x-0 bottom-5 bg-gray-950 text-white mx-auto w-[80vw] flex-row gap-2 rounded-[99px] border border-gray-900/10 bg-gray-900/5 p-4">
          <div className="flex">
            <button
              className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              onClick={() => setShowPicker(!showPicker)}>
              <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10.1824 10.1815L10.1825 10.1814C10.3031 10.0607 10.3989 9.9173 10.4641 9.75953C10.5294 9.60177 10.563 9.43269 10.5629 9.26194C10.5629 9.0912 10.5292 8.92215 10.4638 8.76443C10.3984 8.60671 10.3026 8.46342 10.1818 8.34273C10.061 8.22204 9.91767 8.12632 9.7599 8.06104L9.56872 8.52304L9.7599 8.06104C9.60213 7.99575 9.43305 7.96218 9.26231 7.96224C9.09158 7.9623 8.92252 7.99599 8.7648 8.06139L8.95631 8.52326L8.7648 8.06139C8.60716 8.12675 8.46393 8.22251 8.34328 8.3432C7.98697 8.69939 7.50379 8.89949 6.99998 8.89949C6.49616 8.89949 6.01298 8.69939 5.65668 8.3432C5.41295 8.0994 5.08237 7.96237 4.73763 7.96224C4.39281 7.96212 4.06206 8.09898 3.81815 8.34273C3.57423 8.58647 3.43714 8.91712 3.43701 9.26194C3.43689 9.60677 3.57376 9.93752 3.8175 10.1814L3.81758 10.1815C4.23545 10.5995 4.73158 10.9311 5.27763 11.1573C5.82367 11.3835 6.40893 11.5 6.99998 11.5C7.59102 11.5 8.17628 11.3835 8.72232 11.1573C9.26837 10.9311 9.7645 10.5995 10.1824 10.1815ZM11.1719 11.1719C10.0654 12.2784 8.56475 12.9 6.99998 12.9C5.4352 12.9 3.93451 12.2784 2.82805 11.1719C1.72158 10.0655 1.09998 8.56478 1.09998 7.00001C1.09998 5.43523 1.72158 3.93454 2.82805 2.82808C3.93451 1.72161 5.4352 1.10001 6.99998 1.10001C8.56475 1.10001 10.0654 1.72161 11.1719 2.82808C12.2784 3.93454 12.9 5.43523 12.9 7.00001C12.9 8.56478 12.2784 10.0655 11.1719 11.1719ZM4.59998 6.70001C4.94476 6.70001 5.27542 6.56304 5.51921 6.31924C5.76301 6.07545 5.89998 5.74479 5.89998 5.40001C5.89998 5.05522 5.76301 4.72456 5.51921 4.48077C5.27542 4.23697 4.94476 4.10001 4.59998 4.10001C4.25519 4.10001 3.92453 4.23697 3.68074 4.48077C3.43694 4.72456 3.29998 5.05522 3.29998 5.40001C3.29998 5.74479 3.43694 6.07545 3.68074 6.31924C3.92453 6.56304 4.25519 6.70001 4.59998 6.70001ZM10.3192 6.31924C10.563 6.07545 10.7 5.74479 10.7 5.40001C10.7 5.05522 10.563 4.72456 10.3192 4.48077C10.0754 4.23697 9.74476 4.10001 9.39997 4.10001C9.05519 4.10001 8.72453 4.23697 8.48074 4.48077C8.23694 4.72456 8.09998 5.05522 8.09998 5.40001C8.09998 5.74479 8.23694 6.07545 8.48074 6.31924C8.72453 6.56304 9.05519 6.70001 9.39997 6.70001C9.74476 6.70001 10.0754 6.56304 10.3192 6.31924Z"
                    fill="#90A4AE" stroke="#90A4AE"></path>
                </svg>
              </span>
            </button>
          </div>



          <div className="relative grid h-full w-full min-w-[200px]">
            <textarea
              id="inputBox"
              rows="1"
              placeholder="What is on your mind?"
              className="peer h-full  min-h-full w-full resize-none rounded-[7px]  !border-0 border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder:text-blue-gray-300 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-transparent focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            ></textarea>
            <label
              className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
          </div>

          <div>
            <button
              className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              onClick={handleSend}
            >
              <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12.9576 7.71521C13.0903 7.6487 13.2019 7.54658 13.2799 7.42027C13.3579 7.29396 13.3992 7.14845 13.3992 7.00001C13.3992 6.85157 13.3579 6.70606 13.2799 6.57975C13.2019 6.45344 13.0903 6.35132 12.9576 6.28481L1.75762 0.684812C1.61875 0.615327 1.46266 0.587759 1.30839 0.605473C1.15412 0.623186 1.00834 0.685413 0.888833 0.784565C0.769325 0.883716 0.681257 1.01551 0.635372 1.16385C0.589486 1.3122 0.587767 1.4707 0.630424 1.62001L1.77362 5.62001C1.82144 5.78719 1.92243 5.93424 2.06129 6.03889C2.20016 6.14355 2.36934 6.20011 2.54322 6.20001H6.20002C6.4122 6.20001 6.61568 6.2843 6.76571 6.43433C6.91574 6.58436 7.00002 6.78784 7.00002 7.00001C7.00002 7.21218 6.91574 7.41567 6.76571 7.5657C6.61568 7.71573 6.4122 7.80001 6.20002 7.80001H2.54322C2.36934 7.79991 2.20016 7.85647 2.06129 7.96113C1.92243 8.06578 1.82144 8.21283 1.77362 8.38001L0.631223 12.38C0.588482 12.5293 0.590098 12.6877 0.635876 12.8361C0.681652 12.9845 0.769612 13.1163 0.889027 13.2155C1.00844 13.3148 1.15415 13.3771 1.30838 13.3949C1.46262 13.4128 1.61871 13.3854 1.75762 13.316L12.9576 7.71601V7.71521Z"
                    fill="#90A4AE"></path>
                </svg>
              </span>
            </button>
          </div>
        </div>


      </main>
    )
  }

const Bubble = ({item, myname}) => {
  
  if (item.author == myname) {
    var color = "bg-blue-900";
    var alignment = "self-end";

  }
  else {
    var color = "bg-green-900";
    var alignment = "self-start";
  }

  return(
    <div className={`${alignment} flex flex-col max-w-96 p-2`}>
    {/* Author's name over bubble */}
    <p className={`${alignment} text-[0.7rem]`}>{item.author}</p>

    {/* Bubble */}
    <div className={`p-4 ${color} rounded-lg align`}>
      <p className="text-white break-words">
        {item.message.split('\n').map((i,key) => {
          return <>{i} <br/></>
        })}
      </p>
    </div>
    </div>
  )


}


export default InputComponent;

export async function getServerSideProps(context) {
  let id = context.params.id;  
   
  // Fetch data from external API

  
  let credential = parse(context.req.headers.cookie)['credential']
  // Fetch data from external API
  let res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/profile/get_current`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ credential }),
  })
  const myname = (await res.json())['data']['username']

  res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/chat/get?id=${id}`)
  const initialChat = (await res.json())['messages']
  
  return {props: { initialChat, id, myname }}
}