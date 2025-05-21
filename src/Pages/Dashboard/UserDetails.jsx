import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ChevronLeft, User, FileText, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table } from "@/components/Table"

// Sample user data
const sampleUser = {
  id: 1,
  firstName: "John",
  lastName: "Doe",
  otherName: "Yamal",
  email: "johndoe@gmail.com",
  phone: "0810 000 0000",
  gender: "Male",
  age: "32years",
  state: "Lagos",
  userType: "Customer",
  status: "active",
  bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam a ultrices mi, a tempor lectus.",
  avatar:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Admin%20Dashboard%20%282%29-PZnwe19cpPeyh5VcEzxYNsUggftbkI.png",
  walletBalance: 250000,
  totalEarnings: 1500000,
  totalSpent: 750000,
  joinedDate: "January 2022",
}

// Sample courses data
const sampleCourses = [
  {
    id: 1,
    name: "Google Data Analytics Course",
    dateCreated: "22-01-2024",
    status: "Active",
    type: "Self Paced",
    price: 20000,
    enrolled: 45,
  },
  {
    id: 2,
    name: "Introduction to UI/UX Design",
    dateCreated: "15-02-2024",
    status: "Active",
    type: "1-on-1 class",
    price: 35000,
    enrolled: 12,
  },
  {
    id: 3,
    name: "Advanced JavaScript Programming",
    dateCreated: "10-03-2024",
    status: "Inactive",
    type: "Self Paced",
    price: 25000,
    enrolled: 30,
  },
]

