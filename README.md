cd finance-api && yarn run start:dev
cd finance-pwa && yarn start
cd ../finance-pwa/ && yarn start

git subtree push --prefix finance-api heroku master