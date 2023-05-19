import React, { useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    Image,
    Animated,
    ImageBackground,
    TouchableOpacity,
    Linking,
} from 'react-native';
import { MyButton, MyGap } from '../../components';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { getData } from '../../utils/localStorage';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'react-native-elements';
export default function GetStarted({ navigation }) {


    const masuk = () => {

        getData('user').then(res => {
            if (!res) {
                navigation.replace('Login')
            } else {
                navigation.replace('Home')

            }
        })
    }





    return (
        <ImageBackground
            style={{
                flex: 1,
                // justifyContent: 'flex-end',
            }}>

            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Image source={require('../../assets/logo.png')} style={{
                    width: windowWidth / 1.5,
                    height: windowWidth / 1.5,
                }} />
            </View>

            <View style={{
                flex: 0.3,
                margin: 10,
            }}>

                <MyButton onPress={() => navigation.navigate('Login')} warna={colors.primary} colorText={colors.white} title="LOGIN" />

                <MyGap jarak={20} />

                <MyButton onPress={() => navigation.navigate('Register')} warna={colors.secondary} colorText={colors.white} title="DAFTAR" />


            </View>

        </ImageBackground>
    );
}

const styles = StyleSheet.create({});
