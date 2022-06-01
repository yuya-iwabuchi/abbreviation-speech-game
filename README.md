# Abbreviation Speech Game

This is nerdy mini game that I've created.

Goal of the game is to speak out the abbreviation's original term correctly within the given time.
It leverages the [Web Speech API's Speech Recognition](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) to perform live text-to-speech translation.

Due to [it's limitation](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition#browser_compatibility), the game will not function properly on all platforms/devices. At this time (2022-06), it is confirmed to work on:

- Google Chrome on Windows
- Google Chrome on macOS
- Google Chrome on Android
- Safari on iOS

### <img src="public/logo192.png" data-canonical-src="public/logo192.png" width="15" height="15" /> [Try the game now!](https://abbreviation-speech-game.vercel.app/)

===

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
