import React, { useCallback, useState } from 'react'
import { 
    View,
    StyleSheet,
    Text,
    Button,
    ScrollView,
    TouchableOpacity,
    useWindowDimensions,
    ActivityIndicator, 
    Linking
} from 'react-native'
import * as ScreenOrientation from 'expo-screen-orientation'

import YoutubeIframe from 'react-native-youtube-iframe'
import Modal from "react-native-modal";
import { Ionicons } from '@expo/vector-icons';

const VIDEO_HEIGHT = 180

    export default ModalComponent = ({toggleModal, isModalVisible, selected}) => {
    const { width } = useWindowDimensions()
    const [videoReady, setVideoReady] = useState(false)

    function openVerse(verses){
      Linking.openURL(`https://www.biblegateway.com/passage/?search=${verses}&version=ARC`)
    }
    
    const onFullScreenChange = useCallback((isFullScreen)=>{
        if(isFullScreen){
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
        }else{
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
        }
        
    },[])
        return (
            <View style={styles.container}>
                <Modal
                    style={styles.modal}
                    isVisible={isModalVisible}
                    animationIn={'zoomIn'}
                    >
                        <ScrollView style={styles.container}>
                            <View style={styles.modalHeader}> 
                                <Text style={styles.textId}>#{selected.id}</Text>
                                <TouchableOpacity> 
                                    <Ionicons name="exit-outline" onPress={()=>{
                                    toggleModal('')
                                    setVideoReady(false)
                                }} size={24} color="#a82222" />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.contentData}>
                                <Text style={styles.textTitle}>{selected.teachingTitle}</Text>
                                <Text style={styles.textHeader}> Versículos: </Text>
                                <TouchableOpacity onPress={() =>{openVerse(selected.verses)}}>
                                  <Text style={styles.textVerses}>{selected.verses}</Text>
                                </TouchableOpacity>
                                <Text style={styles.textHeader}> Descrição: </Text>
                                <Text style={styles.textDescription}>{selected.teachingDescription}</Text>
                                <Text style={styles.textHeader}> Vídeos</Text>
                                <View style={styles.player}>
                                    <YoutubeIframe
                                        videoId={selected.video}
                                        height={videoReady ? 180 : 0}
                                        width={width - 80}
                                        onReady={()=> setVideoReady(true)}
                                        onFullScreenChange={onFullScreenChange}
                                    />
                                    {!videoReady && <ActivityIndicator color={'red'}/>}
                                </View>
                            </View>
                            

                            <Button title="Sair" color={'#a82222'} onPress={()=>{
                                toggleModal('')
                                setVideoReady(false)
                                }} />
                        </ScrollView>
                </Modal>
            </View>
        )
    }

    const styles = StyleSheet.create({
        container:{ 
            backgroundColor: '#10151f',
            flex: 1,
        },
        modal:{
            backgroundColor: '#10151f',
            padding: 20,
            borderRadius: 15,
            maxHeight: '90%',
            overflowY: 'scroll'
        },
        modalHeader:{
            flexDirection:'row',
            justifyContent: 'space-between'
        },
        backdrop: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            opacity: 0,
            backgroundColor: 'black',
        },
        content: {
          flex: 1,
          justifyContent: 'center',
        },
        contentData:{
          flex: 1,
          textAlign: 'center',
          justifyContent: 'center'
        },
        containerBox: {
          zIndex: 2,
          opacity: 1,
          backgroundColor: 'transparent',
        },
        textModal:{
          color: 'white',
          fontSize: 30,
        },
        textTitle:{
          fontSize: 24,
          color: '#fff',
          textAlign: 'center',
          paddingBottom: 40,

        },
        textId:{
          color: '#28344d',
          fontSize: 18,
          paddingBottom: 20,
        },
        textHeader:{
          color: '#28344d',
          fontSize: 18,
          paddingBottom: 10,
        },
        textVerses:{
          color: '#b8a24b',
          fontSize: 17,
          paddingBottom: 20,
          paddingLeft: 8,
          textDecorationStyle: 'solid',
          textDecorationLine: 'underline'
        },
        textDescription:{
          color: 'white',
          fontSize: 17,
          paddingBottom: 20,
          paddingLeft: 8,
        },
        player:{
          width: '100%',
          height: VIDEO_HEIGHT,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20,
        }
          
          
    })  