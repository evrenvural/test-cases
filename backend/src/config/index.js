import mongoose from "mongoose";

export function connectWithDatabase() {
  const username = "evrenvural";
  const password = "1";

  mongoose.connect(
    `mongodb+srv://${username}:${password}@cluster0.e4y66.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (error) => {
      if (error) {
        console.error("Connection error! -> ", error.message);
      } else {
        console.log("Connected with database");
      }
    }
  );
}
