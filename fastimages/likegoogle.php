<?php

$startpoint = 0;


$searchq = $_GET['searchquery'];

//echo $searchq;
$initsq = $_GET['searchqueryvis'];
$startp = $_GET['startpoint'];

/*echo "query = $searchq <br>";
echo "urlencode = " . urlencode($searchq) . "<br>";
echo "utf8encode = " . utf8_encode($searchq) . "<br>";*/


//echo $searchq;
//echo $startp;
 
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title>wijlskdjflskdjfllkjsdf</title>
    <LINK REL=STYLESHEET – TYPE="text/css" HREF="format1.css">
    <script type="text/javascript">
      function converter() {
        document.testform.searchquery.value = encodeURIComponent(document.testform.searchqueryvis.value);
    }
    </script>
  </head>
  <body>
  

<div class="topg">  
<span class="topgt">Common Google Links:</span> 
<a style="margin-left:8px;" class="topgs" href="http://www.google.com/search?um=1&hl=en&client=firefox-a&rls=org.mozilla:en-US:official&q=matth%C3%A4us&ie=UTF-8&sa=N&tab=iw">Web</a> 
<a class="topgs" href="http://maps.google.com/maps?um=1&hl=en&client=firefox-a&rls=org.mozilla:en-US:official&q=matth%C3%A4us&ie=UTF-8&sa=N&tab=il">Maps</a> 
<a class="topgs" href="http://news.google.com/news?um=1&hl=en&client=firefox-a&rls=org.mozilla:en-US:official&q=matth%C3%A4us&ie=UTF-8&sa=N&tab=in">News</a> 
<a class="topgs" href="http://www.google.com/products?um=1&hl=en&client=firefox-a&rls=org.mozilla:en-US:official&q=matth%C3%A4us&ie=UTF-8&sa=N&tab=if">Shopping</a> 
<a class="topgs" href="http://mail.google.com/mail/?ie=UTF-8&sa=N&tab=im" class=gb1>Gmail</a> 
<a class="topgs" href="https://www.google.com/accounts/Login?continue=http://images.google.com/images%3Fum%3D1%26hl%3Den%26client%3Dfirefox-a%26rls%3Dorg.mozilla%253Aen-US%253Aofficial%26q%3Dmatth%25C3%25A4us%26btnG%3DSearch%2BImages&amp;hl=en">Sign in</a></nobr></div>
</div> 
 
<table style="margin-top:10px" width=100%>
  <tr>
    <form name="testform" action="index.php" method="GET" onSubmit="converter()">
    <td class=tc valign=top>
      <a style="margin-left:7px;" href="http://www.google.com/webhp?hl=en" title="Go to Google Home"><img src="logo.jpg" border="0"></a>
    </td>
    <td style="padding:0 0 7px;padding-left:8px" valign=top width=100%>
      <table style="margin-top:10px" border=0>
        <tr>
          <td class=tc nowrap>
            <input type="text" size="40" name="searchqueryvis" value="<?php echo $initsq; ?>">
            <input type="hidden" name="startpoint" value="0">
            <input type="hidden" name="searchquery" value="0">
            <input type="submit" value="Search Images" name="submit">
          </td>
          <td class=tc nowrap width=100% valign="top">
            <a class="smalllink" href="lksjfdlkjdsf">Real Google Image Search</a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  </form>
</table>

