import React, { useState } from 'react'
import { View, StyleSheet, Text, StatusBar, SafeAreaView, ScrollView } from 'react-native'
import Header from '../../components/Header'
import Teachings from '../../components/Teachings';
import Schedules from '../../components/Schedules';

    export default Home = () => {

        const [marksDate, setMarksDate] = useState({});
        const [refreshCalender, setRefreshCalender] = useState(false);

        return (

        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.container}>
                <Header/>
                <Teachings/>
                <Schedules/>
            </ScrollView>
        </SafeAreaView>
        )
}
    const styles = StyleSheet.create({
        container:{
            flex: 1,
            backgroundColor:'#10151f'
        },

    })

    