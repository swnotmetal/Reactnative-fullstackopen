import { View, StyleSheet, Pressable } from 'react-native';
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
    height: 80,
  }

});

const onPressFunction = (event) => {
  event.preventDefault()
}

const AppBar = () => {
  return ( 
  <View style={styles.container}>
    <View style={styles.flexBar} >
    <Pressable onPress={onPressFunction}>
      <Text fontWeight="bold" fontSize="subheading" >
            Repositories       
        </Text>
        </Pressable>
    </View>
  </View>

)
 
};

export default AppBar;