import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function CreatePromoModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    discountType: "percentage",
    discountValue: "",
    applicableItems: "all",
    code: "",
    maxUses: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Submitting promo data:", formData)
    // Here you would typically send the data to your API
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Create New Promo</DialogTitle>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Promo Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter promo name"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter promo description"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="startDate" className="text-sm font-medium">
                Start Date
              </label>
              <input
                id="startDate"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="endDate" className="text-sm font-medium">
                End Date
              </label>
              <input
                id="endDate"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="discountType" className="text-sm font-medium">
              Discount Type
            </label>
            <select
              id="discountType"
              name="discountType"
              value={formData.discountType}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="percentage">Percentage (%)</option>
              <option value="fixed">Fixed Amount</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="discountValue" className="text-sm font-medium">
              Discount Value
            </label>
            <input
              id="discountValue"
              name="discountValue"
              type="number"
              value={formData.discountValue}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder={formData.discountType === "percentage" ? "e.g. 10 for 10%" : "e.g. 1000"}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="applicableItems" className="text-sm font-medium">
              Applicable To
            </label>
            <select
              id="applicableItems"
              name="applicableItems"
              value={formData.applicableItems}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Items</option>
              <option value="courses">Courses Only</option>
              <option value="gigs">Gigs Only</option>
              <option value="specific">Specific Items</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="code" className="text-sm font-medium">
              Promo Code (Optional)
            </label>
            <input
              id="code"
              name="code"
              type="text"
              value={formData.code}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter promo code"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="maxUses" className="text-sm font-medium">
              Maximum Uses (Optional)
            </label>
            <input
              id="maxUses"
              name="maxUses"
              type="number"
              value={formData.maxUses}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Leave blank for unlimited"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-black hover:bg-gray-800 text-white">
              Create Promo
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
