import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { store } from "../store/store";
import { setToken, clearUser } from "../store/actions";
import { auth } from "@/config/firebaseConfig";
import { createUserData } from "./userApi";
import { User } from "@ebuddy/shared"


export const login = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const token = await userCredential.user.getIdToken();

  // ✅ Store token in Redux
  store.dispatch(setToken(token));

  return { user: userCredential.user, token };
};

export const register = async (email: string, password: string, fullName: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const token = await userCredential.user.getIdToken();
  const userData = {
    uid: userCredential.user.uid,
    email: email,
    fullName: fullName,
  }

  // ✅ Store token in Redux
  store.dispatch(setToken(token));
  createUserData(userData)

  return userCredential.user;
};

export const logout = async () => {
  await signOut(auth);
  store.dispatch(clearUser()); // ✅ Clear Redux state
};

export const authCheck = async (firebaseUser: any) => {
  if (firebaseUser) {
    const token = await firebaseUser?.getIdToken();

    // ✅ Store token in Redux
    store.dispatch(setToken(token));
  } else {
    store.dispatch(clearUser());
  }
};
