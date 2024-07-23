import React from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput.js";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { getAllMessageRoute, sendMessageRoute } from "../utils/APIRoutes.js";
const ChatContainer = ({ currentChat, currentUser, socket }) => {
  
  const [messages, setMessages] = useState();
  const [arrivalMessage, setArrivalMessage] = useState();
  const scrollRef = useRef();

  useEffect(() => {
    async function handleGetMessages() {
      const response = await axios.post(getAllMessageRoute, {
        from: currentUser._id,
        to: currentChat._id,
      });
      setMessages(response.data);
    }
    handleGetMessages();
  }, [currentChat, currentUser]);
  const handleSendMessage = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
    socket.current.emit("send-msg", {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, [socket]);
  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  return (
    <>
      {currentChat && (
        <Container>
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                  alt="avatar"
                />
              </div>
              <div className="username">
                <h3>{currentChat.userName}</h3>
              </div>
            </div>
          </div>
          <div className="chat-messages">
            {messages &&
              messages.map((mes) => {
                return (
                  <div ref={scrollRef} key={uuidv4}>
                    <div
                      className={`message ${
                        mes.fromSelf ? "sended" : "received"
                      }`}
                    >
                      <div className="content">
                        <p>{mes.message}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <ChatInput handleSendMessage={handleSendMessage} />
        </Container>
      )}
    </>
  );
};
const Container = styled.div`
  padding-top: 1rem;
  display: grid;
  grid-template-rows: 10% 78% 12%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and(max-width:1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    display: flex;
    padding: 1rem 2rem;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        border-radius: 1rem;
        font-size: 1.1rem;
        color: #d1d1d1;
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .received {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;
export default ChatContainer;
