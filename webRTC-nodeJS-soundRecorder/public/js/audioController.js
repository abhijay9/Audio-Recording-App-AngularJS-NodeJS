var app = angular.module('audioApp', []);
app.controller('srtCtrl')
app.controller('audioCtrl', function($scope) {
    $scope.firstName = "John";
    $scope.lastName = "Doe";
    $scope.seqArr="";
   //$scope.showFlag=false;

    $scope.init = function(){
       $scope.seqArr= ["1","2","3","117","118","119","120","121","122","123","124","125","126","127","128","129","130","131","132","133","134","135","136","137","138","139","140","141","142","143","144","145","146","147","148","149","150","151"];
       $scope.$apply();
       //$scope.seqArr=sequence_arr;
       console.log("Done");
    };

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
            $scope.$apply();
        };
        reader.readAsText(file);



    } 

});