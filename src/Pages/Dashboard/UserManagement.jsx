import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table } from "@/components/Table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useNavigate } from "react-router-dom"

// Sample user data
const sampleUsers = [
  {
    id: 1,
    avatar: "/placeholder.svg",
    name: "John Doe Yamal",
    email: "johndoe@gmail.com",
    phone: "0810 000 0000",
    gender: "Male",
    state: "Lagos",
    userType: "Customer",
    status: "active",
  },
  {
    id: 2,
    avatar: "/placeholder.svg",
    name: "John Doe Yamal",
    email: "johndoe@gmail.com",
    phone: "0810 000 0000",
    gender: "Female",
    state: "Abuja",
    userType: "Tutor",
    status: "active",
  },
  {
    id: 3,
    avatar: "/placeholder.svg",
    name: "John Doe Yamal",
    email: "johndoe@gmail.com",
    phone: "0810 000 0000",
    gender: "Male",
    state: "Lagos",
    userType: "Customer",
    status: "active",
  },
  {
    id: 4,
    avatar: "/placeholder.svg",
    name: "John Doe Yamal",
    email: "johndoe@gmail.com",
    phone: "0810 000 0000",
    gender: "Female",
    state: "Oyo",
    userType: "Tutor",
    status: "active",
  },
  {
    id: 5,
    avatar: "/placeholder.svg",
    name: "John Doe Yamal",
    email: "johndoe@gmail.com",
    phone: "0810 000 0000",
    gender: "Male",
    state: "Lagos",
    userType: "Customer",
    status: "active",
  },
  {
    id: 6,
    avatar: "/placeholder.svg",
    name: "John Doe Yamal",
    email: "johndoe@gmail.com",
    phone: "0810 000 0000",
    gender: "Female",
    state: "Lagos",
    userType: "Gig Poster",
    status: "active",
  },
  {
    id: 7,
    avatar: "/placeholder.svg",
    name: "John Doe Yamal",
    email: "johndoe@gmail.com",
    phone: "0810 000 0000",
    gender: "Male",
    state: "Nasarrawa",
    userType: "Customer",
    status: "active",
  },
  {
    id: 8,
    avatar: "/placeholder.svg",
    name: "John Doe Yamal",
    email: "johndoe@gmail.com",
    phone: "0810 000 0000",
    gender: "Male",
    state: "Lagos",
    userType: "Tutor",
    status: "active",
  },
  {
    id: 9,
    avatar: "/placeholder.svg",
    name: "John Doe Yamal",
    email: "johndoe@gmail.com",
    phone: "0810 000 0000",
    gender: "Female",
    state: "Kastina",
    userType: "Gig Poster",
    status: "active",
  },
  {
    id: 10,
    avatar: "/placeholder.svg",
    name: "John Doe Yamal",
    email: "johndoe@gmail.com",
    phone: "0810 000 0000",
    gender: "Male",
    state: "Yobe",
    userType: "Customer",
    status: "active",
  },
]

// Nigerian states for dropdown
const nigerianStates = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
]

