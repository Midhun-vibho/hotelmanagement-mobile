import * as yup from 'yup';

// const phoneRegExp =
//   /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const phoneRegExp = /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)?[0-9]{10}$/

export const loginSchema = yup.object({
  email: yup
    .string()
    .email('Email should be valid email')
    .required('It is a required field'),
  password: yup.string().required('It is a required field'),
});

export const registerSchema = yup.object({
  first_name: yup.string().required('It is a required field'),
  email: yup
    .string()
    .email('Email should be valid email')
    .required('It is a required field'),
  password: yup.string().required('It is a required field'),
  confirmPassword: yup.string().oneOf([yup.ref("password")], 'confirmpassword should be same'),
  // confirmPassword: yup.string().required('It is a required field'),
  phonenumber: yup.string().matches(phoneRegExp, {
    message: 'Phone number is not valid',
    excludeEmptyString: true,
  }),
});

export const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .email('Email should be valid email')
    .required('It is a required field'),
});

export const editProfileSchema = yup.object({
  first_name: yup.string().required('It is a required field'),
  email: yup
    .string()
    .email('Email should be valid email')
    .required('It is a required field'),
  phonenumber: yup.string().matches(phoneRegExp, {
    message: 'Phone number is not valid',
    excludeEmptyString: true,
  })
    .test('is-ten-digits', 'Phone number must be exactly 10 digits', (value) => {
      // Remove non-digit characters (e.g., spaces and hyphens) from the value
      const cleanPhoneNumber = value.replace(/\D/g, '');
      return cleanPhoneNumber.length === 10;
    }),

});

export const changePasswordSchema = yup.object({
  old_password: yup.string().required('It is a required field'),
  new_password: yup.string().required('It is a required field'),
  confirm_new_password: yup.string().required('It is a required field'),
});
