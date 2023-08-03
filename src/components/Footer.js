import React from 'react'
import { View, StyleSheet, Text, StatusBar, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons';
import * as Linking from 'expo-linking';

    export default Footer = () => {
        return (
            <View style={styles.container}>
                <View style={styles.iconsContent}>
                <TouchableOpacity>
                    <Feather onPress={()=> Linking.openURL('https://www.youtube.com/@IgrejaLuzDaPalavra')} style={styles.icons} name="youtube" size={24} color="red" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Feather onPress={()=> Linking.openURL('https://www.instagram.com/igrejaluzdapalavra/')} style={styles.icons} name="instagram" size={24} color="#D53E86" />
                </TouchableOpacity>
                </View>
            </View>
        )
    }

    const styles = StyleSheet.create({
        container:{
            backgroundColor: '#10151f',
            height: 60,
            width: '100%',
            justifyContent: 'center'
        },
        iconsContent:{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems:'center',
        },
        icons:{
            textAlign:'center'

        },
        texts:{
           color: '#4f4f4f',
            textAlign:'center'
        }
    })