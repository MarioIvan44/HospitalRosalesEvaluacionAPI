import express from "express"

import cors from "cors"
import cookieParser from "cookie-parser"
import especialidadesRoutes from "./src/routes/especialidades.js"
import equiposMedicosRoutes from "./src/routes/equiposMedicos.js"

const app = express();
app.use(cors({origin: ["https://localhost:5173", "https://localhost:5174"], 
    credentials: true
}));

app.use(cookieParser());

app.use(express.json())

//Crear endpoints
app.use("/api/especialidades", especialidadesRoutes)
app.use("/api/equipos-medicos", equiposMedicosRoutes)

export default app