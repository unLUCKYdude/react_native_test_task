import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Image, Text, ToastAndroid } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import useFont from "../hooks/useFont";
import Input from "../components/Input";
import Button from "../components/Button";

const logoSize = {
    width: 240,
    height: 196
}

const AuthScreen = () => {

    const [isAuthFailed, setIsAuthFailed] = useState(false);
    const passwordInput = useRef();
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();

    const auth = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            if (login != "test" || password != "1qw23er45ty6") {
                ToastAndroid.show("Неверный логин или пароль", ToastAndroid.SHORT);
                return;
            }
            AsyncStorage.setItem("isLoggedIn", JSON.stringify(true));
            navigation.replace("Home");
        }, 1000);
    };

    useEffect(() => {
        AsyncStorage.getItem("isLoggedIn").then(v => {
            if (!v) {
                setIsAuthFailed(true);
                return;
            }
            navigation.replace("Home");
        });
    }, []);

    return <View style={{...styles.body, display: isAuthFailed ? "flex" : "none"}}>
        <View style={styles.wrapper}>
            <Image style={styles.logo} source={require("../img/logo.png")} />
            <Input
                placeholder="Логин"
                value={login}
                setValue={setLogin}
                onSubmit={() => passwordInput.current.focus()}
            />
            <Input
                inputRef={passwordInput}
                placeholder="Пароль"
                value={password}
                setValue={setPassword}
                isPassword={true}
                style={{marginTop: 16}}
                onSubmit={auth}
            />
            <Button title="Войти" onPress={auth} isLoading={isLoading} style={{marginTop: 24}} />
        </View>
        <Text style={styles.title}>Тестовое задание</Text>
    </View>;
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: "#ffffff",
        paddingBottom: 8
    },
    wrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    logo: {
        width: logoSize.width * 0.5,
        height: logoSize.height * 0.5,
        marginBottom: 36
    },
    title: {
        fontFamily: useFont(900),
        color: "#bfbfbf",
        textAlign: "center",
        fontSize: 11
    }
});

export default AuthScreen;