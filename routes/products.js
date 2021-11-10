const express = require('express');
const router = express.Router();
const Products = require('./productformat');

router.get('/', async (req, res) => {
    try {
        const products = await Products.find(); // find is a method in mongodb to get data
        res.json(products); // since response will be shown in the form of json
    } catch (err) {
        console.log(err);
        res.send('Error ' + err);
    }
});

router.post('/create', async (req, res) => {
    const product = new Products({
        title: req.body.title,
        url: req.body.url,
        url1: req.body.url1,
        url2: req.body.url2,
        description1: req.body.description1,
        description2: req.body.description2,
        price: req.body.price,
    });

    try {
        const products1 = await product.save();
        res.json(products1);
    } catch (err) {
        res.send('Error ' + err);
        console.log(err);
    }
});

// router.patch('/:id', async (req, res) => {
//     // router to patcha particular data using id
//     try {
//         const products = await Products.findById(req.params.id);

//         feeds.likes = req.body.likes;

//         const productslist = await products.save();
//         res.json(productslist);
//     } catch (err) {
//         res.send('Error' + err);
//         console.log(err);
//     }
// });

// router.delete('/:id', async (req, res) => {
//     // creating delete router using a particular id
//     try {
//         const products = await Products.findById(req.params.id);
//         // news.sub = req.body.sub;

//         const productslist = await products.delete();
//         res.json(productslist);
//     } catch (err) {
//         res.send('Error' + err);
//         console.log(err);
//     }
// });

module.exports = router;
