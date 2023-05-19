import { Alert, StyleSheet, Text, View, Image, ActivityIndicator, Linking, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyGap, MyHeader, MyInput, MyPicker } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import DatePicker from 'react-native-datepicker'
import { maskJs, maskCurrency } from 'mask-js';
import moment from 'moment';
import QRCode from 'react-native-qrcode-svg';

export default function SHasil({ navigation, route }) {


    console.log('Hasil', route.params);
    const kode = route.params.kode;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const [comp, setComp] = useState({});

    useEffect(() => {
        axios.post(apiURL + 'company').then(c => {
            console.log(c.data);
            setComp(c.data.data);
        })
        axios.post(apiURL + 'get_daftar', {
            kode: route.params.kode
        }).then(res => {
            console.log('get data', res.data);
            setData(res.data);
            setLoading(false);
        })
    }, [])



    const TopList = ({ img, label, value }) => {
        return (
            <View style={{
                marginHorizontal: 20,
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={img} style={{
                        width: 28,
                        height: 28,
                        resizeMode: 'contain'
                    }} />
                    <Text style={{
                        left: 8,
                        fontFamily: fonts.secondary[400],
                        color: colors.black,
                        fontSize: 12,
                        textAlign: 'center'
                    }} >{label}</Text>
                </View>

                <View style={{}}>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        color: colors.black,
                        fontSize: 12,
                        textAlign: 'center'
                    }} >{value}</Text>
                </View>
            </View>
        )
    }


    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: '#EBEFF2',
            justifyContent: 'center',
            alignItems: 'center'
        }}>

            {!loading &&

                <ImageBackground source={require('../../assets/tiket.png')} style={{
                    flex: 1,
                    width: 360,
                    marginVertical: 10,

                }}>
                    <View style={{
                        marginTop: 30,
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: 18,
                            textAlign: 'center'
                        }} >{comp.deskripsi}</Text>
                        <Text style={{
                            fontFamily: fonts.secondary[400],
                            fontSize: 14,
                            textAlign: 'center'
                        }} >No Referensi / Rujukan : {data.bpjs_ref}</Text>
                        <Text style={{
                            fontFamily: fonts.secondary[400],
                            color: colors.primary,
                            fontSize: 18,
                            textAlign: 'center'
                        }} >{data.nama_dokter}</Text>

                        <TopList img={require('../../assets/rm.png')} label="No Rekam Medis" value={data.rekam_medis} />
                        <TopList img={require('../../assets/poli.png')} label="Poli" value={data.nama_poli} />
                        <TopList img={require('../../assets/tgl.png')} label="Tanggal Rujukan" value={moment(data.tanggal).format('DD-MMM-YYYY')} />
                        <TopList img={require('../../assets/book.png')} label="Kode Booking" value={moment(data.tanggal).format('YYYYMMDD') + data.kode.split("/")[2]} />
                        <TopList img={require('../../assets/reg.png')} label="No Registrasi" value={data.kode} />
                        <TopList img={require('../../assets/jns.png')} label="Jenis Kunjungan" value={data.bpjs_kunjungan} />


                    </View>
                    {/* baroce */}

                    <View style={{
                        marginTop: 40,
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: 18,
                            textAlign: 'center'
                        }} >Nomor Antrean Poliklinik</Text>

                        <Text style={{
                            color: colors.secondary,
                            textAlign: 'center',
                            fontFamily: fonts.secondary[600],
                            fontSize: 55,
                        }}>{data.antrian}</Text>
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <QRCode
                                size={150}
                                value={data.kode}
                                logo={require('../../assets/logo.png')}
                                logoSize={30}
                                logoBackgroundColor='transparent'
                            />
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            marginHorizontal: 20,
                            justifyContent: 'space-between'
                        }}>
                            <View >
                                <Text style={{
                                    color: colors.black,
                                    fontFamily: fonts.secondary[600],
                                    fontSize: 15,
                                }}>Sisa{'\n'}Antrean</Text>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                    <Image source={require('../../assets/sisa.png')} style={{
                                        width: 28,
                                        height: 28,
                                        resizeMode: 'center'
                                    }} />
                                    <Text style={{
                                        color: colors.black,
                                        fontFamily: fonts.secondary[600],
                                        fontSize: 20,
                                        textAlign: 'center',
                                        left: 5,
                                    }}>{data.nomor - 1}</Text>
                                </View>
                            </View>
                            <View >
                                <Text style={{
                                    color: colors.black,
                                    fontFamily: fonts.secondary[600],
                                    fontSize: 15,
                                }}>Peseta{'\n'}Dilayani</Text>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                    <Image source={require('../../assets/layan.png')} style={{
                                        width: 28,
                                        height: 28,
                                        resizeMode: 'center'
                                    }} />
                                    <Text style={{
                                        color: colors.black,
                                        fontFamily: fonts.secondary[600],
                                        fontSize: 20,
                                        left: 5,
                                        textAlign: 'center'
                                    }}>-</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{
                            padding: 2,
                            backgroundColor: '#E8F5FE',
                            marginHorizontal: 20,
                            marginTop: 10,
                            height: 80,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: '#DAE5EB',
                            justifyContent: 'center',
                            alignItems: 'center'

                        }}>
                            <Text style={{
                                fontFamily: fonts.secondary[400],
                                fontSize: 13,
                                fontStyle: 'italic'
                            }}>*) Peserta harap 30 menit lebih awal guna pencatatan administrasi.{'\n'}Untuk tujuan poli Anda diperlukan identifikasi sidik jari,{'\n'}silahkan datang ke tempat validasi sidik jari terlebih dahulu</Text>
                        </View>
                    </View>
                </ImageBackground>
            }
            {loading && <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})