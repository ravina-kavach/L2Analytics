import React, { useState } from "react";
import {
    View,
    Text,
    Modal,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import { COLORS } from "../../theme/colors";

interface ForgotPasswordModalProps {
    visible: boolean;
    email: string;
    setEmail: (val: string) => void;
    onSendOtp: () => void;
    onClose: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
    visible,
    email,
    setEmail,
    onSendOtp,
    onClose,
}) => {

    const [error, setError] = useState("");

    const validateEmail = () => {

        if (!email.trim()) {
            setError("Email is required");
            return;
        }

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address");
            return;
        }
        setEmail("")
        setError("");
        onSendOtp();
    };

    return (
        <Modal visible={visible} transparent animationType="fade">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.overlay}>
                    <View style={styles.container}>

                        <Text style={styles.title}>Forgot Password?</Text>

                        <Text style={styles.subtitle}>
                            Enter your registered email to receive a code.
                        </Text>

                        <Text style={styles.label}>Email Address</Text>

                        <TextInput
                            placeholder="name@company.com"
                            cursorColor={COLORS.Orange}
                            style={[
                                styles.input,
                                error && { borderColor: "red" }
                            ]}
                            value={email}
                            onChangeText={(text) => {
                                setEmail(text);
                                setError("");
                            }}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />

                        {error ? (
                            <Text style={styles.errorText}>{error}</Text>
                        ) : null}

                        <TouchableOpacity
                            style={styles.button}
                            onPress={validateEmail}
                        >
                            <Text style={styles.buttonText}>Send OTP</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={onClose}>
                            <Text style={styles.back}>Back to Login</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default ForgotPasswordModal;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: COLORS.Overlay,
        justifyContent: "center",
        alignItems: "center",
    },

    container: {
        width: "85%",
        backgroundColor: "#fff",
        borderRadius: 18,
        padding: 25,
    },

    title: {
        fontSize: 22,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 5,
        color: COLORS.BLACK
    },

    subtitle: {
        textAlign: "center",
        color: COLORS.dark2,
        marginBottom: 20,
    },

    label: {
        color: COLORS.BLACK,
        fontWeight: "600",
        marginBottom: 8,
    },

    input: {
        borderWidth: 1,
        color: COLORS.BLACK,
        borderColor: "#e5e7eb",
        borderRadius: 10,
        padding: 14,
    },

    errorText: {
        color: "red",
        marginTop: 6,
        marginBottom: 10,
        fontSize: 13,
    },

    button: {
        backgroundColor: COLORS.Orange,
        padding: 16,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10
    },

    buttonText: {
        color: "#fff",
        fontWeight: "600",
    },

    back: {
        marginTop: 18,
        textAlign: "center",
        fontWeight: "500",
        color: COLORS.dark2,
    },
});