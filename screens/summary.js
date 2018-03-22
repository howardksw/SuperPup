import React, {Component} from 'react'
import {View, Image, Text, AppRegistry, StyleSheet, TextInput, Dimensions, AsyncStorage, TouchableOpacity, ScrollView} from 'react-native'
import EditableImage from '../components/editableImage'
import NavigationBar from 'react-native-navbar'

const {width, height} = Dimensions.get('window');
const currentMissions = [
    ['Sit',  5, 0],
    ['Stay', 10, 5],
    ['Down', 15, 10],
    ['Come', 15, 50],
    ['Heel', 20, 100],
    ['Paw', 20, 200],
    ['Fetch', 30, 300],
    ['Leave It', 30, 400],
    ['High Five', 50, 500],
    ['Play Dead', 50, 750]
];

export default class Summary extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: <Text style={{color:'white', fontWeight:'bold', fontSize:23}}>Summary</Text>,
        headerStyle: {
            backgroundColor: '#0099f7',
        },
        headerTintColor: 'white'
    })

   
    constructor(props) {
        super(props);
        this.state = { text: 'Type Dog Name Here', points: 0, walks: 0, baths: 0, nails: 0, food: 0, groomings: 0, teeth: 0, 
        sitCheck: false,
        stayCheck: false,
        downCheck: false,
        comeCheck: false,
        heelCheck: false,
        pawCheck: false,
        fetchCheck: false,
        leaveItCheck: false,
        highFiveCheck: false,
        playDeadCheck: false };
    }

	componentDidMount() {
        this.getNumBaths();
        this.getNumWalks();
        this.getNumGroomings();
        this.getNumNails();
        this.getNumTeeth();
        this.getNumFood();
        this.getPoints();
        
        AsyncStorage.getItem("NAME").then((value) => {
			name = (value == undefined)? 'Type Dog Name Here': value;
            this.setState({text: name});
            this.getChecks();
		}).done();
    }
    
    getChecks = () => {
        AsyncStorage.getItem('Sit-checked').then((value) => {
            let sitCheck = (value === null)? false:value;
            this.setState({sitCheck});
        });
        AsyncStorage.getItem('Stay-checked').then((value) => {
            let stayCheck = (value === null)? false:value;
            this.setState({stayCheck});
        });
        AsyncStorage.getItem('Down-checked').then((value) => {
            let downCheck = (value === null)? false:value;
            this.setState({downCheck});
        });
        AsyncStorage.getItem('Come-checked').then((value) => {
            let comeCheck = (value === null)? false:value;
            this.setState({comeCheck});
        });
        AsyncStorage.getItem('Heel-checked').then((value) => {
            let heelCheck = (value === null)? false:value;
            this.setState({heelCheck});
        });
        AsyncStorage.getItem('Paw-checked').then((value) => {
            let pawCheck = (value === null)? false:value;
            this.setState({pawCheck});
        });
        AsyncStorage.getItem('Fetch-checked').then((value) => {
            let fetchCheck = (value === null)? false:value;
            this.setState({fetchCheck});
        });
        AsyncStorage.getItem('Leave It-checked').then((value) => {
            let leaveItCheck = (value === null)? false:value;
            this.setState({leaveItCheck});
        });
        AsyncStorage.getItem('High Five-checked').then((value) => {
            let highFiveCheck = (value === null)? false:value;
            this.setState({highFiveCheck});
        });
        AsyncStorage.getItem('Play Dead-checked').then((value) => {
            let playDeadCheck = (value === null)? false:value;
            this.setState({playDeadCheck});
        });
    }

	
    render() {
        var inProgressMissions = [];
        var lastMission = null;
        var completedMissionsIndices = [];
        var completedMissions = [];
        var lastCompleted = null;

        if (this.state.comeCheck === 'true') {
            completedMissions.push(
                <Text key = 'Come'>Come, </Text>
            );
            lastCompleted = 'Come';
        } else if (50 <= this.state.points) {
            inProgressMissions.push(
                <Text key = 'Come'>Come, </Text>
            );
            lastMission = 'Come';
        }

        if (this.state.downCheck === 'true') {
            completedMissions.push(
                <Text key = 'Down'>Down, </Text>
            );
            lastCompleted = 'Down';
        } else if (10 <= this.state.points) {
            inProgressMissions.push(
                <Text key = 'Down'>Down, </Text>
            );
            lastMission = 'Down';
        }

        if (this.state.fetchCheck === 'true') {
            completedMissions.push(
                <Text key = 'Fetch'>Fetch, </Text>
            );
            lastCompleted = 'Fetch';
        } else if (300 <= this.state.points) {
            inProgressMissions.push(
                <Text key = 'Fetch'>Fetch, </Text>
            );
            lastMission = 'Fetch';
        }

        if (this.state.heelCheck === 'true') {
            completedMissions.push(
                <Text key = 'Heel'>Heel, </Text>
            );
            lastCompleted = 'Heel';
        } else if (100 <= this.state.points) {
            inProgressMissions.push(
                <Text key = 'Heel'>Heel, </Text>
            );
            lastMission = 'Heel';
        }

        if (this.state.highFiveCheck === 'true') {
            completedMissions.push(
                <Text key = 'High Five'>High Five, </Text>
            );
            lastCompleted = 'High Five';
        } else if (500 <= this.state.points) {
            inProgressMissions.push(
                <Text key = 'High Five'>High Five, </Text>
            );
            lastMission = 'High Five';
        }

        if (this.state.leaveItCheck === 'true') {
            completedMissions.push(
                <Text key = 'Leave It'>Leave It, </Text>
            );
            lastCompleted = 'Leave It';
        } else if (400 <= this.state.points) {
            inProgressMissions.push(
                <Text key = 'Leave It'>Leave It, </Text>
            );
            lastMission = 'Leave It';
        }

        if (this.state.pawCheck === 'true') {
            completedMissions.push(
                <Text key = 'Paw'>Paw, </Text>
            );
            lastCompleted = 'Paw';
        } else if (200 <= this.state.points) {
            inProgressMissions.push(
                <Text key = 'Paw'>Paw, </Text>
            );
            lastMission = 'Paw';
        }

        if (this.state.playDeadCheck === 'true') {
            completedMissions.push(
                <Text key = 'Play Dead'>Play Dead, </Text>
            );
            lastCompleted = 'Play Dead';
        } else if (750 <= this.state.points) {
            inProgressMissions.push(
                <Text key = 'Play Dead'>Play Dead, </Text>
            );
            lastMission = 'Play Dead';
        }

        if (this.state.sitCheck === 'true') {
            completedMissions.push(
                <Text key = 'Sit'>Sit, </Text>
            );
            lastCompleted = 'Sit';
        } else if (0 <= this.state.points) {
            inProgressMissions.push(
                <Text key = 'Sit'>Sit, </Text>
            );
            lastMission = 'Sit';
        }

        if (this.state.stayCheck === 'true') {
            completedMissions.push(
                <Text key = 'Stay'>Stay, </Text>
            );
            lastCompleted = 'Stay';
        } else if (5 <= this.state.points) {
            inProgressMissions.push(
                <Text key = 'Stay'>Stay, </Text>
            );
            lastMission = 'Stay';
        }

        if (lastCompleted != null) {
            completedMissions.pop();
            if (lastCompleted == 'Come') {
                completedMissions.push(
                    <Text key = 'Come'>Come</Text>
                );
            } else if (lastCompleted == 'Down') {
                completedMissions.push(
                    <Text key = 'Down'>Down</Text>
                );
            } else if (lastCompleted == 'Fetch') {
                completedMissions.push(
                    <Text key = 'Fetch'>Fetch</Text>
                );
            } else if (lastCompleted == 'Heel') {
                completedMissions.push(
                    <Text key = 'Heel'>Heel</Text>
                );
            } else if (lastCompleted == 'High Five') {
                completedMissions.push(
                    <Text key = 'High Five'>High Five</Text>
                );
            } else if (lastCompleted == 'Leave It') {
                completedMissions.push(
                    <Text key = 'Leave It'>Leave It</Text>
                );
            } else if (lastCompleted == 'Paw') {
                completedMissions.push(
                    <Text key = 'Paw'>Paw</Text>
                );
            } else if (lastCompleted == 'Play Dead') {
                completedMissions.push(
                    <Text key = 'Play Dead'>Play Dead</Text>
                );
            } else if (lastCompleted == 'Sit') {
                completedMissions.push(
                    <Text key = 'Sit'>Sit</Text>
                );
            } else if (lastCompleted == 'Stay') {
                completedMissions.push(
                    <Text key = 'Stay'>Stay</Text>
                );
            }
        }

        if (lastMission != null) {
            inProgressMissions.pop();
            if (lastMission == 'Come') {
                inProgressMissions.push(
                    <Text key = 'Come'>Come</Text>
                );
            } else if (lastMission == 'Down') {
                inProgressMissions.push(
                    <Text key = 'Down'>Down</Text>
                );
            } else if (lastMission == 'Fetch') {
                inProgressMissions.push(
                    <Text key = 'Fetch'>Fetch</Text>
                );
            } else if (lastMission == 'Heel') {
                inProgressMissions.push(
                    <Text key = 'Heel'>Heel</Text>
                );
            } else if (lastMission == 'High Five') {
                inProgressMissions.push(
                    <Text key = 'High Five'>High Five</Text>
                );
            } else if (lastMission == 'Leave It') {
                inProgressMissions.push(
                    <Text key = 'Leave It'>Leave It</Text>
                );
            } else if (lastMission == 'Paw') {
                inProgressMissions.push(
                    <Text key = 'Paw'>Paw</Text>
                );
            } else if (lastMission == 'Play Dead') {
                inProgressMissions.push(
                    <Text key = 'Play Dead'>Play Dead</Text>
                );
            } else if (lastMission == 'Sit') {
                inProgressMissions.push(
                    <Text key = 'Sit'>Sit</Text>
                );
            } else if (lastMission == 'Stay') {
                inProgressMissions.push(
                    <Text key = 'Stay'>Stay</Text>
                );
            }
        }

        // for (var j = 0; j < currentMissions.length; j++) {
        //     AsyncStorage.getItem(currentMissions[j][0]+'-checked').then((value) => {
        //         if (value == 'true') {
        //             completedMissionsIndices.push(j);
        //             completedMissions.push(
        //                 <Text key = {currentMissions[j][0]}>{currentMissions[j][0]}, </Text>
        //             );
        //             lastCompleted = j;
        //         }
        //         if (j == currentMissions.length) {
        //             completedMissions.pop();
        //             completedMissions.push(
        //                 <Text key = {currentMissions[lastComplted][0]}>{currentMissions[lastCompleted][0]}</Text>
        //             );
        //         }
        //     });
        // }

        // for (var i = 0; i < currentMissions.length; i++) {
        //     if (currentMissions[i][2] < this.state.points && !(this.contains(completedMissionsIndices, i))) {
        //         inProgressMissions.push(
        //             <Text key = {currentMissions[i][0]}>{currentMissions[i][0]}, </Text>
        //         );
        //         lastMission = i;
        //     }
        // }
        // if (lastMission >= 0) {
        //     inProgressMissions.pop();
        //     inProgressMissions.push(
        //         <Text key = {currentMissions[lastMission][0]}>{currentMissions[lastMission][0]}</Text>
        //     );
        // }

        

        return (
            <ScrollView style={{flex:1}}>
                
                <View style={{flex:8, justifyContent: 'center', alignItems: 'center', margin:15}}>
                    <EditableImage />
                </View>
                
                <View style={{flex:2, justifyContent: 'center', alignItems: 'center', marginBottom:20}}>
                    
                    <Text style={{fontSize: 3}}> </Text>
                    <TextInput
                        style={{height: 40, width: width * .7, borderColor: 'gray', borderWidth: 1, textAlign: 'center', backgroundColor: 'aliceblue'}}
                        onChangeText={(text) => this.saveData(text)}
                        value={this.state.text}
                    />
                </View>
                
                <View style={{flex:10, justifyContent: 'center', alignItems:'center'}}>
                
                    <View style={{flex:2, justifyContent: 'center'}}>
                        <Text style={{fontSize: 18, textAlign: 'center'}}>So far, you've earned
                            <Text style={{fontWeight: 'bold', color: 'green'}}> {this.state.points} points!</Text>
                        </Text>
                    </View>
                
                    <View style={{flex:1, marginBottom: 10}}>
                        <Text style={{color:'gray'}}>_____________________________</Text>
                    </View>
                
                    <View style={{flex:2, flexDirection: 'row', justifyContent: 'center', alignItems:'center'}}>
                
                        <View style={{width:width*0.4, flexDirection: 'column', alignItems: 'flex-start', marginLeft:width*0.1}}>
                            <Text style={styles.labelAnytime}>
                                <Text style={styles.numAnytime}>{this.state.walks}</Text>
                                {" "}Walks
                            </Text>
                
                            <Text style={styles.labelAnytime}>
                                <Text style={styles.numAnytime}>{this.state.food}</Text>
                                {" "}Feedings
                            </Text>

                            <Text style={styles.labelAnytime}>
                                <Text style={styles.numAnytime}>{this.state.teeth}</Text>
                                {" "}Tooth Brushings
                            </Text>
                        </View>
                
                        <View style={{width:width*0.4, flexDirection: 'column', alignItems: 'flex-start', marginLeft:width*0.1}}>
                            <Text style={styles.labelAnytime}>
                                <Text style={styles.numAnytime}>{this.state.baths}</Text>
                                {" "}Baths
                            </Text>
                
                            <Text style={styles.labelAnytime}>
                                <Text style={styles.numAnytime}>{this.state.groomings}</Text>
                                {" "}Groomings
                            </Text>
                
                            <Text style={styles.labelAnytime}>
                                <Text style={styles.numAnytime}>{this.state.nails}</Text>
                                {" "}Nail Trimmings
                            </Text>
                        </View>
                    </View>
                
                    <View style={{flex:1, marginBottom: 10}}>
                        <Text style={{color:'gray'}}>_____________________________</Text>
                    </View>
                </View>
                
                <View style={{flex:2, marginBottom:5}}>
                    <Text style={{fontSize:18, textAlign: 'left', marginLeft: 15}}>
                        <Text style={{fontWeight: 'bold'}}>In Progress: </Text>
                        { inProgressMissions }
                        </Text>
                </View>
                
                <View style={{flex:2}}>
                    <Text style={{fontSize: 18, textAlign: 'left', marginLeft: 15}}>
                    <Text style={{fontWeight: 'bold'}}>Completed: </Text>
                    { completedMissions }
                    </Text>
                </View>
                
            </ScrollView>
        )
    }
    
    saveData(value) {
    	AsyncStorage.setItem("NAME", value);
    	this.setState({text: value});
    }

    getPoints = () => {
        var points = 0;
        AsyncStorage.getItem('POINTS').then((value) => {
            points = (value === null)? 0:value;
            this.setState({points});
        });
    }

    getNumBaths = () => {
        var bathsNum = 0;
        AsyncStorage.getItem('Bath').then((value) => {
            bathsNum = (value === null)? 0:value;
            this.setState({baths: bathsNum});
        });
        
    }    

    getNumNails = () => {
        var nailsNum = 0;
        AsyncStorage.getItem('Nails').then((value) => {
            nailsNum = (value === null)? 0:value;
            this.setState({nails: nailsNum});
        });
        
    }   

    getNumFood = () => {
        var foodNum = 0;
        AsyncStorage.getItem('Food').then((value) => {
            foodNum = (value === null)? 0:value;
            this.setState({food: foodNum});
        });
    }   
    

    getNumGroomings = () => {
        var groomingsNum = 0;
        AsyncStorage.getItem('Grooming').then((value) => {
            groomingsNum = (value === null)? 0:value;
            this.setState({groomings: groomingsNum});
        });
        
    }   

    getNumTeeth = () => {
        var teethNum = 0;
        AsyncStorage.getItem('Teeth').then((value) => {
            teethNum = (value === null)? 0:value;
            this.setState({teeth: teethNum});
        });
        
    }   

    getNumWalks = () => {
        var walksNum = 0;
        AsyncStorage.getItem('WalkReps').then((value) => {
            walksNum = (value === null)? 0:value;
            this.setState({walks: walksNum});
        });
        
    }

    contains(arr, element) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == element) {
                return true;
            }
        }
        return false;
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
}

const styles = StyleSheet.create({
    numAnytime: {
        fontWeight: 'bold',
        fontSize:16
    },
    labelAnytime: {
        fontSize:16
    }
})
