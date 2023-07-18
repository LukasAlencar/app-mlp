import React from 'react'
import { View, StyleSheet, Text, StatusBar, TouchableOpacity, useWindowDimensions } from 'react-native'
import Animated, {FadeInUp, FadeOutDown, FadeOutUp,RollOutRight} from 'react-native-reanimated'

    export default ListComponent = ({items , toggleModal, type}) => {
    const {width} = useWindowDimensions();

        if (type == 'teaching'){
            return (
                <>
                    {items.map(el => {
                        return (
                            <Animated.View key={el.title}>
                                <Text key={el.title} style={styles.textTitleTeaching}>{el.title}</Text>
                                {el.datas.map((data) => {
                                    return <TouchableOpacity onPress={()=> toggleModal(data)} key={data.id} activeOpacity={.9}><Text style={styles.textTeaching}>{data.teachingTitle}</Text></TouchableOpacity>
                                })}
                            </Animated.View>
                        )
                    })}
                </>
            )
        }else if(type == 'schedule'){
            return (
                <>
                    {items.map(el => {
                        if(el.datas[0].desc){
                            return (
                                <Animated.View key={el.day} style={styles.contentSchedule}>
                                    <View style={styles.contentTitle}><Text style={styles.textTitleSchedule}>{el.day}</Text></View>
                                    <View key={el.day}>
                                        {el.datas.map((data) => {
                                            {
                                                if(data.desc){
                                                    return <TouchableOpacity style={{width: width}} key={data.id} activeOpacity={.9}><Text style={styles.textSchedule}>{data.desc}, {data.hour}</Text></TouchableOpacity>
                                                }
                                            }
                                        })}
                                    </View>
                                </Animated.View>
                            )
                        }
                    })}
                </>
            )
        }
    }

    const styles = StyleSheet.create({
        contentSchedule:{
            flex: 1,
            backgroundColor: '#10151f',
            alignItems:'center',
            flexDirection:'row',
        },
        contentTeaching:{
            flex: 1,
            backgroundColor: '#10151f',
        },
        contentTitle:{
            flexDirection:'row',
            alignItems:'center',
            backgroundColor: '#20242e',
            height: '100%',
            borderWidth: 1,

        },
        textTitleTeaching:{
            fontSize: 16,
            fontWeight: 'bold',
            color: '#4f4f4f',
            backgroundColor: '#20242e',
            justifyContent: 'center',
            paddingLeft: 20,
        },
        textTitleSchedule:{
            fontSize: 16,
            fontWeight: 'bold',
            color: '#4f4f4f',
            backgroundColor: '#20242e',
            width: 100,
            justifyContent: 'center',
            textAlign: 'center',
        },
        textSchedule:{
            backgroundColor: '#10151f',
            fontSize: 15,
            padding: 20,
            color: '#fff',
            borderWidth: 1,
        },
        textTeaching:{
            backgroundColor: '#10151f',
            fontSize: 18,
            padding: 20,
            color: '#fff',
            borderWidth: 1,
        }


    })