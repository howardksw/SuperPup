import {AsyncStorage} from 'react-native'

export default (name, gained, callback) => {
    var points = 0;
    AsyncStorage.getItem(name).then((value) => {
        points = (value === null)? 0: parseInt(value);
        points = points + gained;
    }).then(() => {
        AsyncStorage.setItem(name, points.toString())
    }).then(() => {
        if (callback != undefined) {
            callback()
        }
    });
}
