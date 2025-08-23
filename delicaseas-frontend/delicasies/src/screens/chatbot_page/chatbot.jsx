import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { 
  FaBars, FaArrowLeft, FaExclamationTriangle, FaTrashAlt, 
  FaSmile, FaPaperclip, FaPaperPlane 
} from "react-icons/fa";
import styles from "../../styles/chatbot.module.css";
import { Link } from "react-router-dom";


const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [recentChats, setRecentChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [showRecent, setShowRecent] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true); // control sidebar

  // Helper to get chat title
  const getChatTitle = (msgs) => {
    const firstUserMsg = msgs.find(m => m.sender === "user");
    return firstUserMsg ? firstUserMsg.text.slice(0, 20) + "..." : "Untitled Chat";
  };

  // Send message
  const handleSendMessage = () => {
    if (!input.trim()) return;

    const newMessage = { sender: "user", text: input.trim() };
    setMessages(prev => [...prev, newMessage]);

    // Simulate bot reply
    setTimeout(() => {
      const botReply = { sender: "bot", text: "Demo response here." };
      setMessages(prev => [...prev, botReply]);
    }, 800);

    setInput("");
  };

  // Start a new chat
  const handleNewChat = () => {
    if (messages.length > 0) {
      const newChat = {
        id: Date.now(),
        title: getChatTitle(messages),
        history: messages
      };
      setRecentChats(prev => [newChat, ...prev]);
    }
    setMessages([]);
    setActiveChatId(null);
  };

  // Load a recent chat
  const handleLoadChat = (chat) => {
    setMessages(chat.history);
    setActiveChatId(chat.id);
  };

  return (
    <div className={styles.chatWrapper}>
      <Container fluid>
        <Row>
          {/* Sidebar */}
          <Col 
  xs={sidebarOpen ? 3 : 1} 
  md={sidebarOpen ? 2 : 1} 
  className={`${styles.sidebar} ${sidebarOpen ? styles.open : styles.closed}`}
>
  <div className={styles.menuButton} onClick={() => setSidebarOpen(!sidebarOpen)}>
    <FaBars size={20} />
  </div>

  <div className={styles.sidebarTop}>
    {sidebarOpen && (
      <>
        <button className={styles.chatButton} onClick={handleNewChat}>+ New Chat</button>
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
              recentChats.map(chat => (
                <button 
                  key={chat.id} 
                  className={`${styles.chatButton} ${activeChatId === chat.id ? styles.activeChat : ""}`}
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

  <div className={styles.userCard}>
    <img src="/user.jpg" alt="user" className={styles.userImage} />
    {sidebarOpen && <span>Welcome back,<br/><b>Abran</b></span>}
  </div>
</Col>


          {/* Chat Section */}
          <Col xs={sidebarOpen ? 9 : 11} md={sidebarOpen ? 10 : 11} className={styles.chatSection}>
            {/* Top Bar */}
            <div className={styles.topBar}>
              <Link to="/home" className={styles.backButton}>
                <FaArrowLeft /> BACK TO HOME
              </Link>

              
            </div>

            {/* Chat Body */}
            <div className={styles.chatBody}>
              {messages.length === 0 ? (
                <p className={styles.emptyChat}>Start a new conversation...</p>
              ) : (
                messages.map((msg, index) => (
                  <div 
                    key={index} 
                    className={msg.sender === "user" ? styles.chatMessageRight : styles.chatMessageLeft}
                  >
                    {msg.sender === "bot" && <img src="/bot.png" alt="bot" className={styles.avatar} />}
                    <div className={styles.messageBox}>{msg.text}</div>
                    {msg.sender === "user" && <img src="/user.jpg" alt="me" className={styles.avatar} />}
                  </div>
                ))
              )}
            </div>

            {/* Input Bar */}
            <div className={styles.inputBar}>
              <Form.Control 
                type="text" 
                placeholder="Type a new message here"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" ? handleSendMessage() : null}
              />
              <div className={styles.inputIcons}>
                <FaSmile className={styles.icon}/>
                <FaPaperclip className={styles.icon}/>
                <FaPaperPlane className={styles.icon} onClick={handleSendMessage}/>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Chatbot;
