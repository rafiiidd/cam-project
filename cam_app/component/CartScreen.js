import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CartContext } from './CartContext';

const CartScreen = ({ camera }) => {
    const { cartItems } = useContext(CartContext);
    const navigation = useNavigation();

    const handleCheckout = (item) => {
        if (item.model === 'kamera') {
            navigation.navigate('KameraDetail');
        } else if (item.model === 'lainnya') {
            navigation.navigate('LainnyaDetail');
        } else {
            // Handle other item models as needed
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={cartItems}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Image style={styles.image} source={{ uri: item.gambar }}/>
                        <Text style={styles.itemText}>Brand: {item.merek}</Text>
                        <Text style={styles.itemText}>Jenis: {item.model}</Text>
                        <Text style={styles.itemText}>Quantity: {item.quantity}</Text>
                        <TouchableOpacity 
                            style={styles.checkoutButton}
                            onPress={() => handleCheckout(item)}
                        >
                            <Text style={styles.checkoutButtonText}>Checkout</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    itemContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    itemText: {
        fontSize: 18,
    },
    image: {
        width: '60%',
        height: 150,
        marginBottom: 16,
        marginHorizontal: 70
    },
    checkoutButton: {
        backgroundColor: '#3498db',
        paddingVertical: 12,
        marginTop: 10,
        alignItems: 'center',
        borderRadius: 5,
    },
    checkoutButtonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default CartScreen;