<div class="imgop">
<table cellpadding=0 cellspacing=0 width=100% sytle="border: 1px solid black;">
  <tr>
    <td nowrap>
      <span class="topgt">&nbsp;<b>Images</b>&nbsp;</span>
      <font size=-1>&nbsp;&nbsp;&nbsp;Showing:&nbsp;&nbsp;</font>
    </td>
    <td width=98%>
      <form style="margin:0">
      <select name="imagesize" style="margin:2px 0" onchange="_isr_load(this)">
        <option value="/images?q=matth%C3%A4us&amp;um=1&amp;hl=en&amp;client=firefox-a&amp;rls=org.mozilla:en-US:official&amp;sa=G&amp;imgsz=" selected>All image sizes</option>
        <option value="/images?q=matth%C3%A4us&amp;um=1&amp;hl=en&amp;client=firefox-a&amp;rls=org.mozilla:en-US:official&amp;sa=G&amp;imgsz=huge" >Extra Large images</option>
        <option value="/images?q=matth%C3%A4us&amp;um=1&amp;hl=en&amp;client=firefox-a&amp;rls=org.mozilla:en-US:official&amp;sa=G&amp;imgsz=xxlarge" >Large images</option>
        <option value="/images?q=matth%C3%A4us&amp;um=1&amp;hl=en&amp;client=firefox-a&amp;rls=org.mozilla:en-US:official&amp;sa=G&amp;imgsz=small|medium|large|xlarge" >Medium images</option>
        <option value="/images?q=matth%C3%A4us&amp;um=1&amp;hl=en&amp;client=firefox-a&amp;rls=org.mozilla:en-US:official&amp;sa=G&amp;imgsz=icon" >Small images</option>
      </select>
      <select name="imagetype" style="margin:2px 0" onchange="_isr_load(this)">
        <option value="/images?q=matth%C3%A4us&amp;um=1&amp;hl=en&amp;client=firefox-a&amp;rls=org.mozilla:en-US:official&amp;sa=G&amp;imgtype=" selected>Any content</option>
        <option value="/images?q=matth%C3%A4us&amp;um=1&amp;hl=en&amp;client=firefox-a&amp;rls=org.mozilla:en-US:official&amp;sa=G&amp;imgtype=news&amp;as_st=y" >News content</option>
        <option value="/images?q=matth%C3%A4us&amp;um=1&amp;hl=en&amp;client=firefox-a&amp;rls=org.mozilla:en-US:official&amp;sa=G&amp;imgtype=face&amp;as_st=y" >Faces</option>
        <option value="/images?q=matth%C3%A4us&amp;um=1&amp;hl=en&amp;client=firefox-a&amp;rls=org.mozilla:en-US:official&amp;sa=G&amp;imgtype=clipart&amp;as_st=y" >Clip art</option>
        <option value="/images?q=matth%C3%A4us&amp;um=1&amp;hl=en&amp;client=firefox-a&amp;rls=org.mozilla:en-US:official&amp;sa=G&amp;imgtype=lineart&amp;as_st=y" >Line drawings</option>
        <option value="/images?q=matth%C3%A4us&amp;um=1&amp;hl=en&amp;client=firefox-a&amp;rls=org.mozilla:en-US:official&amp;sa=G&amp;imgtype=photo&amp;as_st=y" >Photo content</option>
      </select>
    </form>
    </td>
    <td align=right nowrap id=resultStats>
      <font size=-1>Results for <b><?php echo $initsq; ?></b> limited to 57. Now showing nr. <b><span id="lowerLimit"><?php echo $startp + 1; ?></span>&nbsp;&nbsp;&nbsp;</b></font>
    </td>
  </tr>
</table>
</div>

<center>

    

<?php

if(isset($searchq)) {

?>
    <br>
    
<?php

if($startp > 0) {

?>
  <a class="prevnext" href="index.php?searchquery=<?php echo rawurlencode($searchq); ?>&startpoint=<?php echo $startp-1; ?>&searchqueryvis=<?php echo $initsq; ?>">Previous</a>

<?php
} else {
?>
  <span class="prevnextdummy">Previous</span>
<?php
}

if ($startp > 55) {
  echo "<span class=\"prevnextdummy\">Next</span>";
} else {
  $sq = rawurlencode($searchq);
  $sp = $startp+1;
  echo "<a class=\"prevnext\" href=\"index.php?searchquery=".$sq."&startpoint=".$sp."&searchqueryvis=".$initsq."\">Next</a>";
}
}

