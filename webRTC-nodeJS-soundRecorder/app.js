var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

app.post('/upload',function(req,res){
  
  console.log("reached upload");
  //console.log("body"+req.body);
  //console.log("file"+req.body.dataurl);
  console.log("name: "+req.body.fileName);
  console.log("type: "+req.body.fileType.split('/')[1]);
  
  var contents = req.body.dataurl;
  contents= contents.split(',').pop();
  var buf = new Buffer(contents, 'base64'); // decode
  fs.writeFile("./uploads/"+req.body.fileName+"."+req.body.fileType.split('/')[1], buf, function(err) {
    if(err) {
      console.log("err", err);
    } else {
      //return res.json({'status': 'success'});
      return res.send('success');
    }
  })


});

app.post('/stitch',function(req,res){
  function compareNumbers(a, b)
  {
    return a - b;
  }
  console.log("reached Mac 2");
  listOfInt=[];
  var fs = require('fs');
  var path = require('path');
  var dirPath = "./uploads/";  //directory path
  var fileType = ".wav"; //file extension
  var fileNames = "";
  var files=[];
  fs.readdir(dirPath, function(err,list){
      if(err) throw err;
      list.sort();
      for(var i=0; i<list.length; i++)
      {
         if(path.extname(list[i])===fileType)
         {
            listOfInt.push(parseInt(list[i]));

         }
      }
      listOfInt.sort(compareNumbers);
      console.log("list length:"+listOfInt.length); 
      for(var i=0; i<listOfInt.length; i++)
      {
         files.push("file './"+listOfInt[i]+".wav"+"'\n"); //store the file name into the array files
      }
      //console.log("list:"+listOfInt); //print the file
            
  });

  var stream = fs.createWriteStream("./uploads/mergeList.txt");
  stream.once('open', function(fd) {
      for(var i=0;i<files.length;i++)
        stream.write(files[i]);
    stream.end();
  });

  //ffmpeg -f concat -i ./uploads/mergeList.txt -c copy ./uploads/output.wav
  /*
  fs.writeFile('./uploads/mergeList.txt', files, function (err) {
    if (err) return console.log(err);
      console.log('written'+fileNames);
  });
  */

  /*
    var audioFile = __dirname + '/uploads/' + files.audio.name;
    var videoFile = __dirname + '/uploads/' + files.video.name;
    var mergedFile = __dirname + '/uploads/' + files.audio.name.split('.')[0] + '-merged.webm';
  */

    var util = require('util'),
        exec = require('child_process').exec;

    //var command = "ffmpeg -i " + audioFile + " -i " + videoFile + " -map 0:0 -map 1:0 " + mergedFile;
  //var command= "ffmpeg -f concat -i <( for f in ./uploads/*.wav; do echo \`file '/$PWD/$f'\`; done \) -c copy ./uploads/output.wav;"
  var command= "ffmpeg -f concat -i ./uploads/mergeList.txt -c copy ./uploads/output.wav";
  //ffmpeg -f concat -i <(for f in ./*.wav; do echo "file '$PWD/$f'"; done) -c copy output.wav
  //ffmpeg -f concat -i <(for f in ./uploads/*.wav; do echo "file '/$PWD/$f'"; done) -c copy ./uploads/output.wav
    exec(command, function (error, stdout, stderr) {
        if (stdout) console.log(stdout);
        if (stderr) console.log(stderr);

        if (error) {
            console.log('exec error: ' + error);
            response.statusCode = 404;
            response.end();

        } else {
            response.statusCode = 200;
            response.writeHead(200, {
                'Content-Type': 'application/json'
            });
            response.end(files.audio.name.split('.')[0] + '-merged.webm');

            // removing audio/video files
            fs.unlink(audioFile);
            fs.unlink(videoFile);
        }

    });
    
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});




module.exports = app;
