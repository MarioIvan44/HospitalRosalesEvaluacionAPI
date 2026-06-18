import express from "express"

import cors from "cors"
import cookieParser from "cookie-parser"
import especialidadesRoutes from "./src/routes/especialidades.js"
import pacientesRoutes from "./src/routes/pacientes.js"
import equiposMedicosRoutes from "./src/routes/equiposMedicos.js"
import citasMedicasRoutes from "./src/routes/citasMedicas.js"
import expedientesClinicosRoutes from "./src/routes/expedientesClinicos.js"

const app = express();
app.use(cors({origin: ["https://localhost:5173", "https://localhost:5174"], 
    credentials: true
}));

app.use(cookieParser());

app.use(express.json())

//Crear endpoints
app.use("/api/especialidades", especialidadesRoutes)
app.use("/api/equiposMedicos", equiposMedicosRoutes)
app.use("/api/pacientes", pacientesRoutes)
app.use("/api/citasMedicas", citasMedicasRoutes)
app.use("/api/expedientesClinicos", expedientesClinicosRoutes)

export default app