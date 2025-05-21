import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import { User, FileText, Lock, BriefcaseBusiness } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import UserWorkSamples from "../Dashboard/UserWorkSample"
import UserChangePassword from "../Dashboard/UserChangePassword"
import UserCV from "../Dashboard/UserCV"
import CustomButton from "@/components/CustomButton"

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

function ProfileInfo() {
  // Use the context with a fallback in case it's undefined
  //const context = useOutletContext() || {}
  //const { user = {}, setUser = () => {} } = context

  const [activeSideTab, setActiveSideTab] = useState("profile")
  const [formData, setFormData] = useState({})

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
    console.log("Saving user data:", formData)
  }

  return (
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
                activeSideTab === "changePassword" ? "bg-primary/5 text-primary" : "text-gray-600 hover:bg-gray-100"
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
                    value={formData.firstName || ""}
                    onChange={handleInputChange}
                    placeholder="e.g John"
                  />
                </div>

                {/* Last name */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last name</label>
                  <Input
                    name="lastName"
                    value={formData.lastName || ""}
                    onChange={handleInputChange}
                    placeholder="e.g Doe"
                  />
                </div>

                {/* Other name */}
                {/* <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Other name <span className="text-muted-foreground">(optional)</span>
                  </label>
                  <Input
                    name="otherName"
                    value={formData.otherName || ""}
                    onChange={handleInputChange}
                    placeholder="e.g Stone"
                  />
                </div> */}

                {/* Age */}
                {/* <div className="space-y-2">
                  <label className="text-sm font-medium">Age</label>
                  <Select value={formData.age || ""} onValueChange={(value) => handleSelectChange("age", value)}>
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
                </div> */}

                {/* Gender */}
                {/* <div className="space-y-2">
                  <label className="text-sm font-medium">Gender</label>
                  <Select value={formData.gender || ""} onValueChange={(value) => handleSelectChange("gender", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div> */}

                {/* Phone number */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone number</label>
                  <Input
                    name="phone"
                    value={formData.phone || ""}
                    onChange={handleInputChange}
                    placeholder="e.g 0810 000 0000"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    name="email"
                    value={formData.email || ""}
                    onChange={handleInputChange}
                    placeholder="e.g johndoe@domainname.com"
                  />
                </div>

                {/* Brief bio */}
                {/* <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium">Brief bio</label>
                  <Textarea
                    name="bio"
                    value={formData.bio || ""}
                    onChange={handleInputChange}
                    placeholder="Enter bio"
                    className="min-h-[100px]"
                  />
                </div> */}
              </div>

              <CustomButton onClick={handleSaveChanges} className="w-full bg-black hover:bg-black/90">
                Save changes
              </CustomButton>
            </div>
          )}
          {activeSideTab === "changePassword" && (
            <UserChangePassword />
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfileInfo
