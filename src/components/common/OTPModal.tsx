import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Modal,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { COLORS } from "../../theme/colors";
import CommonIcon from "../CommonIcon";

interface OTPModalProps {
    visible: boolean;
    otp: string;
    setOtp: (val: string) => void;
    onVerify: () => void;
    onResendOtp: () => void;
    onClose: () => void;
}

const OTPModal: React.FC<OTPModalProps> = ({
    visible,
    otp,
    setOtp,
    onVerify,
    onResendOtp,
    onClose
}) => {

    const [timer, setTimer] = useState(30);
    const [error, setError] = useState("");

    /* Reset modal state when opened */
    useEffect(() => {
        if (visible) {
            setTimer(30);
            setError("");
        }
    }, [visible]);

    /* Timer countdown */
    useEffect(() => {
        if (timer === 0) return;

        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    const handleResend = () => {
        onResendOtp();
        setOtp("");
        setError("");
        setTimer(30);
    };

    const handleClose = () => {
        setOtp("");
        setError("");
        setTimer(30);
        onClose();
    };

    const validateOtp = () => {

        if (!otp.trim()) {
            setError("OTP is required");
            return;
        }

        if (otp.length !== 6) {
            setError("OTP must be 6 digits");
            return;
        }

        setError("");
        onVerify();
    };

    return (
        <Modal visible={visible} transparent animationType="fade">

            <View style={styles.overlay}>
                <View style={styles.container}>

                    {/* Close Icon */}

                    <TouchableOpacity
                        style={styles.closeBtn}
                        onPress={handleClose}
                    >
                        <CommonIcon
                            type="Ionicons"
                            name="close"
                            size={30}
                            color={COLORS.dark2}
                        />
                    </TouchableOpacity>

                    <Text style={styles.title}>Verify OTP</Text>

                    <Text style={styles.subtitle}>
                        Enter the code sent to your email
                    </Text>

                    <TextInput
                        cursorColor={COLORS.Orange}
                        placeholder="Enter OTP"
                        keyboardType="number-pad"
                        maxLength={6}
                        style={[
                            styles.input,
                            { letterSpacing: otp ? 10 : 0 },
                            error && { borderColor: "red" }
                        ]}
                        value={otp}
                        onChangeText={(text) => {
                            setOtp(text);
                            setError("");
                        }}
                    />

                    {error ? (
                        <Text style={styles.errorText}>{error}</Text>
                    ) : null}

                    {/* Verify Button */}

                    <TouchableOpacity
                        style={[
                            styles.button,
                            (otp.length !== 6 || timer === 0) && { opacity: 0.5 }
                        ]}
                        onPress={validateOtp}
                        disabled={otp.length !== 6 || timer === 0}
                    >
                        <Text style={styles.buttonText}>Verify OTP</Text>
                    </TouchableOpacity>

                    {/* Resend Section */}

                    {timer > 0 ? (
                        <Text style={styles.timerText}>
                            Resend OTP in {timer}s
                        </Text>
                    ) : (
                        <TouchableOpacity onPress={handleResend}>
                            <Text style={styles.resendText}>
                                Resend OTP
                            </Text>
                        </TouchableOpacity>
                    )}

                </View>
            </View>

        </Modal>
    );
};

export default OTPModal;

const styles = StyleSheet.create({

    overlay: {
        flex: 1,
        backgroundColor: COLORS.Overlay,
        justifyContent: "center",
        alignItems: "center",
    },

    container: {
        width: "85%",
        backgroundColor: COLORS.WHITE,
        borderRadius: 18,
        padding: 25,
    },

    closeBtn: {
        position: "absolute",
        right: 15,
        top: 10,
        zIndex: 10,
    },

    title: {
        color: COLORS.BLACK,
        fontSize: 22,
        paddingTop: 10,
        fontWeight: "700",
        textAlign: "center",
    },

    subtitle: {
        textAlign: "center",
        fontWeight: "500",
        color: COLORS.dark2,
        marginBottom: 20,
        marginTop: 5,
    },

    input: {
        color: COLORS.BLACK,
        fontWeight: "bold",
        borderWidth: 1,
        borderColor: "#e5e7eb",
        borderRadius: 10,
        padding: 14,
        marginBottom: 10,
        textAlign: "center",
        fontSize: 20,
    },

    errorText: {
        color: "red",
        fontSize: 13,
        marginBottom: 10,
        textAlign: "center"
    },

    button: {
        backgroundColor: COLORS.Orange,
        padding: 16,
        borderRadius: 10,
        alignItems: "center",
    },

    buttonText: {
        color: "#fff",
        fontWeight: "600",
    },

    timerText: {
        textAlign: "center",
        marginTop: 18,
        color: COLORS.dark2,
        fontWeight: "500",
    },

    resendText: {
        textAlign: "center",
        marginTop: 18,
        color: COLORS.Orange,
        fontWeight: "700",
    },
});