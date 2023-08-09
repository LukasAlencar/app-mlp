import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, View, StyleSheet,TouchableOpacity, Text, Image, TextInput, Vibration, Alert, ActivityIndicator} from 'react-native'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import notifee, { AndroidImportance } from '@notifee/react-native';
import { Feather } from '@expo/vector-icons';
import { auth } from '../../../firebaseConfig';

    export default Login = ({ navigation }) => {

        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')
        const [seePassword, setSeePassword] = useState(false)
        const [user, setUser] = useState(null);
        const [errorText, setErrorText] = useState('');
        const [loadingUser, setLoadingUser] = useState(true)

        onAuthStateChanged(auth, (user)=>{
            if(user){
                navigation.navigate('Home', {
                    userLog: JSON.stringify(user),
                })
            }else{
                setLoadingUser(false)
            }
        })

        useEffect(()=>{
            const auth = getAuth();
            const subscriber = onAuthStateChanged(auth, setUser);
            
            return subscriber;

        },[])
        async function displayNotification(){
            await notifee.requestPermission();
            const channelId = await notifee.createChannel({
                id: 'test',
                name: 'MLP',
                vibration: true,
                importance: AndroidImportance.HIGH
            });

            await notifee.displayNotification({
                id: '7',
                title: 'Já leu hoje?',
                body: 'Já leu o versiculo diario?',
                android:{ channelId }
            })
        }

        // useEffect(() => {
        //     displayNotification();
        // }, [])

        const loginUser = () =>{
            const auth = getAuth();
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if(errorCode== 'auth/wrong-password'){
                    setErrorText('Senha incorreta');
                }else if(errorCode == 'auth/invalid-email'){
                    setErrorText('Email Inválido');
                }else if(errorCode == 'auth/user-not-found'){
                    setErrorText('Usuário não encontrado');
                }else{
                    Alert.alert(errorCode)
                }
            });

            if(user){
                navigation.navigate('Home', {
                    userLog: JSON.stringify(user),
                })
            }
        }

        if(!loadingUser){
            return (
                <KeyboardAvoidingView style={styles.background}>
                    <View style={styles.containerLogo}>
                        <Image
                            source={require('../../../assets/logomlp.png')}
                        />
                        <Text style={styles.textLogo}>Ministério Luz da Palavra</Text>
                    </View>
                    <View style={styles.container}>
                        <View style={styles.errorArea}>
                            {errorText && <Text style={styles.errorText}>{errorText}</Text>}
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder='Email'
                            autoCorrect={false}
                            onChangeText={(e)=>{setEmail(e)}}
                        />

                        <View style={styles.inputPasswordArea}>
                            <TextInput
                                style={styles.inputPassword}
                                placeholder='Senha'
                                autoCorrect={false}
                                onChangeText={(e)=>{setPassword(e)}}
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
                        {/* ()=>{navigation.navigate('Home')} */}
                        <TouchableOpacity onPress={loginUser} style={styles.btnSubmit}>
                            <Text style={styles.loginText}>Acessar</Text>
                        </TouchableOpacity>
                        <View style={styles.contentNotAccount}>
                            <Text style={styles.registerText}>Não possui uma conta? </Text>
                            <TouchableOpacity onPress={()=>{navigation.navigate('Register')}} style={styles.btnRegister}>
                                <Text style={styles.registerTextLink}>Criar conta gratuita</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            )
        }else{
            return(
                <KeyboardAvoidingView style={styles.background}>
                    <View style={styles.containerLogo}>
                        <Image
                            source={require('../../../assets/logomlp.png')}
                        />
                        <Text style={styles.textLogo}>Ministério Luz da Palavra</Text>
                        <ActivityIndicator style={{marginTop:20}} color={'#FEDD58'}/>
                    </View>
                </KeyboardAvoidingView>
            )
            
        }
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
        iconEye:{
            color: 'gray',
            marginLeft: -15,
        },
        errorText:{
            color:'red',
            fontSize: 15,
        },
        errorArea:{
            textAlign: 'left',
            width: '100%',
            marginLeft: 35,
            marginBottom: 10
        }

    })