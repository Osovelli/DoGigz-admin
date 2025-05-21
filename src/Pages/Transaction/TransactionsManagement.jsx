import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Wallet, RefreshCw, MinusCircle, Briefcase, Eye, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table } from "@/components/Table"
import TransactionDetailSheet from "@/components/Transaction/TransactionDetailSheet"

// Sample transaction data
const transactionData = [
  {
    id: "1234567890",
    name: "Point Conversion",
    description: "Points to wallet",
    date: "22-01-2024",
    time: "14:52:18",
    amount: 212250.0,
    status: "pending",
    user: {
      name: "John Doe",
      email: "johndoe@example.com",
      avatar:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Right%20item%20%285%29-XihnZ7EY7dnbSNzPk6VRTPr3sIeup3.png",
    },
    type: "conversion",
    paymentMethod: "Card",
  },
  {
    id: "1234567891",
    name: "Wallet Top up",
    description: "Bank transfer",
    date: "22-01-2024",
    time: "13:45:22",
    amount: 35000.0,
    status: "completed",
    user: {
      name: "Jane Smith",
      email: "janesmith@example.com",
      avatar:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Right%20item%20%285%29-XihnZ7EY7dnbSNzPk6VRTPr3sIeup3.png",
    },
    type: "topup",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "1234567892",
    name: "Course Purchase",
    description: "Google Data Analytics Course",
    date: "21-01-2024",
    time: "09:30:15",
    amount: 20000.0,
    status: "completed",
    user: {
      name: "Michael Johnson",
      email: "michael@example.com",
      avatar:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Right%20item%20%285%29-XihnZ7EY7dnbSNzPk6VRTPr3sIeup3.png",
    },
    type: "purchase",
    paymentMethod: "Card",
  },
  {
    id: "1234567893",
    name: "Withdrawal",
    description: "Bank withdrawal",
    date: "20-01-2024",
    time: "16:22:45",
    amount: 15000.0,
    status: "pending",
    user: {
      name: "Sarah Williams",
      email: "sarah@example.com",
      avatar:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Right%20item%20%285%29-XihnZ7EY7dnbSNzPk6VRTPr3sIeup3.png",
    },
    type: "withdrawal",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "1234567894",
    name: "Gig Payment",
    description: "Design Company Profile",
    date: "19-01-2024",
    time: "11:15:33",
    amount: 25000.0,
    status: "completed",
    user: {
      name: "David Brown",
      email: "david@example.com",
      avatar:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Right%20item%20%285%29-XihnZ7EY7dnbSNzPk6VRTPr3sIeup3.png",
    },
    type: "earning",
    paymentMethod: "Wallet",
  },
  {
    id: "1234567895",
    name: "Refund",
    description: "Course refund",
    date: "18-01-2024",
    time: "14:05:12",
    amount: 20000.0,
    status: "completed",
    user: {
      name: "Emily Davis",
      email: "emily@example.com",
      avatar:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Right%20item%20%285%29-XihnZ7EY7dnbSNzPk6VRTPr3sIeup3.png",
    },
    type: "refund",
    paymentMethod: "Wallet",
  },
  {
    id: "1234567896",
    name: "Wallet Top up",
    description: "Card payment",
    date: "17-01-2024",
    time: "10:45:30",
    amount: 50000.0,
    status: "failed",
    user: {
      name: "Robert Wilson",
      email: "robert@example.com",
      avatar:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Right%20item%20%285%29-XihnZ7EY7dnbSNzPk6VRTPr3sIeup3.png",
    },
    type: "topup",
    paymentMethod: "Card",
  },
  {
    id: "1234567897",
    name: "Commission",
    description: "Affiliate commission",
    date: "16-01-2024",
    time: "09:22:18",
    amount: 7500.0,
    status: "completed",
    user: {
      name: "Jennifer Taylor",
      email: "jennifer@example.com",
      avatar:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Right%20item%20%285%29-XihnZ7EY7dnbSNzPk6VRTPr3sIeup3.png",
    },
    type: "earning",
    paymentMethod: "Wallet",
  },
  {
    id: "1234567898",
    name: "Withdrawal",
    description: "Bank withdrawal",
    date: "15-01-2024",
    time: "15:10:05",
    amount: 30000.0,
    status: "completed",
    user: {
      name: "Thomas Anderson",
      email: "thomas@example.com",
      avatar:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Right%20item%20%285%29-XihnZ7EY7dnbSNzPk6VRTPr3sIeup3.png",
    },
    type: "withdrawal",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "1234567899",
    name: "Course Purchase",
    description: "Introduction to Graphic Design",
    date: "14-01-2024",
    time: "13:45:22",
    amount: 15000.0,
    status: "completed",
    user: {
      name: "Lisa Martinez",
      email: "lisa@example.com",
      avatar:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Right%20item%20%285%29-XihnZ7EY7dnbSNzPk6VRTPr3sIeup3.png",
    },
    type: "purchase",
    paymentMethod: "Card",
  },
]

