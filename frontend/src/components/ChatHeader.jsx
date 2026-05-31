import styled from "styled-components";

export default function ChatHeader({ userinfo }) {
  return (
    <StyledWrapper>
      <div className="user border-b-1 border-amber-50" >
        <img
          className="image"
          src={
            userinfo.profilepic ||
            "https://static.vecteezy.com/system/resources/previews/020/987/083/non_2x/user-icon-fake-photo-sign-profile-button-simple-style-social-media-poster-background-symbol-user-brand-logo-design-element-user-t-shirt-printing-for-sticker-free-vector.jpg"
          }
        />
        <button className="user__content">
          <div className="text">
            <span className="name">{userinfo.fullname}</span>
            <p className="kk">offline</p>
          </div>
        </button>
      </div>
    </StyledWrapper>
  );
}

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
