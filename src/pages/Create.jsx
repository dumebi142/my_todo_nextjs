import { Box, Button, Input, Text, Textarea } from "@chakra-ui/react";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router";

const Create = () => {
  return (
    <Box
      className="p-10 bg-gray-200   min-h-lvh

    "
    >
      <Link to="/">
        <Box className="flex gap-3 ">
          <FaArrowLeft size="30" />

          <Text textStyle="2xl">Add Tasks</Text>
        </Box>
      </Link>
      <Box className="pt-10">
        <label for="title"> Task Title</label>
        <Input
          type="text"
          name="title"
          id="title"
          variant="solid"
          className="h-20 rounded-lg p-3"
        />
      </Box>
      {/* Input area */}
      <Box className="pt-10">
        <label for="task"> Task description</label>
        <Textarea
          type="text"
          name="description"
          id="description"
          variant="solid"
          rows="5"
          className=" rounded-lg  "
        />
      </Box>
      <Box className="pt-6">
        <label for="deadline"> Set deadline</label>
        <Input
          type="datetime-local"
          name="date"
          id="date"
          placeholder="Select date and time"
          variant="solid"
          className="h-14 rounded-lg p-3"
        />
        <Box className="pt-20 ">
          <Button
            size="lg"
            className="bg-teal-200 my-8 "
            variant="solid"
            width="100%"
          >
            Add task
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Create;
