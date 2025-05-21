import { useState } from "react"
import { Menu } from "lucide-react"
import { Outlet, useNavigate } from "react-router-dom"
import CustomButton from "../CustomButton"
import Sidebar from "./Sidebar"
import { Avatar } from "../ui/avatar"
import { Logo } from "../Icons/Logo"
import ProfileViewer from "./ProfileViewer"

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isSignedOut, setIsSignedOut] = useState(false)

  const navigate = useNavigate()


  const handleSignOut = () => {
    navigate("/signin")

    setIsSignedOut(true)
    setTimeout(() => {
      alert("User signed out successfully!")
      setIsSignedOut(false)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      

      {/* Header */}
      <div className="sticky top-0 z-50 flex items-center justify-between p-4 bg-white shadow-md  lg:hidden">
        {/* Mobile Sidebar Toggle */}
        <CustomButton
          variant="ghost"
          size="icon"
          className="top-4 left-4 z-50 lg:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="h-6 w-6 text-black/40" />
        </CustomButton>

        <span className="text-xl font-bold">DoGigz</span>

        <ProfileViewer
          avatarUrl="/avatar.png"
          username="Abayomi Olowu"
          profileLink="/dashboard/profile"
          onSignOut={handleSignOut}
        />

      </div>
      
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="lg:pl-64">
        <main className="p-4 md:p-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout