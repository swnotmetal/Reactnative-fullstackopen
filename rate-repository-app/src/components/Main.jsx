import {Route, Routes, Navigate, Link} from 'react-router-native'
import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import { SingleRepoPage } from './SingleRepoPage';
import ReviewForm from './ReviewForm';
import SignUp from './SignUp';






const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <>
   
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path='/' element={< RepositoryList/>}/>
        <Route path='*' element={<Navigate to="/" replace />} />
        <Route path='SignIn' element={<SignIn />}/>
        <Route path='repository/:id' element={< SingleRepoPage />}/>
        <Route path='/writeAReview' element={<ReviewForm/>}/>
        <Route path='/SignUp' element={<SignUp/>}/>
      </Routes>
      </View>
    </>
    
  );
};

export default Main;