import React from "react";
import {
    View,
    Text,
    Modal,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";

interface ConfirmUploadModalProps {
    selectedFile: any;
    relatedDoc: string,
    setRelatedDoc: any;
    visible: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const UploadDocsModal: React.FC<ConfirmUploadModalProps> = ({
    selectedFile,
    relatedDoc,
    setRelatedDoc,
    visible,
    onClose,
    onConfirm,
}) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            statusBarTranslucent
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.overlay}>
                    <View style={styles.modalContainer}>
                        {/* Header */}
                        <View style={styles.header}>
                            <View style={styles.headerLeft}>
                                <Text style={styles.uploadIcon}>☁️</Text>
                                <Text style={styles.title}>Confirm Upload</Text>
                            </View>
                            <TouchableOpacity onPress={onClose}>
                                <Text style={styles.close}>✕</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Files to Upload */}
                        <Text style={styles.label}>Files to upload:</Text>
                        <View style={styles.fileBox}>
                            <Text style={styles.fileIcon}>📄</Text>
                            <Text style={styles.fileName}>{selectedFile.name}</Text>
                        </View>

                        {/* Document Type */}
                        <Text style={styles.sectionLabel}>DOCUMENT TYPE</Text>
                        <View style={styles.inputDisabled}>
                            <Text style={styles.disabledText}>{selectedFile.type}</Text>
                        </View>

                        {/* Related To */}
                        <Text style={styles.sectionLabel}>RELATED TO</Text>
                        <TextInput
                            placeholder="e.g. Resume, HR, Project ID"
                            placeholderTextColor="#8E8E8E"
                            style={styles.input}
                            value={relatedDoc}
                            onChangeText={setRelatedDoc}
                        />

                        {/* Buttons */}
                        <View style={styles.buttonRow}>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={onClose}
                            >
                                <Text style={styles.cancelText}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.confirmButton}
                                onPress={onConfirm}
                            >
                                <Text style={styles.confirmText}>Confirm & Upload</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default UploadDocsModal;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.45)",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    modalContainer: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: 20,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    uploadIcon: {
        fontSize: 18,
        marginRight: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        color: "#1E1E1E",
    },
    close: {
        fontSize: 18,
        color: "#9E9E9E",
    },
    label: {
        fontSize: 14,
        color: "#4A4A4A",
        marginBottom: 8,
    },
    fileBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F2F4F7",
        borderRadius: 12,
        padding: 12,
        marginBottom: 20,
    },
    fileIcon: {
        marginRight: 8,
    },
    fileName: {
        fontSize: 14,
        color: "#344054",
    },
    sectionLabel: {
        fontSize: 12,
        fontWeight: "600",
        color: "#667085",
        marginBottom: 6,
    },
    inputDisabled: {
        backgroundColor: "#F2F4F7",
        borderRadius: 12,
        padding: 14,
        marginBottom: 18,
    },
    disabledText: {
        color: "#667085",
        fontSize: 14,
    },
    input: {
        backgroundColor: "#F8F5F0",
        borderRadius: 12,
        padding: 14,
        fontSize: 14,
        marginBottom: 25,
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    cancelButton: {
        flex: 1,
        backgroundColor: "#E7E3DD",
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
        marginRight: 10,
    },
    confirmButton: {
        flex: 1,
        backgroundColor: "#F97316",
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
    },
    cancelText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#1E1E1E",
    },
    confirmText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#FFFFFF",
    },
});