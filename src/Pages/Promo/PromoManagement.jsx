import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Table from "../../components/Table"
import CreatePromoSheet from "@/components/Promo/CreatePromoSheet"
import { useNavigate } from "react-router-dom"
import CustomButton from "@/components/CustomButton"

const PromoManagement = () => {
  const [isCreateSheetOpen, setIsCreateSheetOpen] = useState(false)
  const navigate = useNavigate()

  // Sample data for the promos table
  const promoData = [
    {
      id: 1,
      name: "[Promo_name]",
      description: "[Description of the promo]",
      startDate: "22-01-2024",
      endDate: "22-01-2024",
    },
    {
      id: 2,
      name: "[Promo_name]",
      description: "[Description of the promo]",
      startDate: "22-01-2024",
      endDate: "22-01-2024",
    },
    {
      id: 3,
      name: "[Promo_name]",
      description: "[Description of the promo]",
      startDate: "22-01-2024",
      endDate: "22-01-2024",
    },
    {
      id: 4,
      name: "[Promo_name]",
      description: "[Description of the promo]",
      startDate: "22-01-2024",
      endDate: "22-01-2024",
    },
    {
      id: 5,
      name: "[Promo_name]",
      description: "[Description of the promo]",
      startDate: "22-01-2024",
      endDate: "22-01-2024",
    },
    {
      id: 6,
      name: "[Promo_name]",
      description: "[Description of the promo]",
      startDate: "22-01-2024",
      endDate: "22-01-2024",
    },
    {
      id: 7,
      name: "[Promo_name]",
      description: "[Description of the promo]",
      startDate: "22-01-2024",
      endDate: "22-01-2024",
    },
    {
      id: 8,
      name: "[Promo_name]",
      description: "[Description of the promo]",
      startDate: "22-01-2024",
      endDate: "22-01-2024",
    },
    {
      id: 9,
      name: "[Promo_name]",
      description: "[Description of the promo]",
      startDate: "22-01-2024",
      endDate: "22-01-2024",
    },
    {
      id: 10,
      name: "[Promo_name]",
      description: "[Description of the promo]",
      startDate: "22-01-2024",
      endDate: "22-01-2024",
    },
  ]

  // Table columns configuration
  const columns = [
    {
      key: "name",
      label: "Promo Name",
    },
    {
      key: "description",
      label: "Promo Description",
    },
    {
      key: "startDate",
      label: "Start Date",
    },
    {
      key: "endDate",
      label: "End Date",
    },
  ]

  // Handle opening a promo
  const handleOpenPromo = (item) => {
    console.log(`Opening promo with ID: ${item.id}`)
    navigate(`/dashboard/promo/${item.id}`)
  }

  // Render custom actions for each row
  const renderActions = (item) => {
    return (
      <Button
        variant="link"
        className="text-primary hover:text-primary/80 font-medium p-0"
        onClick={() => handleOpenPromo(item)}
      >
        Open
      </Button>
    )
  }

  return (
    <>
      <div className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Promo</h1>
            <p className="text-sm text-gray-500">Manage all promos here</p>
          </div>
          <CustomButton
            onClick={() => setIsCreateSheetOpen(true)}
            className="mt-4 sm:mt-0 hover:bg-gray-800 text-white"
          >
            <Plus className="mr-2 h-4 w-4" /> Create Promo
          </CustomButton>
        </div>

        {/* Using the reusable Table component */}
        <Table
          data={promoData}
          columns={columns}
          renderActions={renderActions}
          name="promos"
          itemsPerPage={8}
          showSearch={true}
        />
      </div>

      {/* Create Promo Sheet */}
      <CreatePromoSheet isOpen={isCreateSheetOpen} onClose={() => setIsCreateSheetOpen(false)} />
    </>
  )
}

export default PromoManagement
