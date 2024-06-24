import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Animated } from 'react-native';

const LoginScreen = ({ navigation }) => {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [isUsernameFocused, setIsUsernameFocused] = useState(false);
const [isPasswordFocused, setIsPasswordFocused] = useState(false);

const usernameLabelAnim = useRef(new Animated.Value(15)).current;
const passwordLabelAnim = useRef(new Animated.Value(15)).current;

useEffect(() => {
    Animated.timing(usernameLabelAnim, {
    toValue: isUsernameFocused || username ? -10 : 15,
    duration: 150,
    useNativeDriver: false,
    }).start();
}, [isUsernameFocused, username]);

useEffect(() => {
    Animated.timing(passwordLabelAnim, {
    toValue: isPasswordFocused || password ? -10 : 15,
    duration: 150,
    useNativeDriver: false,
    }).start();
}, [isPasswordFocused, password]);

const handleLogin = () => {
    const validUsername = '1';
    const validPassword = '1';

    if (username === validUsername && password === validPassword) {
    navigation.navigate('Drawer');
    } else {
    Alert.alert('Error', 'Invalid username or password');
    }
};

return (
    <View style={styles.container}>
    <View style={styles.inputGroup}>
        <TextInput
        style={[styles.input, isUsernameFocused && styles.inputFocused]}
        value={username}
        onChangeText={setUsername}
        onFocus={() => setIsUsernameFocused(true)}
        onBlur={() => setIsUsernameFocused(false)}
        autoCapitalize="none"
        />
        <Animated.Text
        style={[
            styles.label,
            (isUsernameFocused || username) && styles.labelFocused,
            { transform: [{ translateY: usernameLabelAnim }] },
        ]}
        >
        Username
        </Animated.Text>
    </View>
    <View style={styles.inputGroup}>
        <TextInput
        style={[styles.input, isPasswordFocused && styles.inputFocused]}
        value={password}
        onChangeText={setPassword}
        onFocus={() => setIsPasswordFocused(true)}
        onBlur={() => setIsPasswordFocused(false)}
        secureTextEntry
        />
        <Animated.Text
        style={[
            styles.label,
            (isPasswordFocused || password) && styles.labelFocused,
            { transform: [{ translateY: passwordLabelAnim }] },
        ]}
        >
        Password
        </Animated.Text>
    </View>
    <Button title="Login" onPress={handleLogin} />
    </View>
);
};

const styles = StyleSheet.create({
container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
},
inputGroup: {
    position: 'relative',
    marginBottom: 20,
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

export default LoginScreen;
