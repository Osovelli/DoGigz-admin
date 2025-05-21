import { useState } from "react"
import { useParams, useLocation, useNavigate } from "react-router-dom"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Calendar, Clock } from "lucide-react"


// Sample gig data
const sampleGig = {
  id: 1,
  title: "Virtual Assistance for Data Entry and Scheduling Tasks",
  price: "NGN 120,000",
  image: "/handshake1.jpeg",
  tags: ["UX Design", "Graphics Design", "Product Design"],
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mi libero, sagittis vitae sem in, tincidunt consequat nibh. Mauris rhoncus magna ac nibh convallis posuere. Ut rutrum velit non sem bibendum, vitae mollis sem dapibus. Nam nisl lacus, tincidunt aliquam eros ac, tempor rhoncus tellus. Nam pharetra, mauris nec ultrices auctor",
  status: "Online",
  deadline: "Before Mon, 22 April",
  poster: {
    name: "John Doe",
    avatar: "/avatar.jpeg",
    rating: 3.5,
    reviews: 128,
  },
  applicants: [
    {
      id: 1,
      name: "John Doe",
      avatar: "/Avatar (10).png",
      rating: 5.0,
      reviews: 128,
      completionRate: "100%",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mi libero, sagittis vitae sem in, tincidunt consequat nibh. Mauris rhoncus magna ac nibh convallis posuere. Ut rutrum velit non sem bibendum, vitae mollis sem dapibus. Nam nisl lacus, tincidunt aliquam eros ac, tempor rhoncus tellus. Nam pharetra, mauris nec ultrices auctor",
      status: "accepted",
      timestamp: "1 hour ago",
    },
    {
      id: 2,
      name: "John Doe",
      avatar: "/Avatar (10).png",
      rating: 5.0,
      reviews: 128,
      completionRate: "100%",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mi libero, sagittis vitae sem in, tincidunt consequat nibh. Mauris rhoncus magna ac nibh convallis posuere. Ut rutrum velit non sem bibendum, vitae mollis sem dapibus. Nam nisl lacus, tincidunt aliquam eros ac, tempor rhoncus tellus. Nam pharetra, mauris nec ultrices auctor",
      status: "pending",
      timestamp: "1 hour ago",
    },
    {
      id: 3,
      name: "John Doe",
      avatar: "/Avatar (10).png",
      rating: 5.0,
      reviews: 128,
      completionRate: "100%",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mi libero, sagittis vitae sem in, tincidunt consequat nibh. Mauris rhoncus magna ac nibh convallis posuere. Ut rutrum velit non sem bibendum, vitae mollis sem dapibus. Nam nisl lacus, tincidunt aliquam eros ac, tempor rhoncus tellus. Nam pharetra, mauris nec ultrices auctor",
      status: "pending",
      timestamp: "1 hour ago",
    },
    {
      id: 4,
      name: "John Doe",
      avatar: "/Avatar.png",
      rating: 5.0,
      reviews: 128,
      completionRate: "100%",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mi libero, sagittis vitae sem in, tincidunt consequat nibh. Mauris rhoncus magna ac nibh convallis posuere. Ut rutrum velit non sem bibendum, vitae mollis sem dapibus. Nam nisl lacus, tincidunt aliquam eros ac, tempor rhoncus tellus. Nam pharetra, mauris nec ultrices auctor",
      status: "pending",
      timestamp: "1 hour ago",
    },
    {
      id: 5,
      name: "John Doe",
      avatar: "/Avatar (10).png",
      rating: 5.0,
      reviews: 128,
      completionRate: "100%",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mi libero, sagittis vitae sem in, tincidunt consequat nibh. Mauris rhoncus magna ac nibh convallis posuere. Ut rutrum velit non sem bibendum, vitae mollis sem dapibus. Nam nisl lacus, tincidunt aliquam eros ac, tempor rhoncus tellus. Nam pharetra, mauris nec ultrices auctor",
      status: "pending",
      timestamp: "1 hour ago",
    },
  ],
}

