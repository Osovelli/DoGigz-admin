import React from "react"
import { Input } from "@/components/ui/input"

const CustomInput = React.forwardRef(({ label, error, optional, rightIcon, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-foreground">{label}</label>
          {optional && <span className="text-sm text-muted-foreground">(optional)</span>}
        </div>
      )}
      <div className="relative">
        <Input
          ref={ref}
          {...props}
          className={`${props.className || ""} ${error ? "border-red-500" : ""} ${rightIcon ? "pr-10" : ""} focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0`}
        />
        {rightIcon && <div className="absolute inset-y-0 right-0 flex items-center">{rightIcon}</div>}
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
})

CustomInput.displayName = "CustomInput"

export default CustomInput

