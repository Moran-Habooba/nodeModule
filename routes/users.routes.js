const router = require("express").Router();
const { User, validateUser } = require("../models/users.model");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { authorize } = require("../middleware/auth.mw");
const { handleError } = require("../utils/handleErrors");
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

// router.post("/", async (req, res) => {
//   const { error } = validateUser(req.body);
//   if (error) {
//     res.status(400).send(error.details[0].message);
//     return;
//   }

//   const user = await User.findOne({ email: req.body.email });
//   if (user) {
//     res.status(400).send("User already registered");
//     return;
//   }

//   const newUser = new User({
//     ...req.body,
//     password: await bcrypt.hash(req.body.password, 12),
//   });
//   await newUser.save();

//   res.json(_.pick(newUser, ["_id", "name", "email"]));
// });
router.post("/", addUser);
router.get("/", authorize, getAllUsers);
// router.get("/", [
//   authorize,
//   async (req, res) => {
//     try {
//       if (!req.user.isAdmin) {
//         return handleError(
//           res,
//           403,
//           "Access denied. Only admin users can access this data."
//         );
//       }

//       const users = await User.find().select("-password");
//       res.json(users);
//     } catch (error) {
//       return handleError(res, 500, "An error occurred: " + error.message);
//     }
//   },
// ]);
router.get("/:id", authorize, getUserById);
router.put("/edit/:id", authorize, editUser);
router.patch("/:id", authorize, changeStatus);
router.patch("/admin/:id", authorize, promoteUserToAdmin);
router.delete("/:id", authorize, deleteUserById);

// router.get("/:id", authorize, async (req, res) => {
//   try {
//     const requestedUserId = req.params.id;
//     const requestingUser = req.user;
//     if (!requestingUser.isAdmin && requestingUser._id !== requestedUserId) {
//       return handleError(
//         res,
//         403,
//         "Access denied. You can only access your own data."
//       );
//     }
//     const user = await User.findById(requestedUserId).select("-password");
//     if (!user) {
//       return handleError(res, 404, "User not found.");
//     }
//     res.json(user);
//   } catch (error) {
//     handleError(res, 500, "An error occurred: " + error.message);
//   }
// });

// router.put("/:id", authorize, async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const userToUpdate = await User.findById(userId);

//     if (!userToUpdate) {
//       return handleError(res, 404, "User not found.");
//     }

//     const updateData = { ...req.body };
//     delete updateData.isAdmin;
//     delete updateData.email;
//     delete updateData.password;

//     const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
//       new: true,
//     }).select("-password");

//     res.json(updatedUser);
//   } catch (error) {
//     handleError(res, 500, "An error occurred: " + error.message);
//   }
// });

// router.patch("/:id", authorize, async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const { isBusiness } = req.body;

//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       { isBusiness },
//       { new: true }
//     ).select("-password");

//     if (!updatedUser) {
//       return handleError(res, 404, "User not found.");
//     }

//     res.json({ isBusiness: updatedUser.isBusiness });
//   } catch (error) {
//     handleError(res, 500, "An error occurred: " + error.message);
//   }
// });

// router.delete("/:id", authorize, async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const user = req.user;

//     if (!user.isAdmin && userId !== user._id) {
//       return handleError(res, 404, "Access denied.");
//     }

//     const deletedUser = await User.findOneAndDelete({ _id: userId });

//     if (!deletedUser) {
//       return res.status(404).send("User not found.");
//     }

//     res.json("User deleted successfully.");
//   } catch (error) {
//     handleError(res, 500, "An error occurred: " + error.message);
//   }
// });

module.exports = router;
