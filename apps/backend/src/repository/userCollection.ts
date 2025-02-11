import { db } from "../config/firebaseConfig";
import { User } from "@ebuddy/shared";

export const updateUserData = async (userId: string, userData: Partial<User>) => {
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

export const getPotentialUsers = async (userId: string) => {
  const usersRef = db.collection("users");
  const snapshot = await usersRef.orderBy("potentialScore", "desc").limit(3).get();
  const users = snapshot.docs.map((doc) => ({ userId: doc.id, ...doc.data() }));

  return users;
};

export const updateAllUsers = async () => {
  const DECAY_FACTOR = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
  const now = Date.now()
  const usersRef = await db.collection("users").get();
  usersRef.docs.forEach((doc) => {
    const totalAverageWeightRatings = Math.floor(Math.random() * (5 - 1 + 1) + 1)
    const numberOfRents = Math.floor(Math.random() * (100 - 1 + 1) + 1)
    const recentlyActiveRate = Math.exp(-(now - doc.data().recentlyActive) / DECAY_FACTOR)
    doc.ref.update({
      potentialScore: (totalAverageWeightRatings * 0.5) + (numberOfRents * 0.3) + (recentlyActiveRate * 0.2),
      numberOfRents: numberOfRents,
      totalAverageWeightRatings: totalAverageWeightRatings
    })
  })
};

export const createUserData = async (userData: User) => {
  try {
    const docRef = await db.collection("users").add(userData);
    console.log("Document added with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};
