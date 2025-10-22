import React from "react";
import { Box, Card, SkeletonText, Text } from "@chakra-ui/react";

import Link from "next/link";
import { ITodoItem } from "@/interfaces/Item";

const SingleTodo = (props: { item: ITodoItem; isLoading: boolean }) => {
  const { item, isLoading } = props;

  // The Card.Root, Card.Body, and Card.Title are likely custom components,
  // but we focus on fixing the usage of Text and SkeletonText.

  return (
    <Card.Root variant="elevated" width="100%" className="mt-5">
      <Link href={`/todos/${item.id}`}>
        <Card.Body gap="1">
          {/* FIX 1: Apply 'as="div"' to the container if it might hold SkeletonText (a block element).
            This prevents the error: <div> cannot be a descendant of <p>.
          */}
          {isLoading ? (
            <SkeletonText />
          ) : (
            <Card.Title mb="2" className="flex justify-between" textStyle="2xl">
              {item.title}
            </Card.Title>
          )}
          
          <Card.Description textStyle="lg" as="div">
            {isLoading ? <SkeletonText noOfLines={1} w="80%" /> : item.description}
          </Card.Description>

        </Card.Body>
      </Link>
      
      <Card.Footer className="flex justify-between">
        
        {/* FIX 2: Use <Text as="div"> to safely wrap SkeletonText.
          <Text> defaults to <p>, which cannot contain the <div> rendered by <SkeletonText/>.
        */}
        <Text as="div"> 
          {isLoading ? <SkeletonText noOfLines={1} w="100px" /> : item.date} 
        </Text>
        
        {/* FIX 3: Ensure the status block is handled cleanly.
          If isLoading, render SkeletonText inside a neutral <Box> (renders <div>).
          If not loading, render the actual <Box> with the checkbox.
        */}
        {isLoading ? (
          <Box w="150px">
            <SkeletonText noOfLines={1} />
          </Box>
        ) : (
          <Box>
            <label itemType="checkbox" className="pr-3">
              Mark as complete
            </label>
            <input
              onChange={() => "done"}
              type="checkbox"
              name="checkbox"
              id="checkbox"
              checked={item.completed}
            />
          </Box>
        )}
        
      </Card.Footer>
    </Card.Root>
  );
};

export default SingleTodo;