<?php
function curl_download($url) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    $output = curl_exec($ch);
    curl_close($ch);
    return $output;
}

function getAds($url) {
    $out = curl_download($url);
    return $out;
}

getAds('https://api.mcmakler.de/v1/advertisements')
?>