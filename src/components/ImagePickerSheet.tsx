import React from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Pressable,
} from 'react-native';
import { permission } from '../utils/permission';
import { CommonView } from '../utils/common';
import { COLORS } from '../theme/colors';

const ImagePickerSheet = ({
    visible,
    onClose,
    onResult,
}: any) => {
    const handleCamera = async () => {
        onClose();
        const res: any = await permission.handleOnCamera();
        if (res?.success) {
            onResult(res.image);
        }
    };

    const handleGallery = async () => {
        onClose();
        const res = await permission.handleOnGallery();
        if (res?.success) {
            onResult(res.image);
        }
    };

    return (
        <Modal
            visible={visible}
            transparent
            statusBarTranslucent
            animationType="slide"
            onRequestClose={onClose}
        >
            <CommonView>
                <Pressable style={styles.overlay} onPress={onClose}>
                    <View style={styles.sheet}>
                        <TouchableOpacity style={styles.option} onPress={handleCamera}>
                            {/* <CameraIcon /> */}
                            <Text style={styles.text}>Take Picture</Text>
                        </TouchableOpacity>

                        <View style={styles.divider} />

                        <TouchableOpacity style={styles.option} onPress={handleGallery}>
                            {/* <UploadIcon /> */}
                            <Text style={styles.text}>Upload From Device</Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>
            </CommonView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'flex-end',
        bottom: -20,
    },

    sheet: {
        backgroundColor: COLORS.WHITE,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingTop: 20,
        paddingBottom: 40,
        overflow: 'hidden',
    },

    option: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 20,
    },

    text: {
        fontSize: 16,
        color: COLORS.BLACK,
        paddingLeft: 10

    },

    divider: {
        height: 1,
        backgroundColor: '#E5E7EB',
    },
});


export default ImagePickerSheet;
