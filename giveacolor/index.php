<?php
header('Content-type: text/html; charset=UTF-8');
?>
<!DOCTYPE HTML>
<html lang="en">
<head>
	<!-- <base href="http://localhost:8888/tftf4/giveacolor/"> -->
	<base href="http://giveacolor.com/">
	<meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
	<META name="revisit-after" content="2-days">
	<META name="robots" content="index,follow">
	<META name="copyright" content="Matthaeus Krenn">
	<meta property="og:type" content="website">
	<meta property="og:image" content="http://www.giveacolor.com/logob2.png">
    <meta property="og:site_name" content="Give a Color">
    <meta property="og:description" content="Give a color to your friends"/>
	
<?php


if (isset($_GET['c'])) {
	if (str_replace(' ', '', $_GET['c']) == '') {
		doVanilla();
	} else if (ctype_xdigit($_GET['c'])) {
		doReplay();
	} else {
		doError('Sorry, this URL is not valid.');
	}
} else {
	doVanilla();
}






function hexDecode($hex) {
    $string='';
    for ($i=0; $i < strlen($hex)-1; $i+=2) {
        $string .= chr(hexdec($hex[$i].$hex[$i+1]));
	}
    return $string;
}







function doReplay() {
	$hash = hexDecode($_GET['c']);
	$tc = substr($hash, 0, 3);
	$c =  substr($hash, 3, 7);
	$t =  substr($hash, 10);
	
	if ($t == '') {
		$t = 'I love this color';
	}
	
	if ($tc != 'fff' && $tc != '000') {
		doError('Sorry, this URL is not valid.');
		return false;
	} else {
		if (!ctype_xdigit(substr($c, 1))) {
			doError('Sorry, this URL is not valid.');
			return false;
		}
	}
	
	?>
	
	<META name="keywords" content="give,a,color">
	<META name="description" content="<?php echo $t . ' - Give a Color';?>">
	<META name="author" content="">
	<meta property="og:title" content="<?php echo $t . '';?>">
    <meta property="og:url" content="http://giveacolor.com/view/<?php echo $_GET['c']; ?>">

	<title><?php echo $t . ' - Give a Color';?></title>
	
	<?php echo '<script type="text/javascript"> var hash = \'' . addslashes($hash) . '\';</script>';	
	doRestOfPage('r');
}





function doVanilla() {
	?>
	<META name="keywords" content="matth&auml;us,matthaeus,krenn,give,a,color,ux,user,experience,design">
	<META name="description" content="Give A Color by Matth&auml;us Krenn.">
	<META name="author" content="Matth&auml;us Krenn">
	<meta property="og:title" content="Give a Color">
    <meta property="og:url" content="http://giveacolor.com">
	<title>Give a Color</title>
	<?php
	doRestOfPage('v');
}





function doError($errorMsg) {
	?>
	<META name="keywords" content="matth&auml;us,matthaeus,krenn,give,a,color,ux,user,experience,design">
	<META name="description" content="Give A Color by Matth&auml;us Krenn.">
	<META name="author" content="Matth&auml;us Krenn">
	<meta property="og:title" content="Give a Color">
    <meta property="og:url" content="http://giveacolor.com">
	<title>Give a Color</title>
	<link rel="stylesheet" href="giveacolor.css" type="text/css" media="screen" title="no title" charset="utf-8">
	</head>
	<body>
		<div id="stageTableError" class="stageTable">
			<div id="stageCellError" class="stageCell">
				<p id="errorMsg"><?php echo $errorMsg; ?></p>
				<a href="http://giveacolor.com" id="errorLink">giveacolor.com</a>
			</div>
		</div>
		<div id="about">
			&copy; <a href="http://thingsfromthefuture.com">Matth&auml;us Krenn</a>
		</div>
		<script type="text/javascript">

		  var _gaq = _gaq || [];
		  _gaq.push(['_setAccount', 'UA-24369654-2']);
		  _gaq.push(['_trackPageview']);

		  (function() {
		    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
		  })();

		</script>
	</body>
	</html>
	<?php
	
	
}




