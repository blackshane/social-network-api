const router = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend
} = require('../../controllers/userController');

router.route('/users')
.get(getUsers)
.post(createUser);

router.route('/user/:userId').get(getUserById);

router.route('/user/:userId')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

router.route('/user/:userId/friends/:friendId')
  .post(addFriend)
  .delete(deleteFriend);

module.exports = router