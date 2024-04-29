import mongoose from "mongoose";

const dbConnection = async () => {
  const URI = process.env.MONGODB_URL;

  const connectionParams = {
    useUnifiedTopology: true,
  };

  mongoose.set("strictQuery", false);

  mongoose
    .connect(URI, connectionParams)
    .then(() => console.info("[v] Berhasil connect ke database"))
    .catch((err) => console.error("[!] Error connect ke database\n" + err.message));
};

export default dbConnection;