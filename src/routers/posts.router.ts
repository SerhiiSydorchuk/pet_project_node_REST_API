import { Router } from "express";

import { postController } from "../controllers/posts.controller";
import { authMiddleware } from "../middlewares/auth.middelwares";

const router = Router();

router.get("/:userId", postController.getUserPosts);
router.post("/", authMiddleware.checkAccessToken, postController.create);
router.put("/:postId", authMiddleware.checkAccessToken, postController.update);
router.delete(
  "/:postId",
  authMiddleware.checkAccessToken,
  postController.delete,
);

export const postsRouter = router;
