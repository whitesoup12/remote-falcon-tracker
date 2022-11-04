#!/usr/bin/env php
<?php
while(true) {
  $fppStatus = getFppStatus();
  echo date("Y-m-d h:i:sa") . " - FPP Status: " . $fppStatus->status_name . "\n";
  sleep(1);
}

function getFppStatus() {
  $result=file_get_contents("http://127.0.0.1/api/fppd/status");
  return json_decode( $result );
}
?>
