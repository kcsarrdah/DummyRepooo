import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Spinner,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
} from "@chakra-ui/react";

interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
  gamesPlayed: number;
}

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/auth/getAllUsers')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUsers(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <Container maxW="container.xl" py={12}>
      <Heading as="h1" size="xl" mb={4}>
        Admin Dashboard
      </Heading>
      {isLoading ? (
        <Flex justify="center" align="center">
          <Spinner />
        </Flex>
      ) : (
        <Box>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>User ID</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Active</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user) => (
                <Tr key={user.id}>
                  <Td>{user.id}</Td>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                  <Td>Yes</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Button mt={4} colorScheme="blue">
            Export to CSV
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default AdminDashboard;