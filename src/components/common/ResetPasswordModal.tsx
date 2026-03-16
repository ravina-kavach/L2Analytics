import React, { useState } from "react";
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
import KeyboardAvoidWrapper from "../KeyboardAvoidWrapper";

interface ResetPasswordModalProps {
    visible: boolean;
    onResetPassword: (password: string) => void;
    onClose: () => void;
}

const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({
    visible,
    onResetPassword,
    onClose,
}) => {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [passwordStrength, setPasswordStrength] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleClose = () => {
        setPassword("");
        setConfirmPassword("");
        setPasswordStrength("");
        setError("");
        setShowPassword(false);
        setShowConfirmPassword(false);
        onClose();
    };

    const checkPasswordStrength = (pass: string) => {
        let score = 0;

        if (pass.length >= 8) score++;
        if (/[A-Z]/.test(pass)) score++;
        if (/[0-9]/.test(pass)) score++;
        if (/[^A-Za-z0-9]/.test(pass)) score++;

        if (score <= 1) return "Poor";
        if (score === 2 || score === 3) return "Medium";
        if (score >= 4) return "Strong";
    };

    const validatePassword = () => {

        if (!password || !confirmPassword) {
            setError("All fields are required");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters");
            return;
        }

        const passwordRegex =
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/;

        if (!passwordRegex.test(password)) {
            setError("Password must include 1 letter, 1 number, and 1 symbol");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setError("");
        onResetPassword(password);
    };

    return (
        <Modal visible={visible} transparent animationType="fade">
            <KeyboardAvoidWrapper>

                <View style={styles.overlay}>
                    <View style={styles.container}>

                        {/* Close Button */}

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

                        <Text style={styles.title}>Reset Password</Text>

                        <Text style={styles.subtitle}>
                            Please create a strong password for your account
                        </Text>

                        {/* New Password */}

                        <Text style={styles.label}>New Password</Text>

                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder="Enter new password"
                                secureTextEntry={!showPassword}
                                cursorColor={COLORS.Orange}
                                maxLength={20}
                                style={[
                                    styles.input,
                                    error && { borderColor: "red" },
                                ]}
                                value={password}
                                onChangeText={(text) => {
                                    setPassword(text);
                                    setPasswordStrength(checkPasswordStrength(text) || "");
                                    setError("");
                                }}
                            />

                            <TouchableOpacity
                                style={styles.eyeIcon}
                                onPress={() => setShowPassword(!showPassword)}
                            >
                                <CommonIcon
                                    type="Ionicons"
                                    name={showPassword ? "eye-off" : "eye"}
                                    size={22}
                                    color={COLORS.dark2}
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Password Strength */}

                        {password.length > 0 && (
                            <Text
                                style={[
                                    styles.strengthText,
                                    passwordStrength === "Poor" && { color: "red" },
                                    passwordStrength === "Medium" && { color: "#f59e0b" },
                                    passwordStrength === "Strong" && { color: "green" },
                                ]}
                            >
                                Password Strength: {passwordStrength}
                            </Text>
                        )}

                        {/* Confirm Password */}

                        <Text style={styles.label}>Confirm Password</Text>

                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder="Confirm new password"
                                secureTextEntry={!showConfirmPassword}
                                cursorColor={COLORS.Orange}
                                maxLength={20}
                                style={[
                                    styles.input,
                                    error && { borderColor: "red" },
                                ]}
                                value={confirmPassword}
                                onChangeText={(text) => {
                                    setConfirmPassword(text);
                                    setError("");
                                }}
                            />

                            <TouchableOpacity
                                style={styles.eyeIcon}
                                onPress={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                            >
                                <CommonIcon
                                    type="Ionicons"
                                    name={showConfirmPassword ? "eye-off" : "eye"}
                                    size={22}
                                    color={COLORS.dark2}
                                />
                            </TouchableOpacity>
                        </View>

                        {error ? (
                            <Text style={styles.errorText}>{error}</Text>
                        ) : null}

                        {/* Password Instructions */}

                        <View style={{ paddingTop: 20, paddingLeft: 5 }}>
                            <Text style={styles.passwordIntroText}>
                                * Use at least 1 letter, 1 number, and 1 symbol.
                            </Text>
                            <Text style={styles.passwordIntroText}>
                                * Keep your password up to 8 characters.
                            </Text>
                            <Text style={styles.passwordIntroText}>
                                * Avoid simple passwords like 123456.
                            </Text>
                            <Text style={styles.passwordIntroText}>
                                * Do not use your name or personal details.
                            </Text>
                            <Text style={styles.passwordIntroText}>
                                * Make your password hard to guess.
                            </Text>
                        </View>

                        {/* Reset Button */}

                        <TouchableOpacity
                            style={[
                                styles.button,
                                (!password || !confirmPassword) && { opacity: 0.5 },
                            ]}
                            onPress={validatePassword}
                            disabled={!password || !confirmPassword}
                        >
                            <Text style={styles.buttonText}>
                                Reset Password
                            </Text>
                        </TouchableOpacity>

                    </View>
                </View>

            </KeyboardAvoidWrapper>
        </Modal>
    );
};

export default ResetPasswordModal;

const styles = StyleSheet.create({

    overlay: {
        flex: 1,
        backgroundColor: COLORS.Overlay,
        justifyContent: "center",
        alignItems: "center",
    },

    container: {
        width: "90%",
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
        fontSize: 22,
        fontWeight: "700",
        textAlign: "center",
        color: COLORS.BLACK,
        paddingTop: 10,
    },

    subtitle: {
        textAlign: "center",
        color: COLORS.dark2,
        marginBottom: 20,
        marginTop: 5,
    },

    label: {
        fontWeight: "600",
        marginBottom: 6,
        color: COLORS.BLACK,
    },

    inputContainer: {
        position: "relative",
        justifyContent: "center",
    },

    input: {
        borderWidth: 1,
        borderColor: "#e5e7eb",
        borderRadius: 10,
        height: 50,
        paddingHorizontal: 14,
        paddingRight: 45,
        marginBottom: 8,
        color: COLORS.BLACK,
    },

    eyeIcon: {
        position: "absolute",
        right: 12,
        top: "50%",
        transform: [{ translateY: -11 }],
    },

    strengthText: {
        fontSize: 13,
        fontWeight: "600",
        marginBottom: 10,
    },

    errorText: {
        color: "red",
        fontSize: 13,
        marginBottom: 10,
        textAlign: "center",
    },

    passwordIntroText: {
        fontSize: 12,
        color: COLORS.dark2,
        marginBottom: 3,
    },

    button: {
        backgroundColor: COLORS.Orange,
        padding: 16,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 20,
    },

    buttonText: {
        color: "#fff",
        fontWeight: "600",
    },
});