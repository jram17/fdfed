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
import '../index.css';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function SignInForm() {
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [error, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const SignUpSchema = z.object({
    identifier: z.union([z.string().email(), z.string()]),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
  });

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(SignUpSchema) });

  const onSubmit = async (formData) => {
    axios.defaults.withCredentials = true;

    setLoading(true);
    setError(false);
    setErrorMsg('');
    try {
      const response = await axios.post('http://localhost:5000/user/login', {
        identifier: formData.identifier,
        password: formData.password,
      });

      if (response.status === 200) {
        toast.success('Login successful!', {
          position: 'bottom-right',
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        reset();
        navigate('/');
      }
    } catch (error) {
      const errorMessage = 'Invalid credentials';

      setError(true);
      setErrorMsg(errorMessage);

      toast.error(errorMessage, {
        position: 'bottom-right',
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid w-full items-center px-4 sm:justify-center border-none shadow-none font-form min-h-[60vh] min-w-[70vw] justify-center">
      <div className="card w-full max-sm:w-96 p-6 border-none shadow-none max-h-inherit max-lg:px-0 flex flex-col items-center justify-center gap-6  h-full">
        <div className="card-header flex items-center justify-center gap-2 flex-col">
          <div className="card-title flex items-center justify-center text-nowrap max-sm:text-lg font-title !text-3xl">
            LogIn To Society Log
          </div>
          <div className="card-description flex items-center justify-center text-nowrap max-sm:text-xs">
            Continue with Society Log
          </div>
        </div>
        <div className="card-content grid gap-y-4 max-sm:gap-y-1 w-full">
          <div className="grid grid-cols-1 gap-y-3 gap-x-1 w-full place-items-center">
            <div className="max-sm:text-xs max-sm:px-2 max-sm:py-1">
              <button
                className="btn sm-btn !text-lg outline-btn max-sm:text-xs max-sm:px-2 max-sm:py-1"
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
                  errors.identifier ? 'text-destructive' : ''
                } form-label`}
              >
                UserName or Email
              </label>
              <input
                type="text"
                placeholder="Identification"
                {...register('identifier', { required: true })}
                className={`input ${
                  errors.identifier ? 'border-destructive' : ''
                }`}
              />
              {errors.identifier && (
                <p className="form-message">{errors.identifier.message}</p>
              )}
            </div>

            <div className="form-item">
              <label
                className={`${
                  errors.password ? 'text-destructive' : ''
                } form-label`}
              >
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                {...register('password', { required: true })}
                className={`input ${
                  errors.password ? 'border-destructive' : ''
                }`}
                onChange={() => {
                  setError(false);
                }}
              />
              {errors.password && (
                <p className="form-message">{errors.password.message}</p>
              )}
              {isError && <p className="form-message">{error}</p>}
            </div>

            <div className="w-full grid place-items-center">
              <button
                className="btn outline-btn sm-btn !text-lg max-sm:text-xs max-sm:px-2 max-sm:py-1"
                disabled={isLoading || isSubmitting}
              >
                {isLoading ? (
                  <RiLoader5Line className="size-4 animate-spin" />
                ) : (
                  <span>Login In Now</span>
                )}
              </button>
            </div>
          </form>
        </div>
        <div className="card-content w-full flex items-center justify-center ">
          <Link to={'/sign-up'}>
            <button className="btn link">Want to Create a Account?</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignInForm;
