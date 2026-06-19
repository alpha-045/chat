import { useEffect, useRef, useState } from "react";
import ChatFooter from "../components/ChatFooter";
import ChatHeader from "../components/ChatHeader";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import {Peer} from 'peerjs'
import { X } from "lucide-react";
import CallV from "./callV";

export default function Chat() {
  const [userinfo, setuserinfo] = useState({});
  const [imageprev, setimageprev] = useState(null);
  const [ved, setved] = useState(false);
  const [text, settext] = useState("");

  const fileref = useRef(null);
  const camera = useRef(null);
  const secondcamera = useRef(null);
  

  const {
    users,
    selectedUser,
    sendMessages,
    messages,
    getMessages,
    subs,
    unsub,
  } = useChatStore();

  const { authUser } = useAuthStore();

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
    getMessages();
    subs();

    return () => unsub();
  }, [selectedUser, messages.length]);

   const openvid = async () => {
    setved(true);
  };

 
  return (
    <div className="flex flex-col  h-full w-full justify-between">
      <ChatHeader userinfo={userinfo} />

      {!ved ? (
        <div className=" w-full h-full overflow-y-auto">
          <div className="flex flex-col h-115">
            <div
              className="flex-1 p-3 overflow-y-auto flex flex-col space-y-3"
              id="chatDisplay"
            >
              {messages.map((mssg, index) => (
                <div
                  className={
                    mssg.senderId !== authUser._id
                      ? "chat-message self-end  text-white max-w-xs rounded-lg px-1 py-1.5 text-sm"
                      : "chat-message self-start  text-white max-w-xs rounded-lg px-1 py-1.5 text-sm"
                  }
                >
                  <img src={mssg.image} />
                  {mssg.text}{" "}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (<CallV setved={setved} camera={camera} secondcamera={secondcamera}/>)}

      <ChatFooter
        handletext={handletext}
        fileref={fileref}
        handleImgprev={handleImgprev}
        text={text}
        sub={sub}
        imageprev={imageprev}
        removeImg={removeImg}
        openvid={openvid}
      />
    </div>
  );
}
