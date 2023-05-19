import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { colors, fonts, windowWidth } from '../../utils';
import { useNavigation } from '@react-navigation/native';
export default function MyHeader({ menu }) {

  const navigation = useNavigation();
  return (

    <View style={{
      marginBottom: 50,
      // flexDirection: 'row',
      height: 80,
      // marginTop: 10,
      backgroundColor: colors.secondary
    }
    }>
      <View style={{
        alignItems: 'flex-end',
      }}>
        <TouchableOpacity onPress={() => navigation.navigate('AAAtur')} style={{
          backgroundColor: colors.secondary,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 5,
          width: 50,
        }}>
          <Image source={require('../../assets/menu.png')} style={{
            width: 18,
            height: 18,
          }} />
        </TouchableOpacity>
      </View>
      <View style={{
        marginHorizontal: 20,
        backgroundColor: colors.white,
        borderWidth: 1,
        justifyContent: 'center',
        borderRadius: 5,
        borderColor: colors.secondary,
        height: 50,
        padding: 10,
      }}>
        <Text style={{
          fontFamily: fonts.secondary[600],
          color: colors.black,
          fontSize: 14,
        }}>Hi...</Text>
        <Text style={{
          fontFamily: fonts.secondary[600],
          color: colors.black,
          fontSize: 14,
        }} >{menu}</Text>
      </View>

    </View >
  );
}

const styles = StyleSheet.create({});
