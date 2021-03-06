const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

exports.signup = (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        residentAddress: req.body.residentAddress,
        mobileNumber: req.body.mobileNumber,
    });

    user.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.status(201).send({ message: 'User saved successfully' });
    });
};
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById({ _id: req.params.id })
            .populate('orders')
            .populate('wishlist')
            .populate('cart', '-password');
        res.status(200).send({ success: true, data: user });
    } catch (error) {
        res.status(500).send({ message: error });
    }
};
exports.signin = async (req, res) => {
    await User.findOne({
        email: req.body.email,
    })
        .populate('wishlist')
        .exec(async (err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!user) {
                return res.status(404).send({ message: 'User Not found.' });
            }

            let passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    message: 'Invalid Password!',
                });
            }
            res.status(200).send({ success: true, data: user });
        });
};
