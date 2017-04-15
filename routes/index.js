var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('add-point-rework1', { title: 'Add Point' });
});

router.get('/add-point-new', function(req, res, next) {
  res.render('add-point', { title: 'Add Point' });
});

router.get('/add-investment', function(req, res, next) {
  res.render('add-investment', { title: 'Add Investment Old' });
});

router.get('/edit-parcel', function(req, res, next) {
  res.render('edit-parcel', { title: 'Edit Parcel' });
});

router.get('/add-feature', function(req, res, next) {
  res.render('index', { title: 'Add Feature Old' });
});

module.exports = router;
