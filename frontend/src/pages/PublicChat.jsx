import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";

const socket = io(import.meta.env.VITE_BACKEND_URL);
// console.log(import.meta.env.VITE_BACKEND_URL);

const PublicChat = () => {
  const [roomName, setRoomName] = useState("");
  const [rooms, setRooms] = useState([]);
  const [joinedRoom, setJoinedRoom] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");

  const { currentUser } = useSelector((state) => state.user);
  // console.log(currentUser);

  // console.log("Available rooms", rooms);

  useEffect(() => {
    socket.on("updateRooms", (updatedRooms) => {
      setRooms(updatedRooms);
    });
    socket.emit("getRooms");

    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("updateRooms");
      socket.off("receiveMessage");
    };
  }, []);

  const createRoom = () => {
    setError("");
    if (roomName === "") {
      setError("Please enter a room Name");
      return;
    }

    socket.emit("createRoom", roomName);
    setRoomName("");
  };

  const joinRoom = (roomName) => {
    socket.emit("joinRoom", roomName);
    setJoinedRoom(roomName);
  };

  const exitRoom = () => {
    socket.emit("leaveRoom", joinedRoom);
    setJoinedRoom(null);
    setMessages([]);
  };

  const sendMessage = () => {
    if (message.trim() !== "") {
      socket.emit("sendMessage", {
        roomName: joinedRoom,
        message,
        username: currentUser.username,
      });
      setMessage("");
    }
  };

  return (
    <div className="m-2 p-4 mt-20 min-h-screen bg-transparent text-gray-200">
      {!joinedRoom ? (
        <>
          <div className="flex space-x-3 mb-4">
            <input
              type="text"
              placeholder="Enter Room Name"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              className="p-2 bg-gray-800/60 border border-gray-700 rounded-md w-full text-gray-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={createRoom}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white p-2 rounded-md"
            >
              Create Room
            </button>
          </div>
          {error && <span className="text-red-400 text-sm">*{error}</span>}

          <h2 className="text-lg font-semibold mb-2 mt-2">Available Rooms</h2>
          {rooms.length === 0 ? (
            <p className="text-gray-400">No rooms available</p>
          ) : (
            <ul className="space-y-2">
              {rooms.map((room, index) => (
                <li
                  key={index}
                  className="p-2 bg-gray-800/60 border border-gray-700 rounded-md shadow-md flex justify-between"
                >
                  <span className="text-gray-200">
                    {room.name}
                  </span>
                  <button
                    onClick={() => joinRoom(room.name)}
                    className="bg-green-600 hover:bg-green-700 text-white p-1 rounded-md"
                  >
                    Join
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">Chat in {joinedRoom}</h2>
            <button
              onClick={exitRoom}
              className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-md"
            >
              Exit Room
            </button>
          </div>
          <div className="h-96 overflow-y-auto bg-gray-800/60 p-3 border border-gray-700 rounded-md">
            {messages.map((msg, index) => (
              <p
                key={index}
                className="p-2 my-1 bg-gray-700 rounded-md text-gray-200"
              >
                <strong>{msg.senderId}: </strong> {msg.message}
              </p>
            ))}
          </div>
          <div className="flex mt-3">
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="p-2 flex-1 border border-gray-700 bg-gray-800/60 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={sendMessage}
              className="bg-green-600 hover:bg-green-700 text-white p-2 ml-2 rounded-md"
            >
              Send
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PublicChat;