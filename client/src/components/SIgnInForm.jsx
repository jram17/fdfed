import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
function SignInForm() {
  const SignUpSchema = z.object({
    identifier: z.union(z.email(), z.string()),
    password: z.string(8, 'Password must be atleast 8 characters long'),
  });
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm({ resolver: zodResolver });
  const onSubmit = (data) => {
    console.log('Form data:', data);
  };
  return <div></div>;
}

export default SignInForm;
