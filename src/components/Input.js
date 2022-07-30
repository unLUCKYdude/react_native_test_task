import React, { useEffect, useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

import useFont from "../hooks/useFont";

const timingConfig = {duration: 200, easing: Easing.out(Easing.exp)};

const Input = React.memo(({ value, setValue, placeholder, style, isPassword = false, onSubmit = () => {}, inputRef }) => {

    const [isFocused, setIsFocused] = useState(false);

    const x = useSharedValue(0);
    const y = useSharedValue(0);
    const scale = useSharedValue(1);

    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [{translateX: x.value}, {translateY: y.value}, {scale: scale.value}],
        };
    });

    const animate = flag => {
        x.value = withTiming(flag ? -10 : 0, timingConfig);
        y.value = withTiming(flag ? -26 : 0, timingConfig);
        scale.value = withTiming(flag ? 0.8 : 1, timingConfig);
    };

    const onFocus = () => setIsFocused(true);
    const onBlur = () => setIsFocused(false);

    useEffect(() => {
        if (isFocused || value.length != 0) {
            animate(true);
            return;
        }
        animate(false);
    }, [value, isFocused]);

    return <View style={{...styles.body, ...style}}>
        <Animated.Text style={[styles.placeholder, animatedStyles]}>{placeholder}</Animated.Text>
        <TextInput
            ref={inputRef}
            value={value}
            onChangeText={setValue}
            style={styles.input}
            onFocus={onFocus}
            onBlur={onBlur}
            secureTextEntry={isPassword}
            onSubmitEditing={onSubmit}
        />
    </View>;
}, (prev, next) => !(prev.value != next.value || prev.placeholder != next.placeholder || prev.isPassword != next.isPassword));

const styles = StyleSheet.create({
    body: {
        borderWidth: 2,
        borderColor: "#485460",
        borderRadius: 12,
        width: 280,
        paddingHorizontal: 14
    },
    placeholder: {
        fontFamily: useFont(700),
        color: "#888888",
        position: "absolute",
        top: 14,
        left: 18,
        backgroundColor: "#ffffff",
        paddingHorizontal: 4
    },
    input: {
        fontFamily: useFont(600)
    }
});

export default Input;