  var app=angular.module('a',[]);
app.controller('playlist',function($scope,$http){
var next='';
var previous='';
function pagination(link)
{
  $http.get(link).then(function(data){
console.log(data);
  $scope.data=data;
  next=data.data.next;
  previous=data.data.previous;
});
}
if(next==null)
angular.element('#righttitle').hide();
if(previous=='http://104.197.128.152:8000/v1/tracks')
angular.element('#lefttitle').css('display','none');
pagination('http://104.197.128.152:8000/v1/tracks');
angular.element('#righttitle').on('click',function(){
pagination(next);
});
angular.element('#leftgenre').on('click',function(){
pagination(previous);
});
});

app.controller('form',function($scope,$http){
$('#p1').on('submit',function(){
    var title=angular.element('#title').val();
  var genre=angular.element('#genre').val();
  var rating=angular.element('#rating').val();
 $http({
             responseType:'html',
          params:{action:"addnewsong",title:title,genre:genre,rating:rating},
            method : "POST",
          url : "dynamic.php"
      }).then(function mySucces(response) {
        console.log(response);
             angular.element('#myModal').modal('hide');
        alert("song has been added.");
        $('#title_list').append(response.data);


      }, function myError(response) {
          $scope.myWelcome = response.statusText;
      });
});
});
app.controller('genre',function($scope,$http)
{

  var next='';
  var previous='';
  function pagination(link)
  {
    $http.get(link).then(function(data){
    $scope.data=data;
    next=data.data.next;
    previous=data.data.previous;
});
  }
  if(next==null)
angular.element('#rightgenre').hide();
  if(previous=='http://104.197.128.152:8000/v1/genres')
angular.element('#leftgenre').css('display','none');
pagination('http://104.197.128.152:8000/v1/genres');
angular.element('#rightgenre').on('click',function(){
  pagination(next);
});
angular.element('#leftgenre').on('click',function(){
  pagination(previous);
});

});
app.controller('form12',function($scope,$http){

$('#genre_form').on('submit',function(){
  var genre=angular.element('#newgenre').val();

 $http({
     responseType:'html',
         method : 'POST',
         params:{genre:genre,action:"newgenre"},
         url : "dynamic.php"
      }).then(function mySucces(response) {

 $('#genre_modal').modal('hide');
$('#genre_list').append(response.data);

      }, function myError(response) {

      });

});
});

app.controller('edit_genre',function($scope,$http){

  $('.editgenretitle').on('click',function(){

var id=angular.element(this).attr('id');
var name=angular.element(this).attr('data-name');

 $http({
     responseType:'json',
         method : 'POST',
         params:{id:id,action:"editgenre",name:name},
         url : "dynamic.php"
      }).then(function mySucces(response) {

  console.log(response);
 $('#genre_modal').modal('hide');

$('#genre_edit_text').val(response.data.name);
$('#genre_edit_id').val(response.data.id);
      }, function myError(response) {

      });
     });

$('#submit_new_genre').on('submit',function(){
var name=angular.element('#genre_edit_text').val();
var id=angular.element('#genre_edit_id').val();
 $http({
     responseType:'json',
         method : 'POST',
         params:{id:id,action:"submiteditgenre",name:name},
         url : "dynamic.php"
      }).then(function mySucces(response) {
alert("Genre Edited");
 $('#edit_genre_modal').modal('hide');
location.href="index.html";

      }, function myError(response) {

      });


});


});

app.controller('edit_title_track',function($scope,$http){
$('.edittitle').on('click',function(){
var id=$(this).attr('id');
var name=$(this).attr('data-name');

  $http({
      responseType:'json',
          method : 'POST',
          params:{id:id,action:"edit-title",name:name},
          url : "dynamic.php"
       }).then(function mySucces(response) {
         console.log(response);
  $('#edit_title_modal').modal('show');
 $('#title_edit_title').val(response.data.title);
 $('#genre_edit_title').val(response.data.genres);
 $('#rating_edit_title').val(response.data.rating);
 angular.element('#title_edit_id').val(response.data.id);
       }, function myError(response) {

       });
});


$('#submit_new_songs').on('click',function(){

var title=$('#title_edit_title').val();
var rating=angular.element('#rating_edit_title').val();
var genre=angular.element('#genre_edit_title').val();
var id=$('#title_edit_id').val();

 $http({
     responseType:'json',
         method : 'POST',
         params:{id:id,action:"submiteditsongs",title:title,genre:genre,rating:rating},
         url : "dynamic.php"
      }).then(function mySucces(response) {

 $('#edit_title_modal').modal('hide');
 $('#submit_new_songs').on('submit',function(){
 var title=$('#title_edit_title').val();
 var rating=angular.element('#rating_edit_title').val();
 var genre=angular.element('#genre_edit_title').val();
 var id=$('#title_edit_id').val();
 alert(id);
 alert(title);
  $http({
      responseType:'json',
          method : 'POST',
          params:{id:id,action:"submiteditsongs",title:title,genre:genre,rating:rating},
          url : "dynamic.php"
       }).then(function mySucces(response) {

  $('#edit_title_modal').modal('hide');
alert("Titlw Edited");
 location.href="index.html";

       }, function myError(response) {

       });


 });
location.href="index.html";

      }, function myError(response) {

      });


});
});
