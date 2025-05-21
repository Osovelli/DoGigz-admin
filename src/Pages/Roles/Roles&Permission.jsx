import { useState } from "react"
import { Plus, Search } from "lucide-react"
import NewAdminUserSheet from "@/components/Roles/NewAdminSheet"
import NewRoleSheet from "@/components/Roles/NewRoleSheet"
import Table from "@/components/Table"

const RolesAndPermissions = () => {
  const [isNewAdminUserSheetOpen, setIsNewAdminUserSheetOpen] = useState(false)
  const [isNewRoleSheetOpen, setIsNewRoleSheetOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState(null)
  const [activeTab, setActiveTab] = useState("all")

  // Sample data for roles
  const roles = [
    { id: 1, name: "Super Admin", description: "Full access to all features", users: 1 },
    { id: 2, name: "Manager", description: "Can manage users and content", users: 2 },
    { id: 3, name: "Operations", description: "Can handle day-to-day operations", users: 6 },
    { id: 4, name: "Content Editor", description: "Can edit and publish content", users: 2 },
    { id: 5, name: "Support", description: "Can handle customer support", users: 3 },
  ]

  // Sample data for admins
  const admins = [
    {
      id: 1,
      name: "John Doe Yamal",
      email: "johndoe@gmail.com",
      role: "Super Admin",
      lastLogin: "Oct 23 2024 17:02pm",
      status: "Active",
    },
    {
      id: 2,
      name: "John Doe Yamal",
      email: "johndoe@gmail.com",
      role: "Manager",
      lastLogin: "Oct 23 2024 17:02pm",
      status: "Active",
    },
    {
      id: 3,
      name: "John Doe Yamal",
      email: "johndoe@gmail.com",
      role: "Operations",
      lastLogin: "Oct 23 2024 17:02pm",
      status: "Inactive",
    },
    {
      id: 4,
      name: "John Doe Yamal",
      email: "johndoe@gmail.com",
      role: "Super Admin",
      lastLogin: "Oct 23 2024 17:02pm",
      status: "Active",
    },
    {
      id: 5,
      name: "John Doe Yamal",
      email: "johndoe@gmail.com",
      role: "Manager",
      lastLogin: "Oct 23 2024 17:02pm",
      status: "Active",
    },
    {
      id: 6,
      name: "John Doe Yamal",
      email: "johndoe@gmail.com",
      role: "Operations",
      lastLogin: "Oct 23 2024 17:02pm",
      status: "Inactive",
    },
    {
      id: 7,
      name: "John Doe Yamal",
      email: "johndoe@gmail.com",
      role: "Content Editor",
      lastLogin: "Oct 23 2024 17:02pm",
      status: "Active",
    },
    {
      id: 8,
      name: "John Doe Yamal",
      email: "johndoe@gmail.com",
      role: "Support",
      lastLogin: "Oct 23 2024 17:02pm",
      status: "Active",
    },
  ]

  const handleOpenNewAdminUserSheet = (role) => {
    setSelectedRole(role)
    setIsNewAdminUserSheetOpen(true)
  }

  const handleOpenNewRoleSheet = () => {
    setIsNewRoleSheetOpen(true)
  }

  const filteredAdmins = activeTab === "all" ? admins : admins.filter((admin) => admin.role === activeTab)

  const columns = [
    {
      label: "Admin ID",
      key: "id",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full overflow-hidden">
            <img src={`/placeholder.svg?height=40&width=40`} alt={row.name} className="h-full w-full object-cover" />
          </div>
          <span>{row.name}</span>
        </div>
      ),
      sortable: true,
    },
    {
      label: "Email",
      key: "email",
      sortable: true,
    },
    {
      label: "Role",
      key: "role",
      sortable: true,
    },
    {
      label: "Last Login",
      key: "lastLogin",
      sortable: true,
    },
    {
      label: "Status",
      key: "status",
      cell: (row) => (
        <div className="flex items-center">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              row.status === "Active" ? "text-green-800 bg-green-100" : "text-red-800 bg-red-100"
            }`}
          >
            <span
              className={`mr-1.5 h-2 w-2 rounded-full ${row.status === "Active" ? "bg-green-500" : "bg-red-500"}`}
            ></span>
            {row.status}
          </span>
        </div>
      ),
      sortable: true,
    },
    {
      header: "",
      accessor: "actions",
      cell: (row) => (
        <button
          className="px-4 py-1 border border-gray-300 rounded-md hover:bg-gray-50"
          onClick={() => console.log("Open admin details", row.id)}
        >
          Open
        </button>
      ),
    },
  ]

  return (
    <>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-semibold">Roles and Permissions</h1>
            <p className="text-gray-500">Manage admin roles and permissions</p>
          </div>
          <button
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full"
            onClick={handleOpenNewRoleSheet}
          >
            <Plus size={20} />
            Create Role
          </button>
        </div>

        {/* Role cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div
            className={`p-4 border rounded-lg cursor-pointer ${activeTab === "all" ? "bg-gray-100 border-gray-400" : "border-gray-200"}`}
            onClick={() => setActiveTab("all")}
          >
            <p className="text-sm text-gray-500">{admins.length} Accounts</p>
            <h3 className="text-lg font-medium">All Admins</h3>
          </div>

          {roles.map((role) => (
            <div
              key={role.id}
              className={`p-4 border rounded-lg cursor-pointer ${activeTab === role.name ? "bg-gray-100 border-gray-400" : "border-gray-200"}`}
              onClick={() => setActiveTab(role.name)}
            >
              <p className="text-sm text-gray-500">
                {role.users} {role.users === 1 ? "Account" : "Accounts"}
              </p>
              <h3 className="text-lg font-medium">{role.name}</h3>
            </div>
          ))}
        </div>

        {/* Role tabs */}
        <div className="flex border-b mb-4 overflow-x-auto">
          <button
            className={`px-4 py-2 font-medium ${activeTab === "all" ? "text-emerald-600 border-b-2 border-emerald-600" : "text-gray-500"}`}
            onClick={() => setActiveTab("all")}
          >
            All Admins
          </button>
          {roles.map((role) => (
            <button
              key={role.id}
              className={`px-4 py-2 font-medium ${activeTab === role.name ? "text-emerald-600 border-b-2 border-emerald-600" : "text-gray-500"}`}
              onClick={() => setActiveTab(role.name)}
            >
              {role.name}
            </button>
          ))}
        </div>

        {/* Search and Add Admin */}
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <button
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full"
            onClick={() => handleOpenNewAdminUserSheet(null)}
          >
            <Plus size={20} />
            Add Admin
          </button>
        </div>

        {/* Admin table */}
        <Table
          columns={columns}
          data={filteredAdmins}
          pagination={{
            totalPages: 16,
            currentPage: 1,
            onPageChange: (page) => console.log("Page changed to", page),
            itemsPerPage: 8,
            onItemsPerPageChange: (count) => console.log("Items per page changed to", count),
          }}
        />
      </div>

      {/* New Admin User Sheet */}
      <NewAdminUserSheet
        isOpen={isNewAdminUserSheetOpen}
        onClose={() => setIsNewAdminUserSheetOpen(false)}
        selectedRole={selectedRole}
        roles={roles}
      />

      {/* New Role Sheet */}
      <NewRoleSheet isOpen={isNewRoleSheetOpen} onClose={() => setIsNewRoleSheetOpen(false)} />
    </>
  )
}

export default RolesAndPermissions
