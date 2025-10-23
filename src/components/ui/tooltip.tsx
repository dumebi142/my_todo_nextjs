import * as React from 'react'
import {
  Tooltip as ChakraTooltip,
  Portal,
  UseTooltipProps as ChakraTooltipProps,
} from '@chakra-ui/react'

interface TooltipProps extends Omit<ChakraTooltipProps, 'children'> {
  children: React.ReactNode
  content: React.ReactNode
  disabled?: boolean
  showArrow?: boolean
  portalled?: boolean
  contentProps?: React.ComponentProps<typeof ChakraTooltip.Content>
  portalRef?: React.RefObject<HTMLElement>

  
}

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  function Tooltip(
    {
      showArrow = false,
      children,
      disabled,
      portalled = true,
      content,
      contentProps,
      portalRef,
      ...rest
    },
    ref
  ) {
    if (disabled) return <>{children}</>

    return (
      <ChakraTooltip.Root {...rest}>
        <ChakraTooltip.Trigger asChild>{children}</ChakraTooltip.Trigger>
        <Portal container={portalRef} disabled={!portalled}>
          <ChakraTooltip.Content ref={ref} {...contentProps}>
            {showArrow && (
              <ChakraTooltip.Arrow>
                <ChakraTooltip.ArrowTip />
              </ChakraTooltip.Arrow>
            )}
            {content}
          </ChakraTooltip.Content>
        </Portal>
      </ChakraTooltip.Root>
    )
  }
)
