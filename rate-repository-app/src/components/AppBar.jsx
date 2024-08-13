import React from 'react';
import { View, ScrollView } from 'react-native';
import sharedStyles from '../styles/sharedStyles';
import { useMe } from '../hooks/useMe';
import { useSignOut } from '../hooks/useSignOut';

import Text from './Text';
import { Link } from 'react-router-native';


const AppBar = () => {

  const {me} = useMe();
  console.log("user?:", me);

  const [signOut] = useSignOut();

  return ( 
    <View style={sharedStyles.container}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={sharedStyles.scrollView}>
        <View style={sharedStyles.flexBar}>
          <View style={sharedStyles.tabContainer}>
            <Link to='/' style={sharedStyles.tab}>
              <Text style={sharedStyles.tabText}>Repositories</Text>
            </Link>
           
            {me ? (
              <Link to='/SignIn' style={sharedStyles.signInTab} onPress={signOut}>
                <Text style={sharedStyles.tabText}>Sign Out</Text>
              </Link>
            ) : (
              <Link to='/SignIn' style={sharedStyles.signInTab}>
                <Text style={sharedStyles.tabText}>Sign In</Text>
              </Link>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AppBar;
