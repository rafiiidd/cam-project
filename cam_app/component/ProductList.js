import React, { useContext } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CartContext } from './CartContext';

const products = [
    { id: 1, merek: 'Canon', model: 'EOS 1500D', jenis: 'DSLR' },
    { id: 2, merek: 'Sony', model: 'Alpha A6000', jenis: 'Mirrorless' },
    // Tambahkan produk lainnya di sini
];

const ProductList = () => {
    const { addToCart } = useContext(CartContext);
    const navigation = useNavigation();

    const handleAddToCart = (item) => {
        addToCart(item);
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.merek} {item.model}</Text>
            <Text style={styles.itemText}></Text>
            <Button title="+ Keranjang" onPress={() => handleAddToCart(item)} />
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
            />
            <Button title="Go to Cart" onPress={() => navigation.navigate('Keranjang')} />
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
});

export default ProductList;
