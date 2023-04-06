const express = require('express');
const router = express.Router();
const { getPrinciples, getSpecificAreaPrinciples, createPrinciple, updatePrinciple, deletePrinciple, hardWorkPrinciple, getUsersPrinciples } = require('../controllers/principles');
const authMiddleWare = require('../middleware/auth');
const authenticationMiddleware = require('../middleware/auth');
const rateLimiter = require('express-rate-limit');

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    msg: 'Too many requests from this IP, please try again after 15 minutes',
  },
});


router.get('/', getPrinciples);
router.get('/area', getSpecificAreaPrinciples);
router.post('/', [authenticationMiddleware, createPrinciple]);
router.patch('/:id', updatePrinciple);
router.delete('/:id', deletePrinciple);

router.get('/hardwork', [authMiddleWare, hardWorkPrinciple]);
router.get('/userprinciples', [authMiddleWare, getUsersPrinciples]);

module.exports = router;