function TransactionsManagement() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("all")
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [isDetailSheetOpen, setIsDetailSheetOpen] = useState(false)

  // Filter transactions based on active tab
  const filteredTransactions = transactionData.filter((transaction) => {
    if (activeTab === "all") return true
    if (activeTab === "completed" || activeTab === "successful")
      return transaction.status === "completed" || transaction.status === "successful"
    if (activeTab === "pending") return transaction.status === "pending"
    if (activeTab === "failed") return transaction.status === "failed"
    return true
  })

  // Handle opening transaction detail
  const handleOpenTransactionDetail = (transaction) => {
    setSelectedTransaction(transaction)
    setIsDetailSheetOpen(true)
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
          {(transaction.type === "earning" || transaction.type === "purchase" || transaction.type === "refund") && (
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
          ₦{value.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      )
    }

    if (key === "status") {
      const statusStyles = {
        completed: "bg-green-100 text-green-800",
        successful: "bg-green-100 text-green-800",
        pending: "bg-yellow-100 text-yellow-800",
        failed: "bg-red-100 text-red-800",
      }

      return (
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[value] || ""}`}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      )
    }

    if (key === "user") {
      return (
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full overflow-hidden">
            <img src={value.avatar || "/placeholder.svg"} alt={value.name} className="h-full w-full object-cover" />
          </div>
          <div>
            <div className="font-medium">{value.name}</div>
            <div className="text-xs text-gray-500">{value.email}</div>
          </div>
        </div>
      )
    }

    if (key === "date") {
      return (
        <div>
          <div className="font-medium">{value}</div>
          {transaction.time && <div className="text-xs text-gray-500">{transaction.time}</div>}
        </div>
      )
    }

    return value
  }

  // Custom actions renderer for the table
  const renderActions = (transaction) => {
    return (
      <div className="flex items-center justify-end gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleOpenTransactionDetail(transaction)}
          className="h-8 w-8 text-blue-600"
        >
          <Eye className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-600">
          <Download className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  // Table columns definition
  const columns = [
    { key: "id", label: "Transaction ID" },
    { key: "name", label: "Transaction" },
    { key: "date", label: "Date & Time" },
    { key: "amount", label: "Amount" },
    { key: "status", label: "Status" },
    { key: "user", label: "User" },
  ]

  // Filter options for the table
  const filterOptions = {
    transactionType: ["Wallet Top up", "Course Purchase", "Withdrawal", "Point Conversion", "Gig Payment", "Refund"],
    status: ["Completed", "Pending", "Failed"],
    date: ["Today", "This Week", "This Month", "Last Month"],
    amount: ["< ₦10,000", "₦10,000 - ₦50,000", "> ₦50,000"],
  }

  // Summary statistics
  const totalTransactions = transactionData.length
  const totalAmount = transactionData.reduce((sum, transaction) => sum + transaction.amount, 0)
  const completedTransactions = transactionData.filter(
    (t) => t.status === "completed" || t.status === "successful",
  ).length
  const pendingTransactions = transactionData.filter((t) => t.status === "pending").length
  const failedTransactions = transactionData.filter((t) => t.status === "failed").length

  return (
    <>
      <div className="mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Transactions</h1>
          <p className="text-gray-600">Manage all transaction records</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <p className="text-sm text-blue-600 mb-1">Total Transactions</p>
            <p className="text-2xl font-bold">₦{totalAmount.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <p className="text-sm text-green-600 mb-1">Total Revenue</p>
            <p className="text-2xl font-bold">₦{(totalAmount * 0.1).toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <p className="text-sm text-yellow-600 mb-1">Pending Transactions</p>
            <p className="text-2xl font-bold">₦{(pendingTransactions * 21250).toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <p className="text-sm text-red-600 mb-1">Failed Transactions</p>
            <p className="text-2xl font-bold">₦{(failedTransactions * 212250).toLocaleString()}</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="flex overflow-x-auto space-x-1 border-b">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
                activeTab === "all" ? "border-b-2 border-primary text-primary" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              All Transactions
            </button>
            <button
              onClick={() => setActiveTab("pending")}
              className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
                activeTab === "pending" ? "border-b-2 border-primary text-primary" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setActiveTab("successful")}
              className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
                activeTab === "successful"
                  ? "border-b-2 border-primary text-primary"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Successful
            </button>
            <button
              onClick={() => setActiveTab("failed")}
              className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
                activeTab === "failed" ? "border-b-2 border-primary text-primary" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Failed
            </button>
          </div>
        </div>

        {/* Transactions Table */}
        <Table
          data={filteredTransactions}
          columns={columns}
          renderCustomCell={renderCustomCell}
          renderActions={renderActions}
          name="Transactions"
          itemsPerPage={8}
          showSearch={true}
          filterOptions={filterOptions}
        />

        {/* Transaction Detail Sidesheet */}
        <TransactionDetailSheet
          isOpen={isDetailSheetOpen}
          onClose={() => setIsDetailSheetOpen(false)}
          transaction={selectedTransaction}
        />
      </div>
    </>
  )
}

export default TransactionsManagement
