import app from "./app";
import * as functions from "firebase-functions";

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

export const api = functions.https.onRequest(app);
