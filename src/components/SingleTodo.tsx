import React from "react";
import { Box, Card, SkeletonText, Text } from "@chakra-ui/react";

import { Link } from "react-router";

const SingleTodo = (props) => {
  const { item, isLoading } = props;

  //card
  return (
    <Card.Root variant="elevated" width="100%" className="mt-5">
      <Link to={`/todos/${item.id}`}>
        <Card.Body gap="1">
          <Card.Title mb="2" className="flex justify-between" textStyle="2xl">
            {isLoading ? <SkeletonText /> : item.title}
          </Card.Title>
          <Card.Description textStyle="lg">{item.description}</Card.Description>
        </Card.Body>
      </Link>
      <Card.Footer className="flex justify-between">
        <Text>{ isLoading ? <SkeletonText />  : item.date} </Text>
       {  isLoading ? <SkeletonText />  :  <Box>
            <label type="checkbox" className="pr-3">
              Mark as complete
            </label>
            <input
              onChange={() => "done"}
              type="checkbox"
              name="checkbox"
              id="checkbox"
              checked={item.completed}
            />
          </Box>}
      </Card.Footer>
    </Card.Root>
  );
};

export default SingleTodo;
