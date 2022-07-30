import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "react-native";

import AuthScreen from "./screens/AuthScreen";
import HomeScreen from "./screens/HomeScreen";
import PostScreen from "./screens/PostScreen";

const Stack = createNativeStackNavigator();

const App = () => {
    return <NavigationContainer>
        <StatusBar backgroundColor="#485460" />
        <Stack.Navigator screenOptions={{headerShown: false, animation: "none"}}>
            <Stack.Screen name="Auth" component={AuthScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Post" component={PostScreen} />
        </Stack.Navigator>
    </NavigationContainer>;
};

export default App;