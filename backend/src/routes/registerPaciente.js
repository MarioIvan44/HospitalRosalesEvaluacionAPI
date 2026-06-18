import express from "express"
import uploader from "../utils/cloudinaryConfig.js"
import registerPacientesController from "../controllers/registerPacientesController.js"

const router = express.Router();

router.route("/").post(uploader.single("profilePhoto"),registerPacientesController.register)
router.route("/verifyCodeEmail").post(registerPacientesController.verifyCode)

export default router;
