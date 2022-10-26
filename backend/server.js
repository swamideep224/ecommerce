const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

//Handling Uncaught Exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error:${err.message}`);
  console.log("shutting down the server due to Uncaught Exceptioon Error");
  process.exit(1);
});

// config

dotenv.config({ path: "backend/config/config.env" });

// Connecting to database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});
// console.log(youtube);

//unHandled Promise Rejection Error

process.on("unhandledRejection", (err) => {
  console.log(`Error:${err.message}`);
  console.log(
    "Shutting down the server due to unHanlded Promise Rejection Error"
  );
  server.close(() => {
    process.exit(1);
  });
});
