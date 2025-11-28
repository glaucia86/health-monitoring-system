import * as React from "react"
import PhoneInput from "react-phone-number-input"
import { cn } from "@/lib/utils"
import { Input } from "./input"
import { CountrySelect } from "./country-select"

const PhoneInputComponent = React.forwardRef<
  React.ElementRef<typeof PhoneInput>,
  React.ComponentProps<typeof PhoneInput>
>(({ className, onChange, ...props }, ref) => {
  return (
    <PhoneInput
      ref={ref}
      className={cn("flex gap-2", className)}
      inputComponent={Input}
      countrySelectComponent={CountrySelect}
      onChange={onChange}
      {...props}
    />
  )
})
PhoneInputComponent.displayName = "PhoneInput"

export { PhoneInputComponent as PhoneInput }
