"use client";

import { useEffect } from "react";
import { auth } from "@/config/firebaseConfig";
import { authCheck } from "../apis/auth";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import UserProfile from "../components/UserProfile";
import { useRouter } from "next/navigation";

export default function Home() {
  const token = useSelector((state: RootState) => state.user.token);
  const router = useRouter();
  const dispatch = useDispatch();

  // ✅ Handle Firebase Auth State Listener
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      authCheck(user);
    });

    return () => unsubscribe();
  }, [dispatch]);

  // ✅ Handle Redirect Based on Auth Status
  useEffect(() => {
    if (!token) {
      router.replace("/login");
    } else {
      router.replace("/");
    }
  }, [token, router]);

  return (
    <main>
      <UserProfile />
    </main>
  );
}
