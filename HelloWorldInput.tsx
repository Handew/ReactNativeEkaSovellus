import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar"
import React, { useState } from "react"
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native"

import styles from "./styles/styles"

const HelloWorldInput = () => {
  //HOOKS -muuttujia
  const [counter, setCounter] = useState(0)
  const [name, setName] = useState("");
  const [outputName, setOutputName] = useState("")
  //Esitellään array, johon nimet tallennetaan
  const [array, setArray] = useState<string[]>([])
  //Funktio, jota buttoni kutsuu:
  const showName = (name: string) => {
    setOutputName(name)
    setArray((array) => [...array, name + "\n"])
  }

  setTimeout(() => setCounter(counter + 1), 1000)
  return (
    <View style={styles.container2}>
      <View>
        <Text>Terve Maailma!</Text>
      </View>
      <View>
        <Text style={styles.bigCentered}>{counter}</Text>
      </View>
      <View>
        <Text>Anna nimi:</Text>
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            backgroundColor: "white",
            padding: 8,
            borderWidth: 1,
            margin: 2,
          }}
          onChangeText={(text) => setName(text)}
          value={name}
        />
        <TouchableOpacity
          onPress={() => showName(name)}
          style={styles.appButtonContainer}
        >
          <Text style={styles.appButtonText}>Lisää henkilö</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setArray([])}
          style={styles.appButtonContainer}
        >
          <Text style={styles.appButtonText}>Tyhjennä</Text>
        </TouchableOpacity>

        {/* ***Vaihtoehtoinen tapa toteuttaa nappi. tässä ei voi vaihtaa tekstin väriä niin helposti*** */}
        {/* <Button
          title="Lisää henkilö"
          onPress={() => showName(name)}
          color={"#3c4e66"}
        /> */}
        {/* <Text>{outputName}</Text> */}
        <ScrollView style={styles.scrollView} fadingEdgeLength={180}>
          <Text style={{ textAlign: "center", fontSize: 24 }}>{array}</Text>
        </ScrollView>
      </View>
    </View>
  )
}

export default HelloWorldInput