const Order = require('../models/order.model');
const User = require('../models/user.model');

//create cart
exports.order = async (req, res) => {
    try {
        const data = await User.findById(req.params.id);
        const d = data.cart;
        if (d.length === 0) {
            return res.status(400).json({
                message: 'Cart is empty',
            });
        }
        const newOrder = new Order({
            orderedBy: req.params.id,
            orderItems: d,
        });
        await newOrder.save();
        await data.updateOne(
            { $push: { orders: newOrder._id } },
            { multi: true }
        );
        const data11 = await User.findByIdAndUpdate(req.params.id, {
            $set: { cart: [] },
        });

        const data2 = await Order.find(newOrder._id);
        res.status(200).json({ data2 });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const data = await Order.find({}).populate(
            'orderItems orderedBy',
            '-orders -wishlist -_id -cart -password'
        );
        res.status(200).json({ success: true, data });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

exports.getOrderByUserId = async (req, res) => {
    try {
        const data = await Order.find({ orderedBy: req.params.id }).populate(
            'orderItems orderedBy'
        );
        // .populate('orderedBy', '-password -_id -cart -orders -wishlist');
        console.log(data);
        res.status(200).json({ success: true, data });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
