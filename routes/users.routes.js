const router = require("express").Router();
const { User, validateUser } = require("../models/users.model");

const _ = require("lodash");
const { authorize } = require("../middleware/auth.mw");
const {
  addUser,
  getAllUsers,
  getUserById,
  editUser,
  changeStatus,
  deleteUserById,
  promoteUserToAdmin,
} = require("../controllers/users.controller");

router.get("/me", authorize, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.json(user);
});

router.post("/", addUser);
router.get("/", authorize, getAllUsers);

router.get("/:id", authorize, getUserById);
router.put("/edit/:id", authorize, editUser);
router.patch("/:id", authorize, changeStatus);
router.patch("/admin/:id", authorize, promoteUserToAdmin);
router.delete("/:id", authorize, deleteUserById);

module.exports = router;
