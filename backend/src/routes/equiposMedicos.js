import express from "express"
import equiposMedicosController from "../controllers/equiposMedicosController.js"
import uploader from "../utils/cloudinaryConfig.js"

const router = express.Router()

router.route("/")
.get(equiposMedicosController.getAll)
.post(uploader.single("image"),equiposMedicosController.create)

router.route("/:id")
.put(equiposMedicosController.put)
.delete(equiposMedicosController.delete)
.get(equiposMedicosController.getById)

export default router;