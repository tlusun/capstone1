var router = require('express').Router();

router.get('/', function(req, res) {
  res.send(JSON.stringify(
    { msg: 'Hello world! :)'}
  ));
});

module.exports = router;
