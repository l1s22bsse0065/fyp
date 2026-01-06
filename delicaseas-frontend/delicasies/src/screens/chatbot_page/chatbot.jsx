import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaArrowLeft, FaPaperPlane, FaUser, FaTrash, FaEdit, FaThumbtack } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "../../styles/chatbot.module.css";
import { useSelector } from "react-redux";

// Collapsible recipe component
const CollapsibleRecipe = ({ title, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginBottom: "10px", borderLeft: "3px solid #ffa500", padding: "8px 12px" }}>
      <div
        style={{ cursor: "pointer", fontWeight: "bold" }}
        onClick={() => setOpen(!open)}
      >
        {open ? "▼ " : "▶ "} {title}
      </div>
      {open && <div style={{ marginTop: "5px" }}>{children}</div>}
    </div>
  );
};

const Chatbot = () => {
  const { user } = useSelector((state) => state.user);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [recentChats, setRecentChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [showRecent, setShowRecent] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [hoveredChat, setHoveredChat] = useState(null);
  const [setMenuOpenFor] = useState(null);
  const [editingChatId, setEditingChatId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const chatEndRef = useRef(null);
  const API_URL = "http://127.0.0.1:5000/chatbot";

  const scrollToBottom = () => chatEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const storedChats = localStorage.getItem("recentChats");
    if (storedChats) setRecentChats(JSON.parse(storedChats));
  }, []);

  useEffect(() => {
    localStorage.setItem("recentChats", JSON.stringify(recentChats));
  }, [recentChats]);

  const getChatTitle = (msgs) => {
    const firstUserMsg = msgs.find((m) => m.sender === "user");
    return firstUserMsg ? firstUserMsg.text.slice(0, 20) + "..." : "Untitled";
  };

  const handleSendMessage = async () => {
    const userText = input.trim();
    if (!userText) return;

    const isValidIngredient =
      /[a-zA-Z]/.test(userText) && !/[bcdfghjklmnpqrstvwxyz]{5,}/i.test(userText);

    if (!isValidIngredient) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Please enter valid ingredients (letters, numbers, commas)." },
      ]);
      setInput("");
      return;
    }

    setInput("");
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    if (!messages.some((m) => m.text === "Typing...")) {
      setMessages((prev) => [...prev, { sender: "bot", text: "Typing..." }]);
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients: userText }),
      });

      const data = await response.json();
      setMessages((prev) => prev.filter((msg) => msg.text !== "Typing..."));

      if (!data.recipes || data.recipes.length === 0) {
        setMessages((prev) => [...prev, { sender: "bot", text: "No recipes found 😔" }]);
        return;
      }

      const recipeMessages = data.recipes.map((recipe, i) => ({
        sender: "bot",
        collapsible: true,
        title: `🍽️ ${i + 1}. ${recipe.title} (${recipe.cuisine}, ${recipe.calories} kcal)`,
        content: (
          <div className={styles.recipeContent}>
            <p><b>Time:</b> {recipe.time_minutes} minutes</p>
            <p><b>Ingredients:</b></p>
            <ul>
              {recipe.ingredients.map((ing, idx) => (
                <li key={idx} className={styles.ingredient}>{ing}</li>
              ))}
            </ul>
            <p><b>Method:</b></p>
            <p>{recipe.method.trim()}</p>
          </div>
        ),
      }));

      setMessages((prev) => [...prev, ...recipeMessages]);
    } catch (error) {
      setMessages((prev) => prev.filter((msg) => msg.text !== "Typing..."));
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Server error. Try again later." },
      ]);
    }
  };

  const handleNewChat = () => {
    if (messages.length > 0 && activeChatId === null) {
      const newChat = { id: Date.now(), title: getChatTitle(messages), history: messages };
      setRecentChats((prev) => [newChat, ...prev]);
    } else if (activeChatId !== null) {
      setRecentChats((prev) =>
        prev.map((chat) =>
          chat.id === activeChatId ? { ...chat, history: messages, title: getChatTitle(messages) } : chat
        )
      );
    }
    setMessages([]);
    setActiveChatId(null);
  };

  const handleLoadChat = (chat) => {
    setMessages(chat.history);
    setActiveChatId(chat.id);
    setTimeout(scrollToBottom, 100);
  };

  const handleDeleteChat = (chatId) => {
    setRecentChats((prev) => prev.filter((chat) => chat.id !== chatId));
    if (activeChatId === chatId) setMessages([]);
  };

  const handleStartRename = (chat) => {
    setEditingChatId(chat.id);
    setEditingText(chat.title);
    setMenuOpenFor(null);
  };

  const handleRenameChat = (chatId) => {
    setRecentChats((prev) =>
      prev.map((chat) => (chat.id === chatId ? { ...chat, title: editingText } : chat))
    );
    setEditingChatId(null);
  };

  return (
    <div className={styles.chatPage}>
      {/* Sidebar */}
      <div className={`${styles.sidebar} ${sidebarOpen ? styles.open : styles.closed}`}>
        <div className={styles.menuButton} onClick={() => setSidebarOpen(!sidebarOpen)}>
          <FaBars size={20} />
        </div>

        <div className={styles.sidebarTop}>
          <button className={styles.chatButton} onClick={handleNewChat}>
            + New Chat
          </button>

          <button className={styles.chatButton} onClick={() => setShowRecent(!showRecent)}>
            Recent Chats {showRecent ? "▲" : "▼"}
          </button>

          {showRecent && (
            <div className={styles.recentChats}>
              {recentChats.length === 0 ? (
                <p style={{ opacity: 0.6 }}>No recent chats</p>
              ) : (
                recentChats.map((chat) => (
                  <div
                    key={chat.id}
                    style={{ position: "relative", display: "flex", alignItems: "center", gap: "6px" }}
                    onMouseEnter={() => setHoveredChat(chat.id)}
                    onMouseLeave={() => setHoveredChat(null)}
                  >
                    {editingChatId === chat.id ? (
                      <input
                        type="text"
                        value={editingText}
                        autoFocus
                        onChange={(e) => setEditingText(e.target.value)}
                        onBlur={() => handleRenameChat(chat.id)}
                        onKeyDown={(e) => e.key === "Enter" && handleRenameChat(chat.id)}
                        style={{ flex: 1, padding: "6px 10px", borderRadius: "6px", border: "1px solid #ccc" }}
                      />
                    ) : (
                      <button
                        className={`${styles.chatButton} ${activeChatId === chat.id ? styles.activeChat : ""}`}
                        onClick={() => handleLoadChat(chat)}
                        style={{ flex: 1 }}
                      >
                        {chat.title}
                      </button>
                    )}

                    {hoveredChat === chat.id && editingChatId !== chat.id && (
                      <div style={{ display: "flex", gap: "6px", marginLeft: "4px" }}>
                        <FaEdit style={{ cursor: "pointer" }} onClick={() => handleStartRename(chat)} />
                        <FaTrash style={{ cursor: "pointer" }} onClick={() => handleDeleteChat(chat.id)} />
                        <FaThumbtack style={{ cursor: "pointer" }} onClick={() => { /* implement pin later */ }} />
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        <div className={styles.userCard}>
          {user?.profilePic ? (
            <img src={user.profilePic} alt="User" className={styles.userImage} />
          ) : (
            <FaUser className={styles.userImage} style={{ fontSize: "36px", color: "#888" }} />
          )}
          {sidebarOpen && <span><b>{user.name}</b></span>}
        </div>
      </div>

      {/* Chat Section */}
      <div className={styles.chatSection}>
        <Link to="/home" className={styles.backButton}>
          <FaArrowLeft /> Back
        </Link>

        <div className={styles.chatBody}>
          {messages.length === 0 ? (
            <p style={{ opacity: 0.5, textAlign: "center", marginTop: "40px" }}>Start a new conversation…</p>
          ) : (
            messages.map((msg, i) =>
              msg.collapsible ? (
                <CollapsibleRecipe key={i} title={msg.title}>{msg.content}</CollapsibleRecipe>
              ) : (
                <div key={i} className={msg.sender === "user" ? styles.chatMessageRight : styles.chatMessageLeft}>
                  {msg.sender === "bot" && <img src="/bot.png" alt="bot" className={styles.avatar} />}
                  <div className={styles.messageBox}>{msg.text}</div>
                  {msg.sender === "user" && <img src="/user.jpg" alt="me" className={styles.avatar} />}
                </div>
              )
            )
          )}
          <div ref={chatEndRef} />
        </div>

        <div className={styles.inputBar}>
          <input
            type="text"
            placeholder="Type ingredients here (e.g., sugar, flour, eggs)…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <div className={styles.inputIcons}>
            <FaPaperPlane className={styles.icon} onClick={handleSendMessage} />
          </div>
          <div style={{ fontSize: "12px", color: "#888", marginTop: "4px" }}>
            Enter ingredients separated by commas. Example: sugar, flour, eggs
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
