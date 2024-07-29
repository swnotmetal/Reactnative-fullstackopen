import { View, StyleSheet, Press, Pressable } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
  },
  flexBar: {
    flexGrow: 1,
    backgroundColor: 'skyblue',
    flexShrink: 1,
    flexBasis: 'auto',
    alignSelf: 'auto',
    height: 50,
  }

});

const onPressFunction = (event) => {
  event.preventDefault()
}

const AppBar = () => {
  return ( 
  <View style={styles.container}>
    <View style={styles.flexBar} >
      <Text fontWeight="bold" fontSize="subheading" >
        <Pressable onPress={onPressFunction}>
        Repository
        </Pressable>
        </Text>
    </View>
  </View>

)
 
};

export default AppBar;