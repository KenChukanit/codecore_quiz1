
const express = require('express');
const knex = require('../db/client');

const router = express.Router();
const friendlyTime = require('friendly-time');


//Index
router.get('/',(request,response)=>{
    knex('clucks')
        .orderBy('created_at','desc')
        .then(clucks => {
           const time=(date)=>{
               return friendlyTime(new Date(date))
           }
            response.render(('clucks/index'),{clucks,time});
        })
});

//New
router.get('/new',(request,response)=>{
    response.render('clucks/new', {cluck: false});
})

//create new clucks
router.post('/',(request,response)=>{
    const username = request.cookies.username
    const image_url= request.body.image_url
    const content = request.body.content
    knex('clucks')
        .insert({
            username,
            image_url,
            content
        },'*')
        .then(clucks=>{
            const cluck = clucks[0];
            response.redirect(`/clucks`)
        });
});




module.exports = router;