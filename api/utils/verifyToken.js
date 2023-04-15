import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  //Comprobamos si hay token

  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  //Comprobamos si es valido el token:

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token not valid!"));
    // req.whatever = our information;
    req.user = user;
    console.log(req.user);
    //Si todo esta correcto, pasamos a la siguiente operación.
    next();
  });
};

// VERIFY USER

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

// VERIFY ADMIN

export const verifyAdmin = (req, res, next) => {
  // console.log(req.user.isAdmin);
  verifyToken(req, res, () => {
    if (req.user.isAdmin === true) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};
