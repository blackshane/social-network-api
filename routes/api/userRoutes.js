const router = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  addFriend,
  deleteFriend
} = require('../../controllers/userController');

router.route('/users')
  .get(getUsers)
  .post(createUser);

router.route('/users/:userId')
  .get(getUserById)
  .put(updateUserById)
  .delete(deleteUserById);


router.route('/users/:userId/friends/:friendId')
  .post(addFriend)
  .delete(deleteFriend);

module.exports = router