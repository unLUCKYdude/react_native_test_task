import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import Ionicon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";

import useFont from "../hooks/useFont";
import Button from "../components/Button";
import PostsList from "../components/PostsList";
import PostsLoadError from "../components/PostsLoadError";
import usePosts from "../hooks/usePosts";

const HomeScreen = () => {

    const navigation = useNavigation();
    const [isLogoutVisible, setIsLogoutVisible] = useState(false);
    const [updatePosts, isPostsLoading, posts, isPostsLoadError] = usePosts();

    const logOut = () => {
        AsyncStorage.removeItem("isLoggedIn");
        navigation.replace("Auth");
    };

    useEffect(() => {
        updatePosts();
    }, []);

    return <View style={styles.body}>
        <View style={styles.header}>
            <View style={{flexDirection: "row", alignItems: "center"}}>
                <Text style={styles.h1}>Публикации</Text>
                <Text style={styles.amount}>{posts?.length}</Text>
            </View>
            <TouchableOpacity onPress={() => setIsLogoutVisible(true)} style={{padding: 8}}>
                <Ionicon name="log-out-outline" size={24} color="#000000" />
            </TouchableOpacity>
        </View>
        {isPostsLoadError ? <PostsLoadError onReload={updatePosts} /> : <View style={{flex: 1}}>
            {isPostsLoading
            ?
            <View style={{flex: 1, justifyContent: "center"}}>
                <ActivityIndicator size="large" color="#000000" />
            </View>
            :
            <PostsList data={posts} />}
        </View>}
        <Modal
            isVisible={isLogoutVisible}
            onBackdropPress={() => setIsLogoutVisible(false)}
            onBackButtonPress={() => setIsLogoutVisible(false)}
            useNativeDriver={true}
            useNativeDriverForBackdrop={true}
            animationIn="fadeIn"
            animationOut="fadeOut"
            backdropOpacity={0.4}
        >
            <View style={styles.modal}>
                <Text style={styles.modalTitle}>Вы действительно хотите выйти?</Text>
                <View style={styles.modalButtonsWrapper}>
                    <Button title="Нет" onPress={() => setIsLogoutVisible(false)} color="#eb3b5a" width={100} height={46} />
                    <TouchableOpacity onPress={logOut} style={{marginLeft: 16, width: 100}}>
                        <Text style={styles.modalConfirmBitton}>Да</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    </View>;
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: "#ffffff"
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 12,
        paddingVertical: 18,
        elevation: 20,
        backgroundColor: "#ffffff"
    },
    h1: {
        fontSize: 28,
        fontFamily: useFont(700),
        color: "#000000",
        marginLeft: 12
    },
    amount: {
        width: 28,
        height: 28,
        color: "#ffffff",
        backgroundColor: "#485460",
        lineHeight: 28,
        textAlign: "center",
        borderRadius: 14,
        fontSize: 11,
        marginLeft: 8,
        fontFamily: useFont(800),
        top: 2
    },
    modal: {
        backgroundColor: "#ffffff",
        borderRadius: 16,
        alignItems: "center",
        paddingTop: 12,
        paddingBottom: 16
    },
    modalButtonsWrapper: {
        flexDirection: "row",
        marginTop: 20,
        alignItems: "center"
    },
    modalTitle: {
        fontSize: 16,
        fontFamily: useFont(700)
    },
    modalConfirmBitton: {
        fontFamily: useFont(800),
        fontSize: 16,
        color: "#acacac",
        textAlign: "center",
        paddingVertical: 12
    }
});

export default HomeScreen;