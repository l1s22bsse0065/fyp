import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { FaBars, FaArrowLeft, FaSmile, FaPaperclip, FaPaperPlane } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "../../styles/chatbot.module.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [recentChats, setRecentChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [showRecent, setShowRecent] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const chatEndRef = useRef(null);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load chats from localStorage on first render
  useEffect(() => {
    const storedChats = localStorage.getItem("recentChats");
    if (storedChats) setRecentChats(JSON.parse(storedChats));
  }, []);

  // Save chats whenever updated
  useEffect(() => {
    localStorage.setItem("recentChats", JSON.stringify(recentChats));
  }, [recentChats]);

  // Get first user message to use as chat title
  const getChatTitle = (msgs) => {
    const firstUserMsg = msgs.find((m) => m.sender === "user");
    return firstUserMsg ? firstUserMsg.text.slice(0, 20) + "..." : "Untitled Chat";
  };

  // Handle sending messages
  const handleSendMessage = () => {
    if (!input.trim()) return;

    const newMessage = { sender: "user", text: input.trim() };
    setMessages((prev) => [...prev, newMessage]);

    // Simulate bot reply
    setTimeout(() => {
      const botReply = { sender: "bot", text: "Demo response here." };
      setMessages((prev) => [...prev, botReply]);
    }, 800);

    setInput("");
  };

  // Handle starting a new chat
  const handleNewChat = () => {
    if (messages.length > 0) {
      const newChat = {
        id: Date.now(),
        title: getChatTitle(messages),
        history: messages,
      };
      setRecentChats((prev) => [newChat, ...prev]);
    }
    setMessages([]);
    setActiveChatId(null);
  };

  // Handle loading chat from sidebar
  const handleLoadChat = (chat) => {
    setMessages(chat.history);
    setActiveChatId(chat.id);
  };

  return (
    <Container fluid className={styles.chatPage}>
      <section className="p-0">
        <Row className="g-0">

          {/* Sidebar */}
          <Col
            xs={sidebarOpen ? 3 : 1}
            md={sidebarOpen ? 2 : 1}
            className={`${styles.sidebar} ${sidebarOpen ? styles.open : styles.closed}`}
          >
            {/* Sidebar toggle button */}
            <div onClick={() => setSidebarOpen(!sidebarOpen)}>
              <FaBars size={20} className={styles.icon} />
            </div>

            <div className={styles.sidebarTop}>
              {sidebarOpen && (
                <>
                  <button className={styles.chatButton} onClick={handleNewChat}>
                    + New Chat
                  </button>
                  <button
                    className={styles.chatButton}
                    onClick={() => setShowRecent(!showRecent)}
                  >
                    Recent Chats {showRecent ? "▲" : "▼"}
                  </button>

                  {showRecent && (
                    <div className={styles.recentChats}>
                      {recentChats.length === 0 ? (
                        <p className={styles.emptyRecent}>No recent chats yet</p>
                      ) : (
                        recentChats.map((chat) => (
                          <button
                            key={chat.id}
                            className={`${styles.chatButton} ${
                              activeChatId === chat.id ? styles.activeChat : ""
                            }`}
                            onClick={() => handleLoadChat(chat)}
                          >
                            {chat.title}
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* User card */}
            <div className={styles.userCard}>
              <img src="/user.jpg" alt="user" className={styles.userImage} />
              {sidebarOpen && (
                <span>
                  Welcome back,<br />
                  <b>Abran</b>
                </span>
              )}
            </div>
          </Col>

          {/* Chat Section */}
          <Col
            xs={sidebarOpen ? 9 : 11}
            md={sidebarOpen ? 10 : 11}
            className={styles.chatSection}
          >
            <Link to="/home" className={styles.backButton}>
              <FaArrowLeft /> BACK TO HOME
            </Link>

            {/* Chat Messages */}
            <div className={styles.chatBody}>
              {messages.length === 0 ? (
                <p className={styles.emptyChat}>Start a new conversation...</p>
              ) : (
                messages.map((msg, index) => (
                  <div
                    key={index}
                    className={
                      msg.sender === "user"
                        ? styles.chatMessageRight
                        : styles.chatMessageLeft
                    }
                  >
                    {msg.sender === "bot" && (
                      <img src="/bot.png" alt="bot" className={styles.avatar} />
                    )}
                    <div className={styles.messageBox}>{msg.text}</div>
                    {msg.sender === "user" && (
                      <img src="/user.jpg" alt="me" className={styles.avatar} />
                    )}
                  </div>
                ))
              )}
              <div ref={chatEndRef}></div>
            </div>

            {/* Input Bar */}
            <div className={styles.inputBar}>
              <Form.Control
                type="text"
                placeholder="Type a new message here"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => (e.key === "Enter" ? handleSendMessage() : null)}
              />
              <div className={styles.inputIcons}>
                <FaSmile className={styles.icon} />
                <FaPaperclip className={styles.icon} />
                <FaPaperPlane
                  className={`${styles.icon} ${!input.trim() ? styles.disabled : ""}`}
                  onClick={handleSendMessage}
                  style={{ cursor: input.trim() ? "pointer" : "not-allowed" }}
                />
              </div>
            </div>
          </Col>
        </Row>
      </section>
    </Container>
  );
};

export default Chatbot;
