import { Box,  SkeletonText, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useParams } from "react-router";

const ToDoListDetails = () => {
  const params = useParams();
  const id = params.id;
  const [todo, setTodo] = useState({});
  const todoQuery = useQuery({
    queryKey: ["todosDetails"],
    queryFn: async () => {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/todos/${id}`
      );
      const data = await response.data;
      setTodo(data);
      return data;
    },
  });
  
  if (todoQuery.isError) return <h1>Error loading data!!!</h1>;

  return (
    <Box className="p-10 bg-gray-200 min-h-lvh">
      <Link to="/">
        <Box className="flex gap-3 ">
          <FaArrowLeft size="30" />

          <Text textStyle="2xl">Home</Text>
        </Box>
      </Link>

      <Box className="bg-white grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2  p-16 mt-11">
        <Text className="font-bold text-3xl lg:pb-24 sm:pb-10"> Title:</Text>{" "}
        <Text className=" text-3xl ">{todoQuery.isLoading ? <SkeletonText/> : todo.title}</Text>
        <Text className="font-bold text-3xl "> Status:</Text>{" "}
        <Text className=" text-3xl ">
          {todoQuery.isLoading ? <SkeletonText/> : todo.completed ? "Completed" : "Incomplete"}
        </Text>
      </Box>
    </Box>
  );
};

export default ToDoListDetails;
