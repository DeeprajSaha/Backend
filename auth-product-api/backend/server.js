import "dotenv/config";
import app from "./src/app/app.js";
import connectDB from "./src/config/db.js";

const PORT = process.env.PORT || 4000;

connectDB()

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});