function doRestOfPage($status) {
	?>
	
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js" type="text/javascript" charset="utf-8"></script>
	<script src="farbtastic.js" type="text/javascript" charset="utf-8"></script>
	<link rel="stylesheet" href="giveacolor.css" type="text/css" media="screen" title="no title" charset="utf-8">
	<link rel="stylesheet" href="farbtastic.css" type="text/css" media="screen" title="no title" charset="utf-8">
	
	</head>




<body>
	<?php
	if ($status == 'v') {
	?>
		<div style="display:none;">
			<img src="colswitch.png" />
			<img src="colswitch2.png" />
			<img src="marker.png" />
			<img src="mask.png" />
			<img src="wheel.png" />
		</div>
	<?php
	}
	?>
	
	<div id="colorTile"></div>

	<div id="stageTable" class="stageTable">
		<div id="stageCell" class="stageCell">

			<div id="mainStage">
				
				
				
				<div id="step0" class="step0 clickable">
					<h1>Give a Color</h1>
					<div id="start"></div>
				</div> 
				
				
				
				<div id="step1" class="step1">
					<div id="pickerWrapper">
						<p class="stepDesc">Pick a color</p>
						<div id="picker"></div>
						<input type="text" id="color" value="#ffffff" maxlength="7"/>
					</div>
					<div id="pickerWrapperShadow"></div>
				</div>
				
				

				<div id="step2" class="step2">
					<input id="newMessageText" value="" readonly="readonly">
					<div style="display: inline-block">
						<div id="messageInputBox" class="messageInputBox textControl">
							<div style="display: inline-block; height: 40px;">
								<p class="stepDesc">Add a message if you want</p>
								<input type="text" id="newMessageInput" value="" maxlength="45" class="edit" />
							</div>
							<div id="colSwitch">
								<!-- <img src="colSwitch.png" /> -->
							</div>
							
							<!-- <div id="colSwitch" class="textControl clickable">
								<img src="colswitch.png" />
							</div> -->
						</div>
						<div id="messageShadow"></div>
					</div>
				</div>

				<div id="step3" class="step3">
					<div id="messageCopy">
					</div>
				</div>
				
				<div id="error">
					<div id="errorMsg"></div>
				</div>
			</div>


			<div id="controlsBottom">
				<!-- <div id="start" class="step0 clickable">
					<img src="start.png" />
				</div> -->

				<div id="prev" class="disabled">
					<img src="prev.png" />
				</div>

				<div id="next" class="clickable">
					<img src="next.png" />
				</div>

				<div id="share" class="step3">
					<div id="shareLink" class="shareBox">
						<h2>That's it! Now give this color away.</h2>
						<p class="doneSocial">Share it with your friends.</p>
						<div id="shareFB" class="shareBox clickable"><img src="fb.png" /></div>
						<div id="shareTwitter" class="shareBox clickable"><img src="tw.png" /></div>
						<p>Here is also a unique <a id="finalLink" href="" target="_blank">link</a> to this color.</p>
						<input type="text" id="finalResult" value="http://giveacolor.com/view/fake" readonly="readonly" />
					</div>
					<div id="shareLinkShadow"></div>
				</div>
			</div>

		</div>
	</div>

	<div id="stageTableReplay" class="stageTable">
		<div id="stageCellReplay" class="stageCell">
			<div id="message"></div>
		</div>
	</div>
	
	<div id="stageTableAd" class="stageTable">
		<div id="stageCellAd" class="stageCell">
			<div id="ad">
				<a href="http://giveacolor.com">Give a color to someone!</a>
				<!-- <img src="tinylogo.png" id="adImg" /> -->
			</div>
		</div>
	</div>
	
	<div id="about">
		&copy; <a href="http://thingsfromthefuture.com">Matth&auml;us Krenn</a>
	</div>
	

	<script src="giveacolor.js" type="text/javascript" charset="utf-8"></script>
	<script type="text/javascript">

	  var _gaq = _gaq || [];
	  _gaq.push(['_setAccount', 'UA-24369654-2']);
	  _gaq.push(['_trackPageview']);

	  (function() {
	    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	  })();

	</script>
</body>
</html>

	
	<?php
}








	
	

?>

	



















