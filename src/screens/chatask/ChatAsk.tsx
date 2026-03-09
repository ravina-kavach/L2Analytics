import React, { useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { chatAsk } from "../../store/slices/commonSlice";
import { useNavigation } from "@react-navigation/native";
import CommonIcon from "../../components/CommonIcon";
import { COLORS } from "../../theme/colors";

interface Message {
    id: number;
    text: string;
    sender: "user" | "bot";
    time: string;
}

const ChatAsk = ({ route }: any) => {
    const { link, fileName } = route.params || {};

    const dispatch = useAppDispatch();
    const { chatAskData } = useAppSelector((state) => state.common);

    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");

    const flatListRef = useRef<FlatList>(null);
    const Navigation = useNavigation()
    /**
    * Default AI message
    */
    useEffect(() => {
        let defaultMsg = "";

        if (link) {
            defaultMsg = `Hello! I've analyzed the content from "${link}". What would you like to know?`;
        } else if (fileName) {
            defaultMsg = `Hello! I've loaded "${fileName}" into the context. What would you like to know about this file?`;
        }

        if (defaultMsg) {
            setMessages([
                {
                    id: Date.now(),
                    text: defaultMsg,
                    sender: "bot",
                    time: formatTime(),
                },
            ]);
        }
    }, []);

    /**
    * Listen API response
    */
    useEffect(() => {
        if (chatAskData?.length > 0) {
            const lastResponse = chatAskData[chatAskData.length - 1];

            const botMessage: Message = {
                id: Date.now(),
                text: lastResponse?.answer || "No response",
                sender: "bot",
                time: formatTime(),
            };

            setMessages((prev) => [...prev, botMessage]);
        }
    }, [chatAskData]);

    /**
    * Format time
    */
    const formatTime = () => {
        return new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    /**
    * Send Message
    */
    const sendMessage = () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now(),
            text: input,
            sender: "user",
            time: formatTime(),
        };

        setMessages((prev) => [...prev, userMessage]);

        let payload: any = {
            question: input,
        };

        if (link) {
            payload.link = link ? link : fileName;
        }

        dispatch(chatAsk(payload));

        setInput("");
    };

    /**
    * Render message
    */
    const renderItem = ({ item }: { item: Message }) => {
        const isUser = item.sender === "user";

        return (
            <View
                style={[
                    styles.messageContainer,
                    isUser ? styles.userContainer : styles.botContainer,
                ]}
            >
                <View
                    style={[
                        styles.bubble,
                        isUser ? styles.userBubble : styles.botBubble,
                    ]}
                >
                    <Text
                        style={[
                            styles.messageText,
                            isUser && { color: "#fff" },
                        ]}
                    >
                        {item.text}
                    </Text>
                </View>

                <Text
                    style={[
                        styles.time,
                        isUser && { alignSelf: "flex-end" },
                    ]}
                >
                    {item.time}
                </Text>
            </View>
        );
    };

    return (

        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        // keyboardVerticalOffset={80}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>

                    {/* HEADER */}

                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => Navigation.goBack()}>
                            <CommonIcon
                                type="Ionicons"
                                name="arrow-back-outline"
                                size={22}
                                color={COLORS.BLACK}
                            />
                        </TouchableOpacity>
                        <View style={styles.headerLeft}>

                            <View style={styles.botIcon}>
                                <Text style={{ fontSize: 16 }}>🤖</Text>
                            </View>

                            <View>
                                <Text style={styles.headerTitle}>AI Assistant</Text>

                                <View style={styles.statusRow}>
                                    <View style={styles.onlineDot} />
                                    <Text style={styles.onlineText}>Online</Text>
                                </View>
                            </View>

                        </View>
                        {/* <View /> */}

                        {/* <TouchableOpacity>
                            <Text style={styles.close}>✕</Text>
                        </TouchableOpacity> */}
                    </View>

                    <Text style={styles.dayLabel}>TODAY</Text>

                    {/* CHAT */}

                    <FlatList
                        ref={flatListRef}
                        data={messages}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderItem}
                        contentContainerStyle={styles.chatContainer}
                        keyboardShouldPersistTaps="handled"
                        onContentSizeChange={() =>
                            flatListRef.current?.scrollToEnd({ animated: true })
                        }
                    />

                    {/* INPUT */}

                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="Type your message..."
                            value={input}
                            onChangeText={setInput}
                            style={styles.input}
                            multiline
                        />

                        <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
                            <Text style={styles.sendText}>➤</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default ChatAsk;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#F3F4F6"
    },

    /* HEADER */

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 50,
        padding: 15,
        borderBottomWidth: 1,
        borderColor: "#E5E7EB",
        backgroundColor: "#fff"
    },

    headerLeft: {
        flexDirection: "row",
        alignItems: "center"
    },

    botIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#FFE7D6",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10
    },

    headerTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#111"
    },

    statusRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 2
    },

    onlineDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#22C55E",
        marginRight: 5
    },

    onlineText: {
        fontSize: 12,
        color: "#6B7280"
    },

    close: {
        fontSize: 18,
        color: "#9CA3AF"
    },

    /* DAY LABEL */

    dayLabel: {
        alignSelf: "center",
        marginTop: 10,
        marginBottom: 5,
        fontSize: 12,
        fontWeight: "600",
        color: "#9CA3AF"
    },

    /* CHAT */

    chatContainer: {
        padding: 15
    },

    messageContainer: {
        marginBottom: 16,
        maxWidth: "80%"
    },

    botContainer: {
        alignSelf: "flex-start"
    },

    userContainer: {
        alignSelf: "flex-end"
    },

    bubble: {
        padding: 14,
        borderRadius: 14
    },

    botBubble: {
        backgroundColor: "#F3F4F6",
        borderWidth: 1,
        borderColor: "#E5E7EB"
    },

    userBubble: {
        backgroundColor: "#F97316",
        borderRadius: 20,
        paddingHorizontal: 18,
        paddingVertical: 12
    },

    messageText: {
        fontSize: 14,
        color: "#111"
    },

    time: {
        fontSize: 11,
        color: "#9CA3AF",
        marginTop: 4
    },

    /* INPUT */

    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderTopWidth: 1,
        borderColor: "#E5E7EB",
        backgroundColor: "#fff"
    },

    input: {
        flex: 1,
        backgroundColor: "#F3F4F6",
        borderRadius: 25,
        paddingHorizontal: 16,
        paddingVertical: 10,
        maxHeight: 100
    },

    sendBtn: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: "#9CA3AF",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 8
    },

    sendText: {
        color: "#fff",
        fontSize: 18
    }

});
