import { Link, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Receipt,
  Briefcase,
  Percent,
  MessageSquare,
  ShieldCheck,
  Globe,
  User,
  LogOut,
} from "lucide-react"
import { cn } from "../../lib/utils"

function Sidebar({ open, onClose }) {
  const location = useLocation()

  const navigation = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      current: location.pathname === "/dashboard",
    },
    {
      name: "User Management",
      icon: Users,
      href: "/dashboard/user-management",
      current: location.pathname.includes("/dashboard/user-management"),
    },
    {
      name: "Courses",
      icon: GraduationCap,
      href: "/dashboard/courses",
      current: location.pathname.includes("/dashboard/courses"),
    },
    {
      name: "Transactions",
      icon: Receipt,
      href: "/dashboard/transactions",
      current: location.pathname.includes("/dashboard/transactions"),
    },
    {
      name: "Gigs",
      icon: Briefcase,
      href: "/dashboard/gigs",
      current: location.pathname.includes("/dashboard/gigs"),
    },
    {
      name: "Promo",
      icon: Percent,
      href: "/dashboard/promo",
      current: location.pathname.includes("/dashboard/promo"),
    },
    {
      name: "Chat Management",
      icon: MessageSquare,
      href: "/dashboard/chat",
      current: location.pathname.includes("/dashboard/chat"),
    },
  ]

  const settingsNavigation = [
    {
      name: "Roles and Permissions",
      icon: ShieldCheck,
      href: "/dashboard/roles",
      current: location.pathname.includes("/dashboard/roles"),
    },
    {
      name: "Website Settings",
      icon: Globe,
      href: "/dashboard/settings",
      current: location.pathname.includes("/dashboard/settings"),
    },
    {
      name: "My Profile",
      icon: User,
      href: "/dashboard/profile",
      current: location.pathname.includes("/dashboard/profile"),
    },
  ]

  return (
    <>
      {/* Backdrop */}
      {open && <div className="fixed inset-0 bg-black/50 lg:hidden z-40" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform duration-200 ease-in-out lg:transform-none",
          !open && "-translate-x-full",
        )}
      >
        {/* Logo */}
        <div className="py-6 sm:py-3 px-4">
          <Link to="/dashboard" className="flex flex-col">
            <span className="text-xl font-bold">DoGigz</span>
            <span className="text-xs text-gray-500 uppercase tracking-wider">Administrative Panel</span>
          </Link>
        </div>

        {/* Main Navigation */}
        <nav className="px-3 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                item.current ? "bg-emerald-200 text-emerald-500" : "text-gray-700 hover:bg-gray-100",
              )}
              onClick={onClose}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Settings Section */}
        <div className="mt-8">
          <h3 className="text-sm font-medium text-gray-500 px-3 mb-2">Settings</h3>
          <nav className="px-3 space-y-1">
            {settingsNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  item.current ? "bg-emerald-200 text-emerald-500" : "text-gray-700 hover:bg-gray-100",
                )}
                onClick={onClose}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Admin Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <img
                  src="/avatar.jpeg"
                  alt="Abayomi Olowu"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-sm">Abayomi Olowu</p>
                <p className="text-xs text-gray-500 truncate">abayomiolowu@Giggerz.com</p>
              </div>
            </div>
            <button
              className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
              onClick={() => {
                /* Add logout handler */
                console.log("Logout clicked")
              }}
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar

