import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, Button, StyleSheet, Alert, Platform, ScrollView } from 'react-native';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker as SelectPicker } from '@react-native-picker/picker';

const KameraDetail = ({ route, navigation }) => {
    const { camera } = route.params;
    const [durasiSewa, setDurasiSewa] = useState('');
    const [tanggalPengambilan, setTanggalPengambilan] = useState(new Date());
    const [tanggalPengembalian, setTanggalPengembalian] = useState(new Date());
    const [jamPengambilan, setJamPengambilan] = useState('');
    const [jamPengembalian, setJamPengembalian] = useState('');
    const [showTanggalPengambilan, setShowTanggalPengambilan] = useState(false);
    const [showTanggalPengembalian, setShowTanggalPengembalian] = useState(false);
    const [showJamPengambilan, setShowJamPengambilan] = useState(false);
    const [showJamPengembalian, setShowJamPengembalian] = useState(false);
    const [isAvailable, setIsAvailable] = useState(true);

    useEffect(() => {
        const checkAvailability = async () => {
            try {
                const response = await axios.get('http://192.168.1.176:3000/sewa');
                const sewaData = response.data;
                const isCameraRented = sewaData.some(sewa => sewa.camera_id === camera.id);
                setIsAvailable(!isCameraRented);
            } catch (error) {
                console.error(error);
            }
        };
        checkAvailability();
    }, [camera.id]);

    const handleTanggalPengambilanChange = (event, selectedDate) => {
        const currentDate = selectedDate || tanggalPengambilan;
        setShowTanggalPengambilan(Platform.OS === 'ios');
        setTanggalPengambilan(currentDate);
        // Update tanggal pengembalian otomatis
        const nextDate = new Date(currentDate);
        nextDate.setDate(currentDate.getDate() + parseInt(durasiSewa));
        setTanggalPengembalian(nextDate);
    };

    const handleTanggalPengembalianChange = (event, selectedDate) => {
        const currentDate = selectedDate || tanggalPengembalian;
        setShowTanggalPengembalian(Platform.OS === 'ios');
        setTanggalPengembalian(currentDate);
    };

    const showTanggalPengambilanPicker = () => {
        setShowTanggalPengambilan(true);
    };

    const showTanggalPengembalianPicker = () => {
        setShowTanggalPengembalian(true);
    };

    const handleJamPengambilanChange = (event, selectedDate) => {
        const selectedTime = selectedDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
        setJamPengambilan(selectedTime);
        setShowJamPengambilan(Platform.OS === 'ios');
    };

    const handleJamPengembalianChange = (event, selectedDate) => {
        const selectedTime = selectedDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
        setJamPengembalian(selectedTime);
        setShowJamPengembalian(Platform.OS === 'ios');
    };

    const showJamPengambilanPicker = () => {
        setShowJamPengambilan(true);
    };

    const showJamPengembalianPicker = () => {
        setShowJamPengembalian(true);
    };

    const validateInputs = () => {
        if (!durasiSewa) {
            Alert.alert('Error', 'Durasi sewa belum dipilih');
            return false;
        }
        if (!jamPengambilan) {
            Alert.alert('Error', 'Jam pengambilan belum dipilih');
            return false;
        }
        if (!jamPengembalian) {
            Alert.alert('Error', 'Jam pengembalian belum dipilih');
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (!validateInputs()) {
            return;
        }
        if (!isAvailable) {
            Alert.alert('Error', 'Kamera sudah dipinjam');
            return;
        }
        Alert.alert(
            'Konfirmasi',
            'Apakah Anda yakin ingin menyewa kamera ini?',
            [
                {
                    text: 'Batal',
                    style: 'cancel',
                },
                {
                    text: 'Ya',
                    onPress: async () => {
                        try {
                            const response = await axios.post('http://192.168.1.176:3000/sewa', {
                                id: Math.floor(Math.random() * 1000) + 1,
                                camera_id: camera.id,
                                pemakaian_hari: `${durasiSewa} hari`,
                                tanggal_pengambilan: tanggalPengambilan.toISOString().split('T')[0],
                                jam_pengambilan: jamPengambilan,
                                tanggal_pengembalian: tanggalPengembalian.toISOString().split('T')[0],
                                jam_pengembalian: jamPengembalian
                            });
                            Alert.alert('Success', 'Data sewa berhasil ditambahkan');
                            navigation.goBack();
                        } catch (error) {
                            console.error(error);
                            Alert.alert('Error', 'Gagal menambahkan data sewa');
                        }
                    }
                }
            ]
        );
    };

    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: camera.gambar }} style={styles.image} />
            <Text style={styles.title}>{camera.merek}</Text>
            <Text style={styles.subtitle}>{camera.model}</Text>
            <Text>Jenis: {camera.jenis}</Text>
            <Text>Detail Info: {camera.detail_info}</Text>
            <Text>Harga per Hari: {camera.harga_per_hari}</Text>

            <View style={styles.pickerContainer}>
                <Text style={styles.label}>Pilih Durasi Sewa:</Text>
                <SelectPicker
                    selectedValue={durasiSewa}
                    style={styles.picker}
                    onValueChange={(itemValue) => {
                        setDurasiSewa(itemValue);
                        // Update tanggal pengambilan otomatis saat durasi sewa berubah
                        const nextDate = new Date();
                        nextDate.setDate(nextDate.getDate() + parseInt(itemValue));
                        setTanggalPengembalian(nextDate);
                    }}
                >
                    <SelectPicker.Item label="Pilih durasi sewa" value="" />
                    <SelectPicker.Item label="1 hari" value="1" />
                    <SelectPicker.Item label="2 hari" value="2" />
                </SelectPicker>
            </View>

            <View style={styles.dateTimeContainer}>
                <Text style={styles.label}>Tanggal Pengambilan:</Text>
                <Button title={tanggalPengambilan.toISOString().split('T')[0]} onPress={showTanggalPengambilanPicker} />
                {showTanggalPengambilan && (
                    <DateTimePicker
                        value={tanggalPengambilan}
                        mode="date"
                        display="default"
                        onChange={handleTanggalPengambilanChange}
                    />
                )}
            </View>

            <View style={styles.dateTimeContainer}>
                <Text style={styles.label}>Jam Pengambilan:</Text>
                <Button title={jamPengambilan || 'Pilih jam'} onPress={showJamPengambilanPicker} />
                {showJamPengambilan && (
                    <DateTimePicker
                        value={tanggalPengambilan}
                        mode="time"
                        display="default"
                        onChange={handleJamPengambilanChange}
                    />
                )}
            </View>

            <View style={styles.dateTimeContainer}>
                <Text style={styles.label}>Tanggal Pengembalian:</Text>
                <Button title={tanggalPengembalian.toISOString().split('T')[0]} onPress={showTanggalPengembalianPicker} />
                {showTanggalPengembalian && (
                    <DateTimePicker
                        value={tanggalPengembalian}
                        mode="date"
                        display="default"
                        onChange={handleTanggalPengembalianChange}
                    />
                )}
            </View>

            <View style={styles.dateTimeContainer}>
                <Text style={styles.label}>Jam Pengembalian:</Text>
                <Button title={jamPengembalian || 'Pilih jam'} onPress={showJamPengembalianPicker} />
                {showJamPengembalian && (
                    <DateTimePicker
                        value={tanggalPengembalian}
                        mode="time"
                        display="default"
                        onChange={handleJamPengembalianChange}
                    />
                )}
            </View>
            
            <Button title="Sewa Kamera" onPress={handleSubmit} disabled={!isAvailable}/>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        marginBottom: 10,
    },
    image: {
        width: '100%',
        height: 200,
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 8,
    },
    pickerContainer: {
        marginBottom: 16,
    },
    picker: {
        height: 50,
        width: '100%',
    },
    dateTimeContainer: {
        marginBottom: 16,
    },
    label: {
        marginBottom: 10,
    },
});

export default KameraDetail;