#!/usr/bin/env php
<?php
while(true) {

  $remotePlaylist="RF";
  $totalSequencesInRemotePlaylist=3;

  $randomIndex=rand(1,$totalSequencesInRemotePlaylist);
  insertPlaylistAfterCurrent($remotePlaylist, $randomIndex);

  $randomSleep=rand(100,300);
  echo "Sleeping for " . $randomSleep . " seconds\n";
  sleep($randomSleep);
}

function insertPlaylistAfterCurrent($remotePlaylist, $index) {
  echo "Inserting playlist " . $remotePlaylist . " at index " . $index . "\n";
  $remotePlaylistEncoded=rawurlencode($remotePlaylist);
  $url = "http://127.0.0.1/api/command/Insert+Playlist+After+Current/" . $remotePlaylistEncoded . "/" . $index . "/" . $index;
  $options = array(
    'http' => array(
      'method'  => 'GET'
      )
  );
  $context = stream_context_create( $options );
  $result = file_get_contents( $url, false, $context );
}
?>
