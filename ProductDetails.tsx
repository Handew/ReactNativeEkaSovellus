import React, { useEffect, useState } from "react"
import { Text, View, Image, TouchableHighlight } from "react-native"
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
  imageLink: string
  category: string
  supplier: string
  checked: any
}

const ProductDetails = ({ passProductId, closeModal }:any) => {
  const [product, setProduct] = useState<Partial<INWProductsResponse>>({})
//   const [productId, setProductId] = useState(passProductId)

  useEffect(() => {
    GetProductInfo()
  }, [passProductId])

  const GetProductInfo = () => {
    let uri = "https://restapi2021.azurewebsites.net/api/product/" + passProductId
    fetch(uri)
      .then((response) => response.json())
      .then((json: INWProductsResponse) => {
        setProduct(json)
      })
  }


  return (

    <View style={styles.centeredView}>
        <View style={styles.modalView}>
        <Text style={styles.modalTitle}>Tuotteen tiedot</Text>
        <View style={styles.modalInfo}>
            <Text style={styles.modalTextTitle}>{"Product Id: "}</Text>
            <Text style={styles.modalText}>{product.productId}</Text>
        </View>
        <View style={styles.modalInfo}>
            <Text style={styles.modalTextTitle}>{"Product Name: "}</Text>
            <Text style={styles.modalText}>{product.productName}</Text>
        </View>
        <View style={styles.modalInfo}>
            <Text style={styles.modalTextTitle}>{"Supplier Id: "}</Text>
            <Text style={styles.modalText}>{product.supplierId}</Text>
        </View>
        <View style={styles.modalInfo}>
            <Text style={styles.modalTextTitle}>{"Category Id: "}</Text>
            <Text style={styles.modalText}>{product.categoryId}</Text>
        </View>
        <View style={styles.modalInfo}>
            <Text style={styles.modalTextTitle}>{"Quantity Per Unit: "}</Text>
            <Text style={styles.modalText}>{product.quantityPerUnit}</Text>
        </View>
        <View style={styles.modalInfo}>
            <Text style={styles.modalTextTitle}>{"Unit Price: "}</Text>
            <Text style={styles.modalText}>{product.unitPrice}</Text>
        </View>
        <View style={styles.modalInfo}>
            <Text style={styles.modalTextTitle}>{"Units In Stock: "}</Text>
            <Text style={styles.modalText}>{product.unitsInStock}</Text>
        </View>
        <View style={styles.modalInfo}>
            <Text style={styles.modalTextTitle}>{"Units On Order: "}</Text>
            <Text style={styles.modalText}>{product.unitsOnOrder}</Text>
        </View>
        <View style={styles.modalInfo}>
            <Text style={styles.modalTextTitle}>{"Reorder Level: "}</Text>
            <Text style={styles.modalText}>{product.reorderLevel}</Text>
        </View>
        <View style={styles.modalInfo}>
            <Text style={styles.modalTextTitle}>{"Discontinued: "}</Text>
            <Text style={styles.modalText}>
            {product.discontinued ? product.discontinued.toString() : "false"}
            </Text>
        </View>
        <View style={styles.modalInfo}>
            <Text style={styles.modalTextTitle}>{"Image: "}</Text>
        </View>
        <Image
            source={
            product.imageLink
                ? { uri: product.imageLink }
                : { uri: "https://www.tibs.org.tw/images/default.jpg" }
            }
            style={[
            styles.centerElement,
            {
                height: 60,
                width: 60,
                backgroundColor: "#eee",
                margin: 6,
                alignSelf: "center",
            },
            ]}
        />

        <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
            onPress={() => {
            closeModal(true)
            }}
        >
            <Text style={styles.textStyle}>Sulje</Text>
        </TouchableHighlight>
        </View>
    </View>
    )
}
  
export default ProductDetails
