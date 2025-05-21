import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, RefreshCw, Wallet, MinusCircle, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table } from "@/components/Table"

function UserWalletManagement() {
  const { userId } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("wallet")

  // Mock user data - in a real app, you would fetch this based on userId
  const [user, setUser] = useState({
    id: userId || "1",
    firstName: "John",
    lastName: "Doe",
    otherName: "Yamal",
    email: "johndoe@gmail.com",
    userType: "Customer",
    status: "active",
    avatar:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Right%20item%20%285%29-XihnZ7EY7dnbSNzPk6VRTPr3sIeup3.png",
    walletBalance: 200000000.0,
    pointBalance: 1200,
  })

  // Mock transaction data
  const transactions = [
    {
      id: 1,
      name: "Point Conversion",
      description: "Description",
      date: "22-01-2024",
      amount: 3500.0,
      type: "conversion",
    },
    {
      id: 2,
      name: "Wallet Top up",
      description: "Description",
      date: "22-01-2024",
      amount: 3500.0,
      type: "topup",
    },
    {
      id: 3,
      name: "Withdrawal",
      description: "Description",
      date: "22-01-2024",
      amount: 3500.0,
      type: "withdrawal",
    },
    {
      id: 4,
      name: "Earning from gig",
      description: "Gig ID #1000",
      date: "22-01-2024",
      amount: 3500.0,
      type: "earning",
    },
    // Add more transactions to demonstrate pagination
    ...Array.from({ length: 12 }, (_, i) => ({
      id: i + 5,
      name: `Transaction ${i + 5}`,
      description: `Description ${i + 5}`,
      date: "22-01-2024",
      amount: 3500.0,
      type: ["conversion", "topup", "withdrawal", "earning"][i % 4],
    })),
  ]

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    if (tab === "info") {
      navigate(`/admin/users/${userId}`)
    }
  }

  const handleStatusToggle = () => {
    const newStatus = user.status === "active" ? "inactive" : "active"
    setUser({ ...user, status: newStatus })
  }

  // Custom cell renderer for the table
  const renderCustomCell = (key, value, transaction) => {
    if (key === "name") {
      return (
        <div className="flex items-center gap-3">
          {transaction.type === "conversion" && (
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100">
              <RefreshCw className="h-4 w-4 text-blue-600" />
            </div>
          )}
          {transaction.type === "topup" && (
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
              <Wallet className="h-4 w-4 text-green-600" />
            </div>
          )}
          {transaction.type === "withdrawal" && (
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100">
              <MinusCircle className="h-4 w-4 text-red-600" />
            </div>
          )}
          {transaction.type === "earning" && (
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100">
              <Briefcase className="h-4 w-4 text-purple-600" />
            </div>
          )}
          <div>
            <div className="font-medium">{transaction.name}</div>
            <div className="text-sm text-gray-500">{transaction.description}</div>
          </div>
        </div>
      )
    }

    if (key === "amount") {
      return (
        <span className="font-medium">
          N{value.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      )
    }

    return value
  }

  // Format currency
  const formatCurrency = (amount) => {
    return amount.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

  // Table columns definition
  const columns = [
    { key: "name", label: "Course Name" },
    { key: "date", label: "Date" },
    { key: "amount", label: "Amount" },
  ]

  // Filter options for the table
  const filterOptions = {
    transactionType: ["Point Conversion", "Wallet Top up", "Withdrawal", "Earning"],
    date: ["Today", "This Week", "This Month", "Last Month"],
    amount: ["< N1,000", "N1,000 - N5,000", "N5,000 - N10,000", "> N10,000"],
  }

  return (
    <div className="mx-auto px-4 py-8">
      {/* Wallet Content */}
      <div className="space-y-6">
        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-purple-100 rounded-lg p-6">
            <div className="text-sm text-gray-600 mb-1">Wallet Balance</div>
            <div className="text-3xl font-bold">
              <span className="text-gray-500 text-xl">NGN</span> {formatCurrency(user.walletBalance)}
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Point Balance</div>
            <div className="text-3xl font-bold">
              {user.pointBalance} <span className="text-gray-500 text-xl">pt</span>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <Table
          data={transactions}
          columns={columns}
          renderCustomCell={renderCustomCell}
          name="Transactions"
          itemsPerPage={8}
          showSearch={true}
          filterOptions={filterOptions}
        />
      </div>
    </div>
  )
}

export default UserWalletManagement
