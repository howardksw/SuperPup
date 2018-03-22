import React, { Component } from 'react';
import { Text, Button, StyleSheet, View, Dimensions, Image, AsyncStorage, ScrollView, TouchableOpacity} from 'react-native';
import addToAsync from '../modules/addToAsync'
import AnytimeData from '../data/anytimeData'
import FadeIn from 'react-native-fade-in-image';

const {width, height} = Dimensions.get('window');

export default class Anytime extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: <Text style={{color:'white', fontWeight:'bold', fontSize:23}}>{navigation.state.params.data[0]}</Text>,
        headerStyle: {
            backgroundColor: '#0099f7',
        },
        headerTintColor: 'white'
      })

    constructor(props) {
        super(props);
        this.state = {
            title: this.props.navigation.state.params.data[0],
            pointsToGain: this.props.navigation.state.params.data[1],
            instructions: AnytimeData[this.props.navigation.state.params.data[0]].instructions,
            image: AnytimeData[this.props.navigation.state.params.data[0]].image
        }
    }

    donePressed = () => {
        AsyncStorage.setItem(this.state.title+'-checked', new Date().getTime().toString()).then(() => {
            this.props.navigation.state.params.updateMissions()
        })
        addToAsync(this.state.title, 1, () => this.props.navigation.state.params.showModal(this.state.title, this.state.pointsToGain))
        addToAsync('POINTS', this.state.pointsToGain, this.props.navigation.state.params.updateHeader)
        this.props.navigation.goBack()
    }
    
    render() { 
        return (
            <ScrollView style={styles.container}>
                <FadeIn>
                    <Image source={this.state.image} style={{width: width, height: 250}}/>
                </FadeIn>
                <View style={{flex:1, justifyContent:'flex-start', alignItems:'center', margin:20}}>
                    <Text style={{fontWeight:'bold', fontSize:20}}>Tips</Text>
                    <Text style={{fontSize:18}}>{this.state.instructions}</Text>
                    <Text style={{margin:10, fontSize:24}}> 
                        <Text style={{fontWeight:'bold', color:'green'}}>{this.state.pointsToGain} </Text> 
                        Points
                    </Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={this.donePressed}>
                    <Text style={{color:'white', fontSize:25}}>Done</Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    button: {
        justifyContent:'center',
        alignItems:'center',
        padding:15,
        margin:10,
        borderRadius:30,
        backgroundColor:'dodgerblue'
    }
});
