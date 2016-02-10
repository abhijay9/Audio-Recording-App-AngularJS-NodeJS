var mainApp = angular.module("mainApp", ['ngRoute']);
      
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
////////////////////////////////////////////////////////////////////////////////////////////
         mainApp.controller('AddSrtController', function($scope) {

            $scope.message = "This page will be used to display add student form";


            $scope.srtChange = function(){
      console.log("reached");
      $scope.check="done!";
      $scope.$apply();
      var file= document.querySelector('input[type=file]').files[0];
        var reader = new FileReader();
        reader.onload = function(progressEvent){
        // Entire file
          console.log(this.result);

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
          /*
          seqString="[";
          for (var i = 0; i < sequence_arr.length; i++) 
            if (i!= (sequence_arr.length-1)) seqString+="'"+sequence_arr[i]+"',";
            else seqString+="'"+sequence_arr[i]+"'";
         seqString+="]";
      console.log(seqString);
          
          myjoin(sequence_arr);
        var sequence_arr = function myjoin(arr) {
            return "'" + arr.join("','") + "'";
         }
      */
          console.log("Sequence Array:"+sequence_arr);
          console.log("Sequence Array 2:"+newSeq);
          console.log("Time Array:"+time_arr);
          console.log("Sentence Array:"+sentence_arr);
          //$scope.seqArr= JSON.stringify(sequence_arr);

          $scope.seqArr= sequence_arr;
          $scope.$apply();
          //Calculating the time second array
          /*
          for(i=0;i<sequence_arr.length;i++)
          {
            console.log("li append"+i);
            $('#seqNum').append('<li>'+i+'</li>');
          }
          */

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
            //$scope.showFlag=true;
            //$scope.$apply();
            cdreset();
            console.log("reset");
        };
        reader.readAsText(file);



    }
         });
////////////////////////////////////////////////////////////////////////////
         mainApp.controller('ViewRecorderController', function($scope) {
            $scope.message = "This page displays the recorder";

            $scope.init = function(){

            console.log("Done INIT");

            $scope.seqArr= sequence_arr;
            $scope.$apply();
               //$scope.seqArr=sequence_arr;
            var head= document.getElementsByTagName('head')[0];
            var script= document.createElement('script');
            script.type= 'text/javascript';
            script.src= 'js/Horizontal examples - Sly_files/jquery.min.js';
            head.appendChild(script);

            var head2= document.getElementsByTagName('head')[0];
            var script2= document.createElement('script');
            script2.type= 'text/javascript';
            script2.src= 'js/Horizontal examples - Sly_files/plugins.js';
            head2.appendChild(script2);

            var head3= document.getElementsByTagName('head')[0];
            var script3= document.createElement('script');
            script3.type= 'text/javascript';
            script3.src= 'js/Horizontal examples - Sly_files/sly.min.js';
            head3.appendChild(script3);

            var head4= document.getElementsByTagName('head')[0];
            var script4= document.createElement('script');
            script4.type= 'text/javascript';
            script4.src= 'js/Horizontal examples - Sly_files/horizontal.js';
            head4.appendChild(script4);


/*
            var head5= document.getElementsByTagName('head')[0];
            var script5= document.createElement('script');
            script5.type= 'text/javascript';
            script5.src= 'js/';
            head5.appendChild(script5);*/
/*
            <script src="js/Horizontal examples - Sly_files/jquery.min.js"></script>
      <script src="js/Horizontal examples - Sly_files/plugins.js"></script>
      <script src="js/Horizontal examples - Sly_files/sly.min.js"></script>
      <script src="js/Horizontal examples - Sly_files/horizontal.js"></script>
*/
            console.log("Done INIT");
    };


            $scope.liClicked= function(index){
              //alert(index);
                console.log(parent.document.getElementById("label-"+index));
                console.log($("label-"+index).parent());//.addClass("active");
                var list = document.getElementsByTagName("UL")[0];
                console.log(list.getElementsByTagName("LI")[index].innerHTML);
                var node= list.getElementsByTagName("LI")[index];
                node.setAttribute("class", "active");
            }

            $scope.fromTo= function(){
              //alert(index);
              console.log($scope.from);
            }

         });

    

