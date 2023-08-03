import { React, useEffect, useState } from 'react'
import { View, StyleSheet, Text, SectionList, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import ModalComponent from './ModalComponent';
import ListComponent from './ListComponent';
import Animated, { FadeInUp, FadeOut, FadeOutUp, SlideOutDown, SlideOutUp } from 'react-native-reanimated';
import axios from 'axios';

    export default Schedules = () => {
        const [isModalVisible, setModalVisible] = useState(false);
        const [selected, setSelected] = useState('')
        const [isTeachingVisible, setIsTeachingVisible] = useState(true)
        const [sections, setSections] = useState([])
        const [isLoading, setIsLoading] = useState(true)

        useEffect(()=>{
            loadData();
        },[]);

        async function loadData(){
            await axios.get(`https://api-mlp.vercel.app/api/schedules`).then((response) => {
                setSections(response.data.datas);
            }).finally(()=>{
                setIsLoading(false);
            });
        }
        
        const toggleModal = (item) => {
            setSelected(item);
            setModalVisible(!isModalVisible);
        };

        return (
            <View  style={styles.container}>
                <TouchableOpacity onPress={() => {setIsTeachingVisible(!isTeachingVisible)}} activeOpacity={.9}>
                    <Text style={styles.textTitle}>
                        Programação Semanal: {!isTeachingVisible || isLoading ? <Entypo style={{color: 'white'}} name="chevron-down" size={24} color="black" /> : <Entypo style={{color: 'white'}} name="chevron-up" size={24} color="black" />}
                    </Text>
                </TouchableOpacity>
                {isLoading && <ActivityIndicator style={{paddingBottom: 25}} color={'gray'}/>}
                {isTeachingVisible && 
                <Animated.View                          
                    entering={FadeInUp}
                    contentContainerStyle={{ flex: 1 }}
                    >
                    
                        <ListComponent type={'schedule'}  items={sections}></ListComponent>
                </Animated.View> }
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
            paddingLeft: 20,
            paddingTop: 20,
            fontSize: 20,
            paddingBottom: 20,
            borderRadius: 20,

        },
        sectionHeader: {
            paddingTop: 2,
            paddingLeft: 10,
            paddingRight: 10,
            paddingBottom: 2,
            fontSize: 14,
            fontWeight: 'bold',
            backgroundColor: '#1f1f1f',
            color: '#5c5c5c',
          },
          item: {
            padding: 10,
            fontSize: 18,
            height: 44,
            backgroundColor: '#10151f',
            color: '#fff',
          },

    })