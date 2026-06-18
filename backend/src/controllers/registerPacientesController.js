/**
 * Campos
    name
    lastName
    email
    password
    phone
    address
    phoneEmergencyContacts [{ phone, nameEmergencyContact }]
    profilePhoto
    isVerified
    loginAttempts
    timeOut
 *  */

import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import pacienteModel from "../models/pacientes.js";
import { config } from "../../config.js";

const regiserPacientesController = {};

regiserPacientesController.register = async (req, res) => {
  const {
    name,
    lastName,
    email,
    password,
    phone,
    address,
    phoneEmergencyContacts,
    isVerified,
    loginAttempts,
    timeOut,
  } = req.body;

  try {
    const existPaciente = await pacienteModel.findOne({ email });
    if (existPaciente) {
      return res.status(400).json({ message: "Paciente ya existe" });
    }

    //Encriptar contraseña
    const passwordHash = await bcryptjs.hash(password, 10);

    //Generar código aleatorio
    const verificationCode = crypto.randomBytes(3).toString("hex");

    const tokenCode = jsonwebtoken.sign(
      //#1- que vamos a guardar
      {
        name,
        lastName,
        email,
        verificationCode,
        password: passwordHash,
        phone,
        address,
        phoneEmergencyContacts,
        isVerified,
        loginAttempts,
        timeOut,
      },
      //#2- Secret key
      config.JWT.secret,
      //#3 Cuándo expira
      { expiresIn: "20m" },
    );

    res.cookie("verificationToken", tokenCode, { maxAge: 15 * 60 * 1000 });

    //Enviar código por correo
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
      subject: "Verificación de cuenta",
      text:
        "Para verificar su cuenta, utiliza este código: " +
        verificationCode +
        " expira en 15 minutos",
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("error: " + error);
        return res
          .status(500)
          .json({ message: "Paciente registrado, verifica tu email" });
      }
    });
  } catch (error) {
    console.log("error", +error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

regiserPacientesController.verifyCode = async (req, res) => {
  try {
    const {verificationCodeRequest} = req.body;

    const token = req.cookies.verificationToken;

    console.log(token)

    const decoded = jsonwebtoken.verify(token, config.JWT.secret)
    const {
        name,
        lastName,
        email,
        verificationCode: storedCode,
        password: passwordHash,
        phone,
        address,
        phoneEmergencyContacts,
        isVerified,
        loginAttempts,
        timeOut,
      } = decoded;

      if(verificationCodeRequest !== storedCode){
        return res.status(400).json({message: "Código inválido"})
      }

      const newPaciente = new pacienteModel({
        name,
        lastName,
        email,
        password: passwordHash,
        phone,
        address,
        phoneEmergencyContacts,
        isVerified: true,
        loginAttempts,
        profilePhoto: req.file.path,
        public_id: req.file.filename,
        timeOut,
      })

      await newPaciente.save();

      const paciente = await pacienteModel.findOne({email})
      paciente.isVerified = true
      await paciente.save();

      res.clearCookie("verificationToken");

      res.json({message: "Email verificado exitosamente"})
  } catch (error) {
    console.log("error", +error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default regiserPacientesController;