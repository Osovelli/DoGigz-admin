import { useState, useRef, useEffect } from "react"
import { Search, ArrowLeft, Paperclip, Mic, FileIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import NewChatSheet from "@/components/Chat/NewChatSheet"
import CustomButton from "@/components/CustomButton"

const ChatManagement = () => {
  const [activeCategory, setActiveCategory] = useState(1)
  const [activeChat, setActiveChat] = useState(null)
  const [activeTab, setActiveTab] = useState("chat")
  const [isNewChatOpen, setIsNewChatOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const messagesEndRef = useRef(null)

  // Sample data for chats
  const chats = [
    { id: 1, name: "Misty Bins III", avatar: "/avatar 11.png", unread: false },
    { id: 2, name: "Misty Bins III", avatar: "/avatar 11.png", unread: true },
    { id: 3, name: "Misty Bins III", avatar: "/avatar 11.png", unread: true },
    { id: 4, name: "Misty Bins III", avatar: "/avatar 11.png", unread: false },
    { id: 5, name: "Misty Bins III", avatar: "/avatar 11.png", unread: false },
    { id: 6, name: "Misty Bins III", avatar: "/avatar 11.png", unread: true },
    { id: 7, name: "Misty Bins III", avatar: "/avatar 11.png", unread: false },
  ]

  // Sample data for the active chat
  const activeChatData = {
    id: 100,
    name: "Olowu Abayomi",
    avatar: "/avatar.jpeg",
    messages: [
      {
        id: 1,
        sender: "user",
        text: "Hey, what's up? 👋",
        timestamp: "08:15 PM",
        date: "yesterday",
      },
      {
        id: 2,
        sender: "admin",
        text: "Not much, just getting some work done. How about you?",
        timestamp: "08:00 PM",
        date: "today",
      },
      {
        id: 3,
        sender: "user",
        text: "Same here, just finishing up a project. Do you have any plans for the weekend? ✌️",
        timestamp: "08:15 PM",
        date: "today",
      },
      {
        id: 4,
        sender: "admin",
        text: "Not yet, but I was thinking of going for a hike. Want to join me?",
        timestamp: "10:00 PM",
        date: "today",
      },
      {
        id: 5,
        sender: "user",
        text: "That sounds great! Which trail were you thinking of? 😊",
        timestamp: "9:00 PM",
        date: "today",
      },
    ],
  }

  // Sample data for shared documents
  const sharedDocuments = [
    { id: 1, name: "Document name", size: "300KB", dateShared: "Nov 19, 2023" },
    { id: 2, name: "Document name", size: "300KB", dateShared: "Nov 19, 2023" },
    { id: 3, name: "Document name", size: "300KB", dateShared: "Nov 19, 2023" },
    { id: 4, name: "Document name", size: "300KB", dateShared: "Nov 19, 2023" },
    { id: 5, name: "Document name", size: "300KB", dateShared: "Nov 19, 2023" },
    { id: 6, name: "Document name", size: "300KB", dateShared: "Nov 19, 2023" },
    { id: 7, name: "Document name", size: "300KB", dateShared: "Nov 19, 2023" },
    { id: 8, name: "Document name", size: "300KB", dateShared: "Nov 19, 2023" },
  ]

  // Scroll to bottom of messages when active chat changes or new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [activeChat, activeChatData?.messages])

  // Set initial active chat
  useEffect(() => {
    if (chats.length > 0 && !activeChat) {
      setActiveChat(chats[0].id)
    }
  }, [chats])

  // Filter chats based on search term
  const filteredChats = chats.filter((chat) => chat.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Chat Management</h1>
            <p className="text-gray-500">Manage all chats here</p>
          </div>
          <CustomButton
            onClick={() => setIsNewChatOpen(true)}
            className="bg-black text-white hover:bg-gray-800 flex items-center gap-2"
          >
            <span className="text-lg">+</span> New Chat
          </CustomButton>
        </div>

        {/* Category tabs */}
        <div className="flex mb-6 border-b">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {[1, 2, 3, 4].map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category ? "bg-gray-100 text-black" : "text-gray-500 hover:bg-gray-50"
                }`}
                onClick={() => setActiveCategory(category)}
              >
                Category {category}
              </button>
            ))}
          </div>
          <div className="ml-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-full w-full sm:w-[300px] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Chat interface */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0  border rounded-lg overflow-hidden">
          {/* Chat list */}
          <div className="border-r md:col-span-1 overflow-auto flex flex-col">
            <div className="p-4 border-b">
              <h2 className="font-semibold">Chats</h2>
            </div>
            <div className="overflow-y-scroll flex-1">
              {filteredChats.map((chat) => (
                <div
                  key={chat.id}
                  className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer ${
                    activeChat === chat.id ? "bg-gray-50" : ""
                  }`}
                  onClick={() => setActiveChat(chat.id)}
                >
                  <div className="relative">
                    <img
                      src={chat.avatar || "/placeholder.svg"}
                      alt={chat.name}
                      className="w-10 h-10 rounded-full bg-green-500"
                    />
                    {chat.unread && (
                      <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
                    )}
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="font-medium">{chat.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat messages */}
          <div className="md:col-span-2 flex flex-col">
            {activeChat ? (
              <>
                {/* Chat header */}
                <div className="p-4 border-b flex items-center">
                  <button className="mr-2 p-1 rounded-full hover:bg-gray-100">
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  <img
                    src={activeChatData.avatar || "/placeholder.svg"}
                    alt={activeChatData.name}
                    className="w-10 h-10 rounded-full bg-yellow-500"
                  />
                  <div className="ml-3">
                    <p className="font-semibold">{activeChatData.name}</p>
                  </div>
                </div>

                {/* Chat tabs */}
                <div className="border-b">
                  <div className="flex">
                    <button
                      className={`px-6 py-3 font-medium text-sm ${
                        activeTab === "chat" ? "text-primary border-b-2 border-primary" : "text-gray-500"
                      }`}
                      onClick={() => setActiveTab("chat")}
                    >
                      Chat
                    </button>
                    <button
                      className={`px-6 py-3 font-medium text-sm ${
                        activeTab === "shared" ? "text-primary border-b-2 border-primary" : "text-gray-500"
                      }`}
                      onClick={() => setActiveTab("shared")}
                    >
                      Shared
                    </button>
                  </div>
                </div>

                {/* Content area - flex-1 makes it take available space */}
                <div className="flex-1 overflow-hidden">
                  {activeTab === "chat" && (
                    <div className="h-full overflow-y-auto p-4">
                      <div className="space-y-6">
                        {/* Group messages by date */}
                        {activeChatData.messages.some((msg) => msg.date === "today") && (
                          <div className="text-center my-4">
                            <span className="text-xs text-gray-500 bg-white px-2">Today</span>
                          </div>
                        )}

                        {/* Messages */}
                        {activeChatData.messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.sender === "admin" ? "justify-end" : "justify-start"}`}
                          >
                            {message.sender === "user" && (
                              <img
                                src={activeChatData.avatar || "/placeholder.svg"}
                                alt={activeChatData.name}
                                className="w-10 h-10 rounded-full mr-3 bg-yellow-500 self-end"
                              />
                            )}
                            <div className="max-w-[70%]">
                              <div
                                className={`p-3 rounded-lg ${
                                  message.sender === "admin" ? "bg-emerald-500 text-white" : "bg-white border"
                                }`}
                              >
                                <p>{message.text}</p>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">{message.timestamp}</p>
                            </div>
                            {message.sender === "admin" && (
                              <img
                                src="/placeholder.svg?height=40&width=40"
                                alt="Admin"
                                className="w-10 h-10 rounded-full ml-3 bg-indigo-300 self-end"
                              />
                            )}
                          </div>
                        ))}
                        <div ref={messagesEndRef} />
                      </div>
                    </div>
                  )}

                  {activeTab === "shared" && (
                    <div className="h-full overflow-y-auto">
                      <div className="p-4 grid grid-cols-12 gap-4 border-b text-sm font-medium text-gray-500">
                        <div className="col-span-6">FILE NAME</div>
                        <div className="col-span-2 text-right">SIZE</div>
                        <div className="col-span-3">DATE SHARED</div>
                        <div className="col-span-1"></div>
                      </div>
                      <div className="overflow-y-auto">
                        {sharedDocuments.map((doc) => (
                          <div key={doc.id} className="p-4 grid grid-cols-12 gap-4 border-b hover:bg-gray-50">
                            <div className="col-span-6 flex items-center">
                              <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center mr-3">
                                <FileIcon className="h-5 w-5 text-gray-500" />
                              </div>
                              <span>{doc.name}</span>
                            </div>
                            <div className="col-span-2 text-right self-center">{doc.size}</div>
                            <div className="col-span-3 self-center">{doc.dateShared}</div>
                            <div className="col-span-1 self-center">
                              <button className="px-3 py-1 border rounded-full text-sm hover:bg-gray-50">View</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Message input */}
                <div className="p-4 border-t flex items-center">
                  <button className="p-2 text-gray-500 hover:text-gray-700">
                    <Paperclip className="h-5 w-5" />
                  </button>
                  <input
                    type="text"
                    placeholder="Message..."
                    className="flex-1 mx-2 p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <button className="p-2 text-gray-500 hover:text-gray-700">
                    <Mic className="h-5 w-5" />
                  </button>
                </div>
              </>
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-gray-500">Select a chat to start messaging</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* New Chat Sheet */}
      <NewChatSheet isOpen={isNewChatOpen} onClose={() => setIsNewChatOpen(false)} />
    </>
  )
}

export default ChatManagement
