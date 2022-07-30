import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList, Text, View, StyleSheet, Pressable } from "react-native";
import useFont from "../hooks/useFont";

const Item = React.memo(({ title, id, userId, body, isLast }) => {

    const navigation = useNavigation();

    return <Pressable
        style={styles.body}
        android_ripple={{color: "#d0d0d0"}}
        onPress={() => navigation.navigate("Post", {title, body, id, userId})}
    >
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <Text style={styles.desc} numberOfLines={2}>{body}</Text>
        {!isLast && <View style={styles.line} />}
    </Pressable>;
}, (prev, next) => prev.id == next.id);

const PostsList = ({ data }) => {
    if (!data) return null;
    return <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item, index }) => <Item {...item} isLast={index == data.length - 1} />}
        contentContainerStyle={{paddingVertical: 8}}
    />
};

const styles = StyleSheet.create({
    body: {
        paddingHorizontal: 16,
        paddingTop: 4
    },
    line: {
        width: 120,
        height: 3,
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        borderRadius: 1.5,
        alignSelf: "center",
        marginTop: 4
    },
    title: {
        fontSize: 18,
        fontFamily: useFont(700),
        color: "#121212",
        lineHeight: 22
    },
    desc: {
        fontFamily: useFont(500),
        color: "#484848",
        lineHeight: 18,
        marginTop: 4
    }
});

export default PostsList;