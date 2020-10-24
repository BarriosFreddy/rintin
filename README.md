cd finance-api && yarn run start:dev
cd finance-pwa && yarn start
cd ../finance-pwa/ && yarn start

git subtree push --prefix freddybarrios-api heroku master

### add heroku git repo
heroku git:remote -a financefb-api