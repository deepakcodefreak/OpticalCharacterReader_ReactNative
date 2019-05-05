import React from 'react';
import {TextInput,StyleSheet} from 'react-native';


const defaultInput = (props)=>{
    // console.log(props.valid)
   return(
    <TextInput 
        underlineColorAndroid="transparent"
        placeholderTextColor="white"
        {...props}
        style={[styles.input,props.style,
            !props.valid && props.touched
            ?styles.invalid
            :null
        ]} 
    />
   )
}

export default defaultInput;


const styles = StyleSheet.create({ 
    input:{
        width:"100%",
        borderWidth:1,
        borderColor:"#eee",
        padding:5,
        marginTop:8,
        marginBottom:8
    },
    invalid:{
        backgroundColor:'#f9c0c0',
        borderColor:'red',
        borderWidth:1,
        padding:5
    }
})
