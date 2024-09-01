import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { FaGoogle } from 'react-icons/fa';
import { RiLoader5Line } from 'react-icons/ri';

const SignUpSchema = z
  .object({
    username: z.string().min(8, 'Username must be at least 8 characters long'),
    email: z.string().email('Email is required'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    confirmPassword: z.string().min(8, 'Confirm Password is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Confirm Password does not match',
    path: ['confirmPassword'],
  });

function SignUpForm() {
  const [isLoading, setLoading] = useState(false);
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

  return (
    <div className="grid w-full items-center px-4 sm:justify-center border-none shadow-none">
      <div className="card w-full max-sm:w-96 p-6 border-none shadow-none max-h-inherit max-lg:px-0 flex flex-col items-center justify-center gap-6">
        <div className="card-header flex items-center justify-center gap-2  flex-col">
          <div className="card-title flex items-center justify-center text-nowrap max-sm:text-lg">
            Start With Society Log
          </div>
          <div className="card-description flex items-center justify-center text-nowrap max-sm:text-xs">
            Welcome! Please fill in the details to get started.
          </div>
        </div>
        <div className="card-content grid gap-y-4 max-sm:gap-y-1">
          <div className="grid grid-cols-1 gap-y-3 gap-x-1 w-full place-items-center">
            <div className="max-sm:text-xs max-sm:px-2 max-sm:py-1">
              <button
                className="btn sm-btn  outline-btn max-sm:text-xs max-sm:px-2 max-sm:py-1"
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
      </div>
    </div>
  );
}

export default SignUpForm;
