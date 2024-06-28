import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Image, View, Alert } from 'react-native';

const CameraList = ({ camera, onPress, handleAddToCart }) => {
    const handleAddToCartPress = (camera) => {
        handleAddToCart(camera);
        Alert.alert("Success", "Barang sudah ditambahkan ke keranjang!");
    };

    return (
        <TouchableOpacity style={styles.card} onPress={() => onPress(camera)}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: camera.gambar }} style={styles.image} />
            </View>
            <Text style={styles.name}>{camera.merek}</Text>
            <Text style={styles.model}>{camera.model}</Text>
            <TouchableOpacity style={styles.cartButton} onPress={() => handleAddToCartPress(camera)}>
                <Text style={styles.cartButtonText}>+ Keranjang</Text>
            </TouchableOpacity>
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
        width: 185,
        margin: 5,
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 150,
        backgroundColor: '#f0f0f0',
    },
    image: {
        width: 130,
        height: 130,
        resizeMode: 'cover',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 10,
    },
    model: {
        fontSize: 16,
        textAlign: 'center',
        paddingBottom: 10,
    },
    cartButton: {
        backgroundColor: 'blue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        margin: 10,
    },
    cartButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CameraList;
