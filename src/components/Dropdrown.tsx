import React from "react"
import { Button, Menu, Portal } from "@chakra-ui/react"
import { HiSortAscending } from "react-icons/hi"

// Define the shape of each item
interface DropdownItem {
  label: string
  value: string
}

// Define props for the component
interface DropdownProps {
  items: DropdownItem[]
  handleChange: (value: string) => void
}

const Dropdown: React.FC<DropdownProps> = ({ items, handleChange }) => {
  if (!items || items.length === 0) return null // optional safeguard

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="outline" size="2xl">
          <HiSortAscending /> Filter
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content minW="10rem">
            <Menu.RadioItemGroup
  value={items[0].value}
  onValueChange={(e) => handleChange(e.value)} // extract the string value
>

              {items.map((item) => (
                <Menu.RadioItem key={item.value} value={item.value}>
                  {item.label}
                  <Menu.ItemIndicator />
                </Menu.RadioItem>
              ))}
            </Menu.RadioItemGroup>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}

export default Dropdown
