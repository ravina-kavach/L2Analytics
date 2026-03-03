import React, { useState, useMemo } from "react";
import {
    View,
    Text,
    Modal,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    GestureResponderEvent,
} from "react-native";
import CommonIcon from "./CommonIcon";

interface AddLinkModalProps {
    visible: boolean;
    onClose: () => void;
    url: string;
    setUrl: (value: string) => void;
    onAddLink: (event: GestureResponderEvent) => void;
    folderName?: string;
}

const AddLinkModal: React.FC<AddLinkModalProps> = ({
    visible,
    onClose,
    url,
    setUrl,
    onAddLink,
    folderName = "Legal & Confidentials",
}) => {
    const [error, setError] = useState("");

    // URL validation function
    const validateUrl = (value: string) => {
        if (!value.trim()) {
            return "URL is required.";
        }

        const urlPattern =
            /^(https?:\/\/)((([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})|localhost)(:\d+)?(\/\S*)?$/;

        if (!urlPattern.test(value.trim())) {
            return "Please enter a valid URL (must start with http:// or https://).";
        }

        return "";
    };

    const handleAddLink = (event: GestureResponderEvent) => {
        const validationError = validateUrl(url);
        if (validationError) {
            setError(validationError);
            return;
        }

        setError("");
        onAddLink(event);
    };

    return (
        <Modal
            transparent
            animationType="fade"
            visible={visible}
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.overlay}>
                    <View style={styles.container}>

                        {/* Header */}
                        <View style={styles.header}>
                            <View style={styles.headerLeft}>
                                <CommonIcon type="Ionicons" name="link-outline" size={20} color="#E66A00" />
                                <Text style={styles.title}>Add Link to Folder</Text>
                            </View>

                            <TouchableOpacity onPress={onClose}>
                                <CommonIcon type="Ionicons" name="close" size={20} color="#8E8E93" />
                            </TouchableOpacity>
                        </View>

                        {/* Target Folder Box */}
                        <View style={styles.folderBox}>
                            <CommonIcon type="Ionicons" name="folder-outline" size={22} color="#E66A00" />
                            <View style={{ marginLeft: 10 }}>
                                <Text style={styles.targetLabel}>TARGET FOLDER</Text>
                                <Text style={styles.folderName}>{folderName}</Text>
                            </View>
                        </View>

                        {/* Input Label */}
                        <Text style={styles.inputLabel}>PASTE URL</Text>

                        {/* Input */}
                        <TextInput
                            placeholder="e.g. https://www.youtube.com/watch?v=..."
                            placeholderTextColor="#A1A1A1"
                            style={[
                                styles.input,
                                error ? { borderColor: "red" } : null,
                            ]}
                            value={url}
                            onChangeText={(text) => {
                                setUrl(text);
                                if (error) setError("");
                            }}
                            autoCapitalize="none"
                            keyboardType="url"
                        />

                        {/* Error Message */}
                        {error ? (
                            <Text style={styles.errorText}>{error}</Text>
                        ) : null}

                        <Text style={styles.helperText}>
                            Supports YouTube, Vimeo, and direct article links.
                        </Text>

                        {/* Buttons */}
                        <View style={styles.buttonRow}>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={onClose}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.cancelText}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.addButton,
                                    { backgroundColor: "#E66A00" },
                                ]}
                                onPress={handleAddLink}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.addText}>Add Link</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default AddLinkModal;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        width: "90%",
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 20,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    title: {
        marginLeft: 8,
        fontSize: 16,
        fontWeight: "600",
        color: "#1C1C1E",
    },
    folderBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F5EFE9",
        borderRadius: 12,
        padding: 14,
        marginTop: 18,
    },
    targetLabel: {
        fontSize: 11,
        color: "#8E8E93",
        letterSpacing: 1,
    },
    folderName: {
        fontSize: 14,
        fontWeight: "600",
        color: "#1C1C1E",
        marginTop: 2,
    },
    inputLabel: {
        marginTop: 18,
        fontSize: 12,
        fontWeight: "600",
        color: "#8E8E93",
        letterSpacing: 1,
    },
    input: {
        marginTop: 8,
        borderWidth: 1.5,
        borderColor: "#E66A00",
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 14,
        color: "#000",
    },
    errorText: {
        marginTop: 6,
        fontSize: 12,
        color: "red",
    },
    helperText: {
        marginTop: 6,
        fontSize: 12,
        color: "#8E8E93",
    },
    buttonRow: {
        flexDirection: "row",
        marginTop: 24,
    },
    cancelButton: {
        flex: 1,
        backgroundColor: "#EDEDED",
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
        marginRight: 8,
    },
    cancelText: {
        color: "#1C1C1E",
        fontWeight: "500",
    },
    addButton: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
        marginLeft: 8,
    },
    addText: {
        color: "#FFFFFF",
        fontWeight: "600",
    },
});