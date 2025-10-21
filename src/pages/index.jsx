import {
  Box,
  ButtonGroup,
  IconButton,
  Pagination,
  Text,
  Input,
  InputGroup,
} from "@chakra-ui/react";

import { useQuery } from "@tanstack/react-query";
import { FaPlusCircle } from "react-icons/fa";
import SingleTodo from "../components/SingleTodo";
import { LuChevronLeft, LuChevronRight, LuSearch } from "react-icons/lu";
import { Link } from "react-router";
import axios from "axios";
import { useState } from "react";
import Dropdrown from "../components/Dropdrown";

export default function Home() {
  const [todoList, setTodos] = useState([]);
  const [currentList, setCurrentList] = useState(new Array(10).fill({}));
  const [page, setPage] = useState(1);
  const [pageLength, setPageLength] = useState(0);

  const items = [
    { label: "All", value: "all" },
    { label: "Completed", value: true },
    { label: "Incompleted", value: false },
  ];

  const todoQuery = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const data = await response.data;
      setTodos(data);

      paginate(data, page, 10);
      return data;
    },
  });

  //filter
  function handleFilter(event) {
    const value = event.value;
    let result = todoList;
    if (value !== "all") {
      result = todoList.filter((todo) => todo.completed === value);
    }
    setCurrentList(result);
    paginate(result, page, 10);
  }
  //pagination
  function paginate(data, page, pageSize) {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    setPageLength(data.length);

    setCurrentList(data.slice(start, end));
  }
  //search
  function handleSearch(event) {
    const searchText = event.target.value;
    let searchResult = todoList;
    if (searchText) {
      searchResult = todoList.filter((todo) =>
        todo.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setCurrentList(searchResult);
    paginate(searchResult, page, 10);
  }

  if (todoQuery.isError) return <h1>Error loading data!!!</h1>;

  function handlePageChange(props) {
    setPage(props.page);
    paginate(todoList, props.page, props.pageSize);
  }

  //Home
  return (
    <Box className="p-10 bg-gray-200   relative min-h-lvh">
      <Link to="/create">
        <Box aria-label="add Task" className="absolute right-10 bottom-7">
          <FaPlusCircle size="50" />
        </Box>
      </Link>
      {/* search input */}
      <Box className="flex justify-between">
        <InputGroup flex="1" startElement={<LuSearch />}>
          <Input
            placeholder="Search tasks"
            variant="solid"
            onChange={handleSearch}
          />
        </InputGroup>
      </Box>
      {/* header */}
      <header className="flex justify-between  items-center">
        <Box>
          <Text textStyle="5xl">Hello Blossom</Text>
          <p>let's get started on your tasks</p>
        </Box>
        <Dropdrown items={items} handleChange={handleFilter} />
      </header>

{/* 
      main */}
      <main className="mt-5">
        {currentList.map((item) => {
          return (
            <SingleTodo
              item={item}
              key={item.id}
              isLoading={todoQuery.isLoading}
            />
          );
        })}
      </main>

      {/* //pagination */}

      <Box className="flex justify-around my-5">
        <Pagination.Root
          count={pageLength}
          pageSize={10}
          defaultPage={1}
          onPageChange={handlePageChange}
        >
          {/* button */}
          <ButtonGroup variant="outline">
            <Pagination.PrevTrigger asChild>
              <IconButton>
                <LuChevronLeft />
              </IconButton>
            </Pagination.PrevTrigger>

            <Pagination.Items
              render={(page) => (
                <span className="sm:px-7 text-xl">{page.value}</span>
              )}
            />

            <Pagination.NextTrigger asChild>
              <IconButton>
                <LuChevronRight />
              </IconButton>
            </Pagination.NextTrigger>
          </ButtonGroup>
        </Pagination.Root>
      </Box>
    </Box>
  );
}
