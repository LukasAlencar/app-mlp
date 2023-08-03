import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, StatusBar, SafeAreaView, ScrollView } from 'react-native'
import Header from '../../components/Header'
import Teachings from '../../components/Teachings';
import Schedules from '../../components/Schedules';
import DayVerse from '../../components/dayVerse';
import Footer from '../../components/Footer';
import Offers from '../../components/Offers';
import Chat from '../../components/Chat';
    export default Home = ({route, navigation}) => {
        const { userLog } = route.params;
        const [marksDate, setMarksDate] = useState({});
        const [refreshCalender, setRefreshCalender] = useState(false);
        const [dados, setDados] = useState([])
        const [user, setUser] = useState(userLog);
        

        useEffect(()=>{
        },[])

        return (

        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.container}>
                <View style={styles.containerHeader}>
                    <Header/>
                </View>
                <View style={styles.containerMain}>
                    <Schedules/>
                    <Teachings style={styles.containerTeachings}/>
                    <DayVerse/>
                    {dados.map((item)=>{
                        return <Text>{item.nome}</Text>
                    })}
                    <Chat/>
                </View>
            </ScrollView>
            <View style={styles.containerFooter}>
                <Footer/>
            </View>
           
        </SafeAreaView>
        )
}
    const styles = StyleSheet.create({
        container:{
            flex: 1,
            backgroundColor:'#000',
        },
        containerMain:{
            flex: 1,
            backgroundColor:'#000',
            alignItems: 'center',
            width: '100%',
        },
        containerFooter:{
        },

    })

    