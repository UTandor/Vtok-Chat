import { useState, useEffect } from "react";
import axios from "axios";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [content, setContent] = useState([]);
  const username = String(localStorage.getItem("username"));

  useEffect(() => {
    fetchMessages();
  }, []);

  function fetchMessages() {
    axios
      .get("http://localhost:8080/messages")
      .then((response) => {
        setContent(response.data);
      })
      .catch((e) => {
        console.error(e);
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/messages", {
        message: message,
        sentBy: username,
      })
      .then((response) => {
        fetchMessages();
        setMessage("");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
      <div>
        <h1>Messages</h1>
        {content.length === 0 ? (
          <div>
            <h2>No messages found</h2>
          </div>
        ) : (
          content.map((msg) => (
            <div key={msg._id}>
              <h4>{msg.name}</h4>
              <p>{msg.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Chat;
