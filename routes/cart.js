const express = require('express');
const router = express.Router();
const Feeds = require('./cartformat');
const mongoose = require('mongoose');
const User = require('./user.model');

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
