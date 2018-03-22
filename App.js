import React, {Component} from 'react'
import {StackNavigator} from 'react-navigation' //keep above screen imports

// we have to import each of our screens here first (place new js files in screens folder)
import Missions from './screens/missions'
import Summary from './screens/summary'
import Timer from './screens/timer'
import Anytime from './screens/anytime'
import Command from './screens/command'

// here is where we list each of our screens. 
// it will by default start the stack navigator at the top most screen
const RouteConfigs = {
  Missions: {screen:Missions},
  Summary: {screen:Summary},
  Timer: {screen: Timer},
  Anytime: {screen: Anytime},
  Command: {screen: Command}
}

// this config just allows us to use custom header bars
const StackNavigatorConfig = {
    headerMode:'screen',
}

// here we create a stack navigator option
const Stack = StackNavigator(RouteConfigs, StackNavigatorConfig)

// finally, this is the default export of the js file. 
// All it is doing is rendering a stack navigator, which begins at MainTabNavigator.
// We use a stack navigator as a base so that screens can be stacked on top of tab navigator
export default class App extends Component {
  render() {
    return (
      <Stack onNavigationStateChange={null}/>
    )
  }
}
