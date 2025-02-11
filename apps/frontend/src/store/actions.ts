import { User } from "@ebuddy/shared";
import { createAction } from "@reduxjs/toolkit";

export const setUser = createAction<User>("user/setUser");
export const setToken = createAction<string>("user/setToken");
export const setLoading = createAction<{ status: boolean; success?: boolean; error?: string }>("loading/setLoading");
export const clearUser = createAction("user/clearUser");
