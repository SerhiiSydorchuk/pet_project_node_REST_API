import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middelwares";
import { commonMiddlewares } from "../middlewares/common.middelwares";
import { UserValidator } from "../validators/user.validator";

const router = Router();
router.post(
  "/sing-up",
  commonMiddlewares.validateBody(UserValidator.create),
  authController.singUp,
);
router.post(
  "/sing-in",
  commonMiddlewares.validateBody(UserValidator.login),
  authController.singIn,
);
router.post(
  "/refresh",
  authMiddleware.checkRefreshToken,
  authController.refresh,
);
router.post("/logout", authMiddleware.checkAccessToken, authController.logout);

export const authRouter = router;
