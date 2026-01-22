import { app } from "./server.js";
import { ENV } from "./utils/env.js";
import { ConnectionDB } from "./utils/db.js";

const serve = async () => {
  await new ConnectionDB(ENV.URI as string)
    .connectDB()
    .then(() => {
      app.listen(ENV.PORT, () => {
        console.log("Server is listening to port", ENV.PORT);
      });
    })
    .catch((e) => {
      console.log(e);
    });
};

serve();
