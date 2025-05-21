import { useState, useEffect } from "react"
import { useParams, useNavigate, Link, Outlet, useLocation } from "react-router-dom"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import AdminLayout from "@/components/Dashboard/DashboardLayout"

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
    "/Avatar (10).png",
  walletBalance: 250000,
  totalEarnings: 1500000,
  totalSpent: 750000,
  joinedDate: "January 2022",
}

function UserDetailsLayout() {
  const { userId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [user, setUser] = useState(sampleUser)

  // In a real app, you would fetch the user data based on the userId
  useEffect(() => {
    // Fetch user data here
    console.log(`Fetching user data for ID: ${userId}`)
    // For now, we'll use the sample data
  }, [userId])

  const handleStatusToggle = () => {
    const newStatus = user.status === "active" ? "inactive" : "active"
    setUser({ ...user, status: newStatus })
  }

  // Determine active tab based on current path
  const getActiveTab = () => {
    const path = location.pathname
    if (path.includes("/wallet")) return "wallet"
    if (path.includes("/courses")) return "courses"
    if (path.includes("/gigs")) return "gigs"
    return "info" // default tab
  }

  const activeTab = getActiveTab()

  return (
    <>
      <div className="mx-auto px-4 py-8">
        {/* Header with gradient background */}
        <div className="relative rounded-lg p-6 pt-16 pb-32 overflow-hidden">
          {/* Decorative elements */}
          <img
            src="/background.png"
            alt="Decorative background"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />

          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 flex items-center text-black font-medium hover:text-gray-600"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Back
          </button>
        </div>

        {/* User profile section */}
        <div className="relative ">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 px-4">
            {/* Profile image */}
            <div className="relative z-10">
              <Avatar className="absolute -bottom-2 left-0 h-32 w-32 border-4 border-white">
                <AvatarImage src={user.avatar} alt={`${user.firstName} ${user.lastName}`} />
                <AvatarFallback>
                  {user.firstName.charAt(0)}
                  {user.lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* User info */}
            <div className="relative flex-1 md:ml-32">
              <h1 className="text-3xl font-bold">{`${user.firstName} ${user.lastName} ${user.otherName || ""}`}</h1>
              <p className="text-gray-600">{user.email}</p>
              <div className="mt-2">
                <Badge variant="outline" className="bg-emerald-100 text-emerald-800 border-emerald-200">
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

        {/* Tab Navigation */}
        <div className="border-b mb-8 md:mt-4">
          <div className="flex overflow-x-auto">
            <Link
              to={`/admin/users/${userId}`}
              className={`px-6 py-3 font-medium text-sm whitespace-nowrap ${
                activeTab === "info" ? "border-b-2 border-primary text-primary" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              User information
            </Link>
            <Link
              to={`/dashboard/user-management/${userId}/wallet`}
              className={`px-6 py-3 font-medium text-sm whitespace-nowrap ${
                activeTab === "wallet" ? "border-b-2 border-primary text-primary" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Wallet information
            </Link>
            <Link
              to={`/dashboard/user-management/${userId}/courses`}
              className={`px-6 py-3 font-medium text-sm whitespace-nowrap ${
                activeTab === "courses" ? "border-b-2 border-primary text-primary" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Courses
            </Link>
            <Link
              to={`/dashboard/user-management/${userId}/gigs`}
              className={`px-6 py-3 font-medium text-sm whitespace-nowrap ${
                activeTab === "gigs" ? "border-b-2 border-primary text-primary" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Gigs
            </Link>
          </div>
        </div>

        {/* Content Area - Will be filled by the child routes */}
        <Outlet context={{ user, setUser }} />
      </div>
    </>
  )
}

export default UserDetailsLayout
