import {
  Box,
  ButtonGroup,
  IconButton,
  Pagination,
  Text,
  Input,
  InputGroup,
  // Assuming SkeletonText and Dropdown are custom components
} from "@chakra-ui/react";

import { useQuery } from "@tanstack/react-query";
import { FaPlusCircle } from "react-icons/fa";
import SingleTodo from "../components/SingleTodo";
import { LuChevronLeft, LuChevronRight, LuSearch } from "react-icons/lu";

import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import Dropdrown from "../components/Dropdrown";
import Link from "next/link";
import { ITodoItem } from "@/interfaces/Item";

// Constants
const PAGE_SIZE = 10;
const INITIAL_FILTER = "all";

export default function Home() {
  // --- State Management ---
  // 1. Raw data (from the query hook)
  const [masterList, setMasterList] = useState<ITodoItem[]>([]);
  
  // 2. Control states for filtering/searching/pagination
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [filterValue, setFilterValue] = useState<string | boolean>(INITIAL_FILTER);

  // --- TanStack Query Data Fetching ---
  const todoQuery = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const data: ITodoItem[] = await response.data;
      // Set the master list once the data is fetched
      setMasterList(data); 
      return data;
    },
  });

  // --- Filtering & Searching Logic (Memoized Pipeline) ---
  const filteredAndSearchedList = useMemo(() => {
    let result = masterList;

    // 1. Apply Search
    if (searchText) {
      result = result.filter((todo) =>
        todo.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // 2. Apply Filter
    if (filterValue !== INITIAL_FILTER) {
      // TypeScript safety: convert filterValue to boolean for comparison
      const filterCompleted = filterValue === true; 
      result = result.filter((todo) => todo.completed === filterCompleted);
    }
    
    // The result is the complete list that matches all criteria
    return result;
  }, [masterList, searchText, filterValue]);

  // --- Pagination Logic (Derived State) ---
  const pageLength = filteredAndSearchedList.length;
  const totalPages = Math.ceil(pageLength / PAGE_SIZE);

  const currentList = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return filteredAndSearchedList.slice(start, end);
  }, [filteredAndSearchedList, page]);

  // --- Side Effect: Reset Page on Filter/Search Change ---
  // If the filter or search text changes, the page must reset to 1
  useEffect(() => {
    if (page > totalPages) {
       setPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredAndSearchedList]);


  // --- Handlers ---
  function handleFilter(event: { label: string; value: string | boolean }) {
    setFilterValue(event.value);
    setPage(1); // Crucial: Reset page on filter change
  }

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(event.target.value);
    setPage(1); // Crucial: Reset page on search change
  }
  
  function handlePageChange(props: { page: number; pageSize: number }) {
    setPage(props.page);
  }

  // --- Rendering ---
  if (todoQuery.isError) return <h1>Error loading data!!!</h1>;

  const items = [
    { label: "All", value: INITIAL_FILTER },
    { label: "Completed", value: true },
    { label: "Incompleted", value: false },
  ];

  return (
    <Box className="p-10 bg-gray-200 relative min-h-lvh">
      <Link href="/create">
        <Box aria-label="add Task" className="absolute right-10 bottom-7">
          <FaPlusCircle size="50" />
        </Box>
      </Link>
      
      {/* search input */}
      <Box className="flex justify-between">
        {/* NOTE: Chakra UI InputGroup has a 'leftElement' prop, not 'startElement' */}
        <InputGroup flex="1"> 
          <Input
            placeholder="Search tasks"
            variant="flushed"
            onChange={handleSearch}
          />
          {/* You may want to add the search icon inside the InputGroup */}
          {/* <InputLeftElement pointerEvents="none" children={<LuSearch />} /> */}
        </InputGroup>
      </Box>
      
      {/* header */}
      <header className="flex justify-between items-center">
        <Box>
          <Text textStyle="5xl">Hello Blossom</Text>
          <p>let get started on your tasks</p>
        </Box>
        <Dropdrown items={items} handleChange={handleFilter} />
      </header>

      {/* main */}
      <main className="mt-5">
        {/* Show skeletons if loading, otherwise map the current paged list */}
        {!todoQuery.isLoading 
          && currentList.map((item) => (
               <SingleTodo
                 item={item}
                 key={item.id}
                 isLoading={false}
               />
             ))}
      </main>

      {/* //pagination */}
      <Box className="flex justify-around my-5">
        <Pagination.Root
          count={pageLength} // Count is the size of the filtered/searched list
          pageSize={PAGE_SIZE}
          page={page} // Control the current page from state
          onPageChange={handlePageChange}
        >
          {/* button */}
          <ButtonGroup variant="outline">
            <Pagination.PrevTrigger asChild>
              <IconButton disabled={page === 1}>
                <LuChevronLeft />
              </IconButton>
            </Pagination.PrevTrigger>

            <Pagination.Items
              render={(p: { value: number }) => (
                <span className="sm:px-7 text-xl">{p.value}</span>
              )}
            />

            <Pagination.NextTrigger asChild>
              <IconButton disabled={page === totalPages || pageLength === 0}>
                <LuChevronRight />
              </IconButton>
            </Pagination.NextTrigger>
          </ButtonGroup>
        </Pagination.Root>
      </Box>
    </Box>
  );
}