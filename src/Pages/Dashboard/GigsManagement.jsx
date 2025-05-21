import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table } from "@/components/Table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useNavigate } from "react-router-dom"

// Sample gigs data
const sampleGigs = Array(50)
  .fill()
  .map((_, index) => ({
    id: index + 1,
    jobTitle: "Design Company Profile",
    jobPoster: {
      name: "John Doe Yamal",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    applicants: 12,
    datePosted: "22-01-2024",
    status: index % 8 === 0 ? "Closed" : index % 3 === 0 ? "Completed" : "Ongoing",
    amount: "₦20,000.00",
  }))

function GigsManagement() {
  const [activeTab, setActiveTab] = useState("all")
  const navigate = useNavigate()

  // Filter gigs based on active tab
  const filteredGigs = sampleGigs.filter((gig) => {
    if (activeTab === "all") return true
    return gig.status.toLowerCase() === activeTab.toLowerCase()
  })

  // Define columns for the table
  const columns = [
    { key: "jobTitle", label: "Job Title" },
    { key: "jobPoster", label: "Job Poster" },
    { key: "applicants", label: "Applicants" },
    { key: "datePosted", label: "Date Posted" },
    { key: "status", label: "Status" },
    { key: "amount", label: "Amount" },
  ]

  // Custom cell renderer for the table
  const renderCustomCell = (key, value, gig) => {
    if (key === "jobPoster") {
      return (
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={gig.jobPoster.avatar || "/placeholder.svg"} alt={gig.jobPoster.name} />
            <AvatarFallback>{gig.jobPoster.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span>{gig.jobPoster.name}</span>
        </div>
      )
    }

    if (key === "status") {
      if (value === "Ongoing") {
        return (
          <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
            {value}
          </span>
        )
      } else if (value === "Completed") {
        return (
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            {value}
          </span>
        )
      } else if (value === "Closed") {
        return (
          <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
            {value}
          </span>
        )
      }
    }

    return value
  }

  // Custom actions renderer for the table
  const renderActions = (gig) => {
    return (
      <div className="flex justify-end">
        <Button variant="outline" size="sm" onClick={() => handleOpenGig(gig)} className="text-gray-700">
          Open
        </Button>
      </div>
    )
  }

  const handleOpenGig = (gig) => {
    // Navigate to gig details page (would be implemented in a real app)
    console.log("Opening gig:", gig)
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Gig Management</h1>
          <p className="text-gray-500">Manage all gigs in the system</p>
        </div>

        {/* Tabs */}
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
                activeTab === "ongoing" ? "border-b-2 border-primary text-primary font-medium" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("ongoing")}
            >
              Ongoing
            </button>
            <button
              className={`pb-2 px-4 ${
                activeTab === "completed" ? "border-b-2 border-primary text-primary font-medium" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("completed")}
            >
              Completed
            </button>
            <button
              className={`pb-2 px-4 ${
                activeTab === "closed" ? "border-b-2 border-primary text-primary font-medium" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("closed")}
            >
              Closed
            </button>
          </div>

          <div className="flex w-full md:w-auto gap-2">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Gig
            </Button>
          </div>
        </div>

        {/* Gigs Table */}
        <Table
          data={filteredGigs}
          columns={columns}
          renderCustomCell={renderCustomCell}
          renderActions={renderActions}
          name="Gigs"
          itemsPerPage={8}
          showSearch={true}
          filterOptions={{
            status: ["Ongoing", "Completed", "Closed"],
            amount: ["₦10,000 - ₦20,000", "₦20,000 - ₦50,000", "Above ₦50,000"],
          }}
        />
      </div>
    </>
  )
}

export default GigsManagement
