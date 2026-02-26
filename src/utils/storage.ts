import AsyncStorage from '@react-native-async-storage/async-storage';

export const setStorage = async (key: string, value: any) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        console.log('Storage Set Error:', e);
    }
};

export const getStorage = async (key: string) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log('Storage Get Error:', e);
        return null;
    }
};

export const removeStorage = async (key: string) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (e) {
        console.log('Storage Remove Error:', e);
    }
};

export const clearStorage = async () => {
    try {
        await AsyncStorage.clear();
    } catch (e) {
        console.log('Storage Clear Error:', e);
    }
};

