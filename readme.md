### Deployment and run
* If you get the error "Unable to boot device in current state: Booted" run this command `xcrun simctl shutdown all`
    * xCode 13.4.1 seems to be pretty buggy

### Fixing issues
* If you get the error "RNSVCircle was not found in the UIManager"
    Make sure react-native-svg has been installed (check the package.json)
    * If it has not been installed, follow these steps
    1. install react-native-svg in the root with `npx react-native-svg`
    2. cd into the ios folder `cd ios`
    3. run a pod install `pod install`
    4. return to the root folder `cd ..`
    5. navigate to the terminal window running metro and kill it 'control + c'
    6. restart metro `npx react-native start`
    7. open a new terminal tab 'command + t'
    8. rebuild the app `npx react-native run-ios`

### Sources
* The fade, size, and position screens were created following the react docs
    * Specifically the Easing section 
        * https://reactnative.dev/docs/easing
* The progCircle screen was created by following this tutorial
    * https://medium.com/tribalscale/intro-to-svg-animations-with-react-native-reanimated-2-78bd87438129