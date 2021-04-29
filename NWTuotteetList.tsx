import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, Image, Pressable, Modal, TouchableHighlight } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import styles from './styles/styles'

interface INWProductsResponse {
    //Typescript -interface käytetään inventoryItems -muuttujassa json
    productId: number
    productName: string
    supplierId: number
    categoryId: number
    quantityPerUnit: string
    unitPrice: number
    unitsInStock: number
    unitsOnOrder: number
    reorderLevel: number
    discontinued: boolean
    imageLink: string
    category: string
    supplier: string
    checked: any
}

const NWTuotteetList = () => {
    const [inventoryItems, setInventoryItems] = useState<any>([]);
    const [inventoryItemsCount, setInventoryItemsCount] = useState(0);
    const [ProductId, setProductId] = useState(0);
    const [productDetailsModal, setProductDetailsModal] = useState(false);

    useEffect(() => {
        GetProducts();
    }, []);

    const GetProducts = () => {
        let uri = 'https://restapi2021.azurewebsites.net/api/product/';
        fetch(uri)
            .then(response => response.json())
            .then((json: INWProductsResponse) => {
                setInventoryItems(json); //Tuotteet kirjoitetaan inventoryItems -array muuttujaan.
                const fetchCount = Object.keys(json).length; //Lasketaan montako tuotenimikettä on yhteensä.
                setInventoryItemsCount(fetchCount); //Kirjoitetaan tuotenimikkeiden määrä inventoryItemsCount -muuttujaan.
            })
    }

    //Jokaiselle komponentille random-key, palautetaan string -tyyppisenä
    const idGenerator = () => {
        var rnds = function () {
            return (((1 + Math.random()) * 0x10) | 0).toString(16).substring(1);
        }
        return (rnds() + rnds() + "-" + rnds() + "-" + rnds() + "-" + rnds() + "-" + rnds() + rnds() + rnds());
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
            <View style={[styles.topSection]}>
                <View style={[styles.centerSection, {width:50, height:50 }]}>
                    <FontAwesome5 name="boxes" size={25} color="#000" />
                </View>
                <View style={[styles.centerSection, { height:50 }]}>
                    <Text style={{ fontSize: 18, color: '#000' }}>Tuotteet</Text>
                    <Text style={{ fontSize: 10, color: '#000' }}>{'Tuotteita yhteensä: ' + inventoryItemsCount}</Text>
                </View>
            </View>
            <ScrollView>
                {inventoryItems.map((item: INWProductsResponse) => (
                   
                   <Pressable onPress={() => {/*this.props.navigation.navigate('ProductDetails', {productDetails: item})*/ }}
                    style={({ pressed }) => [{ backgroundColor: pressed ? 'rgba(49, 179, 192, 0.5)' : 'white' }]}
                    onLongPress={() => {
                        setProductDetailsModal(true);
                    }}
                    >
                        <View key={item.productId.toString()} style={styles.productsContainer}>
                        <Image key={idGenerator()} source={item.imageLink ? { uri: item.imageLink } : { uri: 'https://www.tibs.org.tw/images/default.jpg' }} 
                                style={[styles.centerSection, { height: 60, width: 60, backgroundColor: '#eeeeee', margin: 6, }]} />
                            <View key={idGenerator()} style={{ flexGrow: 1, flexShrink: 1, alignSelf: 'center' }}>
                                <Text key={idGenerator()} style={{ fontSize: 15 }}>{item.productName}</Text>
                                <Text key={idGenerator()} style={{ color: '#8f8f8f' }}>{item.category ? 'Variation: ' + item.category : ''}</Text>
                                <Text key={idGenerator()} style={{ color: '#333333', marginBottom: 10 }}>{'\u00E1 ' + (item.unitPrice == null ? 'unitprice is missing ' : item.unitPrice.toFixed(2))  + '\u20AC'}</Text>
                            </View>
                            {/*Euro -merkki tulee '\u20AC' käyttämällä...*/}
                            {/*á -merkki tulee '\u00E1' käyttämällä...*/}
                        </View>

                    </Pressable>
                ))}

                {/* Modal Starts Here */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={productDetailsModal}
                    onRequestClose={() => {
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Tuotteen tarkemmat tiedot:</Text>
                            <TouchableHighlight
                                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                onPress={() => {
                                    setProductDetailsModal(!productDetailsModal);
                                }}
                            >
                                <Text style={styles.textStyle}>Sulje</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
                {/* Modal Ends Here */}
            </ScrollView>
        </View>
    )
}

export default NWTuotteetList