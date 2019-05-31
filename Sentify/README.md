# Animal Kingdom Sample app

T
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!


### Deployment

If you are deploying this, you'll need to set cores headers to allow requests from all
hosts otherwise you won't be able to sign in and other apps won't be able to load
your animal and kingdom information.

This code includes deployment settings for Firebase and Netlify in the `cors` directory:

| Service  	| Files                      	|
|----------	|----------------------------	|
| Firebase 	| firebase.json, .firebaserc 	|
| Netlify  	| _headers, _redirects       	|

If you're deploying this on another service, you'll need to set CORS headers appropriately for that service.
