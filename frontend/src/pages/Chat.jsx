import { useEffect, useRef, useState } from "react";
import ChatFooter from "../components/ChatFooter";
import ChatHeader from "../components/ChatHeader";
import {  useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

export default function Chat() {
  const [userinfo, setuserinfo] = useState({});
  const [imageprev, setimageprev] = useState(null);
  const [text, settext] = useState("");
  const fileref = useRef(null);

  const { users, selectedUser, sendMessages,messages ,getMessages} = useChatStore();

  const {authUser} = useAuthStore();
  




  const handletext = (value) => {
    settext(value);
  };
  const handleImgprev = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const imagefile = new FileReader();

    imagefile.readAsDataURL(file);
    imagefile.onload = async () => {
      const baseImg = await imagefile.result;
      setimageprev(baseImg);
    };
  };
  const removeImg = () => {
    setimageprev(null);
    fileref.current.value = "";
  };

  const sub = async (e) => {
    e.preventDefault();
    //text, image
    try {
      await sendMessages({ text: text.trim(), image: imageprev });
      setimageprev(null);
      settext("");
      fileref.current.value = "";
    } catch (err) {
      console.log("err sorry: ", err);
    }
  };

  useEffect(() => {
    users.map((user) => user._id === selectedUser && setuserinfo(user));
  }, [selectedUser]);
  
  useEffect(() => {
    getMessages()
  }, [selectedUser,messages.length]);

  return (
    <div className="flex flex-col  h-full w-full justify-between">
      <ChatHeader userinfo={userinfo} />
      <div className=" w-full h-full overflow-y-auto ">
        <div className="flex flex-col h-115">
          <div
            className="flex-1 p-3 overflow-y-auto flex flex-col space-y-3"
            id="chatDisplay"
          >
            {
                messages.map((mssg,index)=> 
                 <div className={mssg.senderId !==authUser._id ? 'chat-message self-end  text-white max-w-xs rounded-lg px-1 py-1.5 text-sm' : "chat-message self-start  text-white max-w-xs rounded-lg px-1 py-1.5 text-sm"}><img src={mssg.image} />{mssg.text} </div>
            )
            }
          </div>
        </div>
      </div>
      <ChatFooter
        handletext={handletext}
        fileref={fileref}
        handleImgprev={handleImgprev}
        text={text}
        sub={sub}
        imageprev={imageprev}
        removeImg={removeImg}
      />
    </div>
  );
}
