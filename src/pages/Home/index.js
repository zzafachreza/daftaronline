import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, ImageBackground } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyCarouser, MyGap, MyHeader, MyInput } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { FloatingAction } from "react-native-floating-action";
import 'intl';
import 'intl/locale-data/jsonp/en';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';



export default function Home({ navigation }) {


  const [data, setData] = useState([]);
  const [user, setUser] = useState({});
  const isFocused = useIsFocused();
  useEffect(() => {


    if (isFocused) {
      __getTransaction();
    }

  }, [isFocused]);

  const __getTransaction = () => {




    getData('user').then(uu => {
      axios.post('http://36.92.213.157:8080/ci-4-jwt/public/api/login', {
        email: 'bernando@gmail.com',
        password: 'victorbernando'
      }).then(res0 => {
        console.log('user', uu);
        axios.get('http://36.92.213.157:8080/ci-4-jwt/public/api/pasien/rm/' + uu.rekam_medis, {
          headers: {
            'Authorization': `Bearer ${res0.data.token}`
          }
        })
          .then((res) => {

            let tmp = res.data.message.data
            tmp['id'] = uu.id
            tmp['gender'] = uu.gender
            tmp['foto_user'] = uu.foto_user
            tmp['tanggal_lahir'] = uu.tanggal_lahir
            tmp['telepon'] = uu.telepon

            console.log('API', tmp);
            storeData('user', tmp);
            setUser(tmp)
          })
          .catch((error) => {
            console.error(error)
          })
      })

    });


  }




  return (






    <ImageBackground style={{
      flex: 1,
      // padding: 20,
    }}>

      <MyHeader menu={`${user.nama}`} />

      {/* menu utama */}


      <MyCarouser />


      <View style={{
        flex: 0.5,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
      }}>

        <TouchableOpacity onPress={() => navigation.navigate('SAdd', user)} style={{
          width: windowWidth / 3.2,
          padding: 2,
          justifyContent: 'center',
          alignItems: 'center'
        }}>

          <View style={{
            borderWidth: 1,
            elevation: 4,
            backgroundColor: colors.white,
            borderColor: colors.secondary,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            height: 120,
            width: '90%',
            marginBottom: 10
          }}>
            <Image source={require('../../assets/A1.png')} style={{
              width: '85%',
              height: 120,
              resizeMode: 'contain',

            }} />
          </View>

          <Text style={{
            fontFamily: fonts.secondary[600],
            color: colors.black,
            fontSize: 13,
            textAlign: 'center'
          }}>DAFTAR ONLINE</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Riwayat', user)} style={{

          width: windowWidth / 3.2,
          borderRadius: 20,
          padding: 2,
          // backgroundColor: colors.primary,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <View style={{
            elevation: 4,
            borderWidth: 1,
            backgroundColor: colors.white,
            borderColor: colors.secondary,
            borderRadius: 10,
            height: 120,
            width: '90%',
            marginBottom: 10,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Image source={require('../../assets/A2.png')} style={{
              width: '85%',
              height: 120,
              resizeMode: 'contain',

            }} />
          </View>
          <Text style={{
            fontFamily: fonts.secondary[600],
            color: colors.black,
            fontSize: 13,
            textAlign: 'center'
          }}>RIWAYAT ANTRIAN</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Account')} style={{

          width: windowWidth / 3.2,
          borderRadius: 20,
          padding: 2,
          // backgroundColor: colors.primary,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <View style={{
            borderWidth: 1,
            elevation: 4,
            backgroundColor: colors.white,
            borderColor: colors.secondary,
            borderRadius: 10,
            height: 120,
            width: '90%',
            marginBottom: 10,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Image source={require('../../assets/akun.png')} style={{
              width: '85%',
              height: 120,
              resizeMode: 'contain',

            }} />
          </View>
          <Text style={{
            fontFamily: fonts.secondary[600],
            color: colors.black,
            fontSize: 13,
            textAlign: 'center'
          }}>PROFIL SAYA</Text>
        </TouchableOpacity>

      </View>


    </ImageBackground >




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