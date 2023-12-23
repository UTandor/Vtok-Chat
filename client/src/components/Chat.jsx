import { useState, useEffect } from "react";
import axios from "axios";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [content, setContent] = useState([]);
  const username = localStorage.getItem("name");

  useEffect(() => {
    fetchMessages();
  }, []);

  function fetchMessages() {
    axios
      .get("http://localhost:8080/messages")
      .then((response) => {
        setContent(response.data);
        console.log(response);
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
    <div className="px-5 md:px-20 lg:px-20 xs:px-5  w-screen ">
      <div
        style={{
          boxShadow:
            "0 0 0 #0000, 0 0 0 #0000, 0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        }}
        className=" right-0 mr-4 bg-white p-6 rounded-lg border  w-full border-[#e5e7eb]"
      >
        <div className="flex flex-col space-y-1.5 pb-6">
          <h2 className="font-semibold text-lg tracking-tight">Chat</h2>
          <p className="text-sm text-[#6b7280] leading-3">
            Developed by Usman Tanveer
          </p>
        </div>
        <div className="pr-4 h-[474px] overflow-y-auto">
          {content.length === 0 ? (
            <h1>No messages found</h1>
          ) : (
            content.map((msg) => (
              <div
                key={msg._id}
                className="flex gap-3 my-4 text-gray-600 text-sm flex-1"
              >
                <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                  <div className="rounded-full w-full bg-gray-100 border p-1 items-center justify-center flex font-regular text-lg">{msg.sentBy[0]}</div>
                </span>
                <p className="leading-relaxed">
                  <span className="block font-bold text-gray-700">
                    {msg.sentBy}{" "}
                  </span>
                  {msg.content}
                </p>
              </div>
            ))
          )}
        </div>
        <div className="flex items-center pt-0">
          <form
            className="flex items-center justify-center w-full space-x-2"
            onSubmit={handleSubmit}
          >
            <input
              className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] disabled:cursor-not-allowed disabled:opacity-50 text-[#030712] focus-visible:ring-offset-2"
              placeholder="Type your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] disabled:pointer-events-none disabled:opacity-50 bg-black hover:bg-[#111827E6] h-10 px-4 py-2"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
