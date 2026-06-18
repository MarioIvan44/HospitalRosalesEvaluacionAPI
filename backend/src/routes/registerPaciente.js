import express from "express"
import uploader from "../utils/cloudinaryConfig.js"
import registerPacientesController from "../controllers/registerPacientesController.js"

const router = express.Router();

router.route("/").post(registerPacientesController.register)
router.route("/verifyCodeEmail").post(uploader.single("profilePhoto"),registerPacientesController.verifyCode)

export default router;
