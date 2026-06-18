import express from "express"
import pacientesController from "../controllers/pacientesController.js"
import uploader from "../utils/cloudinaryConfig.js"

const router = express.Router()

router.route("/")
.get(pacientesController.getAll)

router.route("/:id")
.put(uploader.single("profilePhoto"), pacientesController.put)
.delete(pacientesController.delete)
.get(pacientesController.getById)

export default router;