import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // saving error
  }
};

export const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (e) {
    // error reading value
  }
};


export const apiURL = 'https://daftaronline.okeadmin.com/api/';
export const MYAPP = 'PENDAFTARAN ONLINE';
export const api_token = 'd4e729bcd8aab6f0a710e8ca3d31524cb5783dd1d63ddbf32fbed278c435605f';
export const webURL = apiURL.replace("api/", "");
export const TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPTlNCIiwiYXVkIjoiVmljdG9yIEJlcm5hbmRvIiwic3ViIjoiU3ViamVjdCBvZiB0aGUgSldUIiwiaWF0IjoxNjg2MDM3MjcwLCJleHAiOjE2ODYwNDA4NzAsImVtYWlsIjoiYmVybmFuZG9AZ21haWwuY29tIn0.3trv1AVsv9UAMJeltFrN-Odb8aS77WdxZsGT2aILj3Y';

