import React from 'react'
import { Text, View, StyleSheet, Image, Platform, ScrollView } from "react-native"
import { API_id, API_key } from './APIKeyHSI'


const YLETekstiTV100 = () => {
    var imageUrl = 'https://external.api.yle.fi/v1/teletext/images/' + 100 + '/1.png?app_id=' + API_id + '&app_key=' + API_key + "&date=" + Date.now.toString()
    return (
        <View style={styles.mainContainer}>
            <ScrollView contentContainerStyle={styles.scrollViewPage}>
                <Text style={styles.title}>Ylen tekstitv:n pääsivu</Text>
                <View style={styles.separatorLine} />
                <View style={styles.imageSection}>
                    <Image
                        style={styles.yleTextTV}
                        resizeMode={'contain'}
                        source={{
                            uri: imageUrl,
                        }}
                    />
                </View>
            </ScrollView>
        </View>
    )
}


//***********************************
//Tyylimäärittelyt
//***********************************
const styles = StyleSheet.create({

    mainContainer: {
        flex: 1, 
    },

    scrollViewPage: {
        justifyContent: 'center',
        paddingTop: 0,
    },

    imageSection: {
        flex: 2,
    },

    yleTextTV: {
        width: '100%',
        height: Platform.OS === 'android' ? '100%' : 240,
        aspectRatio: 1.5,
        marginTop: 1,
    },

    title: {
        fontSize: 26,
        fontWeight: '300',
        letterSpacing: 7,
        textShadowOffset: { width: 1, height: 1 },
        textShadowColor: '#D1D1D1',
        textAlign: 'center',
    },

    separatorLine: {
        marginVertical: 5,
        height: 1,
        width: '100%',
        backgroundColor: '#eee',
    },

 })

 export default YLETekstiTV100