import { getAuth } from "@clerk/express";
import User from "../models/User.js";

//Middleware to check if user is authenticated 

export const protect = async (req, res, next) => {
  try {
    // 1. Estrai userId dal token
    const { userId } = req.auth;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    // 2. Carica l'utente da Mongo usando l'_id (che è il Clerk userId)
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // 3. Metti l'utente in req.user e vai avanti
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
