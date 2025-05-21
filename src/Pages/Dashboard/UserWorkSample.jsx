import { useState, useRef } from "react"
import { useOutletContext } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload, File, Pencil, X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import CustomButton from "@/components/CustomButton"

function UserWorkSamples() {
  /* const context = useOutletContext() || {}
  const { user = {} } = context */

  const [files, setFiles] = useState([
    { id: 1, name: "Document name", size: "300KB" },
    { id: 2, name: "Document name", size: "300KB" },
    { id: 3, name: "Document name", size: "300KB" },
  ])
  const [referenceLink, setReferenceLink] = useState("www.linkname.com")
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false)
  const [currentFile, setCurrentFile] = useState(null)
  const [newFileName, setNewFileName] = useState("")
  const fileInputRef = useRef(null)

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files)

    if (uploadedFiles.length > 0) {
      const newFiles = uploadedFiles.map((file, index) => ({
        id: Date.now() + index,
        name: file.name,
        size: formatFileSize(file.size),
        file: file,
      }))

      setFiles([...files, ...newFiles])
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(0) + "KB"
    else return (bytes / 1048576).toFixed(1) + "MB"
  }

  const handleDeleteFile = (id) => {
    setFiles(files.filter((file) => file.id !== id))
  }

  const openRenameDialog = (file) => {
    setCurrentFile(file)
    setNewFileName(file.name)
    setIsRenameDialogOpen(true)
  }

  const handleRename = () => {
    if (newFileName.trim() === "") return

    setFiles(files.map((file) => (file.id === currentFile.id ? { ...file, name: newFileName } : file)))

    setIsRenameDialogOpen(false)
  }

  const handleSave = () => {
    // Here you would typically send the files and reference link to your backend
    console.log("Files:", files)
    console.log("Reference Link:", referenceLink)
    // Show success message or redirect
  }

  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-2xl font-semibold mb-6">Work Samples</h1>

      {/* Upload Area */}
      <div className="bg-gray-50 rounded-lg p-8 text-center mb-6">
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="h-12 w-12 bg-white rounded-lg border flex items-center justify-center">
            <File className="h-6 w-6 text-gray-500" />
          </div>
          <h3 className="text-lg font-medium mt-2">Upload file</h3>
          <p className="text-sm text-gray-500">Max. file size 10 MB</p>

          <Button
            variant="outline"
            className="mt-4 w-full max-w-md rounded-md py-6 bg-gray-100 hover:bg-gray-200 border-0"
            onClick={() => fileInputRef.current.click()}
          >
            <Upload className="h-5 w-5 mr-2" />
            Add file
          </Button>
          <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileUpload} multiple />
        </div>
      </div>

      {/* Uploaded Files */}
      <div className="space-y-3 mb-6">
        {files.map((file) => (
          <div key={file.id} className="flex items-center justify-between py-3 px-2 border-b">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <File className="h-5 w-5 text-gray-500" />
              </div>
              <div>
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-gray-500">{file.size}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => openRenameDialog(file)} className="p-2 text-gray-400 hover:text-gray-700">
                <Pencil className="h-4 w-4" />
              </button>
              <button onClick={() => handleDeleteFile(file.id)} className="p-2 text-gray-400 hover:text-gray-700">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Reference Link */}
      <div className="space-y-2 mb-8">
        <label className="text-sm font-medium flex items-center">
          Reference link <span className="text-gray-500 ml-1">(optional)</span>
        </label>
        <Input
          placeholder="www.linkname.com"
          value={referenceLink}
          onChange={(e) => setReferenceLink(e.target.value)}
          className="rounded-md"
        />
        <p className="text-xs text-gray-500">This could be a portfolio URL</p>
      </div>

      {/* Save Button */}
      <CustomButton className="w-full py-6 bg-black hover:bg-black/90 rounded-md text-white" onClick={handleSave}>
        Save changes
      </CustomButton>

      {/* Rename Dialog */}
      <Dialog open={isRenameDialogOpen} onOpenChange={setIsRenameDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Rename File</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              placeholder="Enter new file name"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRenameDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleRename}>Rename</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default UserWorkSamples