import { Router } from "express";
import {
  getAllPosts,
  addPost,
  getPostById,
} from "../controllers/post-controller";

const postRouter = Router();

postRouter.get("/", getAllPosts);
postRouter.post("/", addPost);
postRouter.get("/:id", getPostById);

export default postRouter;