function UserManagement() {
  const [activeTab, setActiveTab] = useState("all")
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false)
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    state: "",
    userType: "",
    status: "active",
  })
  const navigate = useNavigate()

  // Define filter options for the table
  const filterOptions = {
    userType: ["Customer", "Tutor", "Gig Poster"],
    status: ["Active", "Inactive", "Pending"],
    gender: ["Male", "Female", "Other"],
    filter4: ["Option 1", "Option 2", "Option 3"],
  }

  // Table columns definition
  const columns = [
    { key: "name", label: "Gig Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone No." },
    { key: "gender", label: "Gender" },
    { key: "state", label: "State" },
    { key: "userType", label: "User Type" },
  ]

  // Custom cell renderer for the table
  const renderCustomCell = (key, value, user) => {
    if (key === "name") {
      return (
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span>{user.name}</span>
        </div>
      )
    }

    if (key === "userType") {
      if (value === "Customer") {
        return <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full">{value}</span>
      } else if (value === "Tutor") {
        return (
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">{value}</span>
            <span className="text-blue-600">+1</span>
          </div>
        )
      } else if (value === "Gig Poster") {
        return <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full">{value}</span>
      }
    }

    return value
  }

  // Custom actions renderer for the table
  const renderActions = (user) => {
    return (
      <Button variant="outline" size="sm" onClick={() => handleViewUser(user)} className="text-gray-700">
        Open
      </Button>
    )
  }

  /* const handleViewUser = (user) => {
    setCurrentUser(user)
    setIsEditUserModalOpen(true)
  } */
    const handleViewUser = (user) => {
        // Navigate to user details page
        navigate(`/dashboard/user-management/${user.id}`)
    }

  const handleAddUser = () => {
    setIsAddUserModalOpen(true)
  }

  const handleSaveNewUser = () => {
    // In a real app, you would add the user to the database
    console.log("Adding new user:", newUser)
    setIsAddUserModalOpen(false)
    // Reset form
    setNewUser({
      name: "",
      email: "",
      phone: "",
      gender: "",
      state: "",
      userType: "",
      status: "active",
    })
  }

  const handleUpdateUser = () => {
    // In a real app, you would update the user in the database
    console.log("Updating user:", currentUser)
    setIsEditUserModalOpen(false)
  }

  const handleDeleteUser = () => {
    // In a real app, you would delete the user from the database
    console.log("Deleting user:", currentUser)
    setIsEditUserModalOpen(false)
  }

  return (
    <>
      <div className="mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">User Management</h1>
          <p className="text-gray-500">Insert section description here.</p>
        </div>

        {/* Tabs and Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex border-b w-full md:w-auto">
            <button
              className={`pb-2 px-4 ${
                activeTab === "all" ? "border-b-2 border-primary text-primary font-medium" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("all")}
            >
              All Gigs
            </button>
            <button
              className={`pb-2 px-4 ${
                activeTab === "active" ? "border-b-2 border-primary text-primary font-medium" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("active")}
            >
              Active Users
            </button>
            <button
              className={`pb-2 px-4 ${
                activeTab === "inactive" ? "border-b-2 border-primary text-primary font-medium" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("inactive")}
            >
              Inactive Users
            </button>
          </div>

          <div className="flex w-full md:w-auto gap-2">
            <Button onClick={handleAddUser} variant="outline" className="flex items-center bg-[#B2FCE4]">
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>
        </div>

        {/* Users Table with Filter Options */}
        <Table
          data={sampleUsers}
          columns={columns}
          renderCustomCell={renderCustomCell}
          renderActions={renderActions}
          name="Users"
          itemsPerPage={8}
          showSearch={true}
          filterOptions={filterOptions}
        />

        {/* Add User Modal */}
        <Dialog open={isAddUserModalOpen} onOpenChange={setIsAddUserModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="John Doe"
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="johndoe@example.com"
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={newUser.phone}
                  onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                  placeholder="0810 000 0000"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={newUser.gender} onValueChange={(value) => setNewUser({ ...newUser, gender: value })}>
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Select value={newUser.state} onValueChange={(value) => setNewUser({ ...newUser, state: value })}>
                    <SelectTrigger id="state">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {nigerianStates.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="userType">User Type</Label>
                <Select value={newUser.userType} onValueChange={(value) => setNewUser({ ...newUser, userType: value })}>
                  <SelectTrigger id="userType">
                    <SelectValue placeholder="Select user type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Customer">Customer</SelectItem>
                    <SelectItem value="Tutor">Tutor</SelectItem>
                    <SelectItem value="Gig Poster">Gig Poster</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddUserModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveNewUser}>Save User</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit User Modal */}
        {currentUser && (
          <Dialog open={isEditUserModalOpen} onOpenChange={setIsEditUserModalOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Edit User</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex justify-center mb-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                    <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="edit-name">Full Name</Label>
                  <Input
                    id="edit-name"
                    value={currentUser.name}
                    onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={currentUser.email}
                    onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="edit-phone">Phone Number</Label>
                  <Input
                    id="edit-phone"
                    value={currentUser.phone}
                    onChange={(e) => setCurrentUser({ ...currentUser, phone: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-gender">Gender</Label>
                    <Select
                      value={currentUser.gender}
                      onValueChange={(value) => setCurrentUser({ ...currentUser, gender: value })}
                    >
                      <SelectTrigger id="edit-gender">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-state">State</Label>
                    <Select
                      value={currentUser.state}
                      onValueChange={(value) => setCurrentUser({ ...currentUser, state: value })}
                    >
                      <SelectTrigger id="edit-state">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {nigerianStates.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-userType">User Type</Label>
                  <Select
                    value={currentUser.userType}
                    onValueChange={(value) => setCurrentUser({ ...currentUser, userType: value })}
                  >
                    <SelectTrigger id="edit-userType">
                      <SelectValue placeholder="Select user type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Customer">Customer</SelectItem>
                      <SelectItem value="Tutor">Tutor</SelectItem>
                      <SelectItem value="Gig Poster">Gig Poster</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select
                    value={currentUser.status}
                    onValueChange={(value) => setCurrentUser({ ...currentUser, status: value })}
                  >
                    <SelectTrigger id="edit-status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter className="flex justify-between">
                <Button variant="destructive" onClick={handleDeleteUser}>
                  Delete User
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setIsEditUserModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleUpdateUser}>Update User</Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </>
  )
}

export default UserManagement