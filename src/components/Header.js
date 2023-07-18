import React from 'react'
import { View, StyleSheet, Text, StatusBar, Image, TouchableOpacity} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

    const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 60; 
    export default Header = () => {
        return (
                <View style={styles.header}>
                    <Image style={styles.logo} source={require('../../assets/logomlp.png')}/>
                    <View style={{marginLeft: 20}}>
                        <Text style={styles.textLogo}>Ministério</Text>
                        <Text style={styles.textMin}>Luz da Palavra</Text>
                    </View>
                </View>
        )
    }

    const styles = StyleSheet.create({
        header:{
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: "#000",
            paddingTop: statusBarHeight + 10,
            paddingBottom: 20,
            alignItems: 'center',
            flex: 1,
        },
        textLogo:{
            color:'#fff',
            width: 90,
        },
        textMin:{
            color:'#fff',
            width: 100,
        },
        logo:{
            width: 80,
            height: 58,
        },
        menuIcon:{
            fontSize: 40,
            color: '#fff',
            marginEnd: 20,
        }
        
    })