const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const knex = require('./db/client');
const friendlyTime = require('friendly-time');

app.use(express.static(path.join(__dirname,'public')));
const logger = require('morgan');


app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: false}));

app.use(methodOverride((request,response)=>{
    if(request.body && request.body._method){
        const method = request.body._method;
        return method;
    }
}));

app.use(cookieParser());

app.use(logger('dev'));

app.use((request,response, next)=>{
    console.log('Cookie:', request.cookies);
    const username = request.cookies.username;
    response.locals.username = "";
    if(username){
        response.locals.username = username;
        console.log(`Signed in as ${username}`);
    }
    next();
})

//Home page to index page
app.get(('/'), (request,response)=>{
    const ONE_DAY = 1000*60*60*24;
    response.cookie('hello','username',{maxAge: ONE_DAY});
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
          
          // function to count hashtag 
          // Sorry My Fn does not work, Not enough time to fix it
        const countTag=(tag,arr)=>{
            let count =0;
            for(let has of arr){
                if(has === tag){
                count++
                }
            }
            return count;
        }
        response.render(('clucks/index'),{clucks,time,hashtag,countTag});
    })
})
//render for sign_in page
app.get(('/sign_in'), (request,response)=>{
    const ONE_DAY = 1000*60*60*24;
    response.cookie('hello','username',{maxAge: ONE_DAY});
    response.render('clucks/sign_in');
})
//for sign in
app.post('/sign_in',(request,response)=>{
    const ONE_DAY = 1000*60*60*24;
    const username = request.body.username;
    response.cookie('username',username, {maxAge: ONE_DAY});
    response.redirect('/')
})

// for sign out
app.post('/sign_out',(request,response)=>{
    response.clearCookie('username');
    response.redirect('/')
})

// Clucks Router
const clucksRouter = require('./routes/clucks');
app.use('/clucks',clucksRouter);


const ADDRESS = 'localhost';
const PORT = '4040';
app.listen(PORT,ADDRESS, ()=>{
    console.log(`Server is listening at ${ADDRESS}:${PORT}`);
});