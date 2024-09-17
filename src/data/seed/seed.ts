import { envs } from "../../config";
import {
  MongoDatabase,
  UserModel,
  ProductModel,
  CategoryModel,
} from "../mongo";
import { seedData } from "./data";

(async () => {
  await MongoDatabase.connect({
    dbName: envs.MONGO_DB_NAME,
    mongoUrl: envs.MONGO_URL,
  });

  await main();

  await MongoDatabase.disconnect();
})();

const randomBetween0andX = (x: number) => Math.floor(Math.random() * x);

async function main() {
  const users = await seedData.users();

  //delete all data
  await Promise.all([
    UserModel.deleteMany({}),
    CategoryModel.deleteMany({}),
    ProductModel.deleteMany({}),
  ]);

  //create users

  const usersDB = await UserModel.insertMany(users);

  //create categories

  const categoriesBD = await CategoryModel.insertMany(
    seedData.categories.map((category) => ({
      ...category,
      user: usersDB[randomBetween0andX(usersDB.length - 1)]._id,
    }))
  );

  //create products
  const products = await ProductModel.insertMany(
    seedData.products.map((product) => ({
      ...product,
      user: usersDB[randomBetween0andX(usersDB.length - 1)]._id,
      category: categoriesBD[randomBetween0andX(categoriesBD.length - 1)]._id,
    }))
  );

  console.log("Seed data");
}
