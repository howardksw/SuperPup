import React, {Component} from 'react';
import {View, TouchableOpacity, ListView, StyleSheet, ActivityIndicator, Text, Dimensions, AsyncStorage, Modal} from 'react-native';
import NavigationBar from 'react-native-navbar';
import { FontAwesome, Foundation, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import {Font} from 'expo'
import MyText from '../components/myText'

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

const monthlyMissions = [
    ['Bath', 20],
    ['Nails', 20],
    ['Grooming', 20],
]

const dailyMissions = [
    ['Walk', '?'],
    ['Food', 5],
    ['Teeth', 5],
]

export default class Missions extends Component {
    static navigationOptions = {
        header: null,
    }
    
    constructor() {
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

		this.state = {
            dailyDataSource: ds.cloneWithRows(dailyMissions),
            monthlyDataSource: ds.cloneWithRows(monthlyMissions),
            currentDataSource: ds.cloneWithRows(currentMissions),
            points: 0,
            updateMissions: false,
            modalVisible: false,
            modalIcon:'Bath',
            modalPoints:50,

            sitCheck: false,
            stayCheck: false,
            downCheck: false,
            comeCheck: false,
            heelCheck: false,
            pawCheck: false,
            fetchCheck: false,
            leaveItCheck: false,
            highFiveCheck: false,
            playDeadCheck: false,

            walkCheck: false,
            foodCheck: false,
            teethCheck: false,
            bathCheck: false,
            nailsCheck: false,
            groomingCheck:false
    	}
    }

    componentWillMount() {
        // this.resetAsync() //use to reset asyncstorage
        this.getPoints()
        this.getChecks()
        this.loadFont()
    }

    resetAsync() {
        AsyncStorage.multiRemove([
                        'Walk-checked', 'Food-checked', 'Teeth-checked', 'Bath-checked', 'Nails-checked', 'Grooming-checked',
                        'POINTS', 'IMAGE', 'NAME', 
                        'SitU', 'StayU', 'DownU', 'ComeU', 'HeelU', 'PawU', 'FetchU', 'Leave ItU', 'High FiveU', 'Play DeadU',
                        'Sit-checked', 'Stay-checked', 'Down-checked', 'Come-checked', 'Heel-checked', 'Paw-checked', 'Fetch-checked', 'Leave It-checked', 'High Five-checked', 'Play Dead-checked',
                        'Sit', 'Stay', 'Down', 'Come', 'Heel', 'Paw', 'Fetch', 'Leave It', 'High Five', 'Play Dead',
                        'WalkReps', 'Walk', 'Food', 'Teeth', 'Bath', 'Nails', 'Grooming'
                    ], ()=>console.log('removed'))

    }

    async loadFont() {
        await Font.loadAsync({
          'LondrinaSolid-Regular': require('../assets/LondrinaSolid-Regular.ttf'),
        });
  
        this.setState({ loaded: true });
      }
    
    getPoints = () => {
        var points = 0;
        AsyncStorage.getItem('POINTS').then((value) => {
            points = (value === null)? 0:value;
            this.setState({points});
        });
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

        AsyncStorage.getItem('Walk-checked').then((value) => {
            let lastWalk = (value === null)? 0:value;
            if (new Date().getTime() - Number.parseInt(lastWalk) < 86400000) {
                this.setState({walkCheck: 'true'});
            } else {
                this.setState({walkCheck: 'false'});
            }
        });
        AsyncStorage.getItem('Food-checked').then((value) => {
            let lastFood = (value === null)? 0:value;
            if (new Date().getTime() - Number.parseInt(lastFood) < 86400000) {
                this.setState({foodCheck: 'true'});
            } else {
                this.setState({foodCheck: 'false'});
            }
        });
        AsyncStorage.getItem('Teeth-checked').then((value) => {
            let lastTeeth = (value === null)? 0:value;
            console.log(new Date().getTime() - Number.parseInt(lastTeeth))
            if (new Date().getTime() - Number.parseInt(lastTeeth) < 86400000) {
                this.setState({teethCheck: 'true'});
            } else {
                this.setState({teethCheck: 'false'});
            }
        });
        AsyncStorage.getItem('Bath-checked').then((value) => {
            let lastBath = (value === null)? 0:value;
            if (new Date().getTime() - Number.parseInt(lastBath) < 2628000000) {
                this.setState({bathCheck: 'true'});
            } else {
                this.setState({bathCheck: 'false'});
            }
        });
        AsyncStorage.getItem('Nails-checked').then((value) => {
            let lastNails = (value === null)? 0:value;
            if (new Date().getTime() - Number.parseInt(lastNails) < 2628000000) {
                this.setState({nailsCheck: 'true'});
            } else {
                this.setState({nailsCheck: 'false'});
            }
        });
        AsyncStorage.getItem('Grooming-checked').then((value) => {
            let lastGrooming = (value === null)? 0:value;
            if (new Date().getTime() - Number.parseInt(lastGrooming) < 2628000000) {
                this.setState({groomingCheck: 'true'});
            } else {
                this.setState({groomingCheck: 'false'});
            }
        });
    }
		
    goToAnytime = (data) => {

        if (data[0] == 'Walk') {
            this.props.navigation.navigate('Timer', {
                updateHeader:this.getPoints,
                updateMissions:this.updateMissions,
                showModal:this.showModal
            });
            console.log("clicked " + data); 
        } else {
            this.props.navigation.navigate('Anytime', {
                updateHeader:this.getPoints,
                data: data,
                updateMissions:this.updateMissions,
                showModal:this.showModal
            });
            console.log("clicked " + data); 
        }
    }

    showModal = (title, pointsToGain) => {
        AsyncStorage.getItem(title).then((value) => {
            let count = (value === null)? 0:value;
            this.setState({modalCount: count, modalIcon: title, modalVisible: true, modalPoints:pointsToGain});
        });
    }

    updateMissions = () => {
        this.getChecks()
        this.setState({
            dailyDataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }).cloneWithRows(dailyMissions),
            monthlyDataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }).cloneWithRows(monthlyMissions),
            currentDataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }).cloneWithRows(currentMissions)
        })
    }

    locked = (data) => {
        //data[2] holds points needed to unlock the mission
        return this.state.points < data[2]
    }
    
    goToCommand = (data) => {
        this.props.navigation.navigate('Command', {
            updateHeader:this.getPoints,
            data: data,
            updateMissions:this.updateMissions
        });
        console.log("clicked " + data);
    }
    
    renderRow = (data) => {
        if (this.locked(data)) {
            return (
                <View style={{backgroundColor:'lightgrey', height:60, padding:7, borderColor:'grey',borderWidth:1, alignItems:'center', justifyContent:'space-between', flexDirection:'row'}}>
                    <FontAwesome
                            name={'lock'}
                            size={30}
                            color={'black'}
                        />
                    <Text style={{fontSize:18}}>{data[0]}</Text>
                    <Text style={{fontSize:18}}>Unlocked at: {data[2]}</Text>
                </View>
            ) 
        }

        return (
            <TouchableOpacity onPress={() => this.goToCommand(data)}>
                <View style={{backgroundColor:'white', padding:7, height:60, borderColor:'grey',borderWidth:1, justifyContent:'space-between', alignItems:'center', flexDirection:'row'}}>
                    <Text style={{fontSize:18}}>{data[0]}</Text>
                    {this.checked(data) === 'true' ? <FontAwesome
                                            name={'check-circle'}
                                            size={30}
                                            color={'green'}
                                        /> : null
                    }
                </View>
            </TouchableOpacity>
        )
    }

    checked = (data) => {
        if (data[0] === 'Sit') {
            return this.state.sitCheck
        }
        if (data[0] === 'Stay') {
            return this.state.stayCheck
        }
        if (data[0] === 'Down') {
            return this.state.downCheck
        }
        if (data[0] === 'Come') {
            return this.state.comeCheck
        }
        if (data[0] === 'Heel') {
            return this.state.heelCheck
        }
        if (data[0] === 'Paw') {
            return this.state.pawCheck
        }
        if (data[0] === 'Fetch') {
            return this.state.fetchCheck
        }
        if (data[0] === 'Leave It') {
            return this.state.leaveItCheck
        }
        if (data[0] === 'High Five') {
            return this.state.highFiveCheck
        }
        if (data[0] === 'Play Dead') {
            return this.state.playDeadCheck
        }

        if (data[0] === 'Walk') {
            return this.state.walkCheck
        }
        if (data[0] === 'Food') {
            return this.state.foodCheck
        }
        if (data[0] === 'Teeth') {
            return this.state.teethCheck
        }
        if (data[0] === 'Bath') {
            return this.state.bathCheck
        }
        if (data[0] === 'Nails') {
            return this.state.nailsCheck
        }
        if (data[0] === 'Grooming') {
            return this.state.groomingCheck
        }
        return false
    }

    renderGridItem = (rowData) => {
        const icon = this.getIcon(rowData, 32, 'red')
    
        if (this.checked(rowData) === 'true') {
            return (
                <View style={{justifyContent:'center', alignItems:'center', height:width*0.2, width:width*0.2, margin:width*0.05}}>
                    <View style={{height:width*0.15, width:width*0.15, justifyContent:'center', alignItems:'center', backgroundColor:'#f5fd7c', borderRadius:10, borderWidth:2, borderColor:'red'}}>
                        <View style={{position:'absolute'}}>
                            <FontAwesome
                                name={'check-circle'}
                                size={30}
                                color={'green'}
                            />
                        </View>
                    </View>
                    <Text style={{fontSize:14, marginTop:3, textAlign:'center'}}><Text style={{fontWeight:'bold'}}>{rowData[0]}</Text>{'\n'}(+{rowData[1]})</Text>
                </View>
            )
        }

        return (
            <TouchableOpacity onPress={() => this.goToAnytime(rowData)}>
                <View style={{justifyContent:'center', alignItems:'center', height:width*0.2, width:width*0.2, margin:width*0.05}}>
                    <View style={{height:width*0.15, width:width*0.15, justifyContent:'center', alignItems:'center', backgroundColor:'#f5fd7c', borderRadius:10, borderWidth:2, borderColor:'red'}}>
                        {icon}
                    </View>
                    <Text style={{fontSize:14, marginTop:3, textAlign:'center'}}><Text style={{fontWeight:'bold'}}>{rowData[0]}</Text>{'\n'}(+{rowData[1]})</Text>
                </View>
            </TouchableOpacity>
        )
    }

    getIcon = (rowData, size, color) => {
        // only six and use different icon packages, so just used conditionals..
        if (rowData[0] === 'Walk') {
            return (<Foundation
                name={'guide-dog'}
                size={size}
                color={color}
            />)
        } else if (rowData[0] === 'Bath') {
            return (<FontAwesome
                name={'bath'}
                size={size}
                color={color}
            />)
        } else if (rowData[0] === 'Nails') {
            return (<Entypo
                name={'scissors'}
                size={size}
                color={color}
            />)
        } else if (rowData[0] === 'Food') {
            return (<MaterialCommunityIcons
                name={'bone'}
                size={size}
                color={color}
            />)
        } else if (rowData[0] === 'Grooming') {
            return (<FontAwesome
                name={'paw'}
                size={size}
                color={color}
            />)
        }

        return (<Entypo
                    name={'drop'}
                    size={size-6}
                    color={color}
                />)
    }

    goToSummary = () => {
        this.props.navigation.navigate('Summary')
    }
    
    render() {
        if (!this.state.loaded) {
            return (<View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                      <ActivityIndicator />
                    </View>)
        }

        return (
            <View style={{flex:1}}>
                <NavigationBar 
                    style={{backgroundColor:'#0099f7'}}
                    statusBar={{style: 'light-content',tintColor:'#0099f7'}}
                    title={ <View style={{flex: 1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                <MyText style={{color:'white', fontWeight:'bold', fontSize:30}}>SuperPup</MyText>
                            </View>
                            }
                    rightButton={<TouchableOpacity onPress={this.goToSummary}>
                                    <View style={{flexDirection:'row', margin:5, padding:5, alignItems:'center', backgroundColor:'white', borderRadius:15, overflow:'hidden'}}>
                                        <Text style={{color:'#0099f7', fontWeight:'bold', marginRight:5, fontSize:16}}>{this.state.points}</Text>
                                        <FontAwesome
                                            name={'user'}
                                            size={24}
                                            color={'#0099f7'}
                                        />
                                    </View>
                                </TouchableOpacity>}
                />
                <Text style={styles.sectionTitle}>Daily Missions</Text>
                <View style={styles.anytimeContainer}>
                    <ListView 
                        contentContainerStyle={styles.grid}
                        dataSource={this.state.dailyDataSource}
                        renderRow={this.renderGridItem} 
                        scrollEnabled={false}
                    />
                </View>
                <Text style={styles.sectionTitle}>Monthly Missions</Text>
                <View style={styles.anytimeContainer}>
                    <ListView 
                        contentContainerStyle={styles.grid}
                        dataSource={this.state.monthlyDataSource}
                        renderRow={this.renderGridItem} 
                        scrollEnabled={false}
                    />
                </View>
                <View style={styles.currentContainer}>
                    <Text style={styles.sectionTitle}>My Tricks</Text>
                    <ListView 
                        key={this.state.updateMissions}
                        style={{flex:1}}
                        dataSource={this.state.currentDataSource}
                        renderRow={this.renderRow} 
                    />
                </View>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}
                    style={{flex:1, justifyContent:'center', alignItems:'center'}}
                >
                    <View style={styles.modal}>
                        <View style={{flex:1, alignItems:'center', justifyContent:'space-around'}}>
                            <Animatable.Text animation="tada" style={{fontWeight:'bold', fontSize:40}}>Pawsome!</Animatable.Text>
                            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                                <Animatable.Text animation="bounceIn" style={{fontWeight:'bold', color:'green', fontSize:40}}>+{this.state.modalPoints}</Animatable.Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                {this.getIcon([this.state.modalIcon], 50, '#0099f7')}
                                <Text style={{fontWeight:'bold', fontSize:30, marginLeft:4}}>{this.state.modalCount}</Text>
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
        )
    }
}

const styles = StyleSheet.create({
    anytimeContainer: {
        width:width,
        height:height*0.2,
        alignItems:'center',
        justifyContent:'center',
    },
    currentContainer: {
        width:width,
        height:height*0.4
    },
    grid: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    sectionTitle: {
        fontWeight:'bold', 
        margin:4,
        fontSize:20
    },
    modal: {
        flex:1,
        marginTop:width*0.5,
        marginBottom:width*0.5,
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
    }
});
