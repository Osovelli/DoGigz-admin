import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table } from "@/components/Table"
import { Play, Star } from "lucide-react"
import DisableCourseModal from "@/components/Modals.jsx/Course/DisableCourseModal"
import { toast } from "react-hot-toast"

// Sample students data
const studentsData = Array(20)
  .fill()
  .map((_, index) => ({
    id: index + 1,
    name: "John Doe Yamal",
    avatar: "/placeholder.svg?height=40&width=40",
    email: "johndoe@gmail.com",
    gender: index % 2 === 0 ? "Male" : "Female",
  }))

// Sample course sections data
const courseSections = [
  {
    title: "SECTION 1",
    lessons: [
      { id: 1, title: "Title goes in here", duration: "5:55" },
      { id: 2, title: "Title goes in here", duration: "5:55", active: true },
      { id: 3, title: "Title goes in here", duration: "5:55" },
      { id: 4, title: "Title goes in here", duration: "5:55" },
      { id: 5, title: "Title goes in here", duration: "5:55" },
      { id: 6, title: "Title goes in here", duration: "5:55" },
      { id: 7, title: "Title goes in here", duration: "5:55" },
    ],
  },
  {
    title: "SECTION 2",
    lessons: [
      { id: 1, title: "Title goes in here", duration: "5:55" },
      { id: 2, title: "Title goes in here", duration: "5:55" },
      { id: 3, title: "Title goes in here", duration: "5:55" },
      { id: 4, title: "Title goes in here", duration: "5:55" },
      { id: 5, title: "Title goes in here", duration: "5:55" },
      { id: 6, title: "Title goes in here", duration: "5:55" },
      { id: 7, title: "Title goes in here", duration: "5:55" },
    ],
  },
]

