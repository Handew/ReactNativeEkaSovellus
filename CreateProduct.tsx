import React, { useEffect, useState } from "react"
import { Text, View, Image, TouchableHighlight, Platform, ScrollView, Pressable, TextInput, Switch } from "react-native"
import { Octicons } from '@expo/vector-icons'
import styles from "./styles/styles"
import {Picker} from '@react-native-picker/picker'

interface INWCategories {
    categoryId: number
    categoryName: string
    description: string
    picture: string
}

interface INWSuppliers {
    supplierId: number
    companyName: string
    contactName: string
    contactTitle: string
    address: string
    city: string
    region: string
    postalCode: string
    country: string
    phone: string
    fax: string
    homePage: string
}

const CreateProduct = ({ closeModal, refreshAfterEdit }:any) => {
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

    //Filter
    const [categories, setCategories] = useState<any>([])
    const [selectedCat, setSelectedCat] = useState<any>("All")
    
    const [suppliers, setSuppliers] = useState<any>([])
    const [selectedSupp, setSelectedSupp] = useState<any>("All")


    const categoriesList = categories.map((cat: INWCategories, index:any) => {
        return(
            <Picker.Item label={"ID: " + cat.categoryId+ " - " +cat.categoryName} value={cat.categoryId} key={index} />
        )
    })

    const suppliersList = suppliers.map((supp: INWSuppliers, index:any) => {
        return(
            <Picker.Item label={"ID: " + supp.supplierId + " - " +supp.companyName} value={supp.supplierId} key={index} />
        )
    })

    useEffect(() => {
        getCategories()
        getSuppliers()
    }, [])

    const getCategories = () => {
        let uri = 'https://restapi2021.azurewebsites.net/api/product/getcat'
        fetch(uri)
            .then(response => response.json())
            .then((json: INWCategories) => {
                setCategories(json)
            })
    }

    const getSuppliers = () => {
        let uri = 'https://restapi2021.azurewebsites.net/api/product/getsupplier'
        fetch(uri)
            .then(response => response.json())
            .then((json: INWSuppliers) => {
                setSuppliers(json)
            })
    }

    async function createProductOnPress(productName: string) {
      if (Platform.OS === 'web') {
          if (validateOnSubmit() == false) {
          } else {
              await PostToDB()
              console.log('Tuote ' + productName + ' luotu onnistuneesti')
              refreshAfterEdit(true)
              closeModal(true)
          }
      }
      else {
          if (validateOnSubmit() == false) {
          } else {
            await PostToDB()
            alert('Tuote ' + productName + ' luotu onnistuneesti')
            refreshAfterEdit(true)
            closeModal(true)
          }
      }
    }
  

  const PostToDB = () => {
      const product = 
      {
        ProductName: productName,
        SupplierId: Number(supplierId),
        CategoryId: Number(categoryId),
        QuantityPerUnit: quantityPerUnit,
        UnitPrice: parseFloat(Number(unitPrice).toFixed(2)),
        unitsInStock: Number(unitsInStock),
        unitsOnOrder: Number(unitsOnOrder),
        reorderLevel: Number(reorderLevel),
        discontinued: Boolean(discontinued),
        // imageLink: imageLink,
      }
  

    const prodCreateJson = JSON.stringify(product)

    const apiUrl = "https://restapi2021.azurewebsites.net/api/product/"
    fetch(apiUrl, {
        method:"POST",
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json; charset=utf-8"
        },
        body: prodCreateJson  //lähetetään html-dobyssä konvertoitu data...
        })
            .then((response) => response.json())
            .then((json) => {
                const success = json
                if (success) {
                    console.log(success)
                } 
                else 
                {
                    console.log('Error updating' + productName)
                }
            })
    }


  // Hinnan validaatio
  const validatePrice = (val: any) => {
      if (val === null) {
          return true
      }
      else {
          var rgx = /^[0-9]*\.?[0-9]*$/
          if (String(val).match(rgx) == null) {
              return false
          }
          else {
              return true
          }
      }
  }

  // Merkkijonon validaation (MAX 70 merkkiä)
  const validateString = (val: any) => {
      if (val === "") {
          return false
      }
      else {
              var rgx = /^.{1,70}$/;
          if (val.match(rgx) == null) {
                  return false
              }
              else {
                  return true
              }
      }
  }

  // Numero -validaatio (ensimmäinen numero ei voi olla 0, jos on enemmän numeroita kuin 1)
  const validateNumeric = (val: any) => {
      if (val === null) {
          return true
      }
      else {
          var rgx = /^[1-9][0-9]*$/;
          if (String(val).match(rgx)) {
              return true
          }
          if (val == '0') {
              return true
          }
          else {
              return false
          }
      }
  }

    const validateOnSubmit = () => {
      if (!validateString(productName)) {
          alert("Tarkista tuotteen nimi!")
          return false
      } else if (!validatePrice(unitPrice)) {
          alert("Tarkista tuotteen hinta!")
          return false
      } else if (!validateNumeric(unitsInStock)) {
          alert("Tarkista tuotteen varastomäärä")
          return false
      } else if (!validateNumeric(reorderLevel)) {
          alert("Tarkista tuotteen hälytysraja!")
          return false
      } else if (!validateNumeric(unitsOnOrder)) {
          alert("Tarkista tuotteen tilauksessa oleva määrä!");
          return false
      } else if (!validateString(quantityPerUnit)) {
          alert("Tarkista tuotteen pakkauksen koko!")
          return false
      } else {
          return true
      }
    }

    const fetchFiltered = (value: any) => {
        setSelectedCat(value)
        setCategoryId(value)
        // setRefreshProducts(!refreshProducts)
    }

    const fetchFilteredSupp = (value: any) => {
        setSelectedSupp(value)
        setSupplierId(value)
        // setRefreshProducts(!refreshProducts)
    }


  return (
    <View style={styles.inputContainer}>
        <ScrollView>
            <View>
                <View style={styles.topSection}>
                    <Pressable onPress={() => createProductOnPress(productName)}>
                        <View><Octicons name="check" size={24} color="green" /></View> 
                    </Pressable>
                
                    <Pressable onPress={() => closeModal()}>
                        <View><Octicons name="x" size={24} color="black" /></View>
                    </Pressable>
                </View>

                <Text style={styles.inputHeaderTitle}>Tuotteen lisäys:</Text>

                <Text style={styles.inputTitle}>Nimi:</Text>
                <TextInput style={styles.editInput} 
                    underlineColorAndroid="transparent"
                    onChangeText={val => setProductName(val)}
                    placeholderTextColor="#9a73ef"
                    autoCapitalize="none"
                    selectTextOnFocus={true}
                    
                />
                { validateString(productName) == true ? null : ( <Text style={styles.validationError}>Anna tuotteen nimi!</Text> )}
    
                <Text style={styles.inputTitle}>Hinta:</Text>
                <TextInput style={styles.editInput}
                    underlineColorAndroid="transparent"
                    onChangeText={val => setUnitPrice(val)}
                    placeholderTextColor="#9a73ef"
                    autoCapitalize="none"
                    keyboardType='numeric'
                    selectTextOnFocus={true}
                />
                { validatePrice(unitPrice) == true ? null : ( <Text style={styles.validationError}>Anna hinta muodossa n.zz!</Text> )}

                <Text style={styles.inputTitle}>Varastossa:</Text>
                <TextInput style={styles.editInput}
                    underlineColorAndroid="transparent"
                    onChangeText={val => setUnitsInStock((val))}
                    placeholderTextColor="#9a73ef"
                    autoCapitalize="none"
                    keyboardType='numeric'
                    selectTextOnFocus={true}
                />
                { validateNumeric(unitsInStock) == true ? null : ( <Text style={styles.validationError}>Anna varastomääräksi numero</Text> )}

                <Text style={styles.inputTitle}>Hälytysraja:</Text>
                <TextInput style={styles.editInput}
                    underlineColorAndroid="transparent"
                    onChangeText={val => setReorderLevel(val)}
                    placeholderTextColor="#9a73ef"
                    autoCapitalize="none"
                    keyboardType='numeric'
                    selectTextOnFocus={true}
                />

                <Text style={styles.inputTitle}>Tilauksessa:</Text>
                <TextInput style={styles.editInput}
                    underlineColorAndroid="transparent"
                    onChangeText={val => setUnitsOnOrder(val)}
                    placeholderTextColor="#9a73ef"
                    autoCapitalize="none"
                    keyboardType='numeric'
                    selectTextOnFocus={true}
                />

                <Text style={styles.inputTitle}>Kategoria:</Text>
                <Picker
                    selectedValue={selectedCat}
                    style={{height:50,width:250}}
                    onValueChange={(itemValue) => fetchFiltered(itemValue)}>
                    <Picker.Item label="Valitse tuoteryhmä" />
                    {categoriesList}
                </Picker>

                <Text style={styles.inputTitle}>Pakkauksen koko:</Text>
                <TextInput style={styles.editInput}
                    underlineColorAndroid="transparent"
                    onChangeText={val => setQuantityPerUnit(val)}
                    placeholderTextColor="#9a73ef"
                    autoCapitalize="none"
                    keyboardType='numeric'
                    selectTextOnFocus={true}
                />

                <Text style={styles.inputTitle}>Tavarantoimittaja:</Text>
                <Picker
                    selectedValue={selectedSupp}
                    style={{height:50,width:250}}
                    onValueChange={(itemValue) => fetchFilteredSupp(itemValue)}>
                    <Picker.Item label="Valitse toimittaja" />
                    {suppliersList}
                </Picker>

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
                <TextInput style={styles.editInput}
                    underlineColorAndroid="transparent"
                    onChangeText={val => setImageLink(val)}
                    value={(imageLink == null ? '' : imageLink.toString())}
                    placeholderTextColor="#9a73ef"
                    autoCapitalize="none"
                    selectTextOnFocus={true}
                /> */}
                 {/* { validateUrl(imageLink) == true ? null : ( <Text style={styles.validationError}>Tarkista syöttämäsi URI</Text> )} */}

                <Pressable
                style={styles.submitButton}
                onPress={() => createProductOnPress(productName)}>
                    <Text style={styles.submitButtonText}>{' Lisää tuote '}</Text>
                </Pressable>

          </View>
      </ScrollView>
  </View>
)
}
  
export default CreateProduct
