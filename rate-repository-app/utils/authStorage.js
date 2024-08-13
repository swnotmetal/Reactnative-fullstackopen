import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
    this.key = `${this.namespace}:accessToken`;
  }

  async getAccessToken() {
    try {
      const accessToken = await AsyncStorage.getItem(this.key);
      return accessToken ? accessToken : null;
    } catch (error) {
      console.error('Error getting access token:', error);
      return null;
    }
  }

  async setAccessToken(accessToken) {
    try {
      await AsyncStorage.setItem(this.key, accessToken);
    } catch (error) {
      console.error('Error setting access token:', error);
    }
  }

  async removeAccessToken() {
    try {
      await AsyncStorage.removeItem(this.key);
    } catch (error) {
      console.error('Error removing access token:', error);
    }
  }
}

export default AuthStorage;