import React from "react";
import { View, Text, ActivityIndicator, Pressable, StyleSheet } from "react-native";

import useFont from "../hooks/useFont";

const Button = React.memo(({ isLoading, onPress, title, style, color = "#485460", width = 120, height = 56}) => {

    const onPressHandler = isLoading ? () => {} : onPress;

    return <View style={{...styles.body, ...style}}>
        <Pressable
            onPress={onPressHandler}
            style={{...styles.button, backgroundColor: color, width, height}}
            android_ripple={{color: isLoading ? "transparent" : "#000000"}}
        >
            {isLoading ? <ActivityIndicator color="#ffffff" /> : <Text style={styles.title}>{title}</Text>}
        </Pressable>
    </View>;
}, (prev, next) => !(prev.isLoading != next.isLoading || prev.title != next.title || prev.onPress != next.onPress));

const styles = StyleSheet.create({
    body: {
        borderRadius: 12,
        overflow: "hidden"
    },
    title: {
        fontFamily: useFont(800),
        fontSize: 16,
        color: "#ffffff"
    },
    button: {
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default Button;