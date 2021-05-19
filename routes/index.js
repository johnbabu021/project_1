var express = require('express');
const { response } = require('../app');
var router = express.Router();
const userHelper=require('../helpers/user_helpers')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('user/index');
});
router.get('/login',(req,res)=>{
  res.render('user/login')
})


router.post('/login',(req,res)=>{
  userHelper.doLogin(req.body).then((response)=>{
    res.redirect('/')
  })

})


router.post('/signup',(req,res)=>{
  userHelper.doSignup(req.body).then((response)=>{
  console.log(req.body)
    res.redirect('/');
  })
})




router.get('/signup',(req,res)=>{
  res.render('user/reg')
})

module.exports = router;
