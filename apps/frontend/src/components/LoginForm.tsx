import { useState } from "react";
import { login, register } from "../apis/auth";
import { Button, TextField, Typography, Box, Container } from "@mui/material";
import { useRouter } from "next/navigation";
import { RootState, store } from "@/store/store";
import { setLoading } from "@/store/actions";
import { useSelector } from "react-redux";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const loadingStatus = useSelector((state: RootState) => state.loading.status);
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    store.dispatch(setLoading({ status: true }))
    if (isSignup) {
      await register(email, password, fullName);
      alert("Registered Successfully");
    } else {
      const { token } = await login(email, password);
      alert("Logged in with token: " + token);
    }
    store.dispatch(setLoading({ status: false }))
    router.push('/')
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Login"}</Typography>
        <form onSubmit={handleSubmit}>
          {isSignup && <TextField label="Full Name" fullWidth margin="normal" value={fullName} onChange={(e) => setFullName(e.target.value)} />}
          <TextField label="Email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField label="Password" fullWidth margin="normal" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }} disabled={loadingStatus ? true : false}>{isSignup ? "Sign Up" : "Login"}</Button>
          {loadingStatus && <Typography color="primary">Logging in...</Typography>}
        </form>
        <Button onClick={() => setIsSignup(!isSignup)} sx={{ mt: 2 }}>{isSignup ? "Already have an account? Login" : "Don't have an account? Sign up"}</Button>
      </Box>
    </Container>
  );
};

export default LoginForm;
