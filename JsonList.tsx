import React, { useState } from "react"
import { Text, View, FlatList, Button, Pressable } from "react-native"
import styles from "./styles/styles"

const JsonList = () => {
  const [jsonData, setJsonData] = useState();
  const getData = () => {
    fetch("https://jsonplaceholder.typicode.com/todos")
    .then((response) => response.json())
    .then((responseData) => {
      setJsonData(responseData)
    })
  }

  return (
    <View>
      <Button
        onPress={() => getData()}
        title="Lataa TODO-lista"
        color="#556B2F"
      />

      <FlatList
        data={jsonData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {

            }}
            style={({ pressed }) => [
              {backgroundColor: pressed ? 'rgb(210,230,255' : 'transparent'}
            ]}>
            {({ pressed }) => (
            <View>
              <View style={styles.separatorLine} />
              <Text style={styles.text}>{pressed ? 'Klikkasit tätä riviä!' : 'Press me!'}</Text>
              <Text style={styles.text}>{pressed ? 'Pääavain = '+item.id.toString() : ''}</Text>
              <Text style={styles.itemItalic}>UserId: {item.userId.toString()}</Text>
              <Text style={styles.itemBolded}>Title: {item.title}</Text>
              {item.completed === true ? <Text style={styles.itemUnderlined}>LOPPUUNKÄSITELTY KEISI</Text> : <Text style={styles.itemUnderlined}>AVOIN KEISI</Text>}
            </View>
            )}
          </Pressable>
        )}
      />
    </View>
  )
}
export default JsonList