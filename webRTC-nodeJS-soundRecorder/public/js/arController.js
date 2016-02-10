var mainApp = angular.module("mainApp", ['ngRoute','ngResource']);

mainApp.config(['$routeProvider',
   function($routeProvider) {
      $routeProvider.
         when('/addSrt', {
            templateUrl: 'addSrt.htm',
            controller: 'AddSrtController'
         }).
         when('/viewRecorder', {
            templateUrl: 'viewRecorder.htm',
            controller: 'ViewRecorderController'
         }).
         otherwise({
            redirectTo: '/addSrt'
         });
   }]);

mainApp.controller('AddSrtController', function($scope) {

//$scope.message = "This page will be used to display add student form";
$scope.$on('$viewContentLoaded',function(){ 
  document.getElementById("selectFile").style.color= "#D9DADA";
  document.getElementById("viewRecorder").style.color= "#384443";
  document.getElementById("audioUrlPreview").style.visibility = 'hidden';
});

$scope.srtChange = function(){
  console.log("reached");
  $scope.check="done!";
  $scope.$apply();
  document.getElementById('browse').innerHTML = document.querySelector('input[type=file]').value.split(/(\\|\/)/g).pop();
  //console.log("yayyaya"+document.querySelector('input[type=file]').value.split(/(\\|\/)/g).pop());
  var file= document.querySelector('input[type=file]').files[0];
  var reader = new FileReader();
  reader.onload = function(progressEvent){
      // Entire file
      console.log(this.result);
      fileDisplay = this.result;
      $scope.$apply();

      // By lines
      var lines = this.result.split('\n');
      for(var line = 0; line < lines.length; line++){
        //console.log(lines[line]);
      }
      for(var i = lines.length - 1; i >= 0; i--) {
        if(lines[i] === "") {
            lines.splice(i, 1);
        }
      }

      //console.log("After");
      for(var line = 0; line < lines.length; line++){
          //console.log(lines[line]);
      }


      for (var i = 0; i < lines.length; i++) {
        
        if(i%3==0)
        {
          sequence_arr.push(lines[i]);
          var a= {id: lines[i], name : 'temp' };
          newSeq.push(a);
        }
        else if(i%3==1)
        {
          time_arr.push(lines[i]);
        }
        else
        {
          sentence_arr.push(lines[i]);
        }
      }

      console.log("Sequence Array:"+sequence_arr);
      console.log("Sequence Array 2:"+newSeq);
      console.log("Time Array:"+time_arr);
      console.log("Sentence Array:"+sentence_arr);

      $scope.seqArr= sequence_arr;
      $scope.$apply();

      //Code Snippet to convert time to seconds and convert it into appropriate format
     
      for(var i=0;i<time_arr.length;i++)
      {
        var temp =time_arr[i].split(' --> ');
        var temp=temp[0].split(':');

        timesecond_arr[i] = (+temp[0]) * 60 * 60 + (+temp[1]) * 60 + (+temp[2]);

      }

 
      //Calculating the differences
      for(var i=0;i<(timesecond_arr.length -1);i++)
      {
          difftime[i]= timesecond_arr[i+1]-timesecond_arr[i];

      }

      console.log("Difftime:"+difftime);

      console.log("TimeSecondarr:"+timesecond_arr);

      finaltime=timesecond_arr[timesecond_arr.length-1]+difftime[difftime.length-1];

      console.log("Final Time:"+finaltime);
      //cdreset();
      
  };
   reader.readAsText(file);
}
});

mainApp.controller('ViewRecorderController', function($scope,$http) {

$scope.$on('$viewContentLoaded',function(){
  document.getElementById("selectFile").style.color= "#384443";
  document.getElementById("viewRecorder").style.color= "#D9DADA";
  document.getElementById("audioUrlPreview").style.visibility = 'visible';
  document.getElementById("sentenceDiv").style.color="#384443";  
});
$scope.message = "Sequence No.\nTiming\nSentence";
$scope.srtFileView = fileDisplay;

$scope.fromTo= function(){
  //alert(index);
  start= $scope.from-1;
  end= $scope.end-1;
  document.getElementById("timespan").style.color="#384443";
  document.getElementById("current").style.color="#384443";
  $("#future").html("");
  $("#timespan").html("("+(start+1)+") "+sentence_arr[start]+"<p>-to-");
  $("#current").html("("+(end+1)+") "+sentence_arr[end]);
  console.log("start: "+start+" end: "+end);
  recordAudio.disabled = false;
  cdInit();
}

$scope.uploadAudio = function () {
  
  console.log("clicked");

  console.log(blobArray);

  var cnt=0;

  for (blob in blobArray){

    var uploadData = {
      'fileName' : cnt,
      'fileType' : blobArray[cnt].type,
      'dataurl': dataUrlArray[cnt]
    };            
    
    $http.defaults.headers.post["Content-Type"] = "application/json";

    $http.post("/upload", uploadData)
    .success(function (response) {
        // TODO
        console.log(response);
    }).error(function (data, status, headers, config) {
        // TODO
    });
    

    cnt++;
  }    
}
$scope.uploadFewAudio = function () {
  
  //console.log($scope.uploadFrom);

  for (var i=$scope.uploadFrom-1;i<$scope.uploadEnd;i++){

    var uploadData = {
      'fileName' : (i+1),
      'fileType' : blobArray[i].type,
      'dataurl': dataUrlArray[i]
    };            
    $http.defaults.headers.post["Content-Type"] = "application/json";

    $http.post("/upload", uploadData)
    .success(function (response) {
        // TODO
        console.log(response);
    }).error(function (data, status, headers, config) {
        // TODO
    });
  }    
}

$scope.stitchAudio = function () {
  console.log("stitch clicked");

  var stitchData = {
      'fileName' : "FinalTest"
  };

  $http.defaults.headers.post["Content-Type"] = "application/json";

  $http.post("/stitch", stitchData)
  .success(function (response) {
      // TODO
      console.log(response);
  }).error(function (data, status, headers, config) {
      // TODO
  });
}

});

    

