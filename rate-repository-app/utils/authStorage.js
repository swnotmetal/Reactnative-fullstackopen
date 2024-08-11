import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
      const userAuthen = await AsyncStorage.getItem(`${this.namespace}:userAuthentication`);
      return userAuthen ? JSON.parse(userAuthen) : [];
  }

  async setAccessToken(accessToken) {
    // Add the access token to the storage
    const currentAuthen = this.getAccessToken();
    const newAuthen = [...currentAuthen, accessToken];

    await AsyncStorage.setItem(
        `${this.namespace}:userAuthentication`, JSON.stringify(newAuthen)
    );
  }

  async removeAccessToken() {
    // Remove the access token from the storage
    await AsyncStorage.removeItem(`${this.namespace}:userAuthentication`);
  }
}

export default AuthStorage;