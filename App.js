import React from 'react';
import { Button, Image, View } from 'react-native';
import { ImagePicker } from 'expo';
import axios from 'axios';

export default class App extends React.Component {
  state = {
    image: null,
  };

  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Open camera to pick an image"
          onPress={this._pickImage}
        />
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

      <Button
        title="Click here to send image"
        onPress={this._sendImage.bind(this)}
      />
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
    }
  };
}
