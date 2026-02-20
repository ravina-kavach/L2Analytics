import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    Image,
} from 'react-native';
import { CommonView } from '../../utils/common';
import { COLORS } from '../../theme/colors';
import { AppLogo } from '../../assets/images';
import { responsiveHeight, responsiveWidth } from '../../theme/metrics';
import CommonIcon from '../../components/CommonIcon';


const Signup = ({ navigation }: any) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secure, setSecure] = useState(true);

    return (
        <CommonView>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image style={styles.appLogo} source={AppLogo} />
                    <Text style={styles.title}>Create Account 🚀</Text>
                    <Text style={styles.subtitle}>Sign up to continue</Text>
                </View>
                <View style={styles.inputContainer}>
                    <CommonIcon type="Ionicons" name="person-outline" size={20} color="#777" style={styles.icon} />
                    <TextInput
                        placeholder="Full Name"
                        value={name}
                        onChangeText={setName}
                        style={styles.input}
                    />
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
                        <CommonIcon type="Ionicons" name={secure ? 'eye-off-outline' : 'eye-outline'} size={20} color="#777" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>

                <View style={styles.bottomRow}>
                    <Text style={{ color: '#666' }}>Already have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={styles.link}> Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </CommonView>
    );
};

export default Signup;

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
