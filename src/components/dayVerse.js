import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, StatusBar, ScrollView, TouchableOpacity, Linking } from 'react-native'
import moment from 'moment';
import axios from 'axios';

    export default dayVerse = () => {
        const [currentDate, setCurrentDate] = useState('');
        const [dayVerse, setDayVerse] = useState({})
        useEffect(() => {
            let date = moment().date()
            axios.get(`https://api-mlp.vercel.app/api/dayverse/${date}`).then((response) => {
                setDayVerse(response.data)
            });
          }, []);

        function openVerse(){
            Linking.openURL(`https://www.biblegateway.com/passage/?search=${dayVerse.verse}&version=ARC`)
        }

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.textTitle}>
                        Versículo Diário: 
                    </Text>
                </View>
                <View style={styles.main}>
                    <TouchableOpacity onPress={()=>{openVerse()}}>
                        <Text style={styles.verse}>
                            {dayVerse.verse}
                        </Text>
                    </TouchableOpacity>
                    <ScrollView style={styles.contentDesc}>
                        <Text style={styles.descVerse}>
                            {dayVerse.desc}
                        </Text>
                    </ScrollView>
                </View>
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
        header:{
            alignItems:'center',
            justifyContent: 'center'
        },
        textTitle:{
            color: '#5c5c5c',
            backgroundColor: '#10151f',
            paddingTop: 20,
            fontSize: 20,
            paddingBottom: 20,
            borderRadius: 20,
            textAlign: 'center'
        },
        main:{
            justifyContent: 'center',
            alignItems: 'center',
        },
        verse:{
            color: '#b8a24b',
            fontSize: 20,
            textAlign: 'center',
            textDecorationStyle: 'solid',
            textDecorationLine: 'underline'
        },
        contentDesc:{
        },
        descVerse:{
            color: '#fff',
            fontSize: 17,
            padding: 20,
            textAlign: 'justify',
        }
    })