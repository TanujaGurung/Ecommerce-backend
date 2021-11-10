const express = require('express');
const router = express.Router();
const Feeds = require('./wishlistformat');
const mongoose = require('mongoose');
const user = require('./user.model');
router.get('/', async (req, res) => {
    try {
        const feeds = await Feeds.find(); // find is a method in mongodb to get data
        res.json(feeds); // since response will be shown in the form of json
    } catch (err) {
        console.log(err);
        res.send('Error ' + err);
    }
});

/* router.get('/:id', async(req,res) => {   //getting a particular data from database using id
    try{
           const news = await News.findById(req.params.id) 
           res.json(news)
    }catch(err){
        res.send('Error ' + err)
        console.log(err);
    }
}) */

router.post('/:userId', async (req, res) => {
    // router to post data
    // console.log
    const feedslist = new Feeds({
        title: req.body['title'],
        url: req.body['url'],
        description1: req.body['description1'],
        price: req.body['price'],
    });
    //console.log(newslist);

    try {
        const feeds1 = await feedslist.save();
        const user = await user.findByIdAndUpdate(
            { _id: req.params.userId },
            {
                $push: { wishlist: feeds1._id },
            }
        );
        res.json(user);
    } catch (err) {
        res.send('Error ' + err);
        console.log(err);
    }
});

/* router.patch('/:id',async(req,res)=> {   // router to patcha particular data using id
    try{
        const feeds = await Feeds.findById(req.params.id) 
       
        feeds.likes =req.body.likes;
        
        const feedslist = await feeds.save() 
        res.json(feedslist)  
    }catch(err){
        res.send('Error' + err)
        console.log(err);
    }
    

})
*/

router.delete('/:id', async (req, res) => {
    // creating delete router using a particular id
    try {
        const feeds = await Feeds.findById(req.params.id);

        const feedslist = await feeds.delete();
        res.json(feedslist);
    } catch (err) {
        res.send('Error' + err);
        console.log(err);
    }
});

module.exports = router;
