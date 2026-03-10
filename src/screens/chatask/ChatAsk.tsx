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
import { CommonView } from "../../utils/common";
import { addMessage, clearChat } from "../../store/slices/commonSlice";
import TypingDots from "../../components/TypingDots";

interface Message {
    id: number;
    text: string;
    sender: "user" | "bot";
    time: string;
}

const ChatAsk = ({ route }: any) => {
    const { link, fileName } = route.params || {};

    const dispatch = useAppDispatch();
    const { chatMessages, chatLoading } = useAppSelector((state) => state.common);
    const [input, setInput] = useState("");
    const flatListRef = useRef<FlatList>(null);
    const Navigation = useNavigation()
    const chatRequestRef = useRef<any>(null);

    useEffect(() => {
        return () => {
            chatRequestRef.current?.abort?.();
            dispatch(clearChat());
        };
    }, []);

    useEffect(() => {
        if (chatMessages.length > 0) return;

        let defaultMsg = "";

        if (link) {
            defaultMsg = `Hello! I've analyzed the content from "${link}". What would you like to know?`;
        } else if (fileName) {
            defaultMsg = `Hello! I've loaded "${fileName}" into the context. What would you like to know about this file?`;
        }

        if (defaultMsg) {
            dispatch(
                addMessage({
                    id: Date.now(),
                    text: defaultMsg,
                    sender: "bot",
                    time: formatTime(),
                })
            );
        }
    }, []);


    const formatTime = () => {
        return new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const sendMessage = () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now(),
            text: input.trim(),
            sender: "user",
            time: formatTime(),
        };

        dispatch(addMessage(userMessage));

        let payload: any = {
            question: input.trim(),
        };

        if (link) {
            payload.link = link ? link : fileName;
        }

        chatRequestRef.current = dispatch(chatAsk(payload));
        setInput("");
    };

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
        <CommonView>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.container}>
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
                        </View>

                        <Text style={styles.dayLabel}>TODAY</Text>

                        {/* CHAT */}

                        <FlatList
                            ref={flatListRef}
                            data={chatMessages}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={renderItem}
                            contentContainerStyle={styles.chatContainer}
                            keyboardShouldPersistTaps="handled"
                            onContentSizeChange={() =>
                                flatListRef.current?.scrollToEnd({ animated: true })
                            }
                            ListFooterComponent={
                                chatLoading ? (
                                    <View style={[styles.messageContainer, styles.botContainer]}>
                                        <View style={[styles.bubble, styles.botBubble]}>
                                            <TypingDots />
                                        </View>
                                    </View>
                                ) : null
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

                            <TouchableOpacity
                                style={[
                                    styles.sendBtn,
                                    chatLoading && { opacity: 0.5 }
                                ]}
                                disabled={chatLoading}
                                onPress={sendMessage}
                            >
                                <CommonIcon
                                    type="Ionicons"
                                    name="send-sharp"
                                    size={20}
                                    color={COLORS.WHITE}
                                />
                            </TouchableOpacity>
                        </View>

                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </CommonView>
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
        alignItems: "center",
        paddingTop: Platform.OS === 'android' ? 50 : 60,
        padding: 15,
        borderBottomWidth: 1,
        borderColor: "#E5E7EB",
        backgroundColor: "#fff"
    },

    headerLeft: {
        flexDirection: "row",
        paddingLeft: 20,
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
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingBottom: Platform.OS === 'android' ? 20 : 40,
    },

    input: {
        flex: 1,
        backgroundColor: "#fff",
        borderColor: COLORS.dark5,
        borderWidth: 2,
        borderRadius: 25,
        paddingHorizontal: 16,
        paddingVertical: 15,
        maxHeight: 100
    },

    sendBtn: {
        width: 45,
        height: 45,
        borderRadius: 25,
        backgroundColor: COLORS.Orange,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 10
    },
});
