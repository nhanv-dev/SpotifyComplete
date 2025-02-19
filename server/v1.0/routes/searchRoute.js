const router = require('express').Router();

const { search } = require('../controllers/searchController');
const auth = require('../middlewares/authentication');
const admin = require('../middlewares/administrator');
const validateObjectId = require('../middlewares/validateObjectId');

// search
router.get("/search", search);

module.exports = router;
