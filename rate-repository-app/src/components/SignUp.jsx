import { useFormik } from 'formik';
import { TextInput, View, StyleSheet, Pressable, Text } from 'react-native';
import * as yup from 'yup';
import useSignup from '../hooks/useSignup';
import { useNavigate } from 'react-router-native';


const validationSchema = yup.object().shape({
    userName: yup
        .string()
        .required('Username is required')
        .min(4, 'Username must be at least 4 characters')
        .max(12, 'Username must be at most 12 characters')
        .required('Username is required'),
    password: yup
        .string()
        .required('Password is required'),
    passwordConfirm: yup.string()
        .oneOf([yup.ref('password'), null])
        .required('Password confirm is required')
})

const initialValues = {
    userName: '',
    password: '',
    passwordConfirm: ''
}

const SignUp =() => {
    const [signup] = useSignup();
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        const { userName, password } = values;
        try {
           const {data} = await signup({ username: userName, password });
           console.log("we have sign in data", data);
            navigate('/signin');
        } catch (e) {
            console.log(e);
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    });

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Username"
                onChangeText={formik.handleChange('userName')}
                value={formik.values.userName}
                placeholderTextColor="#999999"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={formik.handleChange('password')}
                value={formik.values.password}
                placeholderTextColor="#999999"
            />
            <TextInput
                style={styles.input}
                placeholder="Password confirmation"
                secureTextEntry
                onChangeText={formik.handleChange('passwordConfirm')}
                value={formik.values.passwordConfirm}
                placeholderTextColor="#999999"
            />
            <Pressable onPress={formik.handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Sign up</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: 'white',
    },
    input: {
      height: 70,
      borderColor: '#cccccc',
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 8,
      paddingHorizontal: 12,
      fontSize: 16,
    },
    reviewInput: {
        height: 120,
        borderColor: '#cccccc',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 8,
        paddingHorizontal: 12,
        fontSize: 16,
        textAlignVertical: 'top',
        },
    inputError: {
      borderColor: '#d73a4a',
    },
    button: {
      backgroundColor: 'orange',
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
export default SignUp;
