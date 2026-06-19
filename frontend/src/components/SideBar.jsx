import { Users } from "lucide-react";
import styled from "styled-components";
import { useChatStore } from "../store/useChatStore";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";

export default function SideBar() {
  const { getUsers, users, isUsersLoading, setSelected, selectedUser } =
    useChatStore();
  const [act, setact] = useState(false);
  const { onlineUser} = useAuthStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
  
    <div className="border-r border-sky-800 w-full sm:w-90  h-screen overflow-hidden flex flex-col [@media(max-width:820px)]:w-25">
      <Toaster position="top-center" />
      
      <header className="p-2 sm:p-4 border-b border-gray-200 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center ">
            <Users size={29} className="text-sky-600 [@media(max-width:820px)]:ml-4 animate-bounce " />
            <p className="text-xl sm:text-2xl font-semibold ml-2 hidden sm:block [@media(max-width:830px)]:hidden ">Contacts</p>
          </div>
        </div>
        
        <label className=" flex items-center mt-3 text-sm sm:text-base font-medium text-gray-700 cursor-pointer sm:hidden [@media(max-width:830px)]:hidden ">
          <input
            type="checkbox"
            className="mr-2 w-4 h-4 accent-sky-800 "
            onChange={(e) => setact(e.target.checked)}
          />
          <span >
            Online only <span className="text-xs text-gray-500">({onlineUser.length-1})</span>
          </span>
        </label>

        <label className="flex items-center mt-3 text-sm sm:text-base font-medium text-gray-700 cursor-pointer hidden sm:flex [@media(max-width:830px)]:hidden">
          <input
            type="checkbox"
            className="mr-2 w-4 h-4 accent-sky-800"
            onChange={(e) => setact(e.target.checked)}
          />
          <span>
            Show online only <span className="text-xs text-gray-500">({onlineUser.length-1} online)</span>
          </span>
        </label>
      </header>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {!isUsersLoading ? (
          <Card
            users={users}
            setSelected={setSelected}
            selectedUser={selectedUser}
            onlineUser={onlineUser}
            act={act}
          />
        ) : (
          <div className="flex justify-center items-center h-full">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
}

const Loader = () => {
  return (
    <div className="flex flex-row gap-2">
      <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-blue-700 animate-bounce" />
      <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.2s]" />
      <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.4s]" />
    </div>
  );
};

const Card = ({ users, setSelected, selectedUser, onlineUser, act }) => {
  const filteredUsers = act
    ? users.filter((user) => onlineUser.includes(user._id))
    : users;

  return (
    <StyledWrapper>
      <div className="card">
        <div className="user__container">
          {filteredUsers.map((user) => (
            <div
              key={user._id}
              className={`user  ${selectedUser === user._id ? "selected" : ""}`}
              onClick={() => setSelected(user._id)}
            >
              <img
                className="image "
                src={
                  user.profilepic ||
                  "https://static.vecteezy.com/system/resources/previews/020/987/083/non_2x/user-icon-fake-photo-sign-profile-button-simple-style-social-media-poster-background-symbol-user-brand-logo-design-element-user-t-shirt-printing-for-sticker-free-vector.jpg"
                }
                alt={user.fullname}
              />

              <div className="user__content  ">
                <div className="text  ">
                  <span className="name [@media(max-width:816px)]:hidden">{user.fullname}</span>
                  {onlineUser.includes(user._id) ? (
                    <p className="kk [@media(max-width:816px)]:hidden">online</p>
                  ) : (
                    <p className="kk [@media(max-width:816px)]:hidden">offline</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  /* FIX 5: Responsive adjustments for mobile images */
  .image {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    margin-right: 12px;
    object-fit: cover;
    border: 1px solid #e5e7eb;
  }

  @media (min-width: 640px) {
    .image {
      width: 50px;
      height: 50px;
      margin-right: 15px;
    }
  }

  .user {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 12px 16px;
    transition: background-color 0.2s;
    cursor: pointer;
    border-bottom: 1px solid #f3f4f6;
  }


  .user__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-grow: 1;
  }

  .user__container {
    display: flex;
    flex-direction: column;
  }

  .text {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .name {
    font-weight: 600;
    font-size: 0.95rem;
    color: #111827;
  }

  .kk {
    font-size: 0.75rem;
    color: #6b7280;
    text-transform: capitalize;
  }

  .selected {
    background-color: #e0f2fe; /* Light sky blue background */
    border-left: 4px solid #0284c7; /* Blue left border indicator */
  }
  
  /* Custom scrollbar for webkit browsers */
  .card::-webkit-scrollbar {
    width: 6px;
  }
  .card::-webkit-scrollbar-thumb {
    background-color: #cbd5e1;
    border-radius: 4px;
  }
`;