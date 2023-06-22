import { View, Text, Button, Image } from 'react-native'
import React, { useState } from 'react'
import { launchImageLibrary } from 'react-native-image-picker'
import axios from 'axios'

export default function App() {

  const [file, setFile] = useState<any>({})

  console.log('File hakkinda', file)

  const chooseImage = async () => {

    await launchImageLibrary({
      mediaType: 'photo'
    }, setFile)
  }

  const uploadImage = async () => {
    const formData = new FormData()

    formData.append("imageUrl", {
      uri: file.assets[0].uri,
      name: file.assets[0].fileName,
      type: file.assets[0].type,
    });

    formData.append('userId', 124)

    await axios.post('http://localhost:5050/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  return (
    <View style={{ gap: 12, backgroundColor: 'black', flex: 1, paddingTop: 22 }}>
      <Image style={{ width: '100%', height: 200, justifyContent: 'center', resizeMode: 'contain' }} source={{ uri: file.assets[0].uri }} />
      <Button title='UPLOAD' onPress={chooseImage} />
      <Button title='POST' onPress={uploadImage} />
    </View>
  )
}