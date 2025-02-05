import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middelwares";
import { commonMiddlewares } from "../middlewares/common.middelwares";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.get("/query", userController.getFilterList);
router.get("/", authMiddleware.checkAccessToken, userController.getList);

router.get("/me", authMiddleware.checkAccessToken, userController.getMe);

router.put(
  "/me",
  authMiddleware.checkAccessToken,
  commonMiddlewares.validateBody(UserValidator.update),
  userController.updateMe,
);

router.delete("/me", authMiddleware.checkAccessToken, userController.deleteMe);

router.get(
  "/:identifier",
  authMiddleware.checkAccessToken,
  userController.getUserByIdOrEmail,
);

export const userRouter = router;
