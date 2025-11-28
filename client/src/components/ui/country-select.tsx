"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { getCountries, getCountryCallingCode } from "react-phone-number-input"
import en from "react-phone-number-input/locale/en.json"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface CountrySelectProps {
  value?: string
  onChange: (value: string) => void
  disabled?: boolean
}

export function CountrySelect({ value, onChange, disabled }: CountrySelectProps) {
  const [open, setOpen] = React.useState(false)
  const countries = getCountries()

  const selectedCountryName = value ? en[value as keyof typeof en] : "Selecione..."
  const selectedCallingCode = value ? `+${getCountryCallingCode(value as any)}` : ""

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Selecionar país"
          className="w-[200px] justify-between"
          disabled={disabled}
        >
          <span className="flex items-center gap-2">
            {value && (
              <span className={`fi fi-${value.toLowerCase()} rounded-sm`} />
            )}
            <span className="truncate">
              {selectedCountryName}
              {selectedCallingCode && (
                <span className="text-muted-foreground ml-1">
                  {selectedCallingCode}
                </span>
              )}
            </span>
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Buscar país..." />
          <CommandList>
            <CommandEmpty>Nenhum país encontrado.</CommandEmpty>
            <CommandGroup>
              {countries.map((country) => {
                const countryName = en[country as keyof typeof en]
                const callingCode = getCountryCallingCode(country as any)
                
                return (
                  <CommandItem
                    key={country}
                    value={`${countryName} ${country} ${callingCode}`}
                    onSelect={() => {
                      onChange(country)
                      setOpen(false)
                    }}
                  >
                    <span className="flex items-center gap-2 flex-1">
                      <span className={`fi fi-${country.toLowerCase()} rounded-sm`} />
                      <span className="truncate">{countryName}</span>
                      <span className="text-muted-foreground text-sm ml-auto">
                        +{callingCode}
                      </span>
                    </span>
                    <Check
                      className={cn(
                        "ml-2 h-4 w-4",
                        value === country ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
