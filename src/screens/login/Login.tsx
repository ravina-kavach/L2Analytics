import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';
import { CommonView } from '../../utils/common';
import { COLORS } from '../../theme/colors';
import { responsiveHeight, responsiveWidth } from '../../theme/metrics';
import { AppLogo } from '../../assets/images';
import CommonIcon from '../../components/CommonIcon';
import useLogin from './LoginController';

const LoginScreen = () => {
    const {
        handleLogin,
        loading,
        email,
        setEmail,
        password,
        setPassword,
        secure,
        setSecure,
        rememberMe,
        setRememberMe,
        gotoRegister
    } = useLogin();

    return (
        <CommonView>
            <View style={styles.container}>

                {/* Header */}
                <View style={styles.header}>
                    <Image style={styles.appLogo} source={AppLogo} />
                    <Text style={styles.title}>Welcome Back 👋</Text>
                    <Text style={styles.subtitle}>Login to your account</Text>
                </View>

                {/* Email */}
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

                {/* Password */}
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

                {/* Remember + Forgot Row */}
                <View style={styles.rememberForgotRow}>

                    {/* Remember Me */}
                    <TouchableOpacity
                        style={styles.rememberContainer}
                        onPress={() => setRememberMe(!rememberMe)}
                        activeOpacity={0.7}
                    >
                        <CommonIcon
                            type="Ionicons"
                            name={rememberMe ? 'checkbox' : 'square-outline'}
                            size={22}
                            color={rememberMe ? COLORS.Orange : '#777'}
                        />
                        <Text style={styles.rememberText}> Remember Me</Text>
                    </TouchableOpacity>

                    {/* Forgot Password */}
                    <TouchableOpacity>
                        <Text style={styles.forgotText}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>

                {/* Login Button */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleLogin}
                    disabled={loading}
                >
                    <Text style={styles.buttonText}>
                        {loading ? 'Please wait...' : 'Login'}
                    </Text>
                </TouchableOpacity>

                {/* Bottom Register */}
                <View style={styles.bottomRow}>
                    <Text style={{ color: '#666' }}>Don't have an account?</Text>
                    <TouchableOpacity onPress={gotoRegister}>
                        <Text style={styles.link}> Register</Text>
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

    /* 🔥 Updated Row */
    rememberForgotRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },

    rememberContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    rememberText: {
        color: '#444',
        fontSize: 14,
    },

    forgotText: {
        color: COLORS.Orange,
        fontSize: 14,
        fontWeight: '500',
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
    },
});