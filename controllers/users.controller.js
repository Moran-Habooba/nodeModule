const mongoose = require("mongoose");
const { handleError } = require("../utils/handleErrors");
const { User, validateUser } = require("../models/users.model");
const bcrypt = require("bcrypt");
const _ = require("lodash");

async function addUser(req, res) {
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send("User already registered");
    }

    const newUser = new User({
      ...req.body,
      password: await bcrypt.hash(req.body.password, 12),
    });

    await newUser.save();

    res.json(_.pick(newUser, ["_id", "name", "email"]));
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
}

async function getAllUsers(req, res) {
  try {
    if (!req.user.isAdmin) {
      return handleError(
        res,
        403,
        "Access denied. Only admin users can access this data."
      );
    }

    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    return handleError(res, 500, "An error occurred: " + error.message);
  }
}

async function getUserById(req, res) {
  try {
    const requestedUserId = req.params.id;
    const requestingUser = req.user;

    if (!mongoose.Types.ObjectId.isValid(requestedUserId)) {
      return handleError(res, 400, "Invalid user ID.");
    }

    if (!requestingUser.isAdmin && requestingUser._id !== requestedUserId) {
      return handleError(
        res,
        403,
        "Access denied. You can only access your own data."
      );
    }

    const user = await User.findById(requestedUserId).select("-password");

    if (!user) {
      return handleError(res, 404, "User not found.");
    }

    res.json(user);
  } catch (error) {
    handleError(res, 500, "An error occurred: " + error.message);
  }
}

async function editUser(req, res) {
  try {
    const userId = req.params.id;
    const userToUpdate = await User.findById(userId);

    if (!userToUpdate) {
      return handleError(res, 404, "User not found.");
    }

    const updateData = { ...req.body };
    delete updateData.isAdmin;
    delete updateData.email;
    delete updateData.password;

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    }).select("-password");

    res.json(updatedUser);
  } catch (error) {
    handleError(res, 500, "An error occurred: " + error.message);
  }
}

async function changeStatus(req, res) {
  try {
    const userId = req.params.id;
    const { isBusiness } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { isBusiness },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return handleError(res, 404, "User not found.");
    }

    res.json({ isBusiness: updatedUser.isBusiness });
  } catch (error) {
    handleError(res, 500, "An error occurred: " + error.message);
  }
}
async function deleteUserById(req, res) {
  try {
    const userId = req.params.id;
    const user = req.user;

    if (!user.isAdmin && userId !== user._id) {
      return handleError(res, 404, "Access denied.");
    }

    const deletedUser = await User.findOneAndDelete({ _id: userId });

    if (!deletedUser) {
      return res.status(404).send("User not found.");
    }

    res.json("User deleted successfully.");
  } catch (error) {
    handleError(res, 500, "An error occurred: " + error.message);
  }
}

async function promoteUserToAdmin(req, res) {
  try {
    const userId = req.params.id;
    const { isAdmin } = req.body;

    const connectedUser = await User.findById(req.user._id);

    if (connectedUser.isAdmin) {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { isAdmin },
        { new: true }
      ).select("-password");

      if (!updatedUser) {
        return handleError(res, 404, "User not found.");
      }

      res.json({ isAdmin: updatedUser.isAdmin });
    } else {
      return handleError(
        res,
        403,
        "Access denied. Only admin users can change user status."
      );
    }
  } catch (error) {
    handleError(res, 500, "An error occurred: " + error.message);
  }
}
module.exports = {
  addUser,
  getAllUsers,
  getUserById,
  editUser,
  changeStatus,
  deleteUserById,
  promoteUserToAdmin,
};
