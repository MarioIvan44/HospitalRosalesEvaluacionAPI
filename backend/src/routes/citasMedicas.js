import express from "express"
import citasMedicasController from "../controllers/citasMedicosController.js"

const router = express.Router();
router.route("/")
.get(citasMedicasController.getAll)
.post(citasMedicasController.create)

router.route("/:id")
.put(citasMedicasController.put)
.delete(citasMedicasController.delete)
.get(citasMedicasController.getById)

export default router;