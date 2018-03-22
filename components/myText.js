// taken from https://gist.github.com/neilsarkar/c9b5fc7e67bbbe4c407eec17deb7311e
import React, {Component} from 'react'
import {Text} from 'react-native'

export default class MyText extends Component {
  constructor(props) {
    super(props)
    // Put your default font styles here. 
    this.style = [{fontFamily: 'LondrinaSolid-Regular', fontSize:25}];
    if( props.style ) {
      if( Array.isArray(props.style) ) {
        this.style = this.style.concat(props.style)
      } else {
        this.style.push(props.style)
      }
    }
  }

  render() { return (
    <Text {...this.props} style={this.style}>
      {this.props.children}
    </Text>
  )}
}