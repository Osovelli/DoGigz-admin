import { useState, useEffect } from "react"
import { X, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

const NewChatSheet = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUsers, setSelectedUsers] = useState([])

  // Sample users data
  const users = [
    { id: 1, name: "John Doe", avatar: "/avatar 10.png", role: "Student" },
    { id: 2, name: "Jane Smith", avatar: "/placeholder.svg?height=40&width=40", role: "Tutor" },
    { id: 3, name: "Robert Johnson", avatar: "/avatar 11.png", role: "Admin" },
    { id: 4, name: "Emily Davis", avatar: "/placeholder.svg?height=40&width=40", role: "Student" },
    { id: 5, name: "Michael Wilson", avatar: "/placeholder.svg?height=40&width=40", role: "Tutor" },
    { id: 6, name: "Sarah Brown", avatar: "/avatar 10.png", role: "Student" },
    { id: 7, name: "David Miller", avatar: "/avatar 10.png", role: "Tutor" },
    { id: 8, name: "Lisa Anderson", avatar: "/avatar 11.png", role: "Student" },
  ]

  // Handle visibility with animation
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  // Filter users based on search term
  const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()))

  // Toggle user selection
  const toggleUserSelection = (user) => {
    if (selectedUsers.some((u) => u.id === user.id)) {
      setSelectedUsers(selectedUsers.filter((u) => u.id !== user.id))
    } else {
      setSelectedUsers([...selectedUsers, user])
    }
  }

  // Create new chat
  const handleCreateChat = () => {
    console.log("Creating new chat with users:", selectedUsers)
    // Here you would typically send the data to your API
    onClose()
    setSelectedUsers([])
    setSearchTerm("")
  }

  if (!isVisible && !isOpen) return null

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/20 backdrop-blur-sm transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div
        className={`absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold">New Chat</h2>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search users"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          {selectedUsers.length > 0 && (
            <div className="p-4 border-b">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Selected Users</h3>
              <div className="flex flex-wrap gap-2">
                {selectedUsers.map((user) => (
                  <div key={user.id} className="flex items-center bg-gray-100 rounded-full pl-1 pr-2 py-1">
                    <img
                      src={user.avatar || "/placeholder.svg"}
                      alt={user.name}
                      className="w-6 h-6 rounded-full mr-1"
                    />
                    <span className="text-sm">{user.name}</span>
                    <button
                      onClick={() => toggleUserSelection(user)}
                      className="ml-1 text-gray-500 hover:text-gray-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-2">All Users</h3>
              <div className="space-y-2">
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className={`flex items-center p-3 rounded-lg cursor-pointer ${
                      selectedUsers.some((u) => u.id === user.id) ? "bg-gray-100" : "hover:bg-gray-50"
                    }`}
                    onClick={() => toggleUserSelection(user)}
                  >
                    <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-10 h-10 rounded-full" />
                    <div className="ml-3">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.role}</p>
                    </div>
                    {selectedUsers.some((u) => u.id === user.id) && (
                      <div className="ml-auto">
                        <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3 text-white"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 border-t">
            <Button
              onClick={handleCreateChat}
              disabled={selectedUsers.length === 0}
              className="w-full bg-black text-white hover:bg-gray-800 disabled:bg-gray-300"
            >
              Start Chat
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewChatSheet
