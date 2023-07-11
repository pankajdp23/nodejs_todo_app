import { app } from "./app.js";
import { connectDB } from "./data/database.js";

const PORT = process.env.PORT;
connectDB();

app.listen(PORT, () => {
  console.log(
    `Server is working on PORT:${PORT} in ${process.env.NODE_ENV} Mode`
  );
});
