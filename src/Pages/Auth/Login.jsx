import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"
import CustomInput from "../../components/CustomInput"
import CustomButton from "@/components/CustomButton"

const Login = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loginError, setLoginError] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }

    // Clear general login error when user makes changes
    if (loginError) {
      setLoginError("")
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address must be in the right format"
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (!/(?=.*\d)(?=.*[!@#$%^&*])/.test(formData.password)) {
      newErrors.password = "Password must contain at least one number and one special character"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo purposes, check if email is admin@giggerz.com and password is Admin@123
      if (formData.email === "admin@giggerz.com" && formData.password === "Admin@123") {
        // Store auth token or user info in localStorage/sessionStorage
        localStorage.setItem("adminAuth", "true")
        navigate("/admin")
      } else {
        // Check if email exists (in a real app, this would be a server response)
        if (formData.email !== "admin@giggerz.com") {
          setLoginError("Email is not registered")
        } else {
          setLoginError("Password is incorrect")
        }
      }
    } catch (error) {
      setLoginError("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background image with gradient overlay */}
      <div className="absolute inset-0 z-0">
        {/* Replace the placeholder URL with your actual image when available */}
        <div
          className="absolute inset-0 bg-cover object-cover bg-center bg-gradient-to-br from-[#B2FCE4]/80 via-[#B9aaD3]/60 to-[#B2FCE2]/80"
          style={{
            backgroundImage: "url('/Soft light.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.8,
            repeat: "no-repeat",
          }}
        ></div>
        <div className="absolute inset-0 bg-gray-800/80 opacity-100"></div>
      </div>

      {/* Login form */}
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-1">DoGigz</h1>
          <h2 className="text-2xl font-semibold mb-1">Administrative Panel</h2>
          <p className="text-gray-600">Login to Your Account</p>
        </div>

        {loginError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">{loginError}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <CustomInput
              label="Email"
              id="email"
              name="email"
              type="text"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g johndoe@giggerz.com"
              error={errors.email}
            />
          </div>

          <div className="mb-6">
            <div className="relative">
              <CustomInput
                label="Password"
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••"
                error={errors.password}
                rightIcon={
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex="-1"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                }
              />
            </div>
          </div>

          <CustomButton
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </CustomButton>
        </form>
      </div>
    </div>
  )
}

export default Login