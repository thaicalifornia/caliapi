const express = require('express');
const {signup,signin,signout,
      forgotPassword,resetPassword,
      socialLogin
} = require('../controllers/auth');
const {userSignupValidator,passwordResetValidator} = require('../validator');
const {userById} = require('../controllers/user');

const router = express.Router();

router.put("/forgot-password", forgotPassword);
router.put("/reset-password", passwordResetValidator, resetPassword);

router.post("/signup", userSignupValidator, signup);
router.post("/signin",  signin);
router.post("/social-login", socialLogin); 
router.get("/signout",  signout);

router.param("userId", userById);

module.exports = router;