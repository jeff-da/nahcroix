import React from 'react';
import { Button, Image, View, Text, Alert } from 'react-native';
import { ImagePicker } from 'expo';
import axios from 'axios';

export default class App extends React.Component {
  state = {
    image: null,
    text: '',
  };

  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Open camera to take an image"
          onPress={this._pickImage.bind(this)}
        />
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <Text style={{fontSize: 50}}>{this.state.text}</Text>
      </View>
    );
  }

  async _sendImage() {
    /*let data = new FormData();
    data.append('file', this.state.image);
    axios.post('http://54.161.226.173:9000', data).then();*/
    const data = new FormData();
    //data.append('name', 'filename');
    console.log(this.state.image);
    data.append('file', {
      uri: this.state.image,
      type: 'image/jpg', // or photo.type
      name: 'coolimg.jpg'
    });
    fetch('http://54.161.226.173:5000', {
      //header: { 'content-type': 'multipart/form-data' },
      method: 'POST',
      body: data
    }).then(res => {
      console.log(res);
      if (res._bodyText === '0') {
        this.setState({ text: 'LA CROIX!!!' });
        Alert.alert(
          'You just took a photo of...',
          'LA CROIX!!!!',
        )
      } else {
        this.setState({ text: 'NOT LA CROIX!!!' });
      }
      console.log(res._bodyText);
    });
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 4],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
      this._sendImage();
    }
  };
}
