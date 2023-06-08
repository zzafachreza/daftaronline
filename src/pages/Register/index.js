import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    Button,
    View,
    Image,
    ScrollView,
    ImageBackground,
    Dimensions,
    Switch,
    SafeAreaView,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { MyInput, MyGap, MyButton, MyPicker } from '../../components';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import { apiURL, api_token, MYAPP } from '../../utils/localStorage';
import DatePicker from 'react-native-datepicker'
import moment from 'moment';
import { Icon } from 'react-native-elements';

export default function Register({ navigation }) {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const [loading, setLoading] = useState(false);
    const [valid, setValid] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
    const [cek, setCek] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const validate = text => {
        // console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            // console.log('nama_lengkap is Not Correct');
            setData({ ...data, nama_lengkap: text });
            setValid(false);
            return false;
        } else {
            setData({ ...data, nama_lengkap: text });
            setValid(true);
            // console.log('nama_lengkap is Correct');
        }
    };

    const [sama, setSama] = useState(true)

    const [data, setData] = useState({
        api_token: api_token,
        password: '',
        repassword: '',
        nik: '',
        telepon: '',
        nama_lengkap: '',
        tanggal_lahir: '',
        rekam_medis: '',
        alamat: '',
        gender: 'Laki-laki',
    });

    const simpan = () => {
        if (

            data.tanggal_lahir.length === 0 &&
            data.rekam_medis.length === 0 &&
            data.nik.length === 0 &&
            data.telepon.length === 0 &&
            data.password.length === 0

        ) {
            showMessage({
                message: 'Formulir pendaftaran tidak boleh kosong !',
            });
        }
        // else if (data.nama_lengkap.length === 0) {
        //     showMessage({
        //         message: 'Masukan nama kamu',
        //     });
        // }
        else if (!cek) {
            showMessage({
                message: 'Silahkan centang syarat dan ketentuan',
            });
        }
        else if (data.rekam_medis.length === 0) {
            // console.log(data.rekam_medis)
            showMessage({
                message: 'Masukan nomor rekam medis',
            });
        }
        else if (data.nik.length === 0) {
            showMessage({
                message: 'Masukan NIK',
            });
        }
        else if (data.telepon.length === 0) {
            showMessage({
                message: 'Masukan nomor telepon',
            });
        } else if (data.password.length === 0) {
            showMessage({
                message: 'Masukan kata sandi kamu',
            });
        } else {

            console.log(data);

            setLoading(true);
            axios
                .post(apiURL + 'register', data)
                .then(res => {
                    console.warn(res.data);
                    setLoading(false);
                    if (res.data.status == 404) {
                        showMessage({
                            type: 'danger',
                            message: res.data.message
                        })
                    } else {
                        Alert.alert(MYAPP, res.data.message);
                        navigation.goBack();
                    }


                });
        }
    };
    return (
        <ImageBackground
            style={{
                flex: 1,
                backgroundColor: colors.white,
                padding: 10,
                position: 'relative'
            }}>

            {/* <Switch onValueChange={toggleSwitch} value={isEnabled} /> */}
            <ScrollView showsVerticalScrollIndicator={false} style={styles.page}>

                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontSize: windowWidth / 10,
                        fontFamily: fonts.primary[800],
                        color: colors.black,
                    }}>Daftar</Text>
                    <Text style={{
                        fontSize: windowWidth / 25,
                        fontFamily: fonts.primary[400],
                        color: colors.black,
                        textAlign: 'center',
                        marginBottom: 10,
                    }}>Tolong lengkapi biodata kamu dengan benar</Text>
                </View>

                <MyGap jarak={10} />
                <MyInput
                    placeholder="Masukan Rekam Medis kamu"
                    label="Rekam Medis Kamu"
                    iconname="card"
                    value={data.rekam_medis}
                    onChangeText={value =>
                        setData({
                            ...data,
                            rekam_medis: value,
                        })
                    }
                />


                <MyGap jarak={10} />
                <MyInput
                    placeholder="Masukan NIK kamu"
                    label="NIK Kamu"
                    iconname="clipboard"
                    value={data.nik}
                    onChangeText={value =>
                        setData({
                            ...data,
                            nik: value,
                        })
                    }
                />


                {/* <MyGap jarak={10} />
                <MyInput
                    placeholder="Masukan nama kamu"
                    label="Nama Kamu"
                    iconname="person"
                    value={data.nama_lengkap}
                    onChangeText={value =>
                        setData({
                            ...data,
                            nama_lengkap: value,
                        })
                    }
                /> */}


                <MyGap jarak={10} />
                <MyInput
                    placeholder="Masukan telepon kamu"
                    label="Telepon Kamu"
                    iconname="call"
                    keyboardType="phone-pad"
                    value={data.telepon}
                    onChangeText={value =>
                        setData({
                            ...data,
                            telepon: value,
                        })
                    }
                />


                <View
                    style={{
                        marginTop: 10,
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
                        Tanggal Lahir
                    </Text>
                </View>
                <DatePicker
                    style={{ width: '100%' }}
                    date={data.tanggal_lahir}
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
                        }
                        // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => {
                        setData({
                            ...data,
                            tanggal_lahir: date
                        })
                    }}
                />





                <MyGap jarak={10} />
                <MyInput
                    placeholder="Masukan buat sandi kamu"
                    label="Buat Sandi Kamu"
                    iconname="lock-closed"
                    secureTextEntry
                    value={data.password}
                    onChangeText={value =>
                        setData({
                            ...data,
                            password: value,
                        })
                    }
                />
                <MyGap jarak={10} />
                <MyInput
                    borderColor={sama ? colors.border : colors.danger}
                    borderWidth={sama ? 0 : 1}
                    placeholder="Masukan ulang kata sandi kamu"
                    label="Tulis Ulang Kata Sandi Kamu"
                    iconname="lock-closed"
                    secureTextEntry
                    value={data.repassword}
                    onChangeText={value => {

                        if (value !== data.password) {
                            setSama(false)
                        } else {
                            setSama(true)
                        }

                        setData({
                            ...data,
                            repassword: value,
                        })
                    }

                    }
                />
                <MyGap jarak={10} />


                <TouchableOpacity onPress={() => {
                    cek ? setCek(false) : setCek(true);
                }} style={{
                    flexDirection: 'row',
                    padding: 5,
                    marginTop: 10,
                    alignItems: 'center'
                }}>
                    <View style={{
                        marginRight: 5,
                        borderWidth: 1,
                        backgroundColor: colors.white,
                        borderRadius: 5,
                    }}>
                        <Icon type='ionicon' name='checkmark' color={cek ? colors.black : colors.white} size={windowWidth / 30} />
                    </View>
                    <Text style={{
                        marginTop: 5,
                        fontFamily: fonts.primary[400],
                        fontSize: windowWidth / 30
                    }}>Saya setuju dengan syarat dan ketentuan yang berlaku</Text>
                </TouchableOpacity>

                {!loading &&
                    <MyButton

                        warna={colors.primary}
                        title="Buat Akun"
                        Icons="log-in"
                        onPress={simpan}
                    />
                }
                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{
                    padding: 10,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}><Text style={{
                    fontSize: windowWidth / 28,
                    fontFamily: fonts.primary[400],
                    textAlign: 'center',
                    color: colors.tertiary
                }}>Sudah punya akun ? <Text style={{
                    fontSize: windowWidth / 28,
                    fontFamily: fonts.primary[600],
                    textAlign: 'center',
                    color: colors.tertiary
                }}>Masuk sekarang</Text></Text></TouchableOpacity>
                <MyGap jarak={10} />
                {loading && <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <ActivityIndicator color={colors.primary} size="large" />
                </View>}
            </ScrollView>

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        padding: 10,
    },
    image: {
        width: 620 / 4,
        height: 160 / 4,
    },
});
