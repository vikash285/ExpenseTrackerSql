const express = require('express');
const resetPasswordController = require('../controllers/resetPassword');
const router = express.Router();

router.use('/forgotPassword', resetPasswordController.forgotPassword)

module.exports = router;