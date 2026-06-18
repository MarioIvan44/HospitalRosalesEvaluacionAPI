import express from "express"
import loginCustomerController from "../controllers/loginController.js"

const router = express.router();

router.route("/").post(loginCustomerController.login)
export default router;