import jswonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto, { verify } from "crypto";
import nodemailer from "nodemailer";
import { config } from "../../config.js";

import pacienteModel from "../models/pacientes.js";

const recoveryPasswordController = {};

//REQUEST CODE
recoveryPasswordController.requestCode = async (req, res) => {
  try {
    const { email } = req.body;

    const usuarioEncontrado = await pacienteModel.findOne({ email });

    if (!usuarioEncontrado) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }

    const code = crypto.randomBytes(3).toString("hex");

    const token = jswonwebtoken.sign(
      { email, code, userType: "paciente", verified: false },
      config.JWT.secret,
      { expiresIn: "20m" },
    );

    res.cookie("recoveryCookie", token, {
      maxAge: 15 * 60 * 1000,
      httpOnly: true,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.email.user_email,
        pass: config.email.user_password,
      },
    });

    const mailOptions = {
      from: config.email.user_email,
      to: email,
      subject: "Correo de recuperación de contra",
      text: "Tu código de recuperación es: " + code,
    };
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("error: " + error);
        return res.status(500).json({ message: "Error al enviar el correo" });
      }
      if (info) {
        console.log("correo enviado: " + info.response);
        return res.status(200).json({ message: "Email enviado" });
      }
    });
  } catch (error) {
    console.log("error", +error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

recoveryPasswordController.verifyCode = async (req, res) => {
  try {
    const { codeRequest } = req.body;

    const token = req.cookies.recoveryCookie;
    const decoded = jswonwebtoken.verify(token, config.JWT.secret);

    if (codeRequest !== decoded.code) {
      return res.status(400).json({ message: "Código incorrecto" });
    }

    const newToken = jswonwebtoken.sign(
      {
        email: decoded.email,
        code: decoded.code,
        userType: decoded.userType,
        verified: true,
      },
      config.JWT.secret,
      { expiresIn: "15m" },
    );

    res.cookie("recoveryCookie", newToken, { maxAge: 15 * 60 * 1000 });

    return res.status(200).json({ message: "Puedes cambiar tu contraseña" });
  } catch (error) {
    console.log("error", +error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//NEW PASSWORD
recoveryPasswordController.newPassword = async (req, res) => {
  try {
    const {newPass, confirmPass} = req.body;

    if(newPass !== confirmPass){
        return res.status(400).json({message: "Contraseñas no coinciden"})
    }

    const token = req.cookies.recoveryCookie;
    const decoded = jswonwebtoken.verify(token, config.JWT.secret)

    if(!decoded.verified){
        return res.status(400).json({message: "Código de recuperación de contraseña no verificado"})
    }

    const hashedPass = await bcrypt.hash(newPass, 10);

    await customerModel.findOneAndUpdate(
        {email: decoded.email},
        {password: hashedPass},
        {new: true}
    )

    res.clearCookie("recoveryCookie");

    return res.status(200).json({message: "Contraseña restablecida"})
  } 
  catch (error) {
    console.log("error", +error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default recoveryPasswordController;