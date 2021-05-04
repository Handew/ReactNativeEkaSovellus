import React, { useEffect, useState } from "react"
import { Text, View, Image, TouchableHighlight, Platform, ScrollView, Pressable, TextInput, Switch } from "react-native"
import { Octicons } from '@expo/vector-icons'
import styles from "./styles/styles"

interface INWProductsResponse {
  //Typescript -interface käytetään productItems -muuttujassa json
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
  // imageLink: string
  category: string
  supplier: string
  checked: any
}

const DeleteProduct = ({ passProductId, closeModal, refreshAfterEdit }:any) => {
    let productId = passProductId
    const [productName, setProductName] = useState('...')
    const [supplierId, setSupplierId] = useState('0')
    const [categoryId, setCategoryId] = useState('0')
    const [quantityPerUnit, setQuantityPerUnit] = useState('0')
    const [unitPrice, setUnitPrice] = useState('0')
    const [unitsInStock, setUnitsInStock] = useState('0')
    const [unitsOnOrder, setUnitsOnOrder] = useState('0')
    const [reorderLevel, setReorderLevel] = useState('0')
    const [discontinued, setDiscontinued] = useState(false)
    // const [imageLink, setImageLink] = useState('...')

  useEffect(() => {
    GetProductData()
  }, [passProductId])

  const GetProductData = () => {
    let uri = "https://restapi2021.azurewebsites.net/api/product/" + passProductId
    fetch(uri)
      .then((response) => response.json())
      .then((json: INWProductsResponse) => {
        setProductName(json.productName)
        setSupplierId(json.supplierId.toString())
        setCategoryId(json.categoryId.toString())
        setQuantityPerUnit(json.quantityPerUnit)
        setUnitPrice(json.unitPrice.toString())
        setUnitsInStock(json.unitsInStock.toString())
        setUnitsOnOrder(json.unitsOnOrder.toString())
        setReorderLevel(json.reorderLevel.toString())
        setDiscontinued(json.discontinued)
        // setImageLink(json.imageLink)
      })
  }

    async function deleteProductOnPress() {
        await DeleteToDB()
        refreshAfterEdit(true)
        closeModal(true)  
    }
  

    const DeleteToDB = () => {
        const apiUrl = "https://restapi2021.azurewebsites.net/api/product/" + productId
        fetch(apiUrl, {
            method:"DELETE",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json; charset=utf-8"
            },
            body: null  //lähetetään html-dobyssä konvertoitu data...
            })
                .then((response) => response.json())
                .then((json) => {
                    const success = json
                    if (success) {
                        alert("Tuote id:" + productId + " poistettu.")
                    } 
                    else 
                    {
                        alert("Tuotteen " + productId + " poistossa tapahtui virhe.")
                    }
                })
    }


    return (
        <View style={styles.inputContainer}>
            <ScrollView>
                <View key={productId}>
                    <View style={styles.topSection}>
                        <Pressable onPress={() => deleteProductOnPress()}>
                            <View><Octicons name="trashcan" size={24} color="red" /></View> 
                        </Pressable>
                    
                        <Pressable onPress={() => closeModal()}>
                            <View><Octicons name="x" size={24} color="black" /></View>
                        </Pressable>
                    </View>

                    <Text style={styles.inputHeaderTitle}>Haluatko poistaa tuotteen?</Text>
                    <Text style={styles.inputTitle}>ID:</Text>
                    <TextInput style={styles.inputTitle}
                        underlineColorAndroid="transparent"
                        defaultValue={productId.toString()}
                        autoCapitalize="none"
                        editable={false}
                    />

                    <Text style={styles.inputTitle}>Nimi:</Text>
                    <TextInput style={styles.inactiveField} 
                        underlineColorAndroid="transparent"
                        value={productName.toString()}
                        autoCapitalize="none"
                        editable={false}                     
                    />
        
                    <Text style={styles.inputTitle}>Hinta:</Text>
                    <TextInput style={styles.inactiveField}
                        underlineColorAndroid="transparent"
                        value={(unitPrice.toString() == null ? '0' : unitPrice.toString())}
                        autoCapitalize="none"
                        keyboardType='numeric'
                        selectTextOnFocus={true}
                        editable={false}
                    />

                    <Text style={styles.inputTitle}>Varastossa:</Text>
                    <TextInput style={styles.inactiveField}
                        underlineColorAndroid="transparent"
                        value={unitsInStock.toString()}
                        autoCapitalize="none"
                        keyboardType='numeric'
                        selectTextOnFocus={true}
                        editable={false}
                    />

                    <Text style={styles.inputTitle}>Hälytysraja:</Text>
                    <TextInput style={styles.inactiveField}
                        underlineColorAndroid="transparent"
                        value={reorderLevel.toString()}
                        autoCapitalize="none"
                        keyboardType='numeric'
                        selectTextOnFocus={true}
                        editable={false}
                    />

                    <Text style={styles.inputTitle}>Tilauksessa:</Text>
                    <TextInput style={styles.inactiveField}
                        underlineColorAndroid="transparent"
                        value={unitsOnOrder.toString()}
                        autoCapitalize="none"
                        keyboardType='numeric'
                        selectTextOnFocus={true}
                        editable={false}
                    />

                    <Text style={styles.inputTitle}>Kategoria:</Text>
                    <TextInput style={styles.inactiveField}
                        underlineColorAndroid="transparent"
                        value={categoryId.toString()}
                        autoCapitalize="none"
                        keyboardType='numeric'
                        selectTextOnFocus={true}
                        editable={false}
                    />

                    <Text style={styles.inputTitle}>Pakkauksen koko:</Text>
                    <TextInput style={styles.inactiveField}
                        underlineColorAndroid="transparent"
                        value={quantityPerUnit.toString()}
                        autoCapitalize="none"
                        keyboardType='numeric'
                        selectTextOnFocus={true}
                        editable={false}
                    />

                    <Text style={styles.inputTitle}>Tavarantoimittaja:</Text>
                    <TextInput style={styles.inactiveField}
                        underlineColorAndroid="transparent"
                        value={supplierId.toString()}
                        autoCapitalize="none"
                        keyboardType='numeric'
                        selectTextOnFocus={true}
                        editable={false}
                    />

                    <Text style={styles.inputTitle}>Tuote poistunut:</Text>
                    <View style={{ flexDirection: 'row', marginLeft: 15, }}>
                        <Text style={{ marginRight: 4, }}>Ei</Text>
                        <Switch
                            value={discontinued}
                            onValueChange={val => setDiscontinued(val)}
                        />
                        <Text style={{ marginLeft: 4, }}>Kyllä</Text>
                    </View>

                    {/* <Text style={styles.inputTitle}>Kuvan linkki:</Text>
                    <TextInput style={styles.inactiveField}
                        underlineColorAndroid="transparent"
                        onChangeText={val => setImageLink(val)}
                        value={(imageLink == null ? '' : imageLink.toString())}
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        selectTextOnFocus={true}
                    /> */}
                    {/* { validateUrl(imageLink) == true ? null : ( <Text style={styles.validationError}>Tarkista syöttämäsi URI</Text> )} */}

            </View>
        </ScrollView>
    </View>
)
}
  
export default DeleteProduct
