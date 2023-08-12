import { Button, TextField, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box/Box';
import { Formik } from 'formik';

import * as yup from 'yup';
import Header from '../components/Header';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  contact: '',
  address1: '',
  address2: '',
}

const phoneRegExp =
  /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/

const userSchema = yup.object().shape({
  firstName: yup.string().required('required'),
  lastName: yup.string().required('required'),
  email: yup.string()
    .email('Invalid email').required('required'),
  contact: yup.string().
    matches(phoneRegExp, 'Phone number is not valid')
    .required('required'),
  address1: yup.string().required('required'),
  address2: yup.string().required('required'),
})

const Form = () => {
  const isNonMobile = useMediaQuery('min-width: 600px');

  const handleFormSubmit = (values: typeof initialValues) => {
    console.log(values);
  }

  return (
    <Box m='20px'>
      <Header title='CREATE USER' subtitle='Create a New User Profile' />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={userSchema}
      >
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display='grid'
              gap='30px'
              gridTemplateColumns='repeat(4, minmax(0, 1fr))'
              sx={{
                '& > div': {
                  gridColumn: isNonMobile ? undefined : 'span 4'
                }
              }}
            >
              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='First Name'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name='firstName'
                //if input is selected without adding value onleave throw error
                error={!!touched.firstName && !!errors.firstName}
                sx={{ gridColumn: 'span 2' }}
              />

              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Last Name'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name='lastName'
                error={!!touched.lastName && !!errors.lastName}
                sx={{ gridColumn: 'span 2' }}
              />


              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Email'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name='email'
                error={!!touched.email && !!errors.email}
                sx={{ gridColumn: 'span 4' }}
              />

              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Contact Number'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name='contact'
                error={!!touched.contact && !!errors.contact}
                sx={{ gridColumn: 'span 4' }}
              />

              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Address 1'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name='address1'
                error={!!touched.address1 && !!errors.address1}
                sx={{ gridColumn: 'span 4' }}
              />

              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Address 2'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name='address2'
                error={!!touched.address2 && !!errors.address2}
                sx={{ gridColumn: 'span 4' }}
              />
            </Box>

            <Box display='flex' justifyContent='end' mt='20px'>
              <Button type='submit' color='secondary' variant='contained'>
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  )
}

export default Form