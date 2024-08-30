import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
const SignUpSchema = z
  .object({
    username: z.string(8, 'Username must be atleast 8 characters long'),
    email: z.string().email().required('Email is required'),
    password: z.string(8, 'Password must be atleast 8 characters long'),
    confirmPassword: z.string().required('Confirm Password is required'),
  })
  .refine((data) => {
    data.password == data.confirmPassword,
      {
        message: 'Confirm Password is not matching',
        path: ['confirmPassword'],
      };
  });
function SignUpForm() {
  const { isLoading, setLoading } = useState(false);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm({
    resolver: zodResolver(SignUpSchema),
  });
  const onSubmit = (data) => {
    console.log('Form data:', data);
  };
  return <div></div>;
}

export default SignUpForm;
