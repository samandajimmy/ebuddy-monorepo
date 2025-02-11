"use client";
import { useState, useEffect } from "react";
import { getPotentialUsers } from "../apis/userApi";
import { Typography, List, ListItem, ListItemText, Container } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { User } from "@ebuddy/shared";

const PotentialUsers = () => {
  const token = useSelector((state: RootState) => state.user.token);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) {
        return
      }

      const userList = await getPotentialUsers();
      setUsers(userList);
    };

    fetchUsers();
  }, [token]);

  return (
    <Container>
      <Typography variant="h5" gutterBottom>Top Potential Users</Typography>
      <List>
        {users.map((user, index) => (
          <ListItem key={user.uid}>
            <ListItemText
              primary={`${index + 1}. ${user.fullName}`}
              secondary={`Score: ${user?.potentialScore?.toFixed(2)}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default PotentialUsers;
