import { request, PERMISSIONS, RESULTS, openSettings } from 'react-native-permissions';
import {
  PermissionsAndroid,
  Alert,
  Platform
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

let isPickerOpen = false;

const handleOnCamera = async () => {
  try {
    let hasPermission = false;

    const checkPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.CAMERA
        );
        if (granted) return true;

        const requestResult = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA
        );
        return requestResult === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        const result = await request(PERMISSIONS.IOS.CAMERA);
        return result === RESULTS.GRANTED;
      }
    };

    while (!hasPermission) {
      hasPermission = await checkPermission();
      if (!hasPermission) {
        await showSettingsAlert();
      }
    }

    return new Promise(resolve => {
      launchCamera(
        {
          mediaType: 'photo',
          quality: 0.6,
          cameraType: 'front',
          includeBase64: true,
          saveToPhotos: false,
          // presentationStyle: 'fullScreen',
        },
        response => {
          if (response?.didCancel || response?.errorCode) {
            return resolve({ success: false });
          }

          const asset = response.assets?.[0];
          resolve({
            success: true,
            image: {
              base64: asset?.base64,
              uri: asset?.uri,
              fileName: asset?.fileName,
              type: asset?.type,
            },
          });
        }
      );
    });
  } catch (error) {
    console.log('Camera error:', error);
    return { success: false };
  }
};

const handleOnGallery = async () => {
  try {
    if (isPickerOpen) return;
    isPickerOpen = true;

    let hasPermission = true;

    if (Platform.OS === 'android') {
      if (Platform.Version >= 33) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
        );
        hasPermission = granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        );
        hasPermission = granted === PermissionsAndroid.RESULTS.GRANTED;
      }
    }

    if (Platform.OS === 'ios') {
      const result = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
      hasPermission =
        result === RESULTS.GRANTED || result === RESULTS.LIMITED;
    }

    if (!hasPermission) {
      showSettingsAlert();
      isPickerOpen = false;
      return { success: false };
    }

    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
      includeBase64: true,
      quality: 0.8,
    });

    isPickerOpen = false;

    if (result.didCancel || result.errorCode || !result.assets?.length) {
      return { success: false };
    }

    const asset = result.assets[0];

    return {
      success: true,
      image: {
        base64: asset.base64 || '',
        uri: asset.uri,
        fileName: asset.fileName || `image_${Date.now()}.jpg`,
        type: asset.type || 'image/jpeg',
      },
    };
  } catch (error) {
    console.log('handleOnGallery error:', error);
    isPickerOpen = false;
    return { success: false };
  }
};

const showSettingsAlert = () => {
  Alert.alert(
    'Permission Required',
    'Please enable permission in Settings.',
    [{ text: 'Open Settings', onPress: openSettings as any }],
    { cancelable: false }
  );
};

export const permission = {
  showSettingsAlert,
  handleOnCamera,
  handleOnGallery,
};
