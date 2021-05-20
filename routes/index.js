var express = require('express');
const { response, render } = require('../app');
var router = express.Router();
const userHelper = require('../helpers/user_helpers');
const { route } = require('./admin');

const verifyLogin = (req, res, next) => {
  if (req.session.user) {
    next()
  }
  else {
    res.redirect('/login')
  }

};

/* GET home page. */
router.get('/', function (req, res, next) {
  user = req.session.user;
  res.render('user/index', { user });
});
router.get('/login', (req, res) => {
  res.render('user/login', { "loginErr": req.session.loginErr })
  req.session.loginErr = false
})


router.post('/login', (req, res) => {
  userHelper.doLogin(req.body).then((response) => {
    console.log(req.body);
    if (response.status) {
      req.session.user = response.user;
      req.session.loggedIn = true;
      res.render('user/dashboard', { "user": req.session.user })
    }
    else {
      req.session.loginErr = true;

      res.redirect('/login')
    }
  })

})


router.post('/signup', (req, res) => {
  userHelper.doSignup(req.body).then((response) => {
    req.session.user = response;
    res.render('user/dashboard', { "user": req.session.user });
  })
})


router.post('/dashboard', verifyLogin, (req, res) => {

  res.render('user/cards')
})



router.get('/signup', (req, res) => {
  res.render('user/login')
})



router.get('/hospital', (req, res) => {
  res.render('user/hospital')
})





router.get('/taxi', (req, res) => {
  res.render('user/taxi')
})
router.get('/ambulance', (req, res) => {
  res.render('user/ambulance')
})
router.get('/doctor', (req, res) => {
  res.render('user/doctor')
})





router.post('/ambulance', (req, res) => {

  userHelper.ambulanceHelper(req.body).then((response) => {

    res.render('user/index')

  })

})




router.post('/hospital', (req, res) => {

  userHelper.hospitalHelper(req.body).then((response) => {

    res.render('user/index')

  })
})



router.post('/taxi', (req, res) => {

  userHelper.taxiHelper(req.body).then((response) => {

    res.render('user/index')

  })
})


router.post('/doctor', (req, res) => {

  userHelper.doctor(req.body).then((response) => {

    res.render('user/index')

  })
})



router.get('/allHospitals', async (req, res) => {

  let hospital = await userHelper.findAllHospitals()
  res.render('user/viewHospital', { hospital })
})




router.get('/allTaxi', async (req, res) => {

  let taxi = await userHelper.findAllTaxis()
  res.render('user/viewTaxi', { taxi })
})



router.get('/allAmbulance', async (req, res) => {

  let ambulance = await userHelper.findAllAmbulances()
  res.render('user/viewAmbulance', { ambulance })
})



router.get('/allDoctors', async (req, res) => {

  let doctor = await userHelper.findAllDoctors()
  res.render('user/viewDoctor', { doctor })
})







module.exports = router;
