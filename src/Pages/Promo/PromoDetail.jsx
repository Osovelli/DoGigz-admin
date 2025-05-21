import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Calendar, Percent, Tag, Users, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Table from "../../components/Table"
import EditPromoSheet from "@/components/Promo/EditPromoSheet"

const PromoDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("details")
  const [showEditSheet, setShowEditSheet] = useState(false)

  // Mock promo data - in a real app, you would fetch this based on the ID
  const [promoData, setPromoData] = useState({
    id,
    name: "Summer Sale 2024",
    description: "Special discount for all courses and gigs during summer 2024",
    startDate: "2024-01-22", // Format for input type="date"
    endDate: "2024-03-22", // Format for input type="date"
    discountType: "percentage",
    discountValue: "15",
    applicableItems: "all",
    code: "SUMMER2024",
    maxUses: "500",
    usedCount: "123",
    status: "active",
    createdBy: "Admin",
    createdAt: "15-01-2024",
  })

  // Mock usage data
  const usageData = [
    {
      id: 1,
      user: "John Doe",
      email: "john.doe@example.com",
      item: "Advanced UI/UX Design Course",
      itemType: "Course",
      date: "25-01-2024",
      amount: "NGN 85,000",
      discount: "NGN 12,750",
    },
    {
      id: 2,
      user: "Jane Smith",
      email: "jane.smith@example.com",
      item: "Website Development Gig",
      itemType: "Gig",
      date: "26-01-2024",
      amount: "NGN 150,000",
      discount: "NGN 22,500",
    },
    {
      id: 3,
      user: "Robert Johnson",
      email: "robert.j@example.com",
      item: "Mobile App Development Course",
      itemType: "Course",
      date: "28-01-2024",
      amount: "NGN 120,000",
      discount: "NGN 18,000",
    },
  ]

  // Table columns for usage history
  const usageColumns = [
    {
      key: "user",
      label: "User",
    },
    {
      key: "item",
      label: "Item",
    },
    {
      key: "itemType",
      label: "Type",
    },
    {
      key: "date",
      label: "Date",
    },
    {
      key: "amount",
      label: "Amount",
    },
    {
      key: "discount",
      label: "Discount",
    },
  ]

  // Custom cell renderer for the usage table
  const renderCustomCell = (key, value, item) => {
    if (key === "user") {
      return (
        <div>
          <div className="text-sm font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">{item.email}</div>
        </div>
      )
    }

    if (key === "itemType") {
      return (
        <Badge
          className={
            value === "Course"
              ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
              : "bg-purple-100 text-purple-800 hover:bg-purple-100"
          }
        >
          {value}
        </Badge>
      )
    }

    if (key === "discount") {
      return <span className="text-green-600">{value}</span>
    }

    return value
  }

  const handleBack = () => {
    navigate("/dashboard/promo")
  }

  const handleDisablePromo = () => {
    // Logic to disable the promo
    console.log(`Disabling promo with ID: ${id}`)
  }

  const handleEditPromo = () => {
    setShowEditSheet(true)
  }

  const handleSavePromo = (updatedData) => {
    // In a real app, you would send this data to your API
    console.log("Saving promo data:", updatedData)
    setPromoData(updatedData)
    setShowEditSheet(false)
  }

  return (
    <>
      <div className="p-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={handleBack} className="mr-4 p-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{promoData.name}</h1>
            <p className="text-sm text-gray-500">Promo details and usage statistics</p>
          </div>
          <div className="ml-auto flex space-x-3">
            <Button variant="outline" onClick={handleEditPromo}>
              Edit Promo
            </Button>
            <Button variant="destructive" onClick={handleDisablePromo}>
              Disable Promo
            </Button>
          </div>
        </div>

        <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="details">Promo Details</TabsTrigger>
            <TabsTrigger value="usage">Usage History</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border">
                <h2 className="text-lg font-medium mb-4">Basic Information</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Tag className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Promo Code</p>
                      <p className="text-sm text-gray-600">{promoData.code}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Duration</p>
                      <p className="text-sm text-gray-600">
                        {promoData.startDate.replace(/(\d{4})-(\d{2})-(\d{2})/, "$3-$2-$1")} to{" "}
                        {promoData.endDate.replace(/(\d{4})-(\d{2})-(\d{2})/, "$3-$2-$1")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Percent className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Discount</p>
                      <p className="text-sm text-gray-600">
                        {promoData.discountValue}
                        {promoData.discountType === "percentage" ? "%" : " NGN"} off
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Users className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Usage Limit</p>
                      <p className="text-sm text-gray-600">
                        {promoData.usedCount} / {promoData.maxUses || "Unlimited"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border">
                <h2 className="text-lg font-medium mb-4">Status Information</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Current Status</p>
                      <Badge
                        className={
                          promoData.status === "active"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : "bg-red-100 text-red-800 hover:bg-red-100"
                        }
                      >
                        {promoData.status === "active" ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Created On</p>
                      <p className="text-sm text-gray-600">{promoData.createdAt}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Users className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Created By</p>
                      <p className="text-sm text-gray-600">{promoData.createdBy}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border">
              <h2 className="text-lg font-medium mb-4">Promo Description</h2>
              <p className="text-sm text-gray-600">{promoData.description}</p>
            </div>

            <div className="bg-white p-6 rounded-lg border">
              <h2 className="text-lg font-medium mb-4">Applicable Items</h2>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  This promo applies to:{" "}
                  <span className="font-medium">
                    {promoData.applicableItems === "all"
                      ? "All Items (Courses and Gigs)"
                      : promoData.applicableItems === "courses"
                        ? "Courses Only"
                        : promoData.applicableItems === "gigs"
                          ? "Gigs Only"
                          : "Specific Items"}
                  </span>
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="usage" className="space-y-6">
            {/* Using the reusable Table component for usage history */}
            <Table
              data={usageData}
              columns={usageColumns}
              renderCustomCell={renderCustomCell}
              name="usage history"
              itemsPerPage={10}
              showSearch={true}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit Promo Sheet */}
      <EditPromoSheet
        isOpen={showEditSheet}
        onClose={() => setShowEditSheet(false)}
        promoData={promoData}
        onSave={handleSavePromo}
      />
    </>
  )
}

export default PromoDetail
