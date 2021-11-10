const User = require('./user.model');
// const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signup = (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    });

    user.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.status(201).send({ message: 'User saved successfully' });
    });
};
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById({ _id: req.body.id }).populate(
            'wishlist',
            '-password'
        );
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ message: error });
    }
};
exports.signin = (req, res) => {
    User.findOne({
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
