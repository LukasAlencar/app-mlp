import React from 'react'
import { View, StyleSheet, Text, StatusBar } from 'react-native'
import ListComponent from '../ListComponent/'
    export default Question = () => {
        return (
            <View style={styles.container}>
                <ListComponent type='chat'/>
            </View>
        )
    }

    const styles = StyleSheet.create({
        container:{
        }
    })