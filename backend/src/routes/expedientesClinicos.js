import express from "express"
import expedientesClinicosController from "../controllers/expedientesClinicosController.js"

const router = express.Router();
router.route("/")
.get(expedientesClinicosController.getAll)
.post(expedientesClinicosController.create)

router.route("/:id")
.put(expedientesClinicosController.put)
.delete(expedientesClinicosController.delete)
.get(expedientesClinicosController.getById)

export default router;