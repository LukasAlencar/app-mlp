import { getAuth, signOut } from 'firebase/auth'
import React, { useEffect } from 'react'
import { View, StyleSheet, Text, StatusBar, TouchableOpacity } from 'react-native'

    export default Offers = ({navigation}) => {

        return (
            <View style={styles.container}>
                <Text style={styles.textTitle}>Ofertas</Text>
                <TouchableOpacity onPress={()=>{
                const auth = getAuth();
                    signOut(auth)
                    navigation.navigate('Login')
                }}>
                    <Text style={{color:'white'}}>Sair</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const styles = StyleSheet.create({
        container:{
            backgroundColor: '#10151f',
            flex: 1,
            width: '90%',
            borderRadius: 20,
            marginBottom: 20,
            overflow: 'hidden',
        },
        textTitle:{
            color: '#5c5c5c',
            backgroundColor: '#10151f',
            paddingTop: 20,
            fontSize: 20,
            paddingBottom: 20,
            borderRadius: 20,
            textAlign:'center',
        },
    })