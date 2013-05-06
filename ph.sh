kill -9 $(cat /root/douban-phantomjs/douban.pid)
/usr/local/bin/phantomjs --disk-cache=yes --ignore-ssl-errors=yes --cookies-file=/root/douban-phantomjs/cookies.txt /root/douban-phantomjs/run4.js &
