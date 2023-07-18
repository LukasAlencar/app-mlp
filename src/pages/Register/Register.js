import React from 'react'
import { KeyboardAvoidingView, View, StyleSheet,TouchableOpacity, Text, Image, TextInput} from 'react-native'

    export default Register = ({ navigation }) => {
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
                        onChangeText={()=>{}}
                    />
                    <TextInput
                        style={styles.input}
                         placeholder='Email'
                         autoCorrect={false}
                         onChangeText={()=>{}}
                    />
                    <TextInput
                        style={styles.input}
                         placeholder='Senha'
                         autoCorrect={false}
                         onChangeText={()=>{}}
                    />

                    <TouchableOpacity onPress={()=>{navigation.navigate('Login')}} style={styles.btnSubmit}>
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
        }

    })