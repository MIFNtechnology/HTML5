#!/bin/bash
cd ~/scripts
httrack -i https://radio-online.my/
cd iboxbd.live
echo "" > radio.m3u8
echo "#EXTM3U" >> radio.m3u8
i=1
for x in [player]*.html; do
  var=$(cat $x | grep -Eo "(http|https)://[a-zA-Z0-9./?=_%:-]*.[0-9]" | sort -u | head -1; echo "\n")
  echo "#EXTINF:-1, Channel $i" >> radio.m3u8
  echo $var >> radio.m3u8
  i=$((i+1))
done

cp IPTV.m3u ../../
cp IPTV.m3u ~/Development/Github/HTML5
cd ~/Development/Github/HTML5

git add .
git commit -m "Added Updated radio.m3u8"
git push origin master