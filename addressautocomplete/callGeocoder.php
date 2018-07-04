<?php

$results = array('status'=>false, 'content' => '');

if (isset($_GET['a'])) {
	$address = $_GET['a'];
	$results = doGeocode($address);  
	//echo json_encode($results);
} else {
	$results['status'] = 'noaddress';
}

print(json_encode($results));


function doGeocode($address)
{  
	$url = 'http://dev.virtualearth.net/REST/v1/Locations?query='. urlencode($address) .'&key=AtbxmJ_5QMLosLOsTm1xIWjFDa0lwnzUbr5sszZ_GtEZL-gsop8w2l9xCeH-_dFU';
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_REFERER, "http://www.thingsfromthefuture.com");
	if ($body = curl_exec($ch)) {
		$results = array('status'=>'success', 'content' => $body);
		curl_close($ch);
		return $results;
	} else {
		$results = array('status'=>'curlfailed', 'content' => '');
		curl_close($ch);
		return $results;
	}
}

?>