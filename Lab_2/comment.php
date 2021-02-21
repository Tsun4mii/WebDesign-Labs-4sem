<?php
$s = $_GET["input"];

$filename = 'comments.txt';

$text = file_get_contents($filename);
if(filesize($filename)!= 0)
$a = unserialize($text);

$response="";

if (strlen($s) > 0)
{
	$a[count($a)] = $s;
}

for($i = 0; $i<count($a); $i++)
{
  if ($response == "")
	{
		$response=$a[$i];
	}
  else
	{
		$response=$response." , ".$a[$i];
  }
}

if($a == "")
{
	$text = serialize($s);
}

$text = serialize($a);
file_put_contents($filename, $text);
echo $response;
?>