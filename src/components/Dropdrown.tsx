import React from "react";

import { Button, Menu, Portal } from "@chakra-ui/react";
import { HiSortAscending } from "react-icons/hi";

const Dropdrown = ({ items, handleChange }) => {
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
              onValueChange={handleChange}
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
  );
};

export default Dropdrown;
