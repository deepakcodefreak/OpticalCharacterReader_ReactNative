import React from 'react';
import {
    TouchableOpacity,
    TouchableNativeFeedback,
    Text,
    View,
    StyleSheet,
    Platform
} from 'react-native'


const buttonWithBackground = props => {
    const content = (
        <View style={[styles.button,{backgroundColor:props.color}]}>
                <Text>{props.children}</Text>
            </View>
    )
    if(Platform.OS === "android"){
        return (
            <TouchableNativeFeedback onPress={props.onPress}>
                {content}
            </TouchableNativeFeedback>
        )
    }

    return (
        <TouchableOpacity onPress={props.onPress}>
            {content}        
        </TouchableOpacity>
    )
}

export default buttonWithBackground;