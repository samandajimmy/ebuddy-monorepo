import { Request, Response } from "express";
import { updateUserData, fetchUserData, createUserData, getPotentialUsers, updateAllUsers } from "../repository/userCollection";
import { APIError, ERROR_MESSAGES, handleErrorResponse, SUCCESS_MESSAGES, successResponse } from "@ebuddy/shared";

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId, ...userData } = req.body;
    await updateUserData(userId, userData);

    return successResponse(res, {}, SUCCESS_MESSAGES.USER_UPDATED);
  } catch (error) {
    return handleErrorResponse(res, error);
  }
};

export const fetchUser = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;
    const user = await fetchUserData(userId);
    if (!user) throw new APIError(ERROR_MESSAGES.USER_NOT_FOUND, 404);

    return successResponse(res, user, SUCCESS_MESSAGES.FETCH_SUCCESS);
  } catch (error) {
    return handleErrorResponse(res, error);
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    await createUserData(userData);

    return successResponse(res, {}, SUCCESS_MESSAGES.USER_CREATED);
  } catch (error) {
    return handleErrorResponse(res, error);
  }
};

export const userActivity = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;
    const now = Date.now();
    await updateUserData(userId, {recentlyActive: now} );

    return successResponse(res, {}, SUCCESS_MESSAGES.USER_UPDATED);
  } catch (error) {
    return handleErrorResponse(res, error);
  }
};

export const fetchPotentialUsers = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;
    const users = await getPotentialUsers(userId);
    if (!users) throw new APIError(ERROR_MESSAGES.USER_NOT_FOUND, 404);

    return successResponse(res, users, SUCCESS_MESSAGES.FETCH_SUCCESS);
  } catch (error) {
    return handleErrorResponse(res, error);
  }
};

export const updateUsers = async (req: Request, res: Response) => {
  try {
    await updateAllUsers();

    return successResponse(res, {}, SUCCESS_MESSAGES.USER_UPDATED);
  } catch (error) {
    return handleErrorResponse(res, error);
  }
};
