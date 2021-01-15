
const express = require('express');
const knex = require('../db/client');

const router = express.Router();
const friendlyTime = require('friendly-time');
const { count } = require('../db/client');
const hashtag = [];



//Index to view all clucks
router.get('/',(request,response)=>{
    knex('clucks')
        .orderBy('created_at','desc')
        .then(clucks => {
            const time=(date)=>{
            return friendlyTime(new Date(date))
            }
            //Add hashtag in array
        
            let hashtag =[];
            for(let cluck of clucks){
                let findhash = cluck.content.split(' ')
                for(let tag of findhash){
                if(tag[0]==='#'){
                hashtag.push(tag);
                }
                }
            }
            // console.log(hashtag)

            let tagCount = {}
                for(let i =0; i< hashtag.length;i++){
                    if(!tagCount[hashtag[i]]){
                        tagCount[hashtag[i]] = 1
                    }else{
                        tagCount[hashtag[i]] += 1
                    }
            }
            
            // console.log(tagCount)
            response.render(('clucks/index'),{clucks,time, tagCount});
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