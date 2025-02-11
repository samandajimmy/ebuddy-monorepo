import { db } from "../config/firebaseConfig";
import { User } from "@ebuddy/shared";

export const updateUserData = async (userId: string, userData: Partial<User>) => {
  await db.collection("users").doc(userId).set(userData, { merge: true });
  const data = await db.collection("users").where("uid", "==", userId).get();

  if (data.empty) {
    return null
  }

  const user = data.docs[0]
  const dataUser = user.data() as User

  user.ref.update({ ...dataUser, ...userData })
};

export const fetchUserData = async (userId: string) => {
  const data = await db.collection("users").where("uid", "==", userId).get();

  return data.empty ? null : data.docs[0].data() as User;
};

export const createUserData = async (userData: User) => {
  try {
    const docRef = await db.collection("users").add(userData);
    console.log("Document added with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};
