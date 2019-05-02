<<<<<<< HEAD
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
=======
# egora-frontend
>>>>>>> 39c442b301e8021f1d279726953ad398423ed150

### Configuring the BackEnd

  CRUD ADONIS + rocketseat
  https://github.com/kartoza/docker-postgis
  https://github.com/Rocketseat/academy-adonis-acl-startpack


  sudo npm i -g npx

  sudo npx eslint --init

  How would you like to use ESLint? To check syntax, find problems, and enforce code style
? What type of modules does your project use? CommonJS (require/exports)
? Which framework does your project use? None of these
? Where does your code run? (Press <space> to select, <a> to toggle all, <i> to invert selection)Node
? How would you like to define a style for your project? Use a popular style guide
? Which style guide do you want to follow? Standard (https://github.com/standard/standard)
? What format do you want your config file to be in? JSON

docker ps -la

docker start NAME


adonis serve --dev (start server)

adonis make:model NAMEMODEL -c -m

adonis migration:run

adonis migration:rollback

=================================================

### Configuring the FrontEnd:


npx create-react-app NAME

yarn add eslint -D

yarn eslint --init

How would you like to use ESLint? To check syntax, find problems, and enforce code style
? What type of modules does your project use? JavaScript modules (import/export)
? Which framework does your project use? React
? Where does your code run? (Press <space> to select, <a> to toggle all, <i> to invert selection)Browser
? How would you like to define a style for your project? Use a popular style guide
? Which style guide do you want to follow? Airbnb (https://github.com/airbnb/javascript)
? What format do you want your config file to be in? JSON


install extension Rocketseat ReactJS

npm install --save styled-components

yarn add axios

sudo npm install --save react-router-dom

install editorconfig extension. Then, click on white space on the project tree and add editorconfig file

======================

SQL QUERIES:
INSERT INTO members (name, facebook, created_at, updated_at) 
VALUES ('Rita', 'http://facebook.com/rita', '2019-04-30 18:24:24+00', '2019-04-30 18:24:24+00');

Get Price_Strikes:
SELECT p.id, p.created_at, m.name, m.facebook, p.strike_number FROM price_strikes p, members m WHERE m.facebook LIKE 'http://facebook.com/anamary' AND p.member_id = m.id;
