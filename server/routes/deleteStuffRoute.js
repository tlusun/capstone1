var router = require('express').Router();

router.delete('/contacts/:id', function (req, res) {
        var id = req.params.id;
        console.log(id);


        Contact.remove({ _id: req.params.id}, function(error, id) {
            if (error) response.send(err);
            res.status(201).json({contacts: id});
        });

});

module.exports = router;
