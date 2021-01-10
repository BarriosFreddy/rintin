cd freddybarrios-api && yarn run start:dev
cd freddybarrios-pwa && yarn start
cd ../freddybarrios-pwa/ && yarn start

git subtree push --prefix freddybarrios-api heroku master

cd freddybarrios-pwa && yarn run build 

### add heroku git repo
heroku git:remote -a freddybarrios