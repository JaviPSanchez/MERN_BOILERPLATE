import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} from "../controllers/userController.js";
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// CHECK TOKEN

router.get("/checkauthentication", verifyToken, (req, res, next) => {
  res.send("hello user, you are logged in");
});

// DELETE ACCOUNT

router.get("/checkuser/:id", verifyUser, (req, res, next) => {
  res.send("hello user, you are logged in and you can delete your account");
});

// DELETE ALL ACCOUNTS

router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
  res.send("hello admin, you are logged in and you can delete all accounts");
});

//UPDATE

//Admin or User can update
router.put("/:id", verifyUser, updateUser);

//DELETE

//Admin or User can delete
router.delete("/:id", verifyUser, deleteUser);

//GET

//Admin or User can get
router.get("/:id", verifyUser, getUser);

//GET ALL

//Admin can get all
router.get("/", verifyAdmin, getUsers);

export default router;
