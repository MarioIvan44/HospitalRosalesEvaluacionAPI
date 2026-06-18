import express from "express"
import logoutController from "../controllers/logoutController.js"
import loginController from "../controllers/loginController";

const router = express.router();

router.route("/").post(loginController.login)

export default router;