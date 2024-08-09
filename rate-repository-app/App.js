import { View, StyleSheet } from "react-native";
import Main from "./src/components/Main";
import Constants from 'expo-constants';
import { NativeRouter } from "react-router-native";
import { ApolloProvider } from "@apollo/client";

import createApolloClient from "./utils/apolloClient";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#e1e4e8',
  }
})

const App = () => {
  return (
    <View style={styles.container}>
      <NativeRouter>
        <ApolloProvider client={createApolloClient()}>
        <Main />
        </ApolloProvider>
        </NativeRouter>
    </View>

  )
}

export default App;