function GigDetail() {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("details")
  const [expandedMessages, setExpandedMessages] = useState({})

  // In a real app, we would fetch the gig data based on the ID
  const gig = sampleGig

  const toggleMessageExpand = (applicantId) => {
    setExpandedMessages((prev) => ({
      ...prev,
      [applicantId]: !prev[applicantId],
    }))
  }

  const handleAcceptApplicant = (applicantId) => {
    // In a real app, we would update the applicant status in the backend
    console.log(`Accepting applicant ${applicantId}`)
  }

  const handleReply = (applicantId) => {
    // In a real app, we would open a reply form or modal
    console.log(`Replying to applicant ${applicantId}`)
  }

  const handleDisableGig = () => {
    // In a real app, we would update the gig status in the backend
    console.log(`Disabling gig ${id}`)
  }

  return (
    <>
      <div className="mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Gig Details</h1>
            <p className="text-gray-500">Manage all gigs here</p>
          </div>
          <Button variant="outline" className="text-red-500 border-red-500 hover:bg-red-50" onClick={handleDisableGig}>
            Disable Course
          </Button>
        </div>

        {/* Banner Image */}
        <div className="relative mb-6 rounded-lg overflow-hidden">
          <img src={gig.image || "/placeholder.svg"} alt={gig.title} className="w-full h-[360px] object-cover" />
          <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 text-sm rounded">1/10</div>
        </div>

        {/* Gig Title and Price */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-2">{gig.title}</h2>
          <p className="text-emerald-600 text-xl font-medium">{gig.price}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {gig.tags.map((tag, index) => (
            <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm">
              {tag}
            </span>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="border-b w-full justify-start rounded-none bg-transparent p-0 h-auto">
            <TabsTrigger
              value="details"
              className={`pb-2 px-6 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-emerald-600 data-[state=active]:text-emerald-600 data-[state=active]:shadow-none bg-transparent`}
            >
              Gig Details
            </TabsTrigger>
            <TabsTrigger
              value="applicants"
              className={`pb-2 px-6 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-emerald-600 data-[state=active]:text-emerald-600 data-[state=active]:shadow-none bg-transparent`}
            >
              Applicants ({gig.applicants.length})
            </TabsTrigger>
          </TabsList>

          {/* Gig Details Tab */}
          <TabsContent value="details" className="pt-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Offers</h3>

              <div className="mb-6">
                <h4 className="text-md font-semibold mb-2">Gig Description</h4>
                <p className="text-gray-700 mb-4">{gig.description}</p>

                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-700">{gig.status}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-700">{gig.deadline}</span>
                </div>
              </div>

              <div>
                <h4 className="text-md font-semibold mb-3">Gig Poster</h4>
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={gig.poster.avatar || "/placeholder.svg"} alt={gig.poster.name} />
                    <AvatarFallback>{gig.poster.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{gig.poster.name}</p>
                    <div className="flex items-center">
                      <span className="text-yellow-400 mr-1">★</span>
                      <span>
                        {gig.poster.rating} ({gig.poster.reviews})
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Applicants Tab */}
          <TabsContent value="applicants" className="pt-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Offers</h3>

              <div className="space-y-6">
                {gig.applicants.map((applicant) => (
                  <div key={applicant.id} className="border-b pb-6 last:border-b-0">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={applicant.avatar || "/placeholder.svg"} alt={applicant.name} />
                          <AvatarFallback>{applicant.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{applicant.name}</p>
                          <div className="flex items-center">
                            <span className="text-yellow-400 mr-1">★</span>
                            <span>
                              {applicant.rating} ({applicant.reviews})
                            </span>
                          </div>
                          <p className="text-green-600 text-sm">{applicant.completionRate} Completion rate</p>
                        </div>
                      </div>

                      {applicant.status === "accepted" ? (
                        <span className="px-4 py-2 bg-green-500 text-white rounded-full text-sm">Accepted</span>
                      ) : (
                        <Button
                          onClick={() => handleAcceptApplicant(applicant.id)}
                          className="px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-full"
                        >
                          Accept
                        </Button>
                      )}
                    </div>

                    <p className="text-gray-700 mb-2">
                      {expandedMessages[applicant.id] ? applicant.message : `${applicant.message.substring(0, 150)}...`}
                    </p>

                    <button
                      onClick={() => toggleMessageExpand(applicant.id)}
                      className="text-purple-600 text-sm hover:underline"
                    >
                      More
                    </button>

                    <div className="flex items-center mt-2 text-sm text-gray-500">
                      <button
                        onClick={() => handleReply(applicant.id)}
                        className="flex items-center text-purple-600 hover:underline"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Reply
                      </button>
                      <span className="mx-2">•</span>
                      <span>{applicant.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h4 className="text-md font-semibold mb-3">Gig Poster</h4>
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={gig.poster.avatar || "/placeholder.svg"} alt={gig.poster.name} />
                    <AvatarFallback>{gig.poster.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{gig.poster.name}</p>
                    <div className="flex items-center">
                      <span className="text-yellow-400 mr-1">★</span>
                      <span>
                        {gig.poster.rating} ({gig.poster.reviews})
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}

export default GigDetail
