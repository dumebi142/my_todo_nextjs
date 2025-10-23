'use client'

import React, { useState, useEffect, useMemo } from "react"
import {
  Box,
  ButtonGroup,
  IconButton,
  Input,
  InputGroup,
  Text,
} from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import { FaPlusCircle } from "react-icons/fa"
import { LuChevronLeft, LuChevronRight } from "react-icons/lu"
import Link from "next/link"
import axios from "axios"

import SingleTodo from "../components/SingleTodo"
import Dropdrown from "../components/Dropdrown"
import { ITodoItem } from "@/interfaces/Item"

// Constants
const PAGE_SIZE = 10
const INITIAL_FILTER = "all"

// Dropdown item type
interface DropdownItem {
  label: string
  value: string
}

export default function Home() {
  // --- State ---
  const [masterList, setMasterList] = useState<ITodoItem[]>([])
  const [page, setPage] = useState(1)
  const [searchText, setSearchText] = useState("")
  const [filterValue, setFilterValue] = useState<string | boolean>(INITIAL_FILTER)

  // --- Fetch Todos ---
  const todoQuery = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await axios.get<ITodoItem[]>(
        "https://jsonplaceholder.typicode.com/todos"
      )
      setMasterList(response.data)
      return response.data
    },
  })

  // --- Filter + Search ---
  const filteredAndSearchedList = useMemo(() => {
    let result = masterList

    if (searchText) {
      result = result.filter((todo) =>
        todo.title.toLowerCase().includes(searchText.toLowerCase())
      )
    }

    if (filterValue !== INITIAL_FILTER) {
      const filterCompleted = filterValue === true
      result = result.filter((todo) => todo.completed === filterCompleted)
    }

    return result
  }, [masterList, searchText, filterValue])

  // --- Pagination ---
  const totalPages = Math.ceil(filteredAndSearchedList.length / PAGE_SIZE)
  const currentList = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    const end = start + PAGE_SIZE
    return filteredAndSearchedList.slice(start, end)
  }, [filteredAndSearchedList, page])

  // Reset page if filtered list changes
  useEffect(() => {
    if (page > totalPages) setPage(1)
  }, [filteredAndSearchedList, page, totalPages])

  // --- Handlers ---
  const handleFilter = (value: string) => {
    if (value === "true") setFilterValue(true)
    else if (value === "false") setFilterValue(false)
    else setFilterValue("all")
    setPage(1)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
    setPage(1)
  }

  // const handlePageChange = ({ page }: { page: number }) => {
  //   setPage(page)
  // }

  // --- Dropdown items ---
  const items: DropdownItem[] = [
    { label: "All", value: INITIAL_FILTER },
    { label: "Completed", value: "true" },
    { label: "Incompleted", value: "false" },
  ]

  if (todoQuery.isError) return <h1>Error loading data!!!</h1>

  return (
    <Box className="p-10 bg-gray-200 relative min-h-lvh">
      {/* Add Task Button */}
      <Link href="/create">
        <Box aria-label="add Task" className="absolute right-10 bottom-7">
          <FaPlusCircle size={50} />
        </Box>
      </Link>

      {/* Search Input */}
      <Box className="flex justify-between mb-5">
        <InputGroup flex="1">
          <Input
            placeholder="Search tasks"
            variant="flushed"
            value={searchText}
            onChange={handleSearch}
          />
        </InputGroup>
      </Box>

      {/* Header */}
      <header className="flex justify-between items-center mb-5">
        <Box>
          <Text textStyle="5xl">Hello Blossom</Text>
          <p>Let &apos;,s get started on your tasks</p>
        </Box>
        <Dropdrown items={items} handleChange={handleFilter} />
      </header>

      {/* Todos */}
      <main className="mt-5">
        {todoQuery.isLoading ? (
          <Text>Loading...</Text>
        ) : (
          currentList.map((item) => (
            <SingleTodo key={item.id} item={item} isLoading={false} />
          ))
        )}
      </main>

      {/* Pagination */}
      <Box className="flex justify-around my-5">
        <ButtonGroup variant="outline">
         <IconButton
  onClick={() => setPage((p) => Math.max(1, p - 1))}
  disabled={page === 1}
  aria-label="Previous Page"
>
  <LuChevronLeft />
</IconButton>
          <Text className="px-3 text-xl">
            {page} / {totalPages || 1}
          </Text>
        <IconButton
  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
  disabled={page === totalPages || totalPages === 0}
  aria-label="Next Page"
>
  <LuChevronRight />
</IconButton>
        </ButtonGroup>
      </Box>
    </Box>
  )
}
