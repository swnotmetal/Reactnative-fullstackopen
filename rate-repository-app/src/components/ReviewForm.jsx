import React from 'react';
import { useFormik } from 'formik';
import { TextInput, View, StyleSheet, Pressable, Text } from 'react-native';
import * as yup from 'yup';
import useCreateAReview from '../hooks/useReviewMutation';
import { useNavigate } from 'react-router-native';


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

const validationSchema = yup.object().shape({
    ownerName: yup
        .string()
        .min(3, 'Owner name must be longer than 3 characters')
        .max(30, 'Owner name is too long!')
        .required('Owner name is required'),
    repositoryName: yup
        .string()
        .min(3, 'Repository name must be longer than 3 characters')
        .max(30, 'Repository name is too long!')
        .required('Repository name is required'),
    rating: yup
        .number()
        .min(0, 'Rating must be greater than 0')
        .max(100, 'Rating must be less than 100')
        .required('Rating is required'),
    text: yup
        .string()
        .max(300, 'Review is too long!')
        .required('Review is required'),
});

const initialValues = {
    ownerName: '',
    repositoryName: '',
    rating: '',
    text: '',
};

const ReviewForm = () => {
  const [createAReview] = useCreateAReview();
  
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    console.log("review values", values);
    const { ownerName, repositoryName, rating, text } = values;
    try {
      const { data } = await createAReview({ ownerName, repositoryName, rating, text });
      console.log("data", data);
      navigate(`/repository/${data.createReview.repositoryId}`);
    } catch (e) {
      console.log(e);
    }
  };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    }
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={formik.handleChange('ownerName')}
                value={formik.values.ownerName}
                placeholder="Repository owner name"
                onBlur={formik.handleBlur('ownerName')}
                placeholderTextColor="#999999"
             />
        {formik.errors.ownerName && (
        <Text style={styles.errorText}>{formik.errors.ownerName}</Text>
      )}
        <TextInput 
            style={styles.input}
            onChangeText={formik.handleChange('repositoryName')}
            value={formik.values.repositoryName}
            placeholder="Repository name"
            onBlur={formik.handleBlur('repositoryName')}
            placeholderTextColor="#999999"
        
        />
        {formik.errors.repositoryName && (
            <Text style={styles.errorText}>{formik.errors.repositoryName}</Text>
        )}
        <TextInput 
            style={styles.input}
            onChangeText={formik.handleChange('rating')}
            value={formik.values.rating}
            placeholder="Rating between 0 and 100"
            onBlur={formik.handleBlur('rating')}
            placeholderTextColor="#999999"
        />
        {formik.errors.rating && (
            <Text style={styles.errorText}>{formik.errors.rating}</Text>
        )}
        <TextInput 
    style={styles.reviewInput}
    onChangeText={formik.handleChange('text')}
    value={formik.values.text}
    placeholder="Review"
    onBlur={formik.handleBlur('text')}
    placeholderTextColor="#999999"
    multiline
    textAlignVertical="top"
/>
{formik.errors.text && ( 
    <Text style={styles.errorText}>{formik.errors.text}</Text>
)}
    <Pressable onPress={formik.handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Create a review</Text>
    </Pressable>
        </View >
        
    )
}

export default ReviewForm;