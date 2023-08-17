import React, { useState } from 'react'
import { KeyboardAvoidingView, View, StyleSheet,TouchableOpacity, Text, Image, TextInput} from 'react-native'
import { FIRESTORE_DB } from '../../../firebaseConfig.js'
import { addDoc, collection } from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Feather } from '@expo/vector-icons';

    export default Register = ({ navigation }) => {
        const [email, setEmail] = useState('')
        const [name, setName] = useState('')
        const [password, setPassword] = useState('')
        const [correctEmail, setCorrectEmail] = useState('')
        const [correctPassword, setCorrectPassword] = useState('')
        const [seePassword, setSeePassword] = useState(false)
        const [showPasswordMessage, setShowPasswordMessage] = useState(false)
        const [showEmailMessage , setShowEmailMessage] = useState(false)

        const addTodo = async ()=> {
            const doc = addDoc(collection(FIRESTORE_DB, ''), {title:'Im a test', done: false})
        }


        const createUser =() =>{
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                updateProfile(userCredential.user, {
                    displayName: name,
                    photoURL: 'https://png.pngtree.com/png-vector/20190710/ourlarge/pngtree-user-vector-avatar-png-image_1541962.jpg'
                })
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
                // ..
            });

        }

        function validateEmail(text){
            if (text.indexOf('@') != -1 && text[0] != '@' && text[text.length - 1] != '@'){
                setCorrectEmail(true);
                setShowEmailMessage(false);
            }else{
                setCorrectEmail(false);
                setShowEmailMessage(true);
            }
            setEmail(text)
        }

        function validatePassword(text){
            if(text.length >= 7 && /[A-Z]/.test(text)){
                setCorrectPassword(true)
                setShowPasswordMessage(false)
            }else{
                setCorrectPassword(false)
                setShowPasswordMessage(true)
            }
            setPassword(text)
        }

        const validateRegister = () => {
            if(correctPassword && correctEmail){
                createUser()
            }
        }

        return (
            <KeyboardAvoidingView style={styles.background}>
                <View style={styles.containerLogo}>
                    <Image
                        source={require('../../../assets/logomlp.png')}
                    />
                    <Text style={styles.textLogo}>Ministério Luz da Palavra</Text>
                </View>
                <View style={styles.container}>
                    <TextInput
                        style={styles.input}
                        placeholder='Nome'
                        autoCorrect={false}
                        onChangeText={(e)=>{setName(e)}}
                    />
                    <TextInput
                        style={[styles.input, correctEmail ? styles.inputRightArea : styles.inputWrongArea]}
                         placeholder='Email'
                         autoCorrect={false}
                         onChangeText={(e)=>{validateEmail(e)}}
                    />
                    {showEmailMessage && <Text style={styles.passwordError}>Email Inválido</Text>}
                    <View style={[styles.inputPasswordArea, correctPassword ? styles.inputRightArea : styles.inputWrongArea]}>
                        <TextInput
                        style={styles.inputPassword}
                        placeholder='Senha'
                        autoCorrect={false}
                        onChangeText={(e)=>{validatePassword(e)}}
                        secureTextEntry={!seePassword}
                        /> 
                        {!seePassword ? 
                        <TouchableOpacity onPress={()=>{setSeePassword(!seePassword)}} style={styles.iconEye}>
                            <Feather style={styles.iconEye}  name="eye" size={24} />
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={()=>{setSeePassword(!seePassword)}} style={styles.iconEye}>
                            <Feather style={styles.iconEye}  name="eye-off" size={24} />
                        </TouchableOpacity>
                        }
                    </View> 
                    {showPasswordMessage && <Text style={styles.passwordError}>A senha deve ter no mínimo 8 caracteres e uma letra maiúscula</Text>}
                    <TouchableOpacity onPress={validateRegister} style={styles.btnSubmit}>
                        <Text style={styles.loginText}>Cadastrar</Text>
                    </TouchableOpacity>
                    <View style={styles.contentNotAccount}>
                        <Text style={styles.registerText}>Já possui uma conta? </Text>
                        <TouchableOpacity onPress={()=>{navigation.navigate('Login')}} style={styles.btnRegister}>
                            <Text style={styles.registerTextLink}>Faça Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        )
    }

    const styles = StyleSheet.create({
        background:{
            flex: 1,
            backgroundColor:'black',
            alignItems: 'center',
            justifyContent: 'center',
        },
        textLogo:{
            color:'#fff',
            textAlign: 'center',
            fontSize: 20
        },
        containerLogo:{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        container:{
            flex:1,
            alignItems: 'center',
            justifyContent: 'center',
            width: '90%',
        },
        input:{
            backgroundColor: 'white',
            width: '90%',
            marginBottom: 15,
            color: '#222',
            fontSize: 17,
            borderRadius: 7,
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
        },
        passwordError:{
            color: 'red',
            width: '80%',
            textAlign: 'left',
            marginBottom: 20,
            marginLeft: -30,
            marginTop: -10,
        },

        containerMain:{
            flex: 1,
        },
        btnSubmit:{
            backgroundColor:'#FEDD58',
            borderRadius: 7,
            width: '90%',
            height: 45,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 10
        },
        btnRegister:{
            borderRadius: 5,
        },
        registerText:{
            color: '#fff',
            textAlign: 'center',
        },
        registerTextLink:{
            color: '#4287f5',
            textAlign: 'center',
            fontWeight: 'bold'
        },
        loginText:{
            color: '#000',
            textAlign: 'center',
            fontWeight: 'bold'
        },
        contentNotAccount:{
            flexDirection: 'row'
        },
        inputPasswordArea:{
            flexDirection: 'row',
            backgroundColor: 'white',
            width: '90%',
            marginBottom: 15,
            color: '#222',
            fontSize: 17,
            borderRadius: 7,
            padding: 10,
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        inputPassword:{
            color: '#222',
            fontSize: 17,
            width: '100%'
        },
        inputWrongArea:{
            flexDirection: 'row',
            backgroundColor: 'white',
            width: '90%',
            marginBottom: 15,
            color: '#222',
            fontSize: 17,
            borderRadius: 7,
            borderColor: '#eb4034',
            padding: 10,
            alignItems: 'center',
            justifyContent: 'space-between',
            borderWidth: 2,
        },
        inputRightArea:{
            flexDirection: 'row',
            backgroundColor: 'white',
            width: '90%',
            marginBottom: 15,
            color: '#222',
            fontSize: 17,
            borderRadius: 7,
            borderColor: '#63f291',
            padding: 10,
            alignItems: 'center',
            justifyContent: 'space-between',
            borderWidth: 2,
        },
        iconEye:{
            color: 'gray',
            marginLeft: -15,
        }

    })