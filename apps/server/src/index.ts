import { app } from "./server.js";
import { ENV } from "./utils/env.js";

app.listen(ENV.PORT, () => {
  console.log("Server is listening to port", ENV.PORT);
});
