# Mobile Tech challenge

[https://accountable.notion.site/Mobile-technical-challenge-d05e18ff22f549b6a8390b08cc2187b4](https://accountable.notion.site/Mobile-technical-challenge-d05e18ff22f549b6a8390b08cc2187b4)

# What is included

- Plain react-native
- TypeScript
- Jest
- React Navigation (with native-stack) [https://reactnavigation.org/](https://reactnavigation.org/)
- Redux-toolkit for state management (persisted) [https://redux-toolkit.js.org/](https://redux-toolkit.js.org/)
- react-native-svg-charts [https://github.com/JesperLekland/react-native-svg-charts](https://github.com/JesperLekland/react-native-svg-charts)
- Lottie for some fancy animations 🧙‍♂️ [https://github.com/lottie-react-native/lottie-react-native](https://github.com/lottie-react-native/lottie-react-native)
- react-native-dotenv for environment variables (I pushed the .env file for demo porposes)

# Run the project

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

#### Test

```
npm run test
```

or

```
yarn test
```

### TODOs

- Add more unit tests
- Add e2e tests
- Fancier error handling
- CI

##### Have fun. 🧑‍🚀🚀
