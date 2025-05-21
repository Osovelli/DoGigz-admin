import { Button } from "@/components/ui/button"

import { useState, useMemo, useRef, useEffect } from "react"
import { Eye, Trash2, ChevronLeft, ChevronRight, ChevronDown, Filter, ChevronRightIcon, X } from "lucide-react"

export const Table = ({
  data = [],
  columns = [],
  name,
  renderCustomCell,
  renderActions,
  onRowClick,
  onDeleteClick,
  itemsPerPage: initialItemsPerPage = 10,
  className = "",
  showSearch = true,
  showDelete = false,
  showManage = false,
  filterOptions = {
    userType: ["Customer", "Tutor", "Gig Poster"],
    status: ["Active", "Inactive", "Pending"],
    gender: ["Male", "Female", "Other"],
    filter4: ["Option 1", "Option 2", "Option 3"],
  },
}) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" })
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage)
  const [showFilterMenu, setShowFilterMenu] = useState(false)
  const [activeFilterCategory, setActiveFilterCategory] = useState("userType")
  const [selectedFilters, setSelectedFilters] = useState({
    userType: [],
    status: [],
    gender: [],
    filter4: [],
  })
  const filterMenuRef = useRef(null)

  // Close filter menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        filterMenuRef.current &&
        !filterMenuRef.current.contains(event.target) &&
        !event.target.closest('button[aria-label="filter-button"]')
      ) {
        setShowFilterMenu(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("touchstart", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("touchstart", handleClickOutside)
    }
  }, [])

  // Apply filters to data
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      // Text search filter
      const matchesSearch = Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase()),
      )

      if (!matchesSearch) return false

      // Apply selected filters
      for (const [category, values] of Object.entries(selectedFilters)) {
        if (values.length > 0) {
          const itemValue = item[category.toLowerCase()]
          if (!values.includes(itemValue)) {
            return false
          }
        }
      }

      return true
    })
  }, [data, searchTerm, selectedFilters])

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData

    return [...filteredData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1
      }
      return 0
    })
  }, [filteredData, sortConfig])

  const totalPages = Math.ceil(sortedData.length / itemsPerPage)
  const paginatedData = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === "asc" ? "desc" : "asc",
    }))
  }

  const getStatusStyle = (status) => {
    const baseStyle = "px-3 py-1 rounded-full text-sm font-medium"
    switch (status?.toLowerCase()) {
      case "delivered":
        return `${baseStyle} bg-green-100 text-green-800`
      case "cancelled":
        return `${baseStyle} bg-red-100 text-red-800`
      case "ongoing":
        return `${baseStyle} bg-orange-100 text-orange-800`
      case "active":
        return `${baseStyle} bg-green-100 text-green-900`
      case "inactive":
        return `${baseStyle} bg-red-100 text-red-600`
      default:
        return baseStyle
    }
  }

  const handleFilterToggle = (category, value) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev }
      if (newFilters[category].includes(value)) {
        newFilters[category] = newFilters[category].filter((item) => item !== value)
      } else {
        newFilters[category] = [...newFilters[category], value]
      }
      return newFilters
    })

    // Reset to first page when filters change
    setCurrentPage(1)
  }

  const getActiveFiltersCount = () => {
    return Object.values(selectedFilters).reduce((count, filters) => count + filters.length, 0)
  }

  // Add a clear filters function
  const clearFilters = () => {
    setSelectedFilters({
      userType: [],
      status: [],
      gender: [],
      filter4: [],
    })
    setCurrentPage(1)
  }

  // Add a function to handle applying filters (for mobile view)
  const applyFilters = () => {
    setShowFilterMenu(false)
    // Filters are already applied in real-time, so we just need to close the menu
  }

  const renderFilterMenu = () => {
    if (!showFilterMenu) return null

    return (
      <div
        ref={filterMenuRef}
        className="absolute right-0 top-12 z-10 bg-emerald-50 rounded-lg shadow-lg p-4 w-[500px] max-w-[calc(100vw-2rem)] md:max-w-[500px]"
        style={{
          right: window.innerWidth < 640 ? "0" : undefined,
          left: window.innerWidth < 640 ? "0" : undefined,
        }}
      >
        {/* Mobile Close Button - Only visible on small screens */}
        <button
          className="md:hidden absolute top-2 right-2 p-1 rounded-full hover:bg-gray-300"
          onClick={() => setShowFilterMenu(false)}
        >
          <X size={18} />
        </button>

        {/* Mobile View - Stacked Layout */}
        <div className="flex flex-col md:hidden space-y-4">
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-medium mb-2">Filter by</h3>
            <div className="flex flex-wrap gap-2">
              {Object.keys(filterOptions).map((category) => {
                const displayName = category.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())

                return (
                  <button
                    key={category}
                    className={`px-3 py-1.5 rounded-full text-sm ${
                      category === activeFilterCategory ? "bg-primary text-white" : "bg-gray-100 text-gray-700"
                    }`}
                    onClick={() => setActiveFilterCategory(category)}
                  >
                    {displayName}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="bg-white rounded-lg p-4">
            <h3 className="font-medium mb-2">
              {activeFilterCategory.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {filterOptions[activeFilterCategory]?.map((option) => (
                <div key={option} className="flex items-center py-2">
                  <input
                    type="checkbox"
                    id={`filter-mobile-${option}`}
                    className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                    checked={selectedFilters[activeFilterCategory].includes(option)}
                    onChange={() => handleFilterToggle(activeFilterCategory, option)}
                  />
                  <label htmlFor={`filter-mobile-${option}`} className="ml-2 text-sm">
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                clearFilters()
              }}
            >
              Clear All
            </Button>
            <Button size="sm" onClick={() => applyFilters()}>
              Apply Filters
            </Button>
          </div>
        </div>

        {/* Desktop View - Side by Side Layout */}
        <div className="hidden md:flex gap-4">
          {/* Filter Categories */}
          <div className="bg-white rounded-lg p-4 w-1/2">
            {Object.keys(filterOptions).map((category) => {
              const displayName = category
                .replace(/([A-Z])/g, " $1") // Add space before capital letters
                .replace(/^./, (str) => str.toUpperCase()) // Capitalize first letter

              return (
                <button
                  key={category}
                  className={`flex items-center justify-between w-full py-3 px-2 text-left ${
                    category === activeFilterCategory ? "font-medium" : ""
                  }`}
                  onClick={() => setActiveFilterCategory(category)}
                >
                  <span>{displayName}</span>
                  <ChevronRightIcon size={16} />
                </button>
              )
            })}
          </div>

          {/* Filter Options */}
          <div className="bg-white rounded-lg p-4 w-1/2">
            {filterOptions[activeFilterCategory]?.map((option) => (
              <div key={option} className="flex items-center py-2">
                <input
                  type="checkbox"
                  id={`filter-${option}`}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  checked={selectedFilters[activeFilterCategory].includes(option)}
                  onChange={() => handleFilterToggle(activeFilterCategory, option)}
                />
                <label htmlFor={`filter-${option}`} className="ml-2 text-sm">
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const renderPagination = () => (
    <div className="flex items-center justify-between mt-6">
      <div className="text-sm text-gray-600">
        Page <span className="font-medium">{currentPage}</span> of{" "}
        <span className="font-medium">{totalPages || 1}</span>
      </div>

      <div className="flex items-center">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="p-2 border rounded-md disabled:opacity-50 text-gray-500 hover:bg-gray-50"
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
        </button>

        {/* First page is always shown */}
        <button
          onClick={() => setCurrentPage(1)}
          className={`w-8 h-8 flex items-center justify-center border rounded-md mx-1 ${
            currentPage === 1 ? "bg-gray-100 font-medium" : "hover:bg-gray-50"
          }`}
        >
          1
        </button>

        {/* Show ellipsis if current page is > 3 */}
        {currentPage > 3 && <span className="mx-1 text-gray-500">...</span>}

        {/* Pages around current page */}
        {Array.from({ length: totalPages }).map((_, i) => {
          const pageNumber = i + 1
          // Skip first and last page as they're handled separately
          if (pageNumber === 1 || pageNumber === totalPages) return null

          // Show 2 pages before and after current page, but ensure we don't show too many
          if (
            (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1) ||
            (currentPage <= 3 && pageNumber <= 4) ||
            (currentPage >= totalPages - 2 && pageNumber >= totalPages - 3)
          ) {
            return (
              <button
                key={pageNumber}
                onClick={() => setCurrentPage(pageNumber)}
                className={`w-8 h-8 flex items-center justify-center border rounded-md mx-1 ${
                  currentPage === pageNumber ? "bg-gray-100 font-medium" : "hover:bg-gray-50"
                }`}
              >
                {pageNumber}
              </button>
            )
          }
          return null
        })}

        {/* Show ellipsis if there are more pages after the displayed ones */}
        {currentPage < totalPages - 2 && <span className="mx-1 text-gray-500">...</span>}

        {/* Last page is always shown if there's more than one page */}
        {totalPages > 1 && (
          <button
            onClick={() => setCurrentPage(totalPages)}
            className={`w-8 h-8 flex items-center justify-center border rounded-md mx-1 ${
              currentPage === totalPages ? "bg-gray-100 font-medium" : "hover:bg-gray-50"
            }`}
          >
            {totalPages}
          </button>
        )}

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages || totalPages === 0}
          className="p-2 border rounded-md disabled:opacity-50 text-gray-500 hover:bg-gray-50 ml-1"
          aria-label="Next page"
        >
          <ChevronRight size={16} />
        </button>

        {/* Items per page dropdown */}
        <div className="ml-4 relative">
          <select
            value={itemsPerPage}
            onChange={(e) => {
              const newItemsPerPage = Number(e.target.value)
              setItemsPerPage(newItemsPerPage)
              setCurrentPage(1) // Reset to first page when changing items per page
            }}
            className="appearance-none border rounded-md py-1 pl-3 pr-8 bg-white text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="8">8 / page</option>
            <option value="16">16 / page</option>
            <option value="24">24 / page</option>
            <option value="32">32 / page</option>
          </select>
          <ChevronDown
            size={14}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500"
          />
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {showSearch && (
          <div className="relative w-full sm:w-[500px]">
            <input
              type="text"
              placeholder="Search items"
              className="w-full bg-white pl-4 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}

        <div className="relative w-full sm:w-auto">
          <button
            onClick={() => setShowFilterMenu(!showFilterMenu)}
            aria-label="filter-button"
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-3 py-2 border rounded-lg ${
              getActiveFiltersCount() > 0 ? "bg-primary/10 border-primary text-primary" : ""
            }`}
          >
            <Filter size={16} />
            <span>Filter</span>
            {getActiveFiltersCount() > 0 && (
              <span className="bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {getActiveFiltersCount()}
              </span>
            )}
          </button>

          {renderFilterMenu()}
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  onClick={() => handleSort(column.key)}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.label}</span>
                    {sortConfig.key === column.key && (
                      <span className="text-gray-400">{sortConfig.direction === "asc" ? "↑" : "↓"}</span>
                    )}
                  </div>
                </th>
              ))}
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {column.key === "status" && !renderCustomCell ? (
                      <span className={getStatusStyle(item[column.key])}>{item[column.key]}</span>
                    ) : column.key === "fee" ? (
                      <span className="text-blue-600 font-medium">N {item[column.key]}</span>
                    ) : column.key === "amount" ? (
                      <span className="text-green-600 font-medium">N {item[column.key]}</span>
                    ) : renderCustomCell ? (
                      renderCustomCell(column.key, item[column.key], item)
                    ) : (
                      item[column.key]
                    )}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {renderActions ? (
                    renderActions(item)
                  ) : (
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => onRowClick?.(item)}
                        className="text-blue-600 hover:text-blue-900 w-full flex items-center justify-center bg-white"
                      >
                        <Eye size={16} />
                      </button>
                      {showDelete && (
                        <button
                          onClick={() => onDeleteClick?.(item)}
                          className="text-red-600 hover:text-red-900 flex items-center"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {renderPagination()}
    </div>
  )
}

export const TableSkeleton = () => {
  return (
    <div className="animate-pulse space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-full md:w-[500px]">
          <div className="bg-gray-200 h-10 rounded-lg"></div>
        </div>
      </div>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                <div className="flex items-center space-x-1">
                  <div className="bg-gray-200 h-4 w-24 rounded"></div>
                </div>
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Array.from({ length: 5 }).map((_, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="bg-gray-200 h-4 w-full rounded"></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <div className="bg-gray-200 h-4 w-full rounded"></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Table
