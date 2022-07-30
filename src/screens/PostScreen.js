import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicon from "react-native-vector-icons/Ionicons";

import useFont from "../hooks/useFont";
import usePost from "../hooks/usePost";
import PostsLoadError from "../components/PostsLoadError";
import Slider from "../components/Slider";

const PostScreen = () => {

    const navigation = useNavigation();
    const { id, userId, title, body } = useRoute().params;
    const [reloadPost, isPostLoading, postData, postLoadError] = usePost(userId);

    useEffect(() => {
        reloadPost();
    }, []);

    return <ScrollView contentContainerStyle={styles.body}>
        <View style={{height: 60, alignItems: "center", flexDirection: "row", backgroundColor: "#485460"}}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{padding: 8, marginLeft: 8}}>
                <Ionicon name="arrow-back" size={24} color="#ffffff" />
            </TouchableOpacity>
        </View>
        {postLoadError ? <PostsLoadError onReload={reloadPost} /> : <View style={{flex: 1}}>
            {isPostLoading
            ?
            <View style={{flex: 1, justifyContent: "center"}}>
                <ActivityIndicator size="large" color="#000000" />
            </View>
            :
            <View>
                <Slider images={postData?.photos} />
                <View style={{flexDirection: "row", justifyContent: "space-between", marginHorizontal: 8, marginTop: 8}}>
                    <Text style={styles.info}>{postData?.name}</Text>
                    <Text style={styles.info}>{postData?.company}</Text>
                </View>
                <View style={styles.wrapper}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.desc}>{body}</Text>
                </View>
            </View>}
        </View>}
    </ScrollView>;
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: "#ffffff"
    },
    wrapper: {
        paddingHorizontal: 16,
        paddingVertical: 8
    },
    title: {
        fontFamily: useFont(700),
        color: "#121212",
        fontSize: 24
    },
    desc: {
        fontFamily: useFont(500),
        color: "#484848",
        fontSize: 16,
        marginTop: 16
    },
    info: {
        fontFamily: useFont(500),
        color: "#8e8e8e",
        fontSize: 12
    }
});

export default PostScreen;