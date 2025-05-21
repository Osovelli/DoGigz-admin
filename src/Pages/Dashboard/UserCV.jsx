import { useState, useRef } from "react"
import { useOutletContext } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Download, Upload } from "lucide-react"
import CustomButton from "@/components/CustomButton"

function UserCV() {
  /* const context = useOutletContext() || {}
  const { user = {}, setUser = () => {} } = context */

  const [cv, setCV] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef(null)

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setIsUploading(true)

      // Simulate file upload process
      setTimeout(() => {
        setCV({
          name: file.name,
          size: file.size,
          type: file.type,
          url: URL.createObjectURL(file),
          // In a real app, this would be the URL from your server after upload
        })
        setIsUploading(false)
      }, 1000)
    }
  }

  const handleDownload = () => {
    if (cv && cv.url) {
      const link = document.createElement("a")
      link.href = cv.url
      link.download = cv.name || "user-cv.pdf"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const handleSaveChanges = () => {
    // In a real app, you would save the CV to the user profile
    setUser({ ...user, cv })
    console.log("Saving CV:", cv)
  }

  const triggerFileInput = () => {
    fileInputRef.current.click()
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-medium mb-8">CV</h1>

      {/* CV Upload/Download Area */}
      <div className="bg-gray-50 rounded-lg p-8 mb-8 flex flex-col items-center justify-center min-h-[200px]">
        <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept=".pdf,.doc,.docx" />

        {isUploading ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mb-2"></div>
            <p className="text-gray-600">Uploading...</p>
          </div>
        ) : cv ? (
          <div className="flex flex-col items-center">
            <button onClick={handleDownload} className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
              <Download className="h-5 w-5" />
              <span>Download CV</span>
            </button>
            <p className="text-sm text-gray-500 mt-2">{cv.name}</p>
            <button onClick={triggerFileInput} className="mt-4 text-sm text-blue-600 hover:text-blue-800">
              Replace
            </button>
          </div>
        ) : (
          <button onClick={triggerFileInput} className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
            <Upload className="h-5 w-5" />
            <span>Upload CV</span>
          </button>
        )}
      </div>

      {/* Save Button */}
      <CustomButton
        onClick={handleSaveChanges}
        className="w-full h-12 bg-black hover:bg-black/90 text-white rounded-md font-medium"
      >
        Save changes
      </CustomButton>
    </div>
  )
}

export default UserCV
