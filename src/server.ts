// server.ts

import {app} from "./app";
import getConfig from "./utils/config";
import connectionToDatabase from "./utils/dbConnection";

const PORT = getConfig().port;

connectionToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});