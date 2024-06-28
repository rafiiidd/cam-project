import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, TextInput, FlatList, StyleSheet, Animated } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import axios from 'axios';
import CameraList from './CameraList';
import { CartContext } from './CartContext';

const Tab = createMaterialTopTabNavigator();

const HomeScreen = ({ navigation }) => {
    const [cameras, setCameras] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const { addToCart } = useContext(CartContext);

    const searchLabelAnim = useRef(new Animated.Value(15)).current;

    useEffect(() => {
        axios.get('http://192.168.1.176:3000/kamera')
        .then(response => {
            setCameras(response.data);
        })
        .catch(error => {
            console.error('Error fetching cameras:', error);
        });
    }, []);

    useEffect(() => {
        Animated.timing(searchLabelAnim, {
            toValue: isSearchFocused || searchQuery ? -10 : 15,
            duration: 150,
            useNativeDriver: false,
        }).start();
    }, [isSearchFocused, searchQuery]);

    const filteredCameras = cameras.filter(camera =>
        camera.merek.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput
                    style={[styles.input, isSearchFocused && styles.inputFocused]}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                />
                <Animated.Text
                    style={[
                        styles.label,
                        (isSearchFocused || searchQuery) && styles.labelFocused,
                        { transform: [{ translateY: searchLabelAnim }] },
                    ]}
                >
                    Search
                </Animated.Text>
            </View>
            <Tab.Navigator>
                <Tab.Screen name="ACTION CAMERA">
                    {() => <CamerasList cameras={filteredCameras.filter(camera => camera.jenis === 'ACTION CAM')} navigation={navigation} addToCart={addToCart} />}
                </Tab.Screen>
                <Tab.Screen name="MIRRORLESS">
                    {() => <CamerasList cameras={filteredCameras.filter(camera => camera.jenis === 'MIRRORLESS')} navigation={navigation} addToCart={addToCart} />}
                </Tab.Screen>
                <Tab.Screen name="DSLR">
                    {() => <CamerasList cameras={filteredCameras.filter(camera => camera.jenis === 'DSLR')} navigation={navigation} addToCart={addToCart} />}
                </Tab.Screen>
                <Tab.Screen name="ALAT">
                    {() => <CamerasList cameras={filteredCameras.filter(camera => camera.jenis === 'ALAT')} navigation={navigation} addToCart={addToCart} />}
                </Tab.Screen>
            </Tab.Navigator>
        </View>
    );
};

const CamerasList = ({ cameras, navigation, addToCart }) => (
    <FlatList
        data={cameras}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => <CameraList camera={item} onPress={() => navigation.navigate('Kamera Detail', { camera: item })} handleAddToCart={addToCart} />}
    />
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    inputGroup: {
        position: 'relative',
        marginBottom: 20,
        marginHorizontal: 15,
        marginTop: 10,
    },
    input: {
        borderColor: '#9e9e9e',
        borderWidth: 1.5,
        borderRadius: 7,
        padding: 15,
        fontSize: 18,
        color: '#000',
    },
    label: {
        position: 'absolute',
        left: 15,
        color: '#9e9e9e',
        pointerEvents: 'none',
        fontSize: 18,
        backgroundColor: 'transparent',
    },
    inputFocused: {
        borderColor: '#9e9e9e',
    },
    labelFocused: {
        color: '#9e9e9e',
        backgroundColor: '#fff',
        paddingHorizontal: 4,
        fontSize: 14,
    },
});

export default HomeScreen;
