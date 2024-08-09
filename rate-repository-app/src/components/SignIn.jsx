import React from 'react';
import { useFormik } from 'formik';
import { TextInput, View, StyleSheet, Button, Pressable } from 'react-native';
import Text from './Text';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';


const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  inputError: {
    borderColor: '#d73a4a',
  },
  button: {
    backgroundColor: '#4a90e2',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  label: {
    marginBottom: 6,
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 8,
  },
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, 'Username must be longer than 5 characters')
    .max(25, 'Username is too long!')
    .required('Username is required'),
  password: yup
    .string()
    .min(6, 'Password must be longer than 8 characters')
    .max(30, 'Password is too long!')
    /*.matches(
      /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).+$/,
      'Password must contain at least 1 capital character and 1 special character.'
    )*/
    .required('Password is required'),
});

const SignIn = ({ onSubmit }) => {
  
  const [signIn] = useSignIn();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const { username, password } = values;
      try {
        const response = await signIn({ username, password });
        console.log('repsonse:',response);
        const accessToken = response.authenticate.accessToken;
        console.log('Access Token:', accessToken);
      }catch (e) {
        console.log(e);
      }
      console.log(values);
      if (onSubmit) {
        onSubmit(values);
      }
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={[
          styles.input,
          //formik.errors.username && styles.inputError,
        ]}
        placeholder="Enter your username"
        onChangeText={formik.handleChange('username')}
        onBlur={formik.handleBlur('username')}
        value={formik.values.username}
        autoCapitalize="none"
      />
      {formik.errors.username && (
        <Text style={styles.errorText}>{formik.errors.username}</Text>
      )}

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={[
          styles.input,
          //formik.errors.password && styles.inputError,
        ]}
        placeholder="Enter your password"
        onChangeText={formik.handleChange('password')}
        onBlur={formik.handleBlur('password')}
        value={formik.values.password}
        secureTextEntry={true}
        autoCapitalize="none"
      />
      {formik.errors.password && (
        <Text style={styles.errorText}>{formik.errors.password}</Text>
      )}

      <Pressable style={styles.button} onPress={formik.handleSubmit} title="Sign In" > 
      <Text style={styles.buttonText}>Log In</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;