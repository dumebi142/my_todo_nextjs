import { Box, Text } from "@chakra-ui/react";
import React from "react";
import Link from "next/link";

const Error404 = () => {
  return (
    <Box className="p-10 bg-gray-200 min-h-lvh flex align-center justify-center">
      <Box className=" p-5 flex-col text-center">
        <Text className="text-9xl">404</Text>

        <Text textStyle="4xl">Oops! Nothing was found</Text>
        <Text textStyle="2xl">
          The page you are looking for might have been removed had its name
          changed or is temporarily unavailable. <Link href="/"> <span className="text-rose-600">Return to homepage </span>  </Link> 
        </Text>
      </Box>
    </Box>
  );
};

export default Error404;
