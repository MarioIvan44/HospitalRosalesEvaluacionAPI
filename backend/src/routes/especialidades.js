import express from "express"
import especialidadesController from "../controllers/especialidadesController.js"

const router = express.Router();
router.route("/")
.get(especialidadesController.getAll)
.post(especialidadesController.create)

router.route("/:id")
.put(especialidadesController.put)
.delete(especialidadesController.delete)

export default router;