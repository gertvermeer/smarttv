#!/bin/bash
if pgrep -f "node tvserver.js" > /dev/null
then
	pgrep -f "node tvserver.js" | xargs kill
        echo "Running version stopped"
else
        echo "No version running"
fi

echo "node tvserver started" 
cd /home/pi/smarttv
node tvserver.js -ip 192.168.0.197 -pin 3477 >> log.txt


