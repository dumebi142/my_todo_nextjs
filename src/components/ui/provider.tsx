'use client'

import * as React from 'react'
import { ChakraProvider,  defaultSystem } from '@chakra-ui/react'
import { ColorModeProvider } from './color-mode'

export function Provider(props: React.PropsWithChildren<React.ComponentProps<typeof ColorModeProvider>>) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider {...props} forcedTheme="light" />
    </ChakraProvider>
  )
}
