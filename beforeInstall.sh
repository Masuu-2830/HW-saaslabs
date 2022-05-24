cp -R /var/www/html /home/teamuser/dist$EPOCHSECONDS
rm -R /var/www/html
npm install
npm run build