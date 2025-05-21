import type React from "react"
// Add this new file for TypeScript type definitions
export interface User {
  id: number
  firstName: string
  lastName: string
  otherName?: string
  email: string
  phone: string
  gender: string
  age: string
  state?: string
  userType: string
  status: string
  bio?: string
  avatar: string
  walletBalance: number
  totalEarnings: number
  totalSpent: number
  joinedDate: string
}

export type UserDetailsContextType = {
  user: User
  setUser: React.Dispatch<React.SetStateAction<User>>
}
