import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import pacienteModel from "../models/pacientes.js";
import { config } from "../../config.js";
import { json } from "express";

const loginController = {};

loginController.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userFound = await customerModel.findOne({ email });

    if (!userFound) {
      return res.status(400).json({ message: "Paciente no encontrado" });
    }

    if (userFound.timeOut && userFound.timeOut > Date.now()) {
      return res.status(403).json({ message: "Cuenta bloqueada" });
    }

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      userFound.logingAttemps = (userFound.logingAttemps || 0) + 1;
      if (userFound.logingAttemps >= 3) {
        userFound.timeOut = Date.now() + 15 * 60 * 1000;
        userFound.loginAttempts = 0;

        await userFound.save();

        return res.status(403).json({ message: "Cuenta bloqueada" });
      }
      await userFound.save();
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    userFound.loginAttempts = 0;
    userFound.timeOut = null;

    await userFound.save();

    const token = jsonwebtoken.sign(
        {id: userFound._id, userType: "paciente"},
        config.JWT.secret,
        {expiresIn: "7d"}
    )

    res.cookie("authCookie", token);

    res.status(200).json({message: "Login successful", token})
  } catch (error) {
    console.log("error", +error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default loginController;