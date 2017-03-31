
module.exports = router;
var express = require("express");
var router = express();
var request = require('request');
var fs = require("fs");
var multer = require("multer");
var upload = multer({dest: "./uploads"});
var mongoose = require('mongoose');
var gfs;
var Item = require('../app/models/image');

var Grid = require("gridfs-stream");
var conn = mongoose.connection;
Grid.mongo = mongoose.mongo;



 //var Image = module.exports = mongoose.model('files', imageSchema);

router.getImages = function(callback, limit) {
 
 Image.find(callback).limit(limit);
}
 
 
router.getImageById = function(id, callback) {
  
 Image.findById(id, callback);
 
}
 
router.addImage = function(image, callback) {
 Image.create(image, callback);
}
 
 
// To get more info about 'multer'.. you can go through https://www.npmjs.com/package/multer..
var storage = multer.diskStorage({
 destination: function(req, file, cb) {
 cb(null, 'uploads/')
 },
 filename: function(req, file, cb) {
 cb(null, file.originalname);
 }
});
 
var upload = multer({
 storage: storage
});
 
router.get('/images/:id', function(req, res, next) {
 mongoose.model('Item').find({id: req.params._id},function (err,item){
    res.send(item);
  })
});
 
router.post('/upload', upload.any(), function(req, res, next) {
 console.log(req.files);
 
 //res.send(req.files);
 
/*req.files has the information regarding the file you are uploading...
from the total information, i am just using the path and the imageName to store in the mongo collection(table)
*/

var item = new Item ({ 
  path: req.files[0].path,
  originalname : req.files[0].originalname

});

 
 //var imagepath = {};
 //imagepath['path'] = path;
 //imagepath['originalname'] = imageName;
 
 //imagepath contains two objects, path and the imageName
 
 //we are passing two objects in the addImage method.. which is defined above..
 

 item.save(function (error, item ){
  if 
    (error) res.send(error);
  else
  res.status(201).json({item});
 });
 
});
 
module.exports = router;

/*
conn.once("open", function (){
    gfs = Grid(conn.db);
    router.get('/', function (req, res) {
      res.send('Hello Housem !');
    });
    router.get('/img/:imgname', function (req, res) {
        gfs.files.find({
            filename: req.params.imgname
        }).toArray(function(err, files){

            if (files.length === 0) {
                return res.status(400).send({
                    message: 'File not found'
                });
            }
            var data = [];
            var readstream = gfs.createReadStream({
                filename: files[0].filename
            });

            readstream.on('data', function (chunk){
                data.push(chunk);
            });

            readstream.on('end', function (){
                data = Buffer.concat(data);
                var img = 'data:image/png;base64,' + Buffer(data).toString('base64');
                res.end(img);
            });

            readstream.on('error', function (err){
                console.log('An error occurred!', err);
                throw err;
            });
        });
    });

  router.post(‘/upload’,function(req,res){
 var newItem = new Item();
 newItem.img.data = fs.readFileSync(req.files.userPhoto.path)
 newItem.img.contentType = ‘image/png’;
 newItem.save();
});

    router.post('/uspload', function(req, res){

        var part = req.files.file;
        var writeStream = gfs.createWriteStream({
            filename: 'img_' + part.name,
            mode: 'w',
            content_type: part.mimetype
        });

        writeStream.on('close', function (file){
            return res.status(200).send({
                message: 'Success',
                file: file
            });
        });

        writeStream.write(part.data);

        writeStream.end();
    });
})


module.exports = router;



var Grid = require("gridfs-stream");
Grid.mongo = mongoose.mongo;
var conn = mongoose.connection;

conn.once("open", function(){
  gfs = Grid(conn.db);
  router.get("/", function(req,res){
    //renders a multipart/form-data form
    res.render("home");
  });

  //second parameter is multer middleware.
  router.post("/upload", upload.single("avatar"), function(req, res, next){
    //create a gridfs-stream into which we pipe multer's temporary file saved in uploads. After which we delete multer's temp file.
    var writestream = gfs.createWriteStream({
      filename: req.file.originalname
    });
    //
    // //pipe multer's temp file /uploads/filename into the stream we created above. On end deletes the temporary file.
    fs.createReadStream("./uploads/" + req.file.filename)
      .on("end", function(){fs.unlink("./uploads/"+ req.file.filename, function(err){res.send("success")})})
        .on("err", function(){res.send("Error uploading image")})
          .pipe(writestream);
  });

  // sends the image we saved by filename.
  router.get("/:filename", function(req, res){
      var readstream = gfs.createReadStream({filename: req.params.filename});
      readstream.on("error", function(err){
        res.send("No image found with that title");
      });
      readstream.pipe(res);
  });

  //delete the image
  router.get("/delete/:filename", function(req, res){
    gfs.exist({filename: req.params.filename}, function(err, found){
      if(err) return res.send("Error occured");
      if(found){
        gfs.remove({filename: req.params.filename}, function(err){
          if(err) return res.send("Error occured");
          res.send("Image deleted!");
        });
      } else{
        res.send("No image found with that title");
      }
    });
  });
});
module.exports = router;
*/
//router.set("view engine", "ejs");
//router.set("views", "./views");
