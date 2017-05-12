<?php


if($_GET['action']!='' && $_GET['action']=='addnewsong')
{
$data=array(
'title'=>$_GET['title'],
'rating'=>$_GET['rating'],
'genre'=>$_GET['genre']
);
$response=simplePostData('http://104.197.128.152:8000/v1/tracks',$data);

$html='<li >'.$response['title']. $response['rating'].'<button class="editgenretitle" id="'.$response['id'].'" data-name="'.$response['title'].' " ng-controller="edit_title_track" data-toggle="modal" data-target="#edit_title_modal">Edit</button> </li>';
echo $html;
}


if(isset($_GET['action']) && $_GET['action']=='newgenre')
{

	$data=array(
'name'=> $_GET['genre']

		);
$response=simplePostData('http://104.197.128.152:8000/v1/genres',$data);
$html='<li >'.$response['name'].'<button class="editgenretitle" id="'.$response['id'].'" data-name="'.$response['name'].' " ng-controller="edit_genre" data-toggle="modal" data-target="#edit_genre_modal">Edit</button></li>';
echo $html;
}

if(isset($_GET['action']) && $_GET['action']=='editgenre')
{

    $data=array(
'id'=>$_GET['id'],
'name'=>$_GET['name']

        );
  $response=getRecordsGETMethod('http://104.197.128.152:8000/v1/genres/'.$_GET['id'],$data);
echo json_encode($response);
}

if(isset($_GET['action']) && $_GET['action']=='submiteditgenre')
{
    $data=array(
'id'=>$_GET['id'],
'name'=>$_GET['name']
        );
  $response=simplePostData('http://104.197.128.152:8000/v1/genres/'.$_GET['id'],$data);

echo json_encode($response);
}

if($_GET['action']!='' && $_GET['action']=='edit_title_now')
{
	$data=array(
		'id'=>$_GET['id'],

	);
	$response=simplePostData('http://104.197.128.152:8000/v1/title/'.$_GET['id'],$data);

echo json_encode($response);
}

function simplePostData($url, $data) {
    $curl = curl_init($url);
    ini_set('max_execution_time', 300);
    curl_setopt($curl, CURLOPT_POST, 1);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($curl, CURLOPT_HEADER, 0);
    $result = curl_exec($curl);
    curl_close($curl);
    return json_decode($result, true);
}


function getRecordsGETMethod($url) {
    ini_set('max_execution_time', 300);
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $result = curl_exec($ch);
    curl_close($ch);
    $result = mb_convert_encoding($result, 'UTF-8', 'UTF-8');
    if (substr($result, 0, 6) == '<html>')
        return $result;
    $obj = (array) json_decode($result, true);
    unset($ch, $result);
    return $obj;
}

if($_GET['action']!='' && $_GET['action']=='edit-title')
{

$data=array(
'id'=>$_GET['id'],
'name'=>$_GET['name']
);
$response=getRecordsGETMethod('http://104.197.128.152:8000/v1/tracks/'.$_GET['id'],$data);
// $response=getRecordsGETMethod('http://104.197.128.152:8000/v1/tracks/',$_GET['id']);

// print_r($response);exit;

echo json_encode($response);
}


if(isset($_GET['action']) && $_GET['action']=='submiteditsongs')
{
    $data=array(
'id'=>$_GET['id'],
'title'=>$_GET['title'],
'genre'=>$_GET['genre'],
'rating'=>$_GET['rating']
        );
  $response=simplePostData('http://104.197.128.152:8000/v1/tracks/'.$_GET['id'],$data);

echo json_encode($response);
}
 ?>
