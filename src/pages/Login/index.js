import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator, TouchableOpacity, BackHandler, Alert } from 'react-native';
import { fonts, windowWidth, colors } from '../../utils';
import { MyInput, MyGap, MyButton } from '../../components';
import axios from 'axios';
import { apiURL, api_token, MYAPP, storeData } from '../../utils/localStorage';
import { showMessage } from 'react-native-flash-message';


export default function ({ navigation }) {

  const [kirim, setKirim] = useState({
    api_token: api_token,
    telepon: null,
    password: null
  });
  const [loading, setLoading] = useState(false);



  const masuk = () => {


    if (kirim.telepon == null && kirim.password == null) {
      Alert.alert(MYAPP, 'telepon or Passwoord could not empty !');
    } else if (kirim.telepon == null) {
      Alert.alert(MYAPP, 'telepon  could not empty');
    } else if (kirim.password == null) {
      Alert.alert(MYAPP, 'Password  could not empty');
    } else {


      setLoading(true);
      console.log(kirim);

      axios
        .post(apiURL + 'login', kirim)
        .then(res => {
          setLoading(false);
          console.log(res.data);
          if (res.data.status == 404) {
            showMessage({
              type: 'danger',
              message: res.data.message
            })
          } else {
            storeData('user', res.data.data);
            navigation.replace('Home')
          }

        });



    }




  }

  useEffect(() => {

    // const backAction = () => {
    //   Alert.alert("Info Wks", "Apakah kamu yakin akan keluar aplikasi ?", [
    //     {
    //       text: "Cancel",
    //       onPress: () => null,
    //       style: "cancel"
    //     },
    //     { text: "YES", onPress: () => BackHandler.exitApp() }
    //   ]);
    //   return true;
    // };

    // const backHandler = BackHandler.addEventListener(
    //   "hardwareBackPress",
    //   backAction
    // );

    // return () => backHandler.remove();
  }, [])

  return (
    <>
      <ScrollView style={{ padding: 10, flex: 1, backgroundColor: colors.white, position: 'relative' }}>

        <View style={{
          width: windowWidth / 1.6,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 5,
          marginBottom: 10,
        }}>


        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 5, paddingTop: 10 }}>

          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Image
              source={require('../../assets/logo.png')}
              style={
                {
                  width: windowWidth / 2,
                  height: windowWidth / 2,
                  resizeMode: 'contain'
                }
              }
            />



          </View>


        </View>
        <MyGap jarak={10} />
        <View style={{ padding: 10, marginVertical: 10, flex: 1 }}>
          <MyInput label="NIK / Rekam Medis" onChangeText={val => setKirim({
            ...kirim,
            telepon: val
          })}
            iconname="card" keyboardType='phone-pad' placeholder="Masukan No NIK / No Telephone Kamu " />
          <MyGap jarak={20} />
          <MyInput
            onChangeText={val => setKirim({
              ...kirim,
              password: val
            })}
            secureTextEntry={true}
            label="Kata Sandi Kamu"
            iconname="lock-closed"
            placeholder="Masukan kata sandi kamu"
          />
          <MyGap jarak={40} />
          {!loading &&


            <MyButton
              onPress={masuk}
              title="Masuk"
              warna={colors.primary}
              Icons="log-in-outline"
            />

          }

        </View>
        {loading && <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <ActivityIndicator color={colors.primary} size="large" />
        </View>}
      </ScrollView>
      <TouchableOpacity onPress={() => navigation.navigate('Register')} style={{
        padding: 10,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center'
      }}><Text style={{
        fontSize: windowWidth / 28,
        marginTop: 10,
        fontFamily: fonts.primary[400],
        textAlign: 'center',
        color: colors.tertiary
      }}>Tidak punya akun ? <Text style={{
        fontSize: windowWidth / 28,
        marginTop: 10,
        fontFamily: fonts.primary[600],
        textAlign: 'center',
        color: colors.tertiary
      }}>Daftar sekarang</Text></Text></TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({});
