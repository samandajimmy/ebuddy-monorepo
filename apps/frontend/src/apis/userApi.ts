import { API_BASE_URL, User } from "@ebuddy/shared";
import { store } from "../store/store";
import { setUser } from "@/store/actions";

export const fetchUserData = async (): Promise<User> => {
  try {
    // Get token from Redux
    const token = store.getState().user.token;
    if (!token) throw new Error("No authentication token found");

    const response = await fetch(`${API_BASE_URL}/fetch-user-data`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    const responseBody = await response.json()
    const user = responseBody.data as User

    // ✅ Store user in Redux
    store.dispatch(setUser(user));

    return user
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getPotentialUsers = async () => {
  try {
    // Get token from Redux
    const token = store.getState().user.token;
    if (!token) throw new Error("No authentication token found");

    const response = await fetch(`${API_BASE_URL}/get-potential-users`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    const responseBody = await response.json()
    const users = responseBody.data

    return users
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

// ✅ Function to update user data via backend
export const updateUserData = async (userData: any) => {
  try {
    // Get token from Redux
    const userStore = store.getState().user;
    const token = userStore.token;
    const user = userStore.user;

    if (!token) throw new Error("No authentication token found");

    const rating = userData?.totalAverageWeightRatings || 0
    const rent = userData?.numberOfRents || 0 
    const recentlyActive = userData?.recentlyActive || 0
    const potentialScore = calculatePotentialScore(rating, rent, recentlyActive);

    const response = await fetch(`${API_BASE_URL}/update-user-data`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ...userData, potentialScore: potentialScore })
    });

    if (!response.ok) {
      throw new Error("Failed to update user data");
    }

    // ✅ Store user in Redux
    store.dispatch(setUser({...user, ...userData}));
    const responseBody = await response.json()

    return responseBody.message;
  } catch (error) {
    console.error("Error updating user data:", error);
    throw error;
  }
};

// ✅ Function to create user data via backend
export const createUserData = async (userData: User) => {
  try {
    // Get token from Redux
    const userStore = store.getState().user;
    const token = userStore.token;

    if (!token) throw new Error("No authentication token found");

    const response = await fetch(`${API_BASE_URL}/create-user-data`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      throw new Error("Failed to create user data");
    }
    const responseBody = await response.json()

    return responseBody.message;
  } catch (error) {
    console.error("Error create user data:", error);
    throw error;
  }
};

export const updateUserActivity = async () => {
  try {
    // Get token from Redux
    const userStore = store.getState().user;
    const token = userStore.token;

    if (!token) throw new Error("No authentication token found");

    await fetch(`${API_BASE_URL}/update-activity`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Failed to update user activity:", error);
  }
};

const calculatePotentialScore = (W: number, R: number, A: number): number => {
  return (W * 0.5) + (R * 0.3) + (A * 0.2);
};
