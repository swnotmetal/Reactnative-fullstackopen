// src/styles/styles.js
import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#4a90e2',
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
    flexDirection: 'row',
  },
});