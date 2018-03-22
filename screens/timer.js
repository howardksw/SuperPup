import React, { Component } from 'react';
import { Text, Button, StyleSheet, View, AsyncStorage, Dimensions, TouchableOpacity} from 'react-native';
import addToAsync from '../modules/addToAsync';

const {width, height} = Dimensions.get('window');

class Timer extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: <Text style={{color:'white', fontWeight:'bold', fontSize:23}}>Walk</Text>,
        headerStyle: {
            backgroundColor: '#0099f7',
        },
        headerTintColor: 'white'
      })

	constructor(props) {
  		super(props);
  	
  		this.state = {on: false, time: 0, points:0};
  		this.timerId = 0;
  	}
    
    componentWillMount() {
    }
    
    componentWillUnmount() {
    	this.clearTimer();
    }
    
    update() {
    	// update timer
        this.setState({time: this.state.time += 1});
        
        if (this.state.time % 10 === 0) {
            this.setState({points: this.state.points += 1})
        }
    }
    
    startTimer() {
    	// start timer
    	this.setState({on: true});
    	this.timerId = setInterval(() => {
    		this.update();
    		}, 1000);
    }
    
    pauseTimer() {
    	// pause timer
    	this.setState({on: false});
    	this.clearTimer();
    }
    
    clearTimer() {
    	clearInterval(this.timerId);
    }
    
    formatTime(time) {
    	// format time to mm:ss	
    	const secs = Math.floor(time);
    	const s = secs % 60;
    	const m = Math.floor(secs / 60) % 60;
    	
    	const ss = s < 10 ? "0" + s : s;
    	const mm = m < 10 ? "0" + m : m;
    	
    	return mm + ":" + ss;
    }
    
    onButtonPress() {
    	this.state.on ? this.pauseTimer() : this.startTimer();
    }

    onStopPress() {
        if (this.state.on) {
            this.pauseTimer();
        }
    }
    
    onResetPress() {
        this.setState({time: 0});
        this.state.points = 0;
    }

    onSubmitPress = () => {
        AsyncStorage.setItem('Walk-checked', new Date().getTime().toString());
        addToAsync('Walk', this.state.points, () => this.props.navigation.state.params.showModal('Walk', this.state.points))
        addToAsync('POINTS', this.state.points, this.props.navigation.state.params.updateHeader)
        addToAsync('WalkReps', 1, () => console.log('walk reps callback'))
        this.props.navigation.state.params.updateMissions()
        this.props.navigation.goBack()
    }
    
    render() {
    	const title = this.state.on ? "Pause" : "Start";
        const time = this.formatTime(this.state.time);
        const points = this.state.points;
    	
        return (
            <View style={styles.container}>
                <Text style={styles.timer}>{time}</Text>
                <View style={styles.secondContainer}> 
                    <TouchableOpacity style={[styles.button, {width:width*0.45}]} onPress={this.onButtonPress.bind(this)}>
                                <Text style={{color:'white', fontSize:25}}>{title}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, {width:width*0.45}]} onPress={this.onResetPress.bind(this)}>
                                <Text style={{color:'white', fontSize:25}}>Reset</Text>
                    </TouchableOpacity> 
                </View>
                <View style={styles.secondContainer}>
                    <TouchableOpacity style={styles.button} onPress={this.onSubmitPress}>
                                <Text style={{color:'white', fontSize:25}}>Submit for Points!</Text>
                    </TouchableOpacity> 
                </View>
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontSize:30}}><Text style={{color:'green', fontWeight:'bold'}}>{points}</Text> Points Earned</Text>
                </View>
            </View>
        );
    }
}

export default Timer;

const styles = StyleSheet.create({
    container: {
		
    },
    timer: {
    	fontSize: 80,
    	fontWeight: 'bold',
    	textAlign: 'center',
    },
    secondContainer: {
    	justifyContent: "center",
        flexDirection: 'row',
        marginBottom:30
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
