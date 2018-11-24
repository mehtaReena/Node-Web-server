const express = require ('express');
const hbs = require ('hbs');
const fs= require('fs');

var app= express();
hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine',hbs);

app.use((req,res,next)=>{
 var now=new Date().toString()  ; 
 var logMsg=`${now} :${req.method } ${req.url}`;
 console.log(logMsg) ;
 fs.appendFile('Server.log',logMsg +'\n',(err)=>{
  if(err){
    console.log(err);
  }
 });
 
 next() ;   
});

/* app.use((req,res,next)=>{
    res.render('maintenance.hbs');
}); */

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear',()=>{

    return new Date().getFullYear();

});
hbs.registerHelper('screamIt',(text)=>{

return text.toUpperCase();
})

app.get('/',(req,res)=>{

    //res.send('<h1>Hello Express</h1>');

    res.render('home.hbs',{
       pageTitle:'My online store',
       message:'welcome to my store! ' 
       
    })

});

app.get('/about',(req,res)=>{
res.render('about.hbs',{
pageTitle: 'About website'
})
});

app.get('/bad',(req,res)=>{

    res.send({
        errorMessage: 'Unauthorized request!!'
    });

});

app.listen(3000,()=>{
 console.log('Server is starting on port 3000');

});
