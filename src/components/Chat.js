import React, { useEffect, useState } from 'react'

import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Linking, TextInput } from 'react-native'
import { color } from 'react-native-reanimated'
import Question from './Chat/Question'
import { FIRESTORE_DB } from '../../firebaseConfig'
import { arrayUnion, collection, doc, setDoc, updateDoc } from "firebase/firestore"; 
import { getAuth } from 'firebase/auth'

    export default Chat = () => {

        const [questionText, setQuestionText] = useState('');
        const [seting, setSeting] = useState(false)
        const [user, setUser] = useState()

        const setQuestion = async () =>{
            
            const docRef = await doc(FIRESTORE_DB, "Questions", 'zArwtweJqCPEho31nACU');

            await updateDoc(docRef, {
                question: arrayUnion(
                {
                    question:
                        {questing: getAuth().currentUser.displayName, question: questionText, imgUserQuesting: getAuth().currentUser.photoURL},
                    responses:
                        [{response: '30 anos', teacher: 'Hiago'}]
                
                })
            }).then(() =>{
                setQuestionText('')
            });
        
        }
        

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.textTitle}>
                        Chat
                    </Text>
                </View>
                <View style={styles.main}>
                    <TextInput
                        placeholder='Faça uma pergunta...'
                        placeholderTextColor={'#fff'}
                        style={styles.textInput}
                        onChangeText={(e) => setQuestionText(e)}
                        value={questionText}
                    />
                    <TouchableOpacity onPress={setQuestion} style={styles.buttonSendArea}>
                        <Text style={styles.buttonSend}>
                            Enviar    
                        </Text>
                    </TouchableOpacity>
                    <ScrollView style={styles.contentDesc}>
                        <Question />
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
        textInput:{
            borderBottomWidth: 1,
            height: 40,
            width: '80%',
            borderColor: '#fff',
            color: '#fff'
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
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth: 1,

        },
        verse:{
            color: '#b8a24b',
            fontSize: 20,
            textAlign: 'center',
            textDecorationStyle: 'solid',
            textDecorationLine: 'underline'
        },
        buttonSendArea:{
            backgroundColor: '#FEDD58',
            padding: 10,
            width: 100,
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            marginTop: 20,
            marginBottom: 20
        },
        buttonSend:{
            fontWeight: 'bold',
        }
    })