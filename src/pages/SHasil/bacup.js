import { Alert, StyleSheet, Text, View, Image, ActivityIndicator, Linking } from 'react-native'
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

    useEffect(() => {
        axios.post(apiURL + 'get_daftar', {
            kode: route.params.kode
        }).then(res => {
            console.log('get data', res.data);
            setData(res.data);
            setLoading(false);
        })
    }, [])



    const TopList = ({ l, v }) => {
        return (
            <View style={{
                flexDirection: 'row',
            }}>
                <Text style={{
                    flex: 0.3,
                    fontFamily: fonts.primary[600],
                    fontSize: 15
                }}>{l}</Text>
                <Text style={{
                    flex: 0.1,
                    fontFamily: fonts.primary[600],
                    fontSize: 15
                }}>:</Text>
                <Text style={{
                    flex: 1,
                    fontFamily: fonts.primary[600],
                    fontSize: 15
                }}>{v}</Text>
            </View>
        )
    }


    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            padding: 10,
        }}>

            {!loading &&

                <>
                    <View style={{
                        flex: 1,
                    }}>

                        <Image source={require('../../assets/logo.png')} style={{
                            width: windowWidth / 3,
                            height: windowWidth / 3,
                            alignSelf: 'center',

                        }} />
                        <TopList l="Tgl. Reg" v={moment(data.tanggal).format('dddd , DD MMM YYYY')} />
                        <TopList l="No. Reg" v={data.kode} />
                        <TopList l="No. RM" v={data.rekam_medis} />
                        <TopList l="Nama" v={data.nama_lengkap} />

                        <View style={{
                            borderBottomWidth: 1,
                            marginVertical: 10,

                        }} />

                        <Text style={{
                            marginVertical: 10,
                            textAlign: 'center',
                            fontFamily: fonts.primary[600],
                            fontSize: 50,
                        }}>{data.antrian}</Text>

                        <View style={{
                            borderBottomWidth: 1,
                            marginVertical: 10,

                        }} />

                        <Text style={{
                            textAlign: 'center',
                            fontFamily: fonts.primary[600],
                            fontSize: 20,
                        }}>{data.nama_poli}</Text>
                        <Text style={{
                            textAlign: 'center',
                            fontFamily: fonts.primary[600],
                            fontSize: 20,
                        }}>{data.nama_dokter}</Text>

                        <View style={{
                            borderBottomWidth: 1,
                            marginVertical: 10,

                        }} />
                        <Text style={{
                            textAlign: 'center',
                            fontFamily: fonts.secondary[400],
                            fontSize: 18,
                        }}>{moment(data.tanggal).format('dddd , DD MMM YYYY')} {data.jam}</Text>



                    </View>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <QRCode
                            size={windowWidth / 2}
                            value={data.kode}
                            logo={require('../../assets/logo.png')}
                            logoSize={30}
                            logoBackgroundColor='transparent'
                        />
                    </View>
                </>

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