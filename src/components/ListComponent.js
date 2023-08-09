import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, StatusBar, TouchableOpacity, useWindowDimensions, Image, ImageBackground } from 'react-native'
import Animated, {FadeInUp, FadeOutDown, FadeOutUp,RollOutRight} from 'react-native-reanimated'
import { FIRESTORE_DB, auth } from '../../firebaseConfig'
import { collection, getDocs, onSnapshot, snapshotEqual } from "firebase/firestore";
import useLoadDocs from '../hooks/useLoadDocs';

    export default ListComponent = ({items , toggleModal, type}) => {    

    const {width} = useWindowDimensions();

        if (type == 'teaching'){
            return (
                <>
                    <Animated.View>
                    {items.map(el => {
                        return (
                            <View key={el.title}>
                                <Text style={styles.textTitleTeaching}>{el.title}</Text>
                                {el.datas.map((data) => {
                                    return <TouchableOpacity onPress={()=> toggleModal(data)} key={data.id} activeOpacity={.9}><Text style={styles.textTeaching}>{data.teachingTitle}</Text></TouchableOpacity>
                                })}
                            </View>
                        )
                    })}
                    </Animated.View>
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
                                    <View style={{width: '100%'}} key={el.day}>
                                        {el.datas.map((data) => {
                                            {
                                                if(data.desc){
                                                    return <TouchableOpacity style={{flex: 1, width: "100%"}} key={data.id} activeOpacity={.9}><Text style={styles.textSchedule}>{data.desc}, {data.hour}</Text></TouchableOpacity>
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
        }else if (type == 'chat'){
            const aux = useLoadDocs('Questions')
            const [activeResponsesView, setActiveResponsesView] = useState([])
            var docs = []
            if(aux != undefined){
                docs = aux[0]
            }

            function handleActiveResponseView(index){
                if(activeResponsesView.indexOf(index) == -1){
                    setActiveResponsesView(prevList => [...prevList, index])
                }else{
                    let indexOf = activeResponsesView.indexOf(index)
                    var listAux = [...activeResponsesView]
                    listAux.splice(indexOf, 1)
                    setActiveResponsesView(listAux)
                }
            }
            
            return (
                <>
                    {docs?.question?.slice().reverse().map((question, index) => {

                        const isVisible = true;
                        return(
                            
                                <Animated.View key={index} style={styles.contentChat}>
                                    <View style={styles.viewQuestions}>

                                        {question.question.imgUserQuesting 
                                            ? <View style={styles.userImage}><ImageBackground style={styles.bgImage} source={{uri: question.question.imgUserQuesting}} resizeMode="cover"/></View>
                                            : <View style={styles.userImage}><ImageBackground style={styles.bgImage} source={require('../../assets/user.png')} resizeMode="cover"/></View>
                                        }
                                        <View style={{maxWidth: '83%'}}>
                                            <TouchableOpacity style={{flex: 1, width: "100%", marginLeft: 15}} activeOpacity={.9}><Text style={styles.userName}>{question.question.questing}</Text></TouchableOpacity>
                                            <TouchableOpacity style={{flex: 1, width: "100%", marginLeft: 15}} activeOpacity={.9}><Text style={styles.userQuestion}>{question.question.question}</Text></TouchableOpacity>
                                            <TouchableOpacity onPress={()=>{handleActiveResponseView(index)}} style={{flex: 1, width: "100%", marginLeft: 15}} activeOpacity={.9}><Text style={styles.responsesText}>
                                            {question.responses.length > 1 && <>{question.responses.length} respostas</>}
                                            {question.responses.length == 0 && <></>}   
                                            {question.responses.length == 1 && <>{question.responses.length} resposta</>}   
                                            </Text></TouchableOpacity>
                                        </View>
                                    </View>
                                    {activeResponsesView.indexOf(index) != -1 && 
                                        <View style={styles.viewResponses}>
                                            {question.responses.map((response, i) => {
                                                return (
                                                    <View key={i} style={styles.innerResponses}>
                                                        <View style={styles.teacherImage}></View>
                                                        <View style={{maxWidth: '83%'}}>
                                                            <TouchableOpacity style={{flex: 1, width: "100%", marginLeft: 15}} activeOpacity={.9}><Text style={styles.userName}>{response.teacher}</Text></TouchableOpacity>
                                                            <TouchableOpacity style={{flex: 1, width: "100%", marginLeft: 15}} activeOpacity={.9}><Text style={styles.userQuestion}>{response.response}</Text></TouchableOpacity>
                                                        </View>
                                                    </View>
                                                )
                                            })}
                                        </View>
                                    }
                                </Animated.View>
                            
                        )
                    
                    })}
                    
                </>   
            )
        }
    }

    const styles = StyleSheet.create({
        bgImage:{
            flex: 1,
            justifyContent: 'center',
        },
        viewQuestions:{
            flexDirection: 'row',
        },
        viewResponses:{
            flexDirection: 'column',
            marginLeft: 10,
            marginTop: 10,
        },
        innerResponses:{
            flexDirection: 'row',
            marginTop: 10
        },
        contentChat:{
            flex: 1,
            backgroundColor: '#10151f',
            alignItems:'flex-start',
            flexDirection:'column',
            margin: 20
        },
        responses:{
            width: '100%',
        },
        responsesText:{
            color: '#969696'
        },
        userImage:{
            width: 50,
            height: 50,
            borderRadius: 25,
            overflow :'hidden'
        },
        teacherImage:{
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: '#fff',
            marginTop: 5,

        },
        userName:{
            color: '#fff',
            fontWeight: 'bold',
        },
        userQuestion:{
            color: '#d9d9d9',
        },
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
            fontSize: 14,
            padding: 20,
            color: '#fff',
            borderWidth: 1,
            width: '73%'
        },
        textTeaching:{
            backgroundColor: '#10151f',
            fontSize: 18,
            padding: 20,
            color: '#fff',
            borderWidth: 1,
        },
        textTeachingEnd:{
            backgroundColor: 'red',
            fontSize: 18,
            padding: 20,
            color: '#fff',
            borderWidth: 1,
        }


    })