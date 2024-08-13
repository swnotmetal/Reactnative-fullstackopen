import { View, StyleSheet } from "react-native";
import Main from "./src/components/Main";
import Constants from 'expo-constants';
import { NativeRouter } from "react-router-native";
import { ApolloProvider } from "@apollo/client";
import AuthStorage from "./utils/authStorage";
import AuthStorageContext from "./src/contexts/AuthStorageContext";
import createApolloClient from "./utils/apolloClient";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#e1e4e8',
  }
})

const authStorage = new AuthStorage();
console.log('AuthStorage initialized:', authStorage)
const apolloClient = createApolloClient(authStorage);
console.log('Apollo Client initialized:', apolloClient);

const App = () => {

  console.log(Constants.expoConfig.extra.APOLLO_URI);
  return (
    <View style={styles.container}>
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <AuthStorageContext.Provider value={authStorage}>
        <Main />
        </AuthStorageContext.Provider>
        </ApolloProvider>
        </NativeRouter>
    </View>

  )
}

export default App;