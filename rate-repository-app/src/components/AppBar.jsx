import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#4a90e2'
  },
  flexBar: {
    flexGrow: 1,
    flexShrink: 1,
    flexDirection: 'row', 
    alignItems: 'center', 
    height: 80,
    paddingHorizontal: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    flexGrow: 1,
    alignItems: 'center',
  },
  tab: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  signInTab: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginLeft: 'auto',
  },
  tabText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  scrollView: {
    flexDirection: "row"
  },
});

const AppBar = () => {
  return ( 
    <View style={styles.container}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.scrollView}>
        <View style={styles.flexBar}>
          <View style={styles.tabContainer}>
            <Link to='/' style={styles.tab}>
              <Text style={styles.tabText}>Repositories</Text>
            </Link>
            <Link to='/SignIn' style={styles.signInTab}>
              <Text style={styles.tabText}>Sign In</Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AppBar;