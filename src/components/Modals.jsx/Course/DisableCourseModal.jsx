import { useState } from "react"
import { Button } from "@/components/ui/button"
import CustomModal from "@/components/CustomModal"
import { X } from "lucide-react"

function DisableCourseModal({ isOpen, onClose, onDisable }) {
  const [reason, setReason] = useState("")

  const handleDisable = () => {
    onDisable(reason)
    setReason("")
    onClose()
  }

  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      <div className="w-full">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">Reason for Disabling</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 focus:outline-none" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="text-gray-600 mb-6">Kindly provide a reason for disabling the course</p>

        <div className="mb-6">
          <label htmlFor="disable-reason" className="block text-sm font-medium text-gray-700 mb-1">
            Enter reason
          </label>
          <textarea
            id="disable-reason"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Start typing..."
            rows={4}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>

        <div className="flex justify-between gap-4">
          <Button
            type="button"
            variant="outline"
            className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 border-0 rounded-full"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="w-full py-2.5 bg-red-500 hover:bg-red-600 text-white border-0 rounded-full"
            onClick={handleDisable}
            disabled={!reason.trim()}
          >
            Disable
          </Button>
        </div>
      </div>
    </CustomModal>
  )
}

export default DisableCourseModal