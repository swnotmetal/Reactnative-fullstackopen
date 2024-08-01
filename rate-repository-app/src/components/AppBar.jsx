import { View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import { Link } from 'react-router-native';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
  },
  flexBar: {
    flexGrow: 1,
    backgroundColor: 'lightblue',
    flexShrink: 1,
    flexDirection: 'row', 
    alignItems: 'center', 
    height: 80,
  },
  tabContainer: {
    flexDirection: 'row',
    flexGrow: 1,
    alignItems: 'center',
  },
  tab: {
    paddingHorizontal: 10,
    color: 'white',
  },
  signInTab: {
    paddingHorizontal: 10,
    color: 'white',
    marginLeft: 'auto', // Pushes this item to the end of the flex container
  },

});

/*const onPressFunction = (event) => {
  event.preventDefault()
}*/

const AppBar = () => {
  return ( 
  <View style={styles.container}>
    <View style={styles.flexBar} >
    <View style={styles.tabContainer}>
    <Link to='/' style={styles.tab}>
      <Text fontWeight="bold" fontSize="heading" >
            Repositories       
        </Text>
        </Link>
      <Link to='/SignIn' style={styles.signInTab}>
      <Text fontWeight="bold" fontSize="heading">Sign In</Text>
      </Link>
      </View>
    </View>
  </View>

)
 
};

export default AppBar;