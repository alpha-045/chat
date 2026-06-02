import { Users } from "lucide-react";
import styled from "styled-components";
import { useChatStore } from "../store/useChatStore";
import {  useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";

export default function SideBar() {
  const { getUsers, users, isUsersLoading, setSelected, selectedUser } =
    useChatStore();
  const [act, setact] = useState(false);
  const { onlineUser } = useAuthStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <div className="border-r border-sky-800 w-xl h-132">
      <div>
        <Toaster />
      </div>
      <header className="p-2">
        <div className="flex">
          <Users size={29} />
          <p className="text-2xl font-semibold ml-1.5">Contacts</p>
        </div>
        <label className="ml-2 font-semibold">
          <input
            type="checkbox"
            className="mr-1 size-3"
            onChange={(e) => setact(e.target.checked)}
          />
          show online only <span>({onlineUser.length} online)</span>
        </label>
      </header>
      <div className="h-full overflow-y-auto">
        {!isUsersLoading ? (
          <Card
            users={users}
            setSelected={setSelected}
            selectedUser={selectedUser}
            onlineUser={onlineUser}
            act={act}
          />
        ) : (
          <div className="flex justify-center mt-50">
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
      <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]" />
      <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]" />
      <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]" />
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
              className={`user ${
                selectedUser === user._id ? "selected" : ""
              }`}
            >
              <img
                className="image"
                src={
                  user.profilepic ||
                  "https://static.vecteezy.com/system/resources/previews/020/987/083/non_2x/user-icon-fake-photo-sign-profile-button-simple-style-social-media-poster-background-symbol-user-brand-logo-design-element-user-t-shirt-printing-for-sticker-free-vector.jpg"
                }
                alt={user.fullname}
              />

              <button
                className="user__content"
                onClick={() => setSelected(user._id)}
              >
                <div className="text">
                  <span className="name">{user.fullname}</span>

                  {onlineUser.includes(user._id) ? (
                    <p className="kk">online</p>
                  ) : (
                    <p className="kk">offline</p>
                  )}
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </StyledWrapper>
  );
};
const StyledWrapper = styled.div`
  .card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .user {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px 15px;
    transition: background-color 0.2s;
    cursor: pointer;
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
  }

  .name {
    font-weight: 800;
    z-index: 10;
  }

  .kk {
    font-size: 0.9em;
    color: #64696e;
  }

  .image {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-right: 15px;
  }

  .selected {
    background-color: #b3b6b8;
  }
`;