function CourseDetail() {
  const location = useLocation()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("course-details")
  const [isDisableModalOpen, setIsDisableModalOpen] = useState(false)
  const [courseStatus, setCourseStatus] = useState("active")

  // Get course data from location state or use default
  const course = location.state?.course || {
    id: 1,
    name: "Introduction to Graphic Design",
    tutor: {
      name: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5.0,
      reviews: 128,
    },
    price: "NGN 20,000",
    type: "Self paced course",
    duration: "20 hrs",
    students: "2,000",
    banner: "/placeholder.svg?height=400&width=900",
  }

  // Define table columns for students tab
  const columns = [
    { key: "name", label: "Gig Name" },
    { key: "email", label: "Email" },
    { key: "gender", label: "Gender" },
  ]

  // Custom cell renderer for students table
  const renderCustomCell = (key, value, student) => {
    if (key === "name") {
      return (
        <div className="flex items-center">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span>{student.name}</span>
        </div>
      )
    }
    return value
  }

  // Custom actions renderer for students table
  const renderActions = (student) => {
    return (
      <Button variant="outline" size="sm">
        Open
      </Button>
    )
  }

  // Handle disable course
  const handleDisableCourse = (reason) => {
    console.log(`Course disabled with reason: ${reason}`)
    setCourseStatus("disabled")
    toast.success("Course has been disabled successfully")
  }

  return (
    <>
      <div className="mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Courses Detail</h1>
            <p className="text-gray-500">Manage all courses here</p>
          </div>
          <Button
            variant="outline"
            className={`${
              courseStatus === "disabled"
                ? "text-green-500 border-green-500 hover:bg-green-50"
                : "text-red-500 border-red-500 hover:bg-red-50"
            }`}
            onClick={() => {
              if (courseStatus === "disabled") {
                setCourseStatus("active")
                toast.success("Course has been enabled successfully")
              } else {
                setIsDisableModalOpen(true)
              }
            }}
          >
            {courseStatus === "disabled" ? "Enable Course" : "Disable Course"}
          </Button>
        </div>

        {/* Course Banner */}
        <div className="relative w-full h-[300px] bg-gray-900 rounded-lg mb-6 overflow-hidden">
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
            <img src={'/course banner.png'} alt={course.name} className="absolute inset-0 object-fill w-full h-full" />
            <h2 className="text-5xl font-bold text-center mb-8">
              Step-by-Step
              <br />
              Design Process
            </h2>
            <button className="bg-white bg-opacity-20 rounded-full p-3">
              <Play className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>

        {/* Course Title and Info */}
        <div className="mb-6">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold">{course.name}</h1>
            <span className="text-purple-600 font-semibold">{course.price}</span>
          </div>
          <div className="flex gap-4 text-sm text-gray-500 mt-1">
            <span>{course.type}</span>
            <span>{course.duration}</span>
            {courseStatus === "disabled" && <span className="text-red-500 font-medium">Disabled</span>}
          </div>
        </div>

        {/* Main Content with Tabs */}
        <div className="flex gap-6">
          <div className="w-2/3">
            <Tabs defaultValue="course-details" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="course-details">Course details</TabsTrigger>
                <TabsTrigger value="students">Students ({course.students})</TabsTrigger>
              </TabsList>

              <TabsContent value="course-details" className="mt-0">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold mb-4">About the course</h3>
                  <p className="text-gray-700 mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam a ultrices mi, a tempor lectus.
                    Quisque eget tellus nec mi venenatis condimentum. Sed rhoncus pellentesque bibendum. Curabitur a
                    lacinia tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque habitant
                    morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras mattis justo diam, at
                    fermentum mi euismod vitae. Integer pellentesque viverra molestie. Donec vel pellentesque lorem.
                    Praesent tempor, velit vel viverra semper, urna ante posuere ante, id volutpat tortor leo nec
                    turpis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Donec elementum mollis est, in mollis lorem ultrices et. Aenean posuere bibendum ipsum sit amet
                    egestas. Cras consequat velit ante, maximus egestas sapien elementum nec. Nunc blandit sit amet elit
                    eget pellentesque. Donec ac tortor dolor. Sed sit amet nunc eget leo viverra malesuada. Nam eget
                    metus id risus dignissim euismod vel at erat. Ut euismod aliquam metus, vel finibus metus vestibulum
                    sed. Praesent id eros lacinia, tincidunt metus et, iaculis erat. Curabitur fermentum porta sodales.
                    Maecenas quam eros, pretium vel elit nec, consequat pellentesque dolor. Nunc quis massa...
                  </p>
                  <button className="text-blue-600 hover:underline">Show all</button>

                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4">Tutor</h3>
                    <div className="flex items-center">
                      <Avatar className="h-12 w-12 mr-3">
                        <AvatarImage src={course.tutor.avatar || "/placeholder.svg"} alt={course.tutor.name} />
                        <AvatarFallback>{course.tutor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{course.tutor.name}</p>
                        <div className="flex items-center text-yellow-500">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="ml-1 text-sm">
                            {course.tutor.rating} ({course.tutor.reviews})
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="students" className="mt-0">
                <Table
                  data={studentsData}
                  columns={columns}
                  renderCustomCell={renderCustomCell}
                  renderActions={renderActions}
                  showSearch={false}
                  itemsPerPage={8}
                  name="Students"
                  className="bg-white rounded-lg"
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* Course Sections Sidebar */}
          <div className="w-1/3 bg-gray-50 rounded-lg p-4">
            {courseSections.map((section, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-emerald-600 font-semibold mb-3">{section.title}</h3>
                <ul className="space-y-2">
                  {section.lessons.map((lesson) => (
                    <li
                      key={lesson.id}
                      className={`rounded-md ${lesson.active ? "bg-emerald-800 text-white" : "hover:bg-gray-100"}`}
                    >
                      <div className="flex items-center p-3">
                        <span className="mr-2">
                          {section.title.split(" ")[1]}.{lesson.id}.
                        </span>
                        <span className="flex-1">{lesson.title}</span>
                        {lesson.active && <Play className="h-4 w-4 mr-1" />}
                        <span className="text-xs">{lesson.duration}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Disable Course Modal */}
        <DisableCourseModal
          isOpen={isDisableModalOpen}
          onClose={() => setIsDisableModalOpen(false)}
          onDisable={handleDisableCourse}
        />
      </div>
    </>
  )
}

export default CourseDetail
