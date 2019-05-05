import React from 'react';
import {Dimensions,View,Text,Button,TextInput,StyleSheet,ImageBackground,KeyboardAvoidingView,Keyboard,TouchableWithoutFeedback} from 'react-native';
import DefaultInput from '../components/UI/DefaultInput/DefaultInput'
import HeadingText from '../components/UI/HeadingText/HeadingText';
import BackgroundImage from '../../assests/background.jpg';
import Icon from 'react-native-vector-icons/Ionicons';
import validate from '../utility/validation';




class Auth extends React.Component{

    state = {
       viewMode:Dimensions.get('window').height > 500 ? "portrait" : "landscape",
       authMode:"login", 
       controls:{
        email:{
            value:"",
            valid:false,
            validationRules:{
                isEmail:true
            },
            touched:false
        },
        password:{
            value:"",
            valid:false,
            validationRules:{
                minLength:6
            },
            touched:false
        },
        confirmPassword:{
            value:"",
            valid:false,
            validationRules:{
                equalTo:'password'
            },
            touched:false
        }
       } 
    }

    static navigationOptions = {
        title:"Log In | Sign Up"
    }

    constructor(props){
        super(props);
        Dimensions.addEventListener("change",this.updateStyles)
    }


    updateInputState = (key,value)=>{
        let connectedValue = {};

        if(this.state.controls[key].validationRules.equalTo){
            let equalControl = this.state.controls[key].validationRules.equalTo;
            const equalValue = this.state.controls[equalControl].value;
            connectedValue = {
                ...connectedValue,
                equalTo:equalValue
            }
        }

        if(key === "password"){
            connectedValue = {
                ...connectedValue,
                equalTo:value
            }
        }

        this.setState(prevState => {
            return {
                
                controls:{
                    ...prevState.controls,
                    confirmPassword:{
                        ...prevState.controls.confirmPassword,
                        valid : 
                        key === "password"? validate(
                            prevState.controls.confirmPassword.value,
                            prevState.controls.confirmPassword.validationRules,
                            connectedValue)
                            :prevState.controls.confirmPassword.valid
                    },
                    [key]:{
                        ...prevState.controls[key],
                        value:value,
                        valid:validate(value,prevState.controls[key].validationRules,connectedValue),
                        touched:true
                    }
                    
                }
            }
        })
      
    }

    componentWillUnmount(){
        Dimensions.removeEventListener("change",this.updateStyles)
    }

    updateStyles = (dims)=>{
        this.setState({
            viewMode:dims.window.height > 500 ? "portrait" : "landscape"
         })
    }

   
    loginHandler = ()=>{
        const authData = {
            email:this.state.controls.email.value,
            password:this.state.controls.password.value
        }
       
        this.props.navigation.navigate('ImagePicker')
    }  

    authSwitchHandler = ()=>{
        this.setState({
            authMode:this.state.authMode === "login"?"signup":"login"
        })
    }

    render(){
        let confirmPasswordControl = null;
        if(this.state.authMode === "signup"){
            confirmPasswordControl = (
                                <View style={this.state.viewMode === "portrait"?styles.portraitPasswordWrapper:styles.landscapePasswordWrapper}>
                                    <DefaultInput 
                                        placeholder="Confirm User Password" 
                                        style={styles.input}
                                        value={this.state.controls.confirmPassword.value}
                                        onChangeText={(val)=>this.updateInputState('confirmPassword',val)}
                                        valid={this.state.controls.confirmPassword.valid}
                                        touched={this.state.controls.confirmPassword.touched}
                                        secureTextEntry
                                    />
                                </View>
            )
        }
        return(
            <ImageBackground source={BackgroundImage} style={{width: '100%', height: '100%'}}>
                <KeyboardAvoidingView style={styles.container} behavior="padding">
                    {/* <Icon name="ios-log-in" size={80} style={{color:"white"}}/> */}
                    <Button 
                      title={this.state.authMode === "login"?"Sign Up":"Log In"} 
                      onPress={()=>this.authSwitchHandler()}
                     />
                     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.inputContainer}>
                                <DefaultInput 
                                    placeholder="Your Email Address Here" 
                                    valid={this.state.controls.email.valid}
                                    style={styles.input}
                                    value={this.state.controls.email.value}
                                    onChangeText = {(val)=>this.updateInputState('email',val)}
                                    touched={this.state.controls.email.touched}
                                    autoCaptilize="none"
                                    autoCorrect={false}
                                    keyboardtype="email-address"
                                />
                                <View style={this.state.viewMode === "portrait" || this.state.authMode === "login"
                                    ?styles.portraitPasswordContainer
                                    :styles.landscapePasswordContainer}
                                >
                                    <View style={this.state.viewMode === "portrait" || this.state.authMode === "login"
                                        ?styles.portraitPasswordWrapper
                                        :styles.landscapePasswordWrapper}
                                    >
                                    <DefaultInput 
                                        placeholder="User Password" 
                                        style={styles.input}
                                        valid={this.state.controls.password.valid}
                                        value={this.state.controls.password.value}
                                        onChangeText={(val)=>this.updateInputState('password',val)}
                                        touched={this.state.controls.password.touched}
                                        secureTextEntry
                                    />
                                </View>
                                {confirmPasswordControl}
                            </View>
                          </View>
                        </TouchableWithoutFeedback>
                    <Button 
                        title="Submit" 
                        onPress={()=>this.loginHandler()}
                        disabled={
                            !this.state.controls.email.valid  
                            || !this.state.controls.password.valid || 
                            !this.state.controls.confirmPassword.valid && this.state.authMode ==="signup"
                        }    
                    />
                </KeyboardAvoidingView>
           </ImageBackground>
        )
    }
}



// let AuthContainer = connect(null,{tryAuth})(Auth);
export default Auth;

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        borderColor:"red"
    },
    input:{
       borderRadius:20,
    },
    inputContainer:{
        width:"80%"
    },
    headingText:{
        fontSize:28,
        fontWeight:"bold"
    },
    portraitPasswordContainer:{
        flexDirection:"column",
        justifyContent:"flex-start"
    },
    landscapePasswordContainer:{
        flexDirection:"row",
        justifyContent:"space-between"
    },
    portaitPasswordWrapper:{
        width:"100%"
    },
    landscapePasswordWrapper:{
        width:"45%"
    }
})
