import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { colors, fonts, windowWidth } from '../../utils';
import { useNavigation } from '@react-navigation/native';
export default function MyHeader({ menu }) {

  const navigation = useNavigation();
  return (

    <View style={{
      flexDirection: 'row',
      marginTop: 10,
    }
    }>
      <View style={{
        flex: 1,
        // padding: 10,
        borderWidth: 1,
        justifyContent: 'center',
        borderRadius: 5,
        borderColor: colors.secondary,
        height: 50,
        paddingLeft: 10,
        marginRight: 5,
      }}>
        <Text style={{
          fontFamily: fonts.primary[400],
          fontSize: windowWidth / 25
        }}>{menu}</Text>
      </View>
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
    </View >
  );
}

const styles = StyleSheet.create({});
