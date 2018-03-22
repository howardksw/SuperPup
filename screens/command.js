import React, { Component } from 'react';
import { Text, Button, StyleSheet, View, Dimensions, AsyncStorage, Image, ScrollView, Modal, TouchableOpacity} from 'react-native';
import addToAsync from '../modules/addToAsync'
import CommandData from '../data/commandData'
import ProgressBar from 'react-native-progress/Bar'
import { FontAwesome } from '@expo/vector-icons'
import NavigationBar from 'react-native-navbar'
import * as Animatable from 'react-native-animatable';
import FadeIn from 'react-native-fade-in-image';

const {width, height} = Dimensions.get('window');

export default class Command extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: null,
//        title: <Text style={{color:'white'}}>{navigation.state.params.data[0]}</Text>,
//        headerStyle: {
//            backgroundColor: '#0099f7',
//        },
//        headerTintColor: 'white',
    })
    
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.navigation.state.params.data[0],
            pointsToGain: this.props.navigation.state.params.data[1],
            instructions: CommandData[this.props.navigation.state.params.data[0]].instructions,
            image: CommandData[this.props.navigation.state.params.data[0]].image,
            repetition: 0,
            upperBound: 10,
            totalPoints: 0,
            checked: 'false',
            modalVisible: false
        }
    }
    
    componentDidMount() {
        this.getUpperBound()
        this.getRepetition()
        this.getChecked()
    }

    getChecked() {
        var checked;
        AsyncStorage.getItem(this.state.title+'-checked').then((value) => {
            checked = (value == undefined? 'false' : value)
        }).then(() => {
            this.setState({checked})
        });
    }
    
    getRepetition() {
        var repeat, total;
        AsyncStorage.getItem(this.state.title).then((value) => {
            repeat = parseInt((value == undefined? "0" : value))
            total = repeat * this.state.pointsToGain
        }).then(() => {
            this.setState({repetition: repeat, totalPoints: total})
        });
    }
    
    setRepetition(repeat) {
        AsyncStorage.setItem(this.state.title, repeat.toString());
        this.setState({repetition: repeat});
    }
    
    donePressed = () => {
        this.setCheck()
        this.props.navigation.state.params.updateMissions()
        this.props.navigation.goBack()
    }

    setCheck = () => {
        const newBool = this.state.checked === 'true' ? 'false' : 'true'
        AsyncStorage.setItem(this.state.title+'-checked', newBool);
        this.setState({checked: newBool})
    }
    
    sessionPerformedPressed = () => {
        this.getUpperBound()
        this.setRepetition(this.state.repetition + 1)
    }

    accomplishedPressed = () => {
        this.props.navigation.state.params.updateHeader()
        this.props.navigation.state.params.updateMissions()
        this.props.navigation.goBack()
    }
    
    backPressed = () => {
        this.props.navigation.goBack()
    }
    
    getUpperBound() {
        let ub;
        AsyncStorage.getItem(this.state.title + "U").then((value) => {
            ub = parseInt((value == undefined? "10" : value))
        }).then(() => {
            this.setState({upperBound: ub})
        }).then(() => {
            if (this.state.upperBound == this.state.repetition) {
                upperNew = this.state.upperBound + 10
                this.setState({upperBound: upperNew})
                AsyncStorage.setItem(this.state.title + "U", upperNew.toString())
                this.awardPoints()
            }
        })
    }

    awardPoints() {
        addToAsync('POINTS', 10, this.props.navigation.state.params.updateHeader)
        this.setState({modalVisible: true})
    }
    
    addTotalPoints(repeat) {
        let total = repeat * this.state.pointsToGain
        this.setState({totalPoints: total})
    }
    
    render() {
        return (
            <View style={{flex:1}}>
                <NavigationBar
                    style={{backgroundColor:'#0099f7'}}
                    statusBar={{style: 'light-content',tintColor:'#0099f7'}}
                    title={ <View style={{flex: 1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                        <Text style={{color:'white', fontWeight:'bold', fontSize:23}}>{this.props.navigation.state.params.data[0]}</Text>
                            </View>
                            }

                    rightButton={
                        <TouchableOpacity onPress={this.donePressed} style={{margin:5}}>
                            {this.state.checked === 'true' ? 
                                <FontAwesome
                                    name={'check-circle'}
                                    size={30}
                                    color={'green'}
                                /> : 
                                <FontAwesome
                                    name={'check-circle-o'}
                                    size={30}
                                    color={'white'}
                                />
                            }
                        </TouchableOpacity>}
                
                    leftButton={
                    <TouchableOpacity onPress={this.backPressed} style={{marginLeft:8, marginTop:4}}>
                        <FontAwesome
                                name={'angle-left'}
                                size={35}
                                color={'white'}
                            />
                    </TouchableOpacity>}
                />
            
                <ScrollView style={styles.container}>
                    <FadeIn>
                        <Image source={this.state.image} style={{width: width, height: 250}}/>
                    </FadeIn>
                    <View style={{flex:1, justifyContent:'flex-start', alignItems:'center', margin:20}}>
                        <Text style={{fontWeight:'bold', fontSize:25}}>Instructions</Text>
                        <Text style={{fontSize:20}}>{this.state.instructions}</Text>
                    </View>
                
                    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                        <Text style={{fontSize:16}}>Repetition: {this.state.repetition}/{this.state.upperBound}</Text>
                        <ProgressBar progress={this.state.repetition/this.state.upperBound} width={200} />
                        <TouchableOpacity style={styles.button} onPress={this.sessionPerformedPressed}>
                            <Text style={{color:'white', fontSize:25}}>All Steps Completed</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}
                    style={{flex:1, justifyContent:'center', alignItems:'center'}}
                >
                    <View style={styles.modal}>
                        <View style={{flex:1, alignItems:'center', justifyContent:'space-around'}}>
                            <Animatable.Text animation="tada" style={{fontWeight:'bold', fontSize:40}}>Super!</Animatable.Text>
                            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                                <Animatable.Text animation="bounceIn" style={{fontWeight:'bold', color:'green', fontSize:40}}>+10</Animatable.Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => {this.setState({modalVisible:false})}}>
                            <View style={styles.modalButton}>
                                <Text style={{fontSize:20}}>Back to Training</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    image: {
        height:200,
        width:200
    },
    modal: {
        flex:1,
        marginTop:width*0.6,
        marginBottom:width*0.6,
        marginLeft:width*0.1,
        marginRight:width*0.1,
        paddingTop:10,
        backgroundColor: 'white',
        borderColor:'lightgrey',
        borderWidth:1,
        borderRadius:20,
        overflow:'hidden'
    },
    modalButton: {
        justifyContent:'center',
        alignItems:'center',
        padding:15,
        margin:10,
        borderRadius:30,
        backgroundColor:'lightgrey'
    },
    button: {
        justifyContent:'center',
        alignItems:'center',
        padding:15,
        margin:10,
        borderRadius:30,
        width:width*0.95,
        backgroundColor:'dodgerblue'
    }
});
