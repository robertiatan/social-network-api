const router = require("express").Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userController");

// GET and POST routes for users
router.route("/").get(getUsers).post(createUser);

// Single user routes
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

// Routes by ID
router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);

module.exports = router;
