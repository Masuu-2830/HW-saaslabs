cp -R /var/www/html /home/teamuser/dist$EPOCHSECONDS
npm install --prefix /opt/codedeploy-agent/deployment-root/$DEPLOYMENT_GROUP_ID/$DEPLOYMENT_ID/deployment-archive
npm run build --prefix /opt/codedeploy-agent/deployment-root/$DEPLOYMENT_GROUP_ID/$DEPLOYMENT_ID/deployment-archive
rm -R /var/www/html