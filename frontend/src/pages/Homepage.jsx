import SideBar from "../components/SideBar";
import {  useChatStore } from "../store/useChatStore";
import Chat from "./Chat";
import Nochat from "./Nochat";

const Homepage = () => {
      const { selectedUser } = useChatStore();
    
  return (
    <div className="bg-sky-900 min-h-screen flex justify-center  p-10 ">
      <div className="flex border border-2 border-sky-800  w-full mt-15">
        <SideBar />
        {
            selectedUser ? <Chat /> :  <Nochat />
        }
      </div>
    </div>
  );
};

export default Homepage;
