import { ITodoItem } from "@/interfaces/Item";
import { Box,  SkeletonText, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link"
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

const ToDoListDetails = () => {
  const router = useRouter();
  const id = router.query.id;
  // const id = "1";
  const [todo, setTodo] = useState<ITodoItem>({} as ITodoItem);
  const todoQuery = useQuery({
    queryKey: ["todosDetails", id],
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
      <Link href="/">
        <Box className="flex gap-3 ">
          <FaArrowLeft size="30" />

          <Text textStyle="2xl">Home</Text>
        </Box>
      </Link>

      <Box className="bg-white grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2  p-16 mt-11">
        <Text className="font-bold text-3xl lg:pb-24 sm:pb-10"> Title:</Text>{" "}
        <Text className=" text-3xl " as='div'>{todoQuery.isLoading ? <SkeletonText/> : todo.title}</Text>
        <Text className="font-bold text-3xl "> Status:</Text>{" "}
        <Text className=" text-3xl " as='div'>
          {todoQuery.isLoading ? <SkeletonText/> : todo.completed ? "Completed" : "Incomplete"}
        </Text>
      </Box>
    </Box>
  );
};

export default ToDoListDetails;
