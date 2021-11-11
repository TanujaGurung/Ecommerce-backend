const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const User = require('../models/user.model');

router.put('/:userId', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            { _id: req.params.userId },
            {
                $push: { cart: req.body.id },
            }
        );
        res.json({ success: true, message: 'item added to cart' });
    } catch (err) {
        res.send('Error ' + err);
        console.log(err);
    }
});

//remove on element from cart
router.put('/remove/:userId', async (req, res) => {
    try {
        const data = await User.findByIdAndUpdate(
            { _id: req.params.userId },
            { $pull: { cart: req.body.id } }
        );
        res.status(200).json({ success: true, data: data });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

module.exports = router;
