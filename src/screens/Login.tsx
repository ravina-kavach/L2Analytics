import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';
import { CommonView } from '../utils/common';
import { COLORS } from '../theme/colors';
import { responsiveHeight, responsiveWidth } from '../theme/metrics';
import { AppLogo } from '../assets/images';
import CommonIcon from '../components/CommonIcon';

const LoginScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secure, setSecure] = useState(true);

    return (
        <CommonView>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image style={styles.appLogo} source={AppLogo} />
                    <Text style={styles.title}>Welcome Back 👋</Text>
                    <Text style={styles.subtitle}>Login to your account</Text>
                </View>
                <View style={styles.inputContainer}>
                    <CommonIcon type="Ionicons" name="mail-outline" size={20} color="#777" style={styles.icon} />
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                        keyboardType="email-address"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <CommonIcon type="Ionicons" name="lock-closed-outline" size={20} color="#777" style={styles.icon} />
                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        style={styles.input}
                        secureTextEntry={secure}
                    />
                    <TouchableOpacity onPress={() => setSecure(!secure)}>
                        <CommonIcon
                            type="Ionicons"
                            name={secure ? 'eye-off-outline' : 'eye-outline'}
                            size={20}
                            color="#777"
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.forgotBtn}>
                    <Text style={styles.forgotText}>Forgot Password?</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MainTabs')}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <View style={styles.bottomRow}>
                    <Text style={{ color: '#666' }}>Don't have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                        <Text style={styles.link}> Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </CommonView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
    },
    header: {
        marginTop: 50,
        marginBottom: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#222',
    },
    subtitle: {
        fontSize: 16,
        color: '#777',
        marginTop: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: 10,
        paddingHorizontal: 12,
        marginBottom: 20,
        height: 50,
        backgroundColor: '#FAFAFA',
    },
    icon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
    },
    forgotBtn: {
        alignSelf: 'flex-end',
        marginBottom: 30,
    },
    forgotText: {
        color: COLORS.Orange,
    },
    button: {
        backgroundColor: COLORS.Orange,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30,
    },
    link: {
        color: COLORS.Orange,
        fontWeight: '600',
    },
    appLogo: {
        width: responsiveWidth(50),
        height: responsiveHeight(20),
        alignSelf: 'center',
        resizeMode: 'contain',
    }
});
