import app from "./app";
import { ENV } from "./config/constants";
import { connectDB } from "./config/db";

connectDB()
  .then(() => {
    app.listen(ENV.PORT, () => {
      console.log(`Server is running at http://localhost:${ENV.PORT}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
