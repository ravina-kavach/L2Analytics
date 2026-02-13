import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const ClearStorage = async () => {
    try {
        await AsyncStorage.clear();
    } catch (error) {
        console.log('try catch[ service> ClearStorage] error:', error.message);
    }
}

const setRemember = async (data) => {
    try {
        await AsyncStorage.setItem('Rememberlogindetail', JSON.stringify(data));
    } catch (error) {
        console.log('try catch[ service> setRemember] error:', error.message);
    }
}
const removeRemember = async () => {
    try {
        console.log("removeRemember()>>")
        await AsyncStorage.removeItem('Rememberlogindetail');
    } catch (error) {
        console.log('try catch[ service> removeRemember] error:', error.message);
    }
}
const GetRemember = async () => {
    try {
        // removeRemember();
        let Remember = await AsyncStorage.getItem('Rememberlogindetail');
        return (Remember ? JSON.parse(Remember) : null);
    } catch (error) {
        console.log('try catch[ service> GetRemember] error:', error.message);
    }
}

const FormatIndianNumber = (number) => {
    const numberStr = number?.toString();
    if (numberStr?.length !== 10) {
        console.log("The number should have exactly 10 digits.")
        return numberStr;
    }
    const formattedNumber = `+91 ${numberStr?.slice(0, 5)} ${numberStr?.slice(5)}`;
    return formattedNumber;
}
const getDayDifference = (startDate, endDate) => {
    const start = moment(startDate).startOf('day');
    const end = moment(endDate).startOf('day');
    const duration = end.diff(start, 'days') + 1;
    return duration;
}


const saveToken = async (token) => {
    await AsyncStorage.setItem('USER_TOKEN', JSON.stringify(token));
};

const getToken = async () => {
    let token = await AsyncStorage.getItem('USER_TOKEN');
    return (token ? JSON.parse(token) : null);
};

const Service = {
    setRemember, GetRemember, removeRemember, ClearStorage,
    FormatIndianNumber, getDayDifference, OpenLocaitonbutton,
    saveToken, getToken
};

export default Service;
