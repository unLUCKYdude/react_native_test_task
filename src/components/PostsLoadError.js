import React from "react";
import { View, Text, StyleSheet } from "react-native";

import useFont from "../hooks/useFont";
import Button from "./Button";

const PostsLoadError = ({ onReload }) => {
    return <View style={styles.body}>
        <Text style={styles.title}>Не удалось загрузить публикации</Text>
        <Text style={styles.desc}>Проверьте интернет-соединение и повторите попытку</Text>
        <Button title="Повторить" onPress={onReload} style={{marginTop: 24}} />
    </View>
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: 28,
        fontFamily: useFont(700),
        color: "#121212",
        textAlign: "center",
        lineHeight: 32
    },
    desc: {
        fontSize: 14,
        fontFamily: useFont(500),
        color: "#8e8e8e",
        marginTop: 8,
        textAlign: "center"
    }
});

export default PostsLoadError;