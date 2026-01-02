import connectRedis from "./utils/redis";

const startServer = async () => {
  await connectRedis();
};

startServer();
