import React, { ReactNode } from "react"
import { Box, Text } from "@chakra-ui/react"
import Link from "next/link"

// Define the props interface
interface ErrorBoundaryProps {
  error: Error | null
  children: ReactNode
}

// Fully typed component
export default function ErrorBoundaryComponent({
  error,
  children,
}: ErrorBoundaryProps) {
  console.log("err", error)

  if (!error) {
    return <>{children}</>
  }

  return (
    <Box className="p-10 bg-gray-200 min-h-[100vh]">
      <Box className="bg-white p-5 flex flex-col text-center">
        <Text className="text-9xl">☹️</Text>

        <Text fontSize="4xl">Oops! Error Occurred</Text>
        <Text fontSize="2xl">
          An unexpected error occurred.{" "}
          <Link href="/">
            <span className="text-rose-600">Return to homepage</span>
          </Link>
        </Text>
      </Box>
    </Box>
  )
}

