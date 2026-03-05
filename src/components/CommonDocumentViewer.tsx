import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";

interface Props {
    url: string;
}

const CommonDocumentViewer: React.FC<Props> = ({ url }) => {
    const documentUrl = `https://docs.google.com/gview?embedded=true&url=${url}`;

    return (
        <View style={styles.container}>
            <WebView
                source={{ uri: documentUrl }}
                style={styles.webview}
                startInLoadingState={true}
                renderLoading={() => (
                    <View style={styles.loader}>
                        <ActivityIndicator size="large" />
                    </View>
                )}
            />
        </View>
    );
};

export default CommonDocumentViewer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    webview: {
        flex: 1,
    },
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});