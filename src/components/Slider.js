import React, { useState } from "react";
import { ScrollView, View, StyleSheet, Dimensions, Image, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import useFont from "../hooks/useFont";

const screenWidth = Dimensions.get("screen").width;

const Item = React.memo(({ uri }) => {
    return <Image source={{uri}} resizeMode="cover" style={styles.img} />;
}, (prev, next) => prev.uri == next.uri);

const Slider = ({ images }) => {

    const [currentImage, setCurrentImage] = useState(0);

    const scrollHandler = e => {
        setCurrentImage(Math.floor(e.nativeEvent.contentOffset.x / screenWidth + 0.5));
    };

    if (!images) return null;
    return <View style={styles.body}>
        <ScrollView
            onScrollEndDrag={scrollHandler}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
        >
            {images.map(item => <Item uri={item.uri} key={item.id.toString()} />)}
        </ScrollView>
        <LinearGradient colors={["transparent", "#000000"]} style={styles.linearGradient}>
            <Text style={styles.number}>{currentImage + 1}/{images.length}</Text>
        </LinearGradient>
    </View>;
};

const styles = StyleSheet.create({
    img: {
        width: screenWidth,
        height: screenWidth * 0.75
    },
    linearGradient: {
        height: 40,
        width: screenWidth,
        position: "absolute",
        bottom: 0,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    number: {
        fontFamily: useFont(600),
        color: "#ffffff",
        fontSize: 22
    }
});

export default Slider;