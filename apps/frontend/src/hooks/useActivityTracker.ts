import { useEffect } from "react";
import { updateUserActivity } from "../apis/userApi";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const useActivityTracker = () => {
  const token = useSelector((state: RootState) => state.user.token);
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    if (!user || !token) return;

    const handleActivity = () => {
      updateUserActivity();
    };

    document.addEventListener("keydown", handleActivity);
    document.addEventListener("focus", handleActivity);

    return () => {
      document.removeEventListener("keydown", handleActivity);
      document.removeEventListener("focus", handleActivity);
    };
  }, [user, token]);
};

export default useActivityTracker;
