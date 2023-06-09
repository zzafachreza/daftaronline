import { Alert, StyleSheet, Text, Modal, View, Image, FlatList, ActivityIndicator, Dimensions, ImageBackground, Pressable } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import { MyButton, MyGap, MyHeader, MyInput, MyPicker } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { FloatingAction } from "react-native-floating-action";
import 'intl';
import 'intl/locale-data/jsonp/en';
import moment from 'moment';
import { Linking } from 'react-native';
import DatePicker from 'react-native-datepicker'
import { Icon } from 'react-native-elements';

export default function SAdd({ navigation, route }) {
    const [modalVisible, setModalVisible] = useState(false);

    const [dokter, setDokter] = useState([]);
    const [poli, setPoli] = useState([]);
    const [user, setUser] = useState({});
    const [kirim, setKirim] = useState({
        tanggal_rencana: moment().format('YYYY-MM-DD'),
        jenis: 'BPJS',
        bpjs_kunjungan: 'Rujukan FKTP',
        bpjs_ref: '',
        fid_user: route.params.id,
        fid_dokter: '',
        fid_poli: '',
    })
    const isFocused = useIsFocused();
    const [loading, setLoading] = useState(false);
    const [kode, setKode] = useState('');

    const sendServer = () => {
        console.log('send server', kirim);
        // setLoading(true);
        axios.post(apiURL + 'daftar_online', kirim).then(res => {
            console.log(res.data);

            if (res.data == 403) {
                setTimeout(() => {
                    setLoading(false);
                    Alert.alert(MYAPP, 'Maaf tidak bisa daftar 2x di hari yang sama !')

                }, 1000)
            } else if (res.data == 404) {
                setTimeout(() => {
                    setLoading(false);
                    Alert.alert(MYAPP, 'Maaf Pendaftaran BPJS untuk Dokter ini sudah penuh !')

                }, 1000)
            } else if (res.data == 405) {
                setTimeout(() => {
                    setLoading(false);
                    Alert.alert(MYAPP, 'Maaf Pendaftaran Umum untuk Dokter ini sudah penuh !')

                }, 1000)
            } else {
                setKode(res.data);
                setTimeout(() => {
                    setLoading(false);
                    setModalVisible(true);

                }, 1000)
            }


        })
    }

    useEffect(() => {


        if (isFocused) {
            __getTransaction();
        }

    }, [isFocused]);

    const __getTransaction = () => {
        getData('user').then(res => {
            setUser(res);
        });

        axios.post(apiURL + 'poli').then(res => {


            setPoli(res.data);

            axios.post(apiURL + 'dokter', {
                spesialis: res.data[0].value
            }).then(res2 => {

                console.log(res2.data)

                setKirim({
                    ...kirim,
                    fid_poli: res.data[0].value,
                    fid_dokter: res2.data[0].value
                })
                setDokter(res2.data);


            })
        })





    }

    return (



        <ImageBackground style={{
            flex: 1,
            paddingHorizontal: 20,
            backgroundColor: colors.white,

        }}>
            {/* <MyHeader menu="Pendaftaran Online" /> */}

            <View style={{
                flex: 1,
            }}>
                <Image source={require('../../assets/logo.png')} style={{
                    width: windowWidth / 3,
                    height: windowWidth / 3,
                    alignSelf: 'center',
                    marginBottom: 10,
                }} />

                <View
                    style={{

                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 5,
                    }}>
                    <Icon type="ionicon" name='calendar' color={colors.black} size={16} />
                    <Text
                        style={{
                            fontFamily: fonts.secondary[600],
                            color: colors.black,
                            left: 10,
                            fontSize: 12,
                        }}>
                        Tanggal Rencana Berobat
                    </Text>
                </View>
                <DatePicker
                    style={{ width: '100%', marginBottom: 20, }}
                    date={kirim.tanggal_rencana}
                    mode="date"
                    placeholder="Pilih tanggal lahir"
                    format="YYYY-MM-DD"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            right: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 0,
                            backgroundColor: colors.zavalabs,
                            backgroundColor: colors.zavalabs,
                            borderRadius: 10,
                            marginTop: 5,
                            fontFamily: fonts.secondary[600],
                            borderColor: colors.primary,
                            borderWidth: 0,
                            height: 45,

                        }
                        // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => {
                        setKirim({
                            ...kirim,
                            tanggal_rencana: date
                        })
                    }}
                />
                <MyPicker label="Jenis Pendaftaran" onValueChange={x => setKirim({
                    ...kirim,
                    jenis: x
                })} iconname="ribbon" data={[
                    { label: 'BPJS', value: 'BPJS' },
                    { label: 'Umum', value: 'Umum' },
                ]} />
                <MyGap jarak={10} />

                {kirim.jenis == 'BPJS' && <>

                    <MyPicker label="Jenis Kunjungan" onValueChange={x => setKirim({
                        ...kirim,
                        bpjs_kunjungan: x
                    })} iconname="list" data={[
                        { label: 'Rujukan FKTP', value: 'Rujukan FKTP' },
                        { label: 'Rujukan Internal', value: 'Rujukan Internal' },
                        { label: 'Kontrol', value: 'Kontrol' },
                        { label: 'Rujukan Antar RS', value: 'Rujukan Antar RS' },
                    ]} />
                    <MyGap jarak={10} />
                    <MyInput label="Inputan No. Referensi / Rujukan" onChangeText={x => {
                        setKirim({
                            ...kirim,
                            bpjs_ref: x
                        })
                    }} placeholder="Masukan no referensi / rujukan" iconname="create" />
                </>}

                <MyGap jarak={10} />
                <MyPicker label="Nama Poli" iconname="fitness" data={poli} onValueChange={x => {

                    axios.post(apiURL + 'dokter', {
                        spesialis: x
                    }).then(res2 => {
                        setDokter(res2.data);
                    })


                    setKirim({
                        ...kirim,
                        fid_poli: x
                    })
                }

                } />
                <MyGap jarak={20} />
                <MyPicker label="Nama Dokter" iconname="person" data={dokter} onValueChange={x => setKirim({
                    ...kirim,
                    fid_dokter: x
                })} />
                <MyGap jarak={20} />
                {!loading && <MyButton onPress={sendServer} warna={colors.secondary} title="DAFTAR ONLINE SEKARANG" />}

                {loading && <ActivityIndicator size="large" color={colors.primary} />}
            </View>



            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {

                    setModalVisible(!modalVisible);

                }}>
                <View style={{
                    flex: 1,
                    opacity: 1,
                    width: windowWidth,
                    height: windowHeight / 2,
                    backgroundColor: colors.border,
                    justifyContent: 'center',
                    padding: 10,
                }}>
                    <View style={{
                        backgroundColor: colors.white,
                        height: windowHeight / 2,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Image source={require('../../assets/A3.png')} style={{
                            width: '100%',
                            height: windowHeight / 2.7,
                            resizeMode: 'contain'
                        }} />
                        <Pressable onPress={() => {
                            setModalVisible(!modalVisible);
                            navigation.replace('SHasil', {
                                kode: kode
                            })
                        }} style={{
                            backgroundColor: colors.primary,
                            width: windowWidth / 2,
                            borderRadius: 10,
                            padding: 10,
                        }}>
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                fontSize: 18,
                                textAlign: 'center',
                                color: colors.white
                            }}>OK</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>


        </ImageBackground>











    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        width: windowHeight,
        height: windowWidth / 2,
    },
    imageContainer: {
        flex: 1,
        marginBottom: 1, // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderRadius: 8,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
    },
});