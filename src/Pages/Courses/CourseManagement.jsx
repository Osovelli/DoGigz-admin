import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table } from "@/components/Table"

// Sample courses data
const coursesData = Array(50)
  .fill()
  .map((_, index) => ({
    id: index + 1,
    name: "Google Data Analytics Course",
    tutor: {
      name: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    students: "243,112",
    dateCreated: "22-01-2024",
    status: index % 3 === 0 ? "Ongoing" : index % 2 === 0 ? "Completed" : "Upcoming",
    courseType: index % 2 === 0 ? "1-on-1 class" : "Self Paced",
  }))

function CoursesManagement() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("all")

  // Filter courses based on active tab
  const filteredCourses = coursesData.filter((course) => {
    if (activeTab === "all") return true
    return activeTab === course.status.toLowerCase()
  })

  // Define table columns
  const columns = [
    { key: "name", label: "Course name" },
    { key: "tutor", label: "Tutor" },
    { key: "students", label: "Students" },
    { key: "dateCreated", label: "Date Created" },
    { key: "status", label: "Status" },
    { key: "courseType", label: "Course Type" },
  ]

  // Custom cell renderer
  const renderCustomCell = (key, value, course) => {
    if (key === "tutor") {
      return (
        <div className="flex items-center">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src={course.tutor.avatar || "/placeholder.svg"} alt={course.tutor.name} />
            <AvatarFallback>{course.tutor.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span>{course.tutor.name}</span>
        </div>
      )
    }

    if (key === "status") {
      const statusConfig = {
        Ongoing: { color: "red", bg: "bg-red-100" },
        Completed: { color: "green", bg: "bg-green-100" },
        Upcoming: { color: "yellow", bg: "bg-yellow-100" },
      }

      const config = statusConfig[value] || { color: "gray", bg: "bg-gray-100" }

      return (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm ${config.bg} text-${config.color}-800`}
        >
          <span className={`w-1.5 h-1.5 rounded-full bg-${config.color}-500 mr-1.5`}></span>
          {value}
        </span>
      )
    }

    return value
  }

  // Custom actions renderer
  const renderActions = (course) => {
    return (
      <Button variant="outline" size="sm" onClick={() => handleOpenCourse(course)}>
        Open
      </Button>
    )
  }

  // Handle opening a course
  const handleOpenCourse = (course) => {
    navigate(`/dashboard/courses/${course.id}`, { state: { course } })
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Courses</h1>
          <p className="text-gray-500">Manage all courses here</p>
        </div>

        {/* Tabs */}
        <div className="flex bg-gray-100 rounded-lg p-1 w-full md:w-auto mb-6">
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeTab === "all" ? "bg-white shadow" : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => setActiveTab("all")}
          >
            All Gigs
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeTab === "ongoing" ? "bg-white shadow" : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => setActiveTab("ongoing")}
          >
            Ongoing
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeTab === "upcoming" ? "bg-white shadow" : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => setActiveTab("upcoming")}
          >
            Upcoming
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeTab === "completed" ? "bg-white shadow" : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => setActiveTab("completed")}
          >
            Completed
          </button>
        </div>

        {/* Courses Table */}
        <Table
          data={filteredCourses}
          columns={columns}
          renderCustomCell={renderCustomCell}
          renderActions={renderActions}
          showSearch={true}
          itemsPerPage={8}
          name="Courses"
          className="bg-white rounded-lg"
        />
      </div>
    </>
  )
}

export default CoursesManagement
