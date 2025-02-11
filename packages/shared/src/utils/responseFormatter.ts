export const successResponse = (res: any, data: any, message: string = "Success") => {
  return res.status(200).json({ success: true, message, data });
};

export const errorResponse = (res: any, errorMessage: string, statusCode: number = 500) => {
  return res.status(statusCode).json({ success: false, error: errorMessage });
};