if(isset($searchq)) {
  
  $url = "http://ajax.googleapis.com/ajax/services/search/images?v=1.0&start=$startp&q=". $searchq;
    
  // sendRequest
  // note how referer is set manually
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, $url);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
  curl_setopt($ch, CURLOPT_REFERER, "http://www.mysite.com/index.html");
  $body = curl_exec($ch);
  curl_close($ch);
  
  // now, process the JSON string
  $json = json_decode($body);
  // now have some fun with the results...
  
  //var_dump($json);
  
  echo "<br><br>";
  
  $i=0;
  for($i=0;$i<1;$i++) {
    //echo $json->responseData->results[$i]->GsearchResultClass . " GsearchResultClass<br>";
    $imgw = $json->responseData->results[$i]->width;
    $imgh = $json->responseData->results[$i]->height;
    $location = $json->responseData->results[$i]->unescapedUrl;
    //echo $json->responseData->results[$i]->title . " title<br>";
    //echo $json->responseData->results[$i]->titleNoFormatting . " titleNoFormatting<br>";
    $homepage = $json->responseData->results[$i]->originalContextUrl;
    $tinyurl = $json->responseData->results[$i]->visibleUrl;
    $desc = utf8_decode($json->responseData->results[$i]->content);
    $descnoformat = utf8_decode($json->responseData->results[$i]->contentNoFormatting);
    $dasbild = $json->responseData->results[$i]->unescapedUrl;
    echo "<a href=\"$location\"><img style=\"border:1px solid #0000cc;\"src=$dasbild></a><br><br>";
    
    echo "$desc<br>$imgw"." x "."$imgh<br>";
    echo "<a class=\"tinyurl\" href=\"$homepage\">$tinyurl</a><br><br>";
    
    }
  
}

 
if(isset($searchq)) {
 
 if($startp > 0) {

?>
  <a class="prevnext" href="index.php?searchquery=<?php echo rawurlencode($searchq); ?>&startpoint=<?php echo $startp-1; ?>&searchqueryvis=<?php echo $initsq; ?>">Previous</a>

<?php
} else {
?>
  <span class="prevnextdummy">Previous</span>
<?php
}

if ($startp > 55) {
  echo "<span class=\"prevnextdummy\">Next</span>";
} else {
  $sq = $searchq;
  $sp = $startp+1;
  echo "<a class=\"prevnext\" href=\"index.php?searchquery=".$sq."&startpoint=".$sp."&searchqueryvis=".$initsq."\">Next</a>";
}

}
?>

<div class="imgop" style="margin-top:40px;border-bottom:1px solid #3366cc;">
<table border=0 cellpadding=0 cellspacing=0 width=100% class="ft t bb bt">
  <tr>
    <td align=center>&nbsp;
      <br>
      <table border=0 cellpadding=0 cellspacing=0 align=center>
        <form method=GET action="/images">
        <tr>
          <td nowrap>
            <font size=-1>
            <input type=text name=q size=41 maxlength=2048 value="matthäus" title=""> 
            <input type=submit name="btnG" value="Search Images">
            <input type=hidden name=um value=1>
            <input type=hidden name=hl value="en">
            <input type=hidden name=client value="firefox-a">
            <input type=hidden name=rls value="org.mozilla:en-US:official">
            <input type=hidden name=sa value="2">
            </font>
          </td>
        </tr>
        </form>
      </table>
      <br>
    </td>
  </tr>
</table>
</div>

<center><p><div style="padding:2px" class=""><font size=-1>&copy;2008 Google - <a href="http://www.google.com/">Google&nbsp;Home</a> - <a href="/intl/en/ads/">Advertising&nbsp;Programs</a> - <a href="/services/">Business Solutions</a> - <a href="http://www.google.com/intl/en/about.html">About Google</a></font></div><br></center></body></html>


  </body>
</html>


