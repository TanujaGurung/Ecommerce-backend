const express = require('express');
const router = express.Router();
const User = require('./user.model');

router.put('/:userId', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            { _id: req.params.userId },
            {
                $push: { wishlist: req.body.id },
            }
        );
        res.json({ success: true, message: 'item added to wishlist' });
    } catch (err) {
        res.send('Error ' + err);
        console.log(err);
    }
});
router.put('/remove/:userId', async (req, res) => {
    try {
        const data = await db.user.findByIdAndUpdate(
            { _id: req.params.userId },
            { $pull: { wishlist: req.body.id } }
        );
        res.status(200).json({ success: true, data: data });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});
module.exports = router;
