const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const User = require('./user.model');

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

module.exports = router;
