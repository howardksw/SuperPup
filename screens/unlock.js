import React, {Component} from 'react'
import {View, Text, ListView, TouchableHighlight} from 'react-native'
import NavigationBar from 'react-native-navbar'

export default class Unlock extends Component {
    constructor() {
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
          dataSource: ds.cloneWithRows(['Learn to Fetch', 'Socialize with other dogs']),
        }
    }

    renderRow = (data) => {
        return (
            <TouchableHighlight onPress={() => console.log('pressed')}>
                <View style={{backgroundColor:'white', height:40, borderColor:'lightgrey',borderWidth:1}}>
                    <Text>{data}</Text>
                </View>
            </TouchableHighlight>
        )
    }

    render() {
        return (
            <View style={{flex:1}}>
                <NavigationBar style={{backgroundColor:'skyblue'}}
                       statusBar={{style: 'light-content',tintColor:'skyblue'}} 
                       title={ <View style={{justifyContent:'center', alignItems:'center'}}>
                                  <Text>Unlock Missions</Text>
                               </View>}/>

                <ListView 
                    style={{flex:1}}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow} 
                />
            </View>
        )
    }
}