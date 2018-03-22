import React, {Component} from 'react'
import {View, Image, Text, StyleSheet, Button, TouchableHighlight, Alert, ImageEditor, ImageStore, AsyncStorage} from 'react-native'
import Expo from 'expo'
import { FontAwesome } from '@expo/vector-icons';

export default class EditableImage extends Component {
    constructor() {
        super();
        this.state = {}
        AsyncStorage.getItem("IMAGE").then((value) => {
            image = (value == undefined)?
            'https://www.barkworthies.com/Themes/Barkworthies/Content/images/defult-dog.png': value;
            this.setState({imageUri: image});
        }).done();
//        this.state = {
//            imageUri: 'http://slappedham.com/wp-content/uploads/2014/06/Cute-White-Dog.jpg',
//        }
    }
    
    openCamera = async () => {
        let result = await Expo.ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4,3],
            quality: 1,
        });

        if (!result.cancelled) {
            this.setState({imageUri:result.uri})
            AsyncStorage.setItem("IMAGE", result.uri);

        }
        
    }

    pickFromCameraRoll = async () => {
        let result = await Expo.ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4,3],
            quality: 1,
        });

        if (!result.cancelled) {
            this.setState({imageUri:result.uri})
            AsyncStorage.setItem("IMAGE", result.uri);

        }
    }

    openImagePicker = () => {
        Alert.alert(
            'Choose a Photo',
            'Make it a good one!',
            [
                {text: 'Camera', onPress: () => this.openCamera()},
                {text: 'Photo Library', onPress: () => this.pickFromCameraRoll()},
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            ],
            { cancelable: false }
        )
    }

    getImage = async () => {
        const {Permissions} = Expo
        const {status} = await Permissions.askAsync(Permissions.CAMERA)
        if (status === 'granted') {
            this.openImagePicker()
        }
    }

    render() {
        return (
            <View>
            <TouchableHighlight onPress={this.getImage}>
                <View style={{height:200, width:200}}>
                    {this.state.imageUri ? 
                        <Image source={{uri: this.state.imageUri}} style={{flex:1, borderRadius:25}}/> : <View />}
                    <View style={{position:'absolute',right:0,}}>
                        <FontAwesome name={'edit'} 
                                    size={32}
                                    color={'#0099f7'}
                        />
                    </View>
                </View>
            </TouchableHighlight>
            </View>
        )
    }
}
