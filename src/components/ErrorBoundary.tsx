import { Box, Text,} from "@chakra-ui/react";
import Link from "next/link";

export default function ErrorBoundaryComponent(props) {
  console.log("err", props.error);

  if (!props.error) {
    return props.children;
  }

  return (
    <Box className="p-10 bg-gray-200 min-h-lvh">
      <Box className="bg-white p-5 flex-col text-center">
        <Text className="text-9xl">☹️</Text>

        <Text textStyle="4xl">Oops! Error Occurred</Text>
        <Text textStyle="2xl">
          An unexpected error occurred.{" "}
          <Link href="/">
            {" "}
            <span className="text-rose-600">Return to homepage </span>{" "}
          </Link>
        </Text>
      </Box>
    </Box>
  );
}
