"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { fetchUserData, updateUserData } from "../apis/userApi";
import { logout } from "../apis/auth";
import { Button, Typography, Container, TextField, Box } from "@mui/material";
import { setLoading } from "@/store/actions";

const UserProfile = () => {
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState("");

  // ✅ Get token from Redux
  const token = useSelector((state: RootState) => state.user.token);
  const user = useSelector((state: RootState) => state.user.user);
  const loading = useSelector((state: RootState) => state.loading);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          dispatch(setLoading({ status: true }));
          const data = await fetchUserData();
          dispatch(setLoading({ status: false }));
          setFullName(data.fullName);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
          dispatch(setLoading({ status: false }));
        }
      };
      getUser();
    }
  }, [token]);

  const handleUpdate = async () => {
    if (token) {
      try {
        dispatch(setLoading({ status: true, success: false }))
        await updateUserData({ fullName: fullName });
        dispatch(setLoading({ status: false, success: true }))
        alert("Profile updated successfully!");
      } catch (error) {
        dispatch(setLoading({ status: false, success: false, error: 'Failed to update user data'}))
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
        {loading.status && <Typography color="primary">Updating...</Typography>}
        {loading.success && <Typography color="success">Profile updated successfully!</Typography>}
        {loading.error && <Typography color="error">{loading.error}</Typography>}

        <>
          <Typography variant="h5">Welcome, {user?.fullName}</Typography>
          <TextField
            fullWidth
            label="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            margin="normal"
          />
          <Button variant="contained" onClick={handleUpdate} sx={{ mt: 2 }}>
            Update Profile
          </Button>
        </>

        <Button variant="outlined" color="error" onClick={logout} sx={{ mt: 2 }}>
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default UserProfile;
