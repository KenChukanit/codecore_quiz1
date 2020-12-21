const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');

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
// Index page link to sign in page first
app.get(('/'), (request,response)=>{
    const ONE_DAY = 1000*60*60*24;
    response.cookie('hello','username',{maxAge: ONE_DAY});
    response.render('./clucks/index');
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



const ADDRESS = 'localhost';
const PORT = '4040';
app.listen(PORT,ADDRESS, ()=>{
    console.log(`Server is listening at ${ADDRESS}:${PORT}`);
});