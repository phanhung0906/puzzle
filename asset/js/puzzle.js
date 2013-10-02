var myApp= angular.module("myApp",[]);
myApp.controller("FirstCtrl",function($scope,$http,$templateCache){

//    $scope.keys = [
//        {"name":"IGOR","done":false},
//        {"name":"MODULES","done":false},
//        {"name":"GOOGLE","done":false},
//        {"name":"MISKO","done":false},
//        {"name":"JAVASCRIPT","done":false},
//        {"name":"OGG","done":false}
//    ];


    matrix = function(row,col){
        var matrix = [];
        var array = [];
        for(var i=0 ; i<row ;i++){
            array = [];
            for(var j=0; j<col; j++){
                array.push("-");
                var temp={"num":array};
            }
            matrix.push(temp);
        }
        return matrix;
    };
    $scope.words = matrix(10,10);
    $scope.row = $scope.words.length;
    $scope.col = $scope.words[0].length;
    $scope.keys=[];
    $scope.currentKeys = $scope.keys;
    $scope.method="GET";
    $scope.url= "data.txt";
    $scope.arrayData=[];
    $scope.loading = false;
    $scope.resultArray=[];
    $scope.result = false;
    $scope.show = function(){
        console.log($scope.arrayData);
        console.log($scope.loading);
        var numArray =  $scope.arrayData.length;
        /**
         * Make random keys array
         */
        for(var i=0 ; i< numArray;i++){
            var rand = Math.floor(Math.random()*numArray);
            if( rand != (numArray-1)) {
                var temp = $scope.arrayData[rand].split("");
                temp.pop();
                if((temp.length>3) && (temp.length<6))
                $scope.currentKeys.push({"name":temp.join(""),"done":false});
            }
                if($scope.currentKeys.length == 8){
                    break;
                }
        }
        /**
         * Make currentKeys values
         */
//        var num = $scope.keys.length;
//        for(var i=0 ; i< num ;i++){
//            var temp1 = {"name": $scope.keys[i], "done": false};
//            $scope.currentKeys.push(temp1);
//        }
//        console.log($scope.keys);
        console.log($scope.currentKeys);
        $scope.numkey = $scope.currentKeys.length;
        /**
         * Random matrix
         */
        var r = 0; var c= 0; var temp1 =[];
//        var numkeys = $scope.keys.length;
        var numkeys1 = Math.floor( $scope.numkey/3);

        for(var j=0;j< numkeys1;j++){
            var temp = $scope.currentKeys[j].name.split("");
            /**
             * push to matrix with col
             */
            var num2 = temp.length;
            if(num2<10){
            r = Math.floor(Math.random()*($scope.row-num2));
            temp1.push(c);
            c = Math.floor(Math.random()*$scope.row);
            var tempLength = temp1.length;
            for(var m =0; m < tempLength; m++){
                if(temp1[m] == c){
                    c = Math.floor(Math.random()* $scope.row);
                }
            }
            for(var k=0;k < num2;k++){
                $scope.words[c].num[r++] = temp[k];
            }
        }
        }

        c = 1;var count =0;
        var number = Math.floor( $scope.numkey*2/3);
        for( var n = numkeys1; n<number; n++){
            var temp2 = $scope.currentKeys[n].name.split("");
            /**
             * Push to matrix with row
             */
            var num3 = temp2.length;
            for(var i =0; i< $scope.row; i++){
                count = 0;
                for(var g =0; g< $scope.row; g++){
                    if ($scope.words[g].num[i] == "-"){
                        ++count;
                    }else count =0;
                    if(count >= num3){
                        for(var e=0;e < num3;e++){
                            $scope.words[g--].num[i] = temp2[e];
                        }
                        break;
                    }
                }
                if(count >= num3) break;
            }
        }

        for( var w = number ; w< $scope.numkey; w++){
            var temp3 = $scope.currentKeys[w].name.split("");
            var num4 = temp3.length;
            for( var r=0 ; r < ($scope.row-num4); r++){
                count = 0;
                for(var u=0 ; u < $scope.row; u++){
                    var v=r;count = 0;
                for(var y =u; y< ($scope.row-r); y++){
                    var b=y;
                                           console.log(v+","+u+","+y+","+r);
                if ( $scope.words[v++].num[y] == "-" ){
                    ++count;              console.log(count);
                }else count =0;
                if(count == num4){
                    for(var t=0;t < num4; t++){
                        $scope.words[--v].num[b--] = temp3[t];
                    }
                    break;
                }
                }
                if(count >= num4) break;
            }
            if(count >= num4) break;
            }
        }



        for(var p=0; p<$scope.row; p++){
            for(var q=0; q<$scope.row; q++){
                if ( $scope.words[p].num[q] != "-"){
                   $scope.resultArray.push({"x":p,"y":q});
                }
            }
        }

        var allwords =['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'k', 'j', 'l','m','n','o','p'];
        for(var i =0; i< $scope.row; i++){
          for(var j =0; j< $scope.row; j++){
                if ($scope.words[i].num[j] == "-"){
                    var rand = Math.floor(Math.random()* allwords.length);
                    $scope.words[i].num[j] = allwords[rand];
                }
            }
        }
    };


    $scope.init = function(){

        $http.get("data.txt").
            success(function(data) {
                $scope.arrayData = data.split("\n");
//                $scope.arrayData = data.keys;
//                var n =$scope.arrayData.length;
//                for(var i=0 ;i< n;i++){
//                    var rand = Math.floor(Math.random()*n);
//                    if(i< n) {
//                        var temp = $scope.arrayData[rand];
//                        $scope.keys.push(temp);
//                    }
//                    if($scope.keys.length >5)
//                        break;
//                }
//                var num = $scope.keys.length;
//                for(var i=0 ; i< num ;i++){
//                    var temp1 = {"name": $scope.keys[i], "done": false};
//                    $scope.currentKeys.push(temp1);
//                }
//                console.log($scope.keys);
//                console.log($scope.currentKeys);
//                $scope.numkey = $scope.currentKeys.length;

//                $scope.show();
                $scope.loading = true;
                $scope.show();
            }).
            error(function(data) {
                $scope.keys = data || "Request failed";
            })


    }

//    $scope.words = [
//        {"num":['N', 'I', 'G', 'O', 'R', 'Y', 'G', 'S', 'T', 'T', 'A', 'N']},
//        {"num":['O', 'G', 'G', 'U', 'L', 'C', 'O', 'E', 'P', 'E', 'A', 'S']},
//        {"num":['I', 'N', 'N', 'R', 'M', 'N', 'O', 'R', 'I', 'M', 'E', 'C']},
//        {"num":['T', 'I', 'A', 'I', 'O', 'E', 'G', 'V', 'R', 'P', 'V', 'E']},
//        {"num":['C', 'T', 'T', 'E', 'D', 'D', 'L', 'I', 'C', 'L', 'I', 'N']},
//        {"num":['E', 'S', 'J', 'P', 'U', 'N', 'E', 'C', 'S', 'A', 'T', 'A']},
//        {"num":['J', 'E', 'O', 'O', 'L', 'E', 'I', 'E', 'A', 'T', 'C', 'R']},
//        {"num": ['N', 'T', 'V', 'C', 'E', 'P', 'J', 'B', 'V', 'E', 'E', 'I']},
//        {"num": ['I', 'S', 'I', 'S', 'S', 'E', 'S', 'A', 'A', 'W', 'R', 'O']},
//        {"num": ['O', 'K', 'S', 'I', 'M', 'D', 'E', 'S', 'J', 'O', 'I', 'M']},
//        {"num": ['R', 'E', 'L', 'L', 'O', 'R', 'T', 'N', 'O', 'C', 'D', 'E']}
//    ];

    $scope.resultBtn = function(){
     var num= $scope.resultArray.length;
        for(var i=0;i<num;i++){
            $('table').find("[data-id='"+$scope.resultArray[i].x+"']").find("[data-id='"+$scope.resultArray[i].y+"']").css({'background':'#EEEEEE'});
        }
        for(var j=0; j< $scope.numkey;j++){
            $scope.currentKeys[j].done = true;
        }
        $scope.result = true;
    }

    find = function(row,col){
       return $scope.words[row].num[col];
    }
    var word1 ; var word2='';
    var found=[] ; var allfound=[];
    var id1;var id2 ;var id3 ;var id4;
  //  $('table').on('mouseup','.value',function(){
    $scope.mouseup = function(){
        if($scope.result == false){


        $('.value').css({'background':'none'});
        var lengAllfound = allfound.length;
        for(var i=0;i<lengAllfound;i++){
            $('table').find("[data-id='"+allfound[i].x+"']").find("[data-id='"+allfound[i].y+"']").css({'background':'#EEEEEE'});
        }
        $('table').unbind('mouseenter');
        for( var i=0; i< $scope.numkey; i++){
            if( $scope.currentKeys[i].name == word2 ){
                $scope.currentKeys[i].done = true;
                allfound = allfound.concat(found);
                if  (id1==id3){
                    if(parseInt(id4)>parseInt(id2)){
                var num = parseInt(id4)-parseInt(id2);
                for(var i=0;i<num;i++){
                    $('table').find("[data-id='"+id1+"']").find("[data-id='"+(parseInt(id2)+i+1)+"']").css({'background':'#EEEEEE'});
                     }
                  }
                }
                if (id2 == id4){
                    if(id1 > id3){
                        var num = parseInt(id1)-parseInt(id3);
                        for(var i=0;i<num;i++){
                            $('table').find("[data-id='"+(parseInt(id1)-i-1)+"']").find("[data-id='"+id2+"']").css({'background':'#EEEEEE'});
                        }
                    }else{
                    var num = parseInt(id3)-parseInt(id1);
                    for(var i=0;i<num;i++){
                        $('table').find("[data-id='"+(parseInt(id1)+i+1)+"']").find("[data-id='"+id2+"']").css({'background':'#EEEEEE'});
                    }
                }
                }
                if ( ((parseInt(id3)- parseInt(id1)) == ( parseInt(id4) - parseInt(id2)))){
                    if(id3>id1){
                        var num = parseInt(id3)-parseInt(id1);
                        for(var i=0;i<num;i++){
                            $('table').find("[data-id='"+(parseInt(id1)+i+1)+"']").find("[data-id='"+((parseInt(id2))+i+1)+"']").css({'background':'#EEEEEE'});
                        }
                    }else{
                        var num = parseInt(id1)-parseInt(id3);
                        for(var i=0;i<num;i++){
                            $('table').find("[data-id='"+(parseInt(id1)-i-1)+"']").find("[data-id='"+((parseInt(id2))-i-1)+"']").css({'background':'#EEEEEE'});

                        }
                    }
                }
                if ( ((parseInt(id3)- parseInt(id1)) == ( parseInt(id2) - parseInt(id4)))){
                    if(id3>id1){
                        var num = parseInt(id3)-parseInt(id1);
                        for(var i=0;i<num;i++){
                            $('table').find("[data-id='"+(parseInt(id1)+i+1)+"']").find("[data-id='"+((parseInt(id2))-i-1)+"']").css({'background':'#EEEEEE'});
                        }
                    }else{
                        var num = parseInt(id1)-parseInt(id3);
                        for(var i=0;i<num;i++){
                            $('table').find("[data-id='"+(parseInt(id1)-i-1)+"']").find("[data-id='"+((parseInt(id2))+i+1)+"']").css({'background':'#EEEEEE'});
                        }
                    }
                }
                $('table').find("[data-id='"+id1+"']").find("[data-id='"+id2+"']").css({'background':'#EEEEEE'});
                break;
            }
        }
        }
    };

    $('table').on('mousedown','.value',function(){
        if($scope.result == false){
          id1= $(this).parent("tr").attr("data-id");
          id2= $(this).attr("data-id");
        var temp1 = {'x':id1,'y':id2};
        found =[];
//        found.push(temp1);                                console.log(temp1);
         word1=''; word2='';
         word1 = $(this).html();
        $(this).css({'background':'#EEEEEE'});
        $('table').on('mouseenter','.value',function(){
             id3= $(this).parent("tr").attr("data-id");
             id4= $(this).attr("data-id");
//            var temp2 = {'x':id3,'y':id4};                  console.log(temp2);
//            found.push(temp2);
//            console.log(found);
            var count1 = true; var count2 = true;
//            var vd=[];
//            vd1 ={'x':(found[0].x),'y':(found[0].y)};
//            vd2 ={'x':(found[found.length-1].x),'y':(found[found.length-1].y)};
//            vd.push(vd1);vd.push(vd2);
           // console.log(vd);
            word2 = find(parseInt(id1),parseInt(id2));
            found =[];
            found.push(temp1);
            if  (id1==id3){

                if(parseInt(id4)>parseInt(id2)){
                    $('.value').css({'background':'none'});
                    var lengAllfound = allfound.length;
                    for(var i=0;i<lengAllfound;i++){
                        $('table').find("[data-id='"+allfound[i].x+"']").find("[data-id='"+allfound[i].y+"']").css({'background':'#EEEEEE'});
                    }
                    $('table').find("[data-id='"+id1+"']").find("[data-id='"+id2+"']").css({'background':'#EEEEEE'});
                    var num = parseInt(id4)-parseInt(id2);
                    for(var i=0;i<num;i++){
                        $('table').find("[data-id='"+id1+"']").find("[data-id='"+(parseInt(id2)+i+1)+"']").css({'background':'#EEEEEE'});
                        word2 += find(id1,parseInt(id2)+i+1);
                        var temp2 = {'x':id1,'y':parseInt(id2)+i+1};
                        found.push(temp2);
                    }
                }else{
                    $('.value').css({'background':'none'});
                    var lengAllfound = allfound.length;
                    for(var i=0;i<lengAllfound;i++){
                        $('table').find("[data-id='"+allfound[i].x+"']").find("[data-id='"+allfound[i].y+"']").css({'background':'#EEEEEE'});
                    }
                    $('table').find("[data-id='"+id1+"']").find("[data-id='"+id2+"']").css({'background':'#EEEEEE'});
                    var num = id2-id4;
                    for(var i=0;i<num;i++){
                        $('table').find("[data-id='"+id1+"']").find("[data-id='"+(parseInt(id2)-i-1)+"']").css({'background':'#EEEEEE'});
                        word2 += find(id1,id2-i-1);
                        var temp2 = {'x':id1,'y':parseInt(id2)-i-1};
                        found.push(temp2);
                    }
                }

//                console.log(word2);
            }

           if (id2 == id4){
               if(id1 > id3){
                   $('.value').css({'background':'none'});
                   var lengAllfound = allfound.length;
                   for(var i=0;i<lengAllfound;i++){
                       $('table').find("[data-id='"+allfound[i].x+"']").find("[data-id='"+allfound[i].y+"']").css({'background':'#EEEEEE'});
                   }
                   $('table').find("[data-id='"+id1+"']").find("[data-id='"+id2+"']").css({'background':'#EEEEEE'});
                   var num = parseInt(id1)-parseInt(id3);
                   for(var i=0;i<num;i++){
                       $('table').find("[data-id='"+(parseInt(id1)-i-1)+"']").find("[data-id='"+id2+"']").css({'background':'#EEEEEE'});
                       word2 += find(parseInt(id1)-i-1,id2);
                       var temp2 = {'x':(parseInt(id1)-i-1),'y':id2};
                       found.push(temp2);
                   }
           }else {
                   $('.value').css({'background':'none'});
                   var lengAllfound = allfound.length;
                   for(var i=0;i<lengAllfound;i++){
                       $('table').find("[data-id='"+allfound[i].x+"']").find("[data-id='"+allfound[i].y+"']").css({'background':'#EEEEEE'});
                   }
                   $('table').find("[data-id='"+id1+"']").find("[data-id='"+id2+"']").css({'background':'#EEEEEE'});

                   var num = parseInt(id3)-parseInt(id1);
                   for(var i=0;i<num;i++){
                       $('table').find("[data-id='"+(parseInt(id1)+i+1)+"']").find("[data-id='"+id2+"']").css({'background':'#EEEEEE'});
                       word2 += find(parseInt(id1)+i+1,id2);
                       var temp2 = {'x':parseInt(id1)+i+1,'y':id2};
                       found.push(temp2);
                   }
               }
           }

                if ( ((parseInt(id3)- parseInt(id1)) == ( parseInt(id4) - parseInt(id2)))){
                    if(id3>id1){
                    $('.value').css({'background':'none'});
                    var lengAllfound = allfound.length;
                    for(var i=0;i<lengAllfound;i++){
                        $('table').find("[data-id='"+allfound[i].x+"']").find("[data-id='"+allfound[i].y+"']").css({'background':'#EEEEEE'});
                    }
                    $('table').find("[data-id='"+id1+"']").find("[data-id='"+id2+"']").css({'background':'#EEEEEE'});

                    var num = parseInt(id3)-parseInt(id1);
                    for(var i=0;i<num;i++){
                        $('table').find("[data-id='"+(parseInt(id1)+i+1)+"']").find("[data-id='"+((parseInt(id2))+i+1)+"']").css({'background':'#EEEEEE'});
                        word2 += find(parseInt(id1)+i+1,parseInt(id2)+i+1);
                        var temp2 = {'x':parseInt(id1)+i+1,'y':parseInt(id2)+i+1};
                        found.push(temp2);
                    }
                }else{
                        $('.value').css({'background':'none'});
                        var lengAllfound = allfound.length;
                        for(var i=0;i<lengAllfound;i++){
                            $('table').find("[data-id='"+allfound[i].x+"']").find("[data-id='"+allfound[i].y+"']").css({'background':'#EEEEEE'});
                        }
                        $('table').find("[data-id='"+id1+"']").find("[data-id='"+id2+"']").css({'background':'#EEEEEE'});

                        var num = parseInt(id1)-parseInt(id3);
                        for(var i=0;i<num;i++){
                            $('table').find("[data-id='"+(parseInt(id1)-i-1)+"']").find("[data-id='"+((parseInt(id2))-i-1)+"']").css({'background':'#EEEEEE'});
                            word2 += find(parseInt(id1)-i-1,parseInt(id2)-i-1);
                            var temp2 = {'x':parseInt(id1)-i-1,'y':parseInt(id2)-i-1};
                            found.push(temp2);
                        }
                    }
                }
            if ( ((parseInt(id3)- parseInt(id1)) == ( parseInt(id2) - parseInt(id4)))){
                if(id3>id1){
                $('.value').css({'background':'none'});
                var lengAllfound = allfound.length;
                for(var i=0;i<lengAllfound;i++){
                    $('table').find("[data-id='"+allfound[i].x+"']").find("[data-id='"+allfound[i].y+"']").css({'background':'#EEEEEE'});
                }
                $('table').find("[data-id='"+id1+"']").find("[data-id='"+id2+"']").css({'background':'#EEEEEE'});

                var num = parseInt(id3)-parseInt(id1);
                for(var i=0;i<num;i++){
                    $('table').find("[data-id='"+(parseInt(id1)+i+1)+"']").find("[data-id='"+((parseInt(id2))-i-1)+"']").css({'background':'#EEEEEE'});
                    word2 += find(parseInt(id1)+i+1,parseInt(id2)-i-1);
                    var temp2 = {'x':parseInt(id1)+i+1,'y':parseInt(id2)-i-1};
                    found.push(temp2);
                }
            }else{
                $('.value').css({'background':'none'});
                var lengAllfound = allfound.length;
                for(var i=0;i<lengAllfound;i++){
                    $('table').find("[data-id='"+allfound[i].x+"']").find("[data-id='"+allfound[i].y+"']").css({'background':'#EEEEEE'});
                }
                $('table').find("[data-id='"+id1+"']").find("[data-id='"+id2+"']").css({'background':'#EEEEEE'});

                var num = parseInt(id1)-parseInt(id3);
                for(var i=0;i<num;i++){
                    $('table').find("[data-id='"+(parseInt(id1)-i-1)+"']").find("[data-id='"+((parseInt(id2))+i+1)+"']").css({'background':'#EEEEEE'});
                    word2 += find((parseInt(id1)-i-1),(parseInt(id2)+i+1));  console.log((parseInt(id1)-i-1));
                    var temp2 = {'x':parseInt(id1)-i-1,'y':parseInt(id2)+i+1};
                    found.push(temp2);
                }
            }
            }

        });
        }
    });

});
