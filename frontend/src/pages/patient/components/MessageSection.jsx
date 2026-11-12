import React, { useState, useEffect } from "react";

const MessageSection = () => {
  const dummyDoctors = [
    { _id: "1", name: "Dr. Sanju Samson", department: "Cardiology" },
    { _id: "2", name: "Dr. Smriti Rao", department: "Dermatology" },
    { _id: "3", name: "Dr. Anil Kapoor", department: "Neurology" },
  ];

  const dummyMessages = {
    "Dr. Sanju Samson": [
      {
        sender: "Dr. Sanju Samson",
        content: "Please remember to take your medication.",
        time: "May 15, 2025 09:00 AM",
      },
      {
        sender: "You",
        content: "Thank you!",
        time: "May 15, 2025 09:05 AM",
      },
    ],
    "Dr. Smriti Rao": [
      {
        sender: "Dr. Smriti Rao",
        content: "Please apply the prescribed cream twice daily.",
        time: "May 16, 2025 11:00 AM",
      },
    ],
    "Dr. Anil Kapoor": [],
  };

  const [doctors] = useState(dummyDoctors);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState({ content: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (selectedDoctor) {
      setMessages(dummyMessages[selectedDoctor.name] || []);
    }
  }, [selectedDoctor]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!selectedDoctor || !msg.content.trim()) return;

    const newMessage = {
      sender: "You",
      content: msg.content.trim(),
      time: new Date().toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setMsg({ content: "" });
    setMessage("✅ Message sent!");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg shadow-lg h-[75vh]">
      {/* Left: Doctor List */}
      <div className="bg-white rounded-xl shadow-md p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-3 text-blue-700">🩺 Doctors</h2>
        <ul className="space-y-2">
          {doctors.map((doc) => (
            <li
              key={doc._id}
              onClick={() => setSelectedDoctor(doc)}
              className={`p-3 rounded-lg cursor-pointer border hover:bg-blue-50 ${
                selectedDoctor?.name === doc.name
                  ? "bg-blue-100 border-blue-400"
                  : "border-gray-200"
              }`}
            >
              <p className="font-medium">{doc.name}</p>
              <p className="text-sm text-gray-500">{doc.department}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Right: Chat Section */}
      <div className="col-span-2 bg-white rounded-xl shadow-md p-4 flex flex-col">
        {selectedDoctor ? (
          <>
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h2 className="text-xl font-semibold text-blue-700">
                Chat with {selectedDoctor.name}
              </h2>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4">
              {messages.length === 0 ? (
                <p className="text-center text-gray-500">No messages yet.</p>
              ) : (
                messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg max-w-[70%] shadow ${
                      msg.sender === "You"
                        ? "ml-auto bg-blue-100 text-right"
                        : "mr-auto bg-gray-100"
                    }`}
                  >
                    <p className="text-sm font-medium text-gray-700">
                      {msg.sender}
                    </p>
                    <p className="text-base">{msg.content}</p>
                    <p className="text-xs text-gray-500 mt-1">{msg.time}</p>
                  </div>
                ))
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="mt-auto space-y-2">
              <textarea
                name="content"
                value={msg.content}
                onChange={(e) => setMsg({ content: e.target.value })}
                className="w-full border px-3 py-2 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows={2}
                placeholder="Type your message..."
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Send Message
              </button>
            </form>

            {message && (
              <div
                className={`mt-3 text-sm font-medium text-center ${
                  message.includes("✅") ? "text-green-600" : "text-red-600"
                }`}
              >
                {message}
              </div>
            )}
          </>
        ) : (
          <div className="text-gray-500 text-center my-auto">
            Select a doctor from the left to start chatting.
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageSection;