// Sample gigs data
const sampleGigs = [
  {
    id: 1,
    title: "Frontend Developer Needed",
    dateCreated: "22-01-2024",
    status: "Active",
    category: "Development",
    budget: 250000,
  },
  {
    id: 2,
    title: "UI/UX Designer",
    dateCreated: "15-02-2024",
    status: "Completed",
    category: "Design",
    budget: 180000,
  },
  {
    id: 3,
    title: "Content Writer for Blog Posts",
    dateCreated: "10-03-2024",
    status: "Active",
    category: "Writing",
    budget: 120000,
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

function UserDetails() {
  const { userId } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState(sampleUser)
  const [activeTab, setActiveTab] = useState("userInfo")
  const [activeSideTab, setActiveSideTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({ ...sampleUser })

  // In a real app, you would fetch the user data based on the userId
  useEffect(() => {
    // Fetch user data here
    console.log(`Fetching user data for ID: ${userId}`)
    // For now, we'll use the sample data
  }, [userId])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSaveChanges = () => {
    // In a real app, you would save the changes to the backend
    setUser(formData)
    setIsEditing(false)
    console.log("Saving user data:", formData)
  }

  const handleStatusToggle = () => {
    const newStatus = user.status === "active" ? "inactive" : "active"
    setUser({ ...user, status: newStatus })
    setFormData({ ...formData, status: newStatus })
  }

  // Course columns for the table
  const courseColumns = [
    { key: "name", label: "Course Name" },
    { key: "dateCreated", label: "Date Created" },
    { key: "status", label: "Status" },
    { key: "type", label: "Type" },
    { key: "price", label: "Price" },
    { key: "enrolled", label: "Enrolled" },
  ]

  // Gig columns for the table
  const gigColumns = [
    { key: "title", label: "Gig Title" },
    { key: "dateCreated", label: "Date Created" },
    { key: "status", label: "Status" },
    { key: "category", label: "Category" },
    { key: "budget", label: "Budget" },
  ]

  // Custom cell renderer for the tables
  const renderCustomCell = (key, value, item) => {
    if (key === "price" || key === "budget") {
      return `₦${value.toLocaleString()}`
    }

    if (key === "status") {
      return (
        <Badge
          variant={
            value.toLowerCase() === "active" ? "success" : value.toLowerCase() === "completed" ? "default" : "secondary"
          }
        >
          {value}
        </Badge>
      )
    }

    return value
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        {/* Header with gradient background */}
        <div className="relative bg-gradient-to-br from-purple-400 to-purple-500 rounded-lg p-6 pt-16 pb-32 mb-8 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-12 left-8">
            <span className="text-yellow-300 text-2xl">✦</span>
          </div>
          <div className="absolute top-24 right-12">
            <span className="text-yellow-300 text-xl">✦</span>
          </div>
          <div className="absolute bottom-16 right-8">
            <span className="text-white text-xl opacity-50">○</span>
          </div>

          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 flex items-center text-white hover:text-gray-200"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Back
          </button>
        </div>

        {/* User profile section */}
        <div className="relative -mt-24 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6 px-4">
            {/* Profile image */}
            <div className="z-10">
              <Avatar className="h-32 w-32 border-4 border-white">
                <AvatarImage src={user.avatar} alt={`${user.firstName} ${user.lastName}`} />
                <AvatarFallback>
                  {user.firstName.charAt(0)}
                  {user.lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* User info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold">{`${user.firstName} ${user.lastName} ${user.otherName || ""}`}</h1>
              <p className="text-gray-600">{user.email}</p>
              <div className="mt-2">
                <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
                  {user.userType}
                </Badge>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 mt-4 md:mt-0">
              <Button
                variant="outline"
                className={
                  user.status === "active"
                    ? "border-red-300 text-red-600 hover:bg-red-50"
                    : "border-green-300 text-green-600 hover:bg-green-50"
                }
                onClick={handleStatusToggle}
              >
                {user.status === "active" ? "Deactivate user" : "Activate User"}
              </Button>
              <Button className="bg-black hover:bg-black/90">
                {user.status === "active" ? "Activate User" : "Deactivate user"}
              </Button>
            </div>
          </div>
        </div>

        {/* Main tabs */}
        <Tabs defaultValue="userInfo" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="userInfo" className="px-6">
              User information
            </TabsTrigger>
            <TabsTrigger value="walletInfo" className="px-6">
              Wallet information
            </TabsTrigger>
            <TabsTrigger value="courses" className="px-6">
              Courses
            </TabsTrigger>
            <TabsTrigger value="gigs" className="px-6">
              Gigs
            </TabsTrigger>
          </TabsList>

          {/* User Information Tab */}
          <TabsContent value="userInfo" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Sidebar */}
              <div className="md:col-span-1">
                <div className="bg-white rounded-lg border p-4">
                  <nav className="space-y-1">
                    <button
                      className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm transition-colors ${
                        activeSideTab === "profile" ? "bg-primary/5 text-primary" : "text-gray-600 hover:bg-gray-100"
                      }`}
                      onClick={() => setActiveSideTab("profile")}
                    >
                      <User className="h-4 w-4" />
                      User profile
                    </button>
                    <button
                      className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm transition-colors ${
                        activeSideTab === "workSamples"
                          ? "bg-primary/5 text-primary"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                      onClick={() => setActiveSideTab("workSamples")}
                    >
                      <FileText className="h-4 w-4" />
                      Work Samples
                    </button>
                    <button
                      className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm transition-colors ${
                        activeSideTab === "changePassword"
                          ? "bg-primary/5 text-primary"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                      onClick={() => setActiveSideTab("changePassword")}
                    >
                      <Lock className="h-4 w-4" />
                      Change password
                    </button>
                  </nav>
                </div>
              </div>

              {/* Main content */}
              <div className="md:col-span-3">
                <div className="bg-white rounded-lg border p-6">
                  {activeSideTab === "profile" && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-xl font-semibold">User Profile</h2>
                        <p className="text-sm text-muted-foreground">Manage user profile information</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* First name */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium">First name</label>
                          <Input
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder="e.g John"
                          />
                        </div>

                        {/* Last name */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Last name</label>
                          <Input
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            placeholder="e.g Doe"
                          />
                        </div>

                        {/* Other name */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Other name <span className="text-muted-foreground">(optional)</span>
                          </label>
                          <Input
                            name="otherName"
                            value={formData.otherName || ""}
                            onChange={handleInputChange}
                            placeholder="e.g Stone"
                          />
                        </div>

                        {/* Age */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Age</label>
                          <Select value={formData.age} onValueChange={(value) => handleSelectChange("age", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="e.g 12years" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 83 }, (_, i) => i + 18).map((age) => (
                                <SelectItem key={age} value={`${age}years`}>
                                  {age} years
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Gender */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Gender</label>
                          <Select
                            value={formData.gender}
                            onValueChange={(value) => handleSelectChange("gender", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Male">Male</SelectItem>
                              <SelectItem value="Female">Female</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Phone number */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Phone number</label>
                          <Input
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="e.g 0810 000 0000"
                          />
                        </div>

                        {/* Email */}
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-sm font-medium">Email</label>
                          <Input
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="e.g johndoe@domainname.com"
                          />
                        </div>

                        {/* Brief bio */}
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-sm font-medium">Brief bio</label>
                          <Textarea
                            name="bio"
                            value={formData.bio || ""}
                            onChange={handleInputChange}
                            placeholder="Enter bio"
                            className="min-h-[100px]"
                          />
                        </div>
                      </div>

                      <Button onClick={handleSaveChanges} className="w-full bg-black hover:bg-black/90">
                        Save changes
                      </Button>
                    </div>
                  )}

                  {activeSideTab === "workSamples" && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-xl font-semibold">Work Samples</h2>
                        <p className="text-sm text-muted-foreground">View user's work samples</p>
                      </div>

                      <div className="p-12 border-2 border-dashed rounded-lg text-center">
                        <p className="text-muted-foreground">No work samples available</p>
                      </div>
                    </div>
                  )}

                  {activeSideTab === "changePassword" && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-xl font-semibold">Change Password</h2>
                        <p className="text-sm text-muted-foreground">Update user's password</p>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">New Password</label>
                          <Input type="password" placeholder="••••••••" />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">Confirm New Password</label>
                          <Input type="password" placeholder="••••••••" />
                        </div>
                      </div>

                      <Button className="w-full bg-black hover:bg-black/90">Update Password</Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Wallet Information Tab */}
          <TabsContent value="walletInfo" className="mt-0">
            <div className="bg-white rounded-lg border p-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold">Wallet Information</h2>
                  <p className="text-sm text-muted-foreground">View user's wallet details</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Wallet Balance */}
                  <div className="bg-green-50 rounded-lg p-6">
                    <h3 className="text-sm text-gray-600 mb-2">Wallet Balance</h3>
                    <p className="text-2xl font-bold">₦{user.walletBalance.toLocaleString()}</p>
                  </div>

                  {/* Total Earnings */}
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="text-sm text-gray-600 mb-2">Total Earnings</h3>
                    <p className="text-2xl font-bold">₦{user.totalEarnings.toLocaleString()}</p>
                  </div>

                  {/* Total Spent */}
                  <div className="bg-purple-50 rounded-lg p-6">
                    <h3 className="text-sm text-gray-600 mb-2">Total Spent</h3>
                    <p className="text-2xl font-bold">₦{user.totalSpent.toLocaleString()}</p>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">Recent Transactions</h3>
                  <div className="p-12 border-2 border-dashed rounded-lg text-center">
                    <p className="text-muted-foreground">No recent transactions</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses" className="mt-0">
            <div className="bg-white rounded-lg border p-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold">User Courses</h2>
                  <p className="text-sm text-muted-foreground">View courses created or enrolled by this user</p>
                </div>

                <Table
                  data={sampleCourses}
                  columns={courseColumns}
                  renderCustomCell={renderCustomCell}
                  showSearch={true}
                />
              </div>
            </div>
          </TabsContent>

          {/* Gigs Tab */}
          <TabsContent value="gigs" className="mt-0">
            <div className="bg-white rounded-lg border p-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold">User Gigs</h2>
                  <p className="text-sm text-muted-foreground">View gigs posted by this user</p>
                </div>

                <Table data={sampleGigs} columns={gigColumns} renderCustomCell={renderCustomCell} showSearch={true} />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}

export default UserDetails