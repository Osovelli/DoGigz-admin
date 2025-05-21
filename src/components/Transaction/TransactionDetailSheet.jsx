import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import CustomButton from "../CustomButton"

const TransactionDetailSheet = ({ isOpen, onClose, transaction }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!isVisible && !isOpen) return null

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
      case "successful":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusDot = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
      case "successful":
        return "bg-green-500"
      case "pending":
        return "bg-yellow-500"
      case "failed":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/20 backdrop-blur-sm transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div
        className={`absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold">Transaction Details</h2>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {transaction ? (
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">AMOUNT</h3>
                  <p className="text-4xl font-bold">
                    ₦
                    {transaction.amount?.toLocaleString("en-NG", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">
                    TRANSACTION DETAILS
                  </h3>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">TRANSACTION ID</h3>
                  <p className="text-base font-medium">#{transaction.id}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">
                    USER / CUSTOMER'S NAME
                  </h3>
                  <p className="text-base font-medium text-emerald-600">{transaction.user?.name}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">DATE & TIME</h3>
                  <p className="text-base font-medium">
                    {transaction.date} {transaction.time || ""}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">TRANSACTION TYPE</h3>
                  <p className="text-base font-medium">{transaction.name}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">STATUS</h3>
                  <div className="flex items-center">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(
                        transaction.status,
                      )}`}
                    >
                      <span className={`h-2 w-2 rounded-full mr-2 ${getStatusDot(transaction.status)}`}></span>
                      {transaction.status?.charAt(0).toUpperCase() + transaction.status?.slice(1)}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">PAYMENT METHOD</h3>
                  <p className="text-base font-medium">{transaction.paymentMethod || "Card"}</p>
                </div>

                {transaction.description && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">DESCRIPTION</h3>
                    <p className="text-base">{transaction.description}</p>
                  </div>
                )}

                {transaction.reference && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">REFERENCE</h3>
                    <p className="text-base font-medium">{transaction.reference}</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-500">No transaction selected</p>
            </div>
          )}

          <div className="p-6 border-t">
            <CustomButton className="w-full bg-black text-white hover:bg-gray-800" size="lg">
              Continue
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionDetailSheet