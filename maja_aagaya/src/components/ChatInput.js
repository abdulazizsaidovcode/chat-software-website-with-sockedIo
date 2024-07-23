import React, { useState } from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
const ChatInput = ({ handleSendMessage }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState();
  const handleEmjoiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };
  const handleEmojiClick = (emoji) => {
    let msg = message;
    msg += emoji.emoji;
    setMessage(msg);
  };
  const sendChat = (e) => {
    e.preventDefault();
    if (message.length > 0) {
      handleSendMessage(message);
      setMessage("");
    }
  };
  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmjoiPicker}></BsEmojiSmileFill>
          {showEmojiPicker && (
            <Picker
              onEmojiClick={handleEmojiClick}
              height="325px"
              width="250px"
            />
          )}
        </div>
      </div>
      <form
        className="input-container"
        onSubmit={(e) => {
          sendChat(e);
        }}
      >
        <input
          type="text"
          placeholder="type your message here"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 5% 95%;
  align-items: center;
  background-color: #080420;
  padding: 0 2rem;
  padding-bottom: 0.3rem;
  @media screen and (min-width: 720px) and(max-width:1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    margin-left: 1rem;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .EmojiPickerReact {
        position: absolute;
        top: -350px;
        background-color: #080420;
        box-shadow: 0 2px 2px #9a86f3;
        border-color: #9186f3;
        .epr-body::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9186f3;
          }
        }
        .epr-search-container {
          input {
            background-color: transparent;
            border-color: #9186f3;
          }
        }
        .epr-emoji-category-label {
          background-color: #080420;
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: #ffffff34;

    input {
      width: 90%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;
      &::selection {
        background-color: #9186f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      border-radius: 2rem;
      width: 5rem;
      padding: 0.3rem 1rem;
      background-color: transparent;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      border: none;
      @media screen and (min-width: 720px) and(max-width:1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
        transition: 0.3s ease-in-out;
        &:hover {
          transform: scale(1.1) translateX(5px);
        }
      }
    }
  }
`;
export default ChatInput;
