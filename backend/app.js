import express from "express"

import cors from "cors"
import cookieParser from "cookie-parser"
import especialidadesRoutes from "./src/routes/especialidades.js"
import pacientesRoutes from "./src/routes/pacientes.js"
import equiposMedicosRoutes from "./src/routes/equiposMedicos.js"
import citasMedicasRoutes from "./src/routes/citasMedicas.js"
import expedientesClinicosRoutes from "./src/routes/expedientesClinicos.js"
import registerPacientes from "./src/routes/registerPaciente.js"
import recoveryPassword from "./src/routes/recoveryPassword.js"
import login from "./src/routes/login.js"
import logout from "./src/routes/logout.js"

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
app.use("/api/registerPacientes", registerPacientes)
app.use("/api/recoveryPassword", recoveryPassword)
app.use("/api/login", login)
app.use("/api/logout", logout)

export default app