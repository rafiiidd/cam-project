import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const CameraList = ({ camera, onPress }) => {
return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(camera)}>
    <Image source={{ uri: camera.gambar }} style={styles.image} />
    <Text style={styles.name}>{camera.merek}</Text>
    <Text style={styles.email}>{camera.model}</Text>
    </TouchableOpacity>
);
};

const styles = StyleSheet.create({
card: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: '#fff',
    elevation: 5,
    width: 187,
    margin: 5
},
image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
},
name: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
},
email: {
    fontSize: 16,
    textAlign: 'center',
    paddingBottom: 10,
},
});

export default CameraList;
