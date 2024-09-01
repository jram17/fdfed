import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { FaGoogle } from 'react-icons/fa';
import { RiLoader5Line } from 'react-icons/ri';
import '@fontsource-variable/fira-code';
import '@fontsource-variable/nunito';
import '@fontsource-variable/faustina';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const SignUpSchema = z
  .object({
    username: z.string().min(8, 'Username must be at least 8 characters long'),
    email: z.string().email('Email is required'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    confirmPassword: z.string().min(8, 'Confirm Password is required'),
  })
  .refine((formdata) => formdata.password === formdata.confirmPassword, {
    message: 'Confirm Password does not match',
    path: ['confirmPassword'],
  });

function SignUpForm() {
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [error, setErrorMsg] = useState(false);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = async (formdata) => {
    setLoading(true);
    try {
      setError(false);
      setErrorMsg('');
      const response = await axios.post('http://localhost:5000/user/register', {
        username: formdata.username,
        email: formdata.email,
        password: formdata.password,
      });
      if (response.status === 200) {
        toast.success('🦄 Account Created Successfully', {
          position: 'bottom-right',
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }

      reset();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError(true);
        setErrorMsg(error.response.data.message || 'An error occurred');
      } else {
        toast.error('��� An error occurred', {
          position: 'bottom-right',
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    } finally {
      setLoading(false);
      reset();
    }
  };

  return (
    <div className="grid w-full items-center px-4 sm:justify-center border-none shadow-none font-form">
      <div className="card w-full max-sm:w-96 p-6 border-none shadow-none max-h-inherit max-lg:px-0 flex flex-col items-center justify-center gap-6">
        <div className="card-header flex items-center justify-center gap-2  flex-col">
          <div className="card-title flex items-center justify-center text-nowrap max-sm:text-lg font-title !text-3xl">
            Start With Society Log
          </div>
          <div className="card-description flex items-center justify-center text-nowrap max-sm:text-xs">
            Welcome! Please fill in the details to get started.
          </div>
        </div>
        <div className="card-content grid gap-y-4 max-sm:gap-y-1 w-full">
          <div className="grid grid-cols-1 gap-y-3 gap-x-1 w-full place-items-center">
            <div className="max-sm:text-xs max-sm:px-2 max-sm:py-1">
              <button
                className="btn sm-btn !text-lg  outline-btn max-sm:text-xs max-sm:px-2 max-sm:py-1"
                disabled={isLoading}
              >
                {isLoading ? (
                  <RiLoader5Line className="size-4 animate-spin" />
                ) : (
                  <>
                    <FaGoogle className="mr-2 size-4" />
                    <span>Continue With Google</span>
                  </>
                )}
              </button>
            </div>
          </div>
          <p className="flex items-center gap-x-3 max-sm:gap-x-1 text-sm text-muted-foreground before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
            or
          </p>
        </div>
        <div className="card-content grid gap-y-1 w-full">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="form-item">
              <label
                className={`form-item ${
                  errors.username && 'text-destructive'
                } form-label`}
              >
                UserName
              </label>
              <input
                type="text"
                {...register('username', { required: true })}
                className="input"
              />
              {errors.username && (
                <p className=" form-message">{errors.username.message}</p>
              )}
            </div>
            <div className="form-item">
              <label
                className={` ${
                  errors.username && 'text-destructive'
                } form-label`}
              >
                Email
              </label>
              <input
                type="email"
                {...register('email', { required: true })}
                className="input"
              />
              {errors.email && (
                <p className=" form-message">{errors.email.message}</p>
              )}
            </div>

            <div className="form-item">
              <label
                className={` ${
                  errors.username && 'text-destructive'
                } form-label`}
              >
                Password
              </label>
              <input
                type="password"
                {...register('password', { required: true })}
                className="input"
              />
              {errors.password && (
                <p className=" form-message">{errors.password.message}</p>
              )}
            </div>

            <div className="form-item">
              <label
                className={` ${
                  errors.username && 'text-destructive'
                } form-label`}
              >
                ConfirmPassword
              </label>
              <input
                type="password"
                {...register('confirmPassword', { required: true })}
                className="input"
              />
              {errors.confirmPassword && (
                <p className=" form-message">
                  {errors.confirmPassword.message}
                </p>
              )}
              {isError && <p className=" form-message">{error}</p>}
            </div>
            <div className="w-full grid place-items-center">
              <button
                className="btn  !text-lg   max-sm:text-xs max-sm:px-2 max-sm:py-1"
                disabled={isLoading}
              >
                {isLoading ? (
                  <RiLoader5Line className="size-4 animate-spin" />
                ) : (
                  <>
                    <span>Get Started</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
