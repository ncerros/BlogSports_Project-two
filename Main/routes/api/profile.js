const router = require('express').Router();
const { Profile } = require('../../models');
const withAuth = require('../../utils/auth');

// once user verified
router.post('/', withAuth, async (req, res) => {

});