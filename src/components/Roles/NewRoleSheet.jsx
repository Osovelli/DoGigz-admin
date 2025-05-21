import { useState } from "react"
import { X, ChevronDown, ChevronUp } from "lucide-react"

const NewRoleSheet = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    permissions: {
      Dashboard: {
        Create: false,
        Read: false,
        Update: false,
        Delete: false,
      },
      UserManagement: {
        Create: false,
        Read: false,
        Update: false,
        Delete: false,
      },
      Courses: {
        Create: false,
        Read: false,
        Update: false,
        Delete: false,
      },
      Transactions: {
        Create: false,
        Read: false,
        Update: false,
        Delete: false,
      },
      Jobs: {
        Create: false,
        Read: false,
        Update: false,
        Delete: false,
      },
      Promo: {
        Create: false,
        Read: false,
        Update: false,
        Delete: false,
      },
      ChatManagement: {
        Create: false,
        Read: false,
        Update: false,
        Delete: false,
      },
      RolesAndPermissions: {
        Create: false,
        Read: false,
        Update: false,
        Delete: false,
      },
      WebsiteSettings: {
        Create: false,
        Read: false,
        Update: false,
        Delete: false,
      },
    },
  })

  const [expandedSections, setExpandedSections] = useState({
    Dashboard: true,
    UserManagement: false,
    Courses: false,
    Transactions: false,
    Jobs: false,
    Promo: false,
    ChatManagement: false,
    RolesAndPermissions: false,
    WebsiteSettings: false,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePermissionChange = (section, permission) => {
    setFormData((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [section]: {
          ...prev.permissions[section],
          [permission]: !prev.permissions[section][permission],
        },
      },
    }))
  }

  const handleSelectAll = (section) => {
    const allSelected = Object.values(formData.permissions[section]).every((value) => value)

    setFormData((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [section]: {
          Create: !allSelected,
          Read: !allSelected,
          Update: !allSelected,
          Delete: !allSelected,
        },
      },
    }))
  }

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Role created:", formData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>

      <div className="absolute inset-y-0 right-0 max-w-md w-full bg-white shadow-xl flex flex-col">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">New Admin User</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <form onSubmit={handleSubmit}>
            {/* Role name */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Role name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g Manager"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Role description */}
            <div className="mb-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Role Description
              </label>
              <input
                type="text"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="e.g Manager"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Permissions */}
            <div className="border border-gray-200 rounded-md mb-6">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-medium">Permissions</h3>
              </div>

              {/* Dashboard permissions */}
              <div className="border-b border-gray-200">
                <div
                  className="flex justify-between items-center p-4 cursor-pointer"
                  onClick={() => toggleSection("Dashboard")}
                >
                  <h4 className="font-medium">Dashboard</h4>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="dashboard-select-all"
                      checked={Object.values(formData.permissions.Dashboard).every((value) => value)}
                      onChange={() => handleSelectAll("Dashboard")}
                      className="mr-2 h-4 w-4"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <label htmlFor="dashboard-select-all" className="text-sm mr-2" onClick={(e) => e.stopPropagation()}>
                      Select all
                    </label>
                    {expandedSections.Dashboard ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>

                {expandedSections.Dashboard && (
                  <div className="p-4 pt-0 grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="dashboard-create"
                        checked={formData.permissions.Dashboard.Create}
                        onChange={() => handlePermissionChange("Dashboard", "Create")}
                        className="mr-2 h-4 w-4"
                      />
                      <label htmlFor="dashboard-create" className="text-sm">
                        Create
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="dashboard-read"
                        checked={formData.permissions.Dashboard.Read}
                        onChange={() => handlePermissionChange("Dashboard", "Read")}
                        className="mr-2 h-4 w-4"
                      />
                      <label htmlFor="dashboard-read" className="text-sm">
                        Read
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="dashboard-update"
                        checked={formData.permissions.Dashboard.Update}
                        onChange={() => handlePermissionChange("Dashboard", "Update")}
                        className="mr-2 h-4 w-4"
                      />
                      <label htmlFor="dashboard-update" className="text-sm">
                        Update
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="dashboard-delete"
                        checked={formData.permissions.Dashboard.Delete}
                        onChange={() => handlePermissionChange("Dashboard", "Delete")}
                        className="mr-2 h-4 w-4"
                      />
                      <label htmlFor="dashboard-delete" className="text-sm">
                        Delete
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* User Management permissions */}
              <div className="border-b border-gray-200">
                <div
                  className="flex justify-between items-center p-4 cursor-pointer"
                  onClick={() => toggleSection("UserManagement")}
                >
                  <h4 className="font-medium">User Management</h4>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="user-management-select-all"
                      checked={Object.values(formData.permissions.UserManagement).every((value) => value)}
                      onChange={() => handleSelectAll("UserManagement")}
                      className="mr-2 h-4 w-4"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <label
                      htmlFor="user-management-select-all"
                      className="text-sm mr-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Select all
                    </label>
                    {expandedSections.UserManagement ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>

                {expandedSections.UserManagement && (
                  <div className="p-4 pt-0 grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="user-management-create"
                        checked={formData.permissions.UserManagement.Create}
                        onChange={() => handlePermissionChange("UserManagement", "Create")}
                        className="mr-2 h-4 w-4"
                      />
                      <label htmlFor="user-management-create" className="text-sm">
                        Create
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="user-management-read"
                        checked={formData.permissions.UserManagement.Read}
                        onChange={() => handlePermissionChange("UserManagement", "Read")}
                        className="mr-2 h-4 w-4"
                      />
                      <label htmlFor="user-management-read" className="text-sm">
                        Read
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="user-management-update"
                        checked={formData.permissions.UserManagement.Update}
                        onChange={() => handlePermissionChange("UserManagement", "Update")}
                        className="mr-2 h-4 w-4"
                      />
                      <label htmlFor="user-management-update" className="text-sm">
                        Update
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="user-management-delete"
                        checked={formData.permissions.UserManagement.Delete}
                        onChange={() => handlePermissionChange("UserManagement", "Delete")}
                        className="mr-2 h-4 w-4"
                      />
                      <label htmlFor="user-management-delete" className="text-sm">
                        Delete
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* Courses permissions */}
              <div className="border-b border-gray-200">
                <div
                  className="flex justify-between items-center p-4 cursor-pointer"
                  onClick={() => toggleSection("Courses")}
                >
                  <h4 className="font-medium">Courses</h4>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="courses-select-all"
                      checked={Object.values(formData.permissions.Courses).every((value) => value)}
                      onChange={() => handleSelectAll("Courses")}
                      className="mr-2 h-4 w-4"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <label htmlFor="courses-select-all" className="text-sm mr-2" onClick={(e) => e.stopPropagation()}>
                      Select all
                    </label>
                    {expandedSections.Courses ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>

                {expandedSections.Courses && (
                  <div className="p-4 pt-0 grid grid-cols-2 gap-4">
                    {/* Courses CRUD permissions */}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="courses-create"
                        checked={formData.permissions.Courses.Create}
                        onChange={() => handlePermissionChange("Courses", "Create")}
                        className="mr-2 h-4 w-4"
                      />
                      <label htmlFor="courses-create" className="text-sm">
                        Create
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="courses-read"
                        checked={formData.permissions.Courses.Read}
                        onChange={() => handlePermissionChange("Courses", "Read")}
                        className="mr-2 h-4 w-4"
                      />
                      <label htmlFor="courses-read" className="text-sm">
                        Read
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="courses-update"
                        checked={formData.permissions.Courses.Update}
                        onChange={() => handlePermissionChange("Courses", "Update")}
                        className="mr-2 h-4 w-4"
                      />
                      <label htmlFor="courses-update" className="text-sm">
                        Update
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="courses-delete"
                        checked={formData.permissions.Courses.Delete}
                        onChange={() => handlePermissionChange("Courses", "Delete")}
                        className="mr-2 h-4 w-4"
                      />
                      <label htmlFor="courses-delete" className="text-sm">
                        Delete
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* Transactions permissions */}
              <div className="border-b border-gray-200">
                <div
                  className="flex justify-between items-center p-4 cursor-pointer"
                  onClick={() => toggleSection("Transactions")}
                >
                  <h4 className="font-medium">Transactions</h4>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="transactions-select-all"
                      checked={Object.values(formData.permissions.Transactions).every((value) => value)}
                      onChange={() => handleSelectAll("Transactions")}
                      className="mr-2 h-4 w-4"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <label
                      htmlFor="transactions-select-all"
                      className="text-sm mr-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Select all
                    </label>
                    {expandedSections.Transactions ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>

                {expandedSections.Transactions && (
                  <div className="p-4 pt-0 grid grid-cols-2 gap-4">
                    {/* Transactions CRUD permissions */}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="transactions-create"
                        checked={formData.permissions.Transactions.Create}
                        onChange={() => handlePermissionChange("Transactions", "Create")}
                        className="mr-2 h-4 w-4"
                      />
                      <label htmlFor="transactions-create" className="text-sm">
                        Create
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="transactions-read"
                        checked={formData.permissions.Transactions.Read}
                        onChange={() => handlePermissionChange("Transactions", "Read")}
                        className="mr-2 h-4 w-4"
                      />
                      <label htmlFor="transactions-read" className="text-sm">
                        Read
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="transactions-update"
                        checked={formData.permissions.Transactions.Update}
                        onChange={() => handlePermissionChange("Transactions", "Update")}
                        className="mr-2 h-4 w-4"
                      />
                      <label htmlFor="transactions-update" className="text-sm">
                        Update
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="transactions-delete"
                        checked={formData.permissions.Transactions.Delete}
                        onChange={() => handlePermissionChange("Transactions", "Delete")}
                        className="mr-2 h-4 w-4"
                      />
                      <label htmlFor="transactions-delete" className="text-sm">
                        Delete
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* Jobs permissions */}
              <div className="border-b border-gray-200">
                <div
                  className="flex justify-between items-center p-4 cursor-pointer"
                  onClick={() => toggleSection("Jobs")}
                >
                  <h4 className="font-medium">Jobs</h4>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="jobs-select-all"
                      checked={Object.values(formData.permissions.Jobs).every((value) => value)}
                      onChange={() => handleSelectAll("Jobs")}
                      className="mr-2 h-4 w-4"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <label htmlFor="jobs-select-all" className="text-sm mr-2" onClick={(e) => e.stopPropagation()}>
                      Select all
                    </label>
                    {expandedSections.Jobs ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>

                {expandedSections.Jobs && (
                  <div className="p-4 pt-0 grid grid-cols-2 gap-4">
                    {/* Jobs CRUD permissions */}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="jobs-create"
                        checked={formData.permissions.Jobs.Create}
                        onChange={() => handlePermissionChange("Jobs", "Create")}
                        className="mr-2 h-4 w-4"
                      />
                      <label htmlFor="jobs-create" className="text-sm">
                        Create
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="jobs-read"
                        checked={formData.permissions.Jobs.Read}
                        onChange={() => handlePermissionChange("Jobs", "Read")}
                        className="mr-2 h-4 w-4"
                      />
                      <label htmlFor="jobs-read" className="text-sm">
                        Read
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="jobs-update"
                        checked={formData.permissions.Jobs.Update}
                        onChange={() => handlePermissionChange("Jobs", "Update")}
                        className="mr-2 h-4 w-4"
                      />
                      <label htmlFor="jobs-update" className="text-sm">
                        Update
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="jobs-delete"
                        checked={formData.permissions.Jobs.Delete}
                        onChange={() => handlePermissionChange("Jobs", "Delete")}
                        className="mr-2 h-4 w-4"
                      />
                      <label htmlFor="jobs-delete" className="text-sm">
                        Delete
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* Remaining permission sections */}
              {/* Promo, Chat Management, Roles and Permissions, Website Settings */}
              {/* Following the same pattern as above */}
            </div>
          </form>
        </div>

        <div className="p-6 border-t flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 rounded-full text-gray-800 font-medium"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2 bg-black text-white rounded-full font-medium"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default NewRoleSheet
