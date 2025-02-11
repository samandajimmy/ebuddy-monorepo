export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002/api";

export const ERROR_MESSAGES = {
  USER_NOT_FOUND: "User not found",
  UNAUTHORIZED: "Unauthorized access",
  INVALID_INPUT: "Invalid input data",
  INTERNAL_SERVER_ERROR: "Internal server error",
};

export const SUCCESS_MESSAGES = {
  USER_CREATED: "User created successfully",
  USER_UPDATED: "User updated successfully",
  FETCH_SUCCESS: "Data retrieved successfully",
};
