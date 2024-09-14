import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slice/authSlice';
import { setUserDetails } from '../redux/slice/userSlice';
import { Link } from 'react-router-dom';
import { RiAlarmWarningFill, RiLoader5Line } from 'react-icons/ri';
import Country_data from '../utils/CountryList.json';
import ReCaptcha from './ReCaptcha';
function CreateRoomForm() {
  const reCAPTCHARef = useRef(null);
  const [token, setToken] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [error, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleToken = (token) => {
    setToken(token);
  };
  const CreateRoomFormSchema = z.object({
    name: z.string().min(1, 'Provide a valid name'),
    registeration_num: z.string(),
    state: z.string(),
    address: z.string(),
    pincode: z
      .string()
      .min(6, 'Provide a valid pincode')
      .max(6, 'Pincode must be 6 digits'),
    email: z.string().email('Provide a valid email'),
    subscription: z.string(),
    terms_check: z.boolean().refine((val) => val === true, {
      message: 'You must accept the terms and conditions',
    }),
  });

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(CreateRoomFormSchema) });

  const onSubmit = async (formData) => {
    axios.defaults.withCredentials = true;

    setLoading(true);
    setError(false);
    setErrorMsg('');
    let response;
    try {
      const formdata = {
        name: formData.name,
        address: formData.address,
        state: formData.state,
        pincode: formData.pincode,
        registration_num: formData.registeration_num,
        email: formData.email,
        subscription: formData.subscription,
      };
      response = await axios.post('http://localhost:5000/createRoom', formdata);
      if (response.status === 200) {
        reset();
        navigate('/dashboard');
      }
    } catch (error) {
      if (response.status === 500) {
        reset();
        setError(true);
        setErrorMsg('Error in creating message');
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="grid w-full items-center px-4 sm:justify-center border-none shadow-none font-content min-h-[60vh] min-w-[70vw] justify-center">
      <div className="card w-full max-sm:w-96 p-6 border-none shadow-none max-h-inherit max-lg:px-0 flex flex-col items-center justify-center gap-6  h-full">
        <div className="card-header flex items-center justify-center gap-2 flex-col">
          <div className="card-title flex items-center justify-center text-nowrap max-sm:text-lg font-content !text-3xl">
            Register Your Community With Society Log
          </div>
          <div className="card-description flex items-center w-full justify-left text-nowrap max-sm:text-xs">
            One Stop Solution For Hastle Free Community
          </div>
        </div>

        <div className="card-content grid gap-y-1 w-full shadow-none">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="form-item">
              <label
                className={`form-item ${
                  errors.name ? 'text-destructive' : ''
                } form-label`}
              >
                Abode Name
              </label>
              <input
                autoFocus
                type="text"
                placeholder="Abode Name"
                {...register('name', { required: true })}
                className={`input  !w-full ${
                  errors.name ? 'border-destructive' : ''
                }`}
              />
              {errors.name && (
                <p className="form-message">{errors.name.message}</p>
              )}
            </div>
            <div className="form-item">
              <label
                className={`${
                  errors.registeration_num ? 'text-destructive' : ''
                } form-label`}
              >
                Registration Number
              </label>
              <input
                type="text"
                placeholder="Registration Number"
                {...register('registeration_num', { required: true })}
                className={`input  !w-full ${
                  errors.registeration_num ? 'border-destructive' : ''
                }`}
                onChange={() => {
                  setError(false);
                }}
              />
              {errors.registeration_num && (
                <p className="form-message">
                  {errors.registeration_num.message}
                </p>
              )}
              {isError && <p className="form-message">{error}</p>}
            </div>

            <div className="form-item">
              <label
                className={`${
                  errors.state ? 'text-destructive' : ''
                } form-label`}
              >
                Select Your State
              </label>
              <select
                {...register('state', { required: true })}
                className={`select !w-full ${
                  errors.state ? 'border-destructive' : ''
                }`}
                id="country"
                defaultValue={' '}
              >
                <option
                  value=""
                  disabled
                  selected
                  className="bg-background text-muted-foreground"
                >
                  Select Your State
                </option>
                {Country_data.map((country) => {
                  return (
                    <option key={country.name} value={country.name}>
                      {country.name}
                    </option>
                  );
                })}
              </select>
              {errors.state && (
                <p className="form-message">{errors.state.message}</p>
              )}
              {isError && <p className="form-message">{error}</p>}
            </div>
            <div className="form-item">
              <label
                className={`${
                  errors.address ? 'text-destructive' : ''
                } form-label`}
              >
                Address
              </label>
              <textarea
                placeholder="Address"
                {...register('address', { required: true })}
                className={`textarea ${
                  errors.Address ? 'border-destructive' : ''
                }`}
                onChange={() => {
                  setError(false);
                }}
              />
              {errors.address && (
                <p className="form-message">{errors.address.message}</p>
              )}
              {isError && <p className="form-message">{error}</p>}
            </div>
            <div className="form-item">
              <label
                className={` ${
                  errors.pincode && 'text-destructive'
                } form-label`}
              >
                Pincode
              </label>
              <input
                type="number"
                disabled={isLoading}
                placeholder="PINCODE"
                {...register('pincode', { required: true })}
                className="input !w-full"
              />
              {errors.pincode && (
                <p className=" form-message">{errors.pincode.message}</p>
              )}
            </div>
            <div className="form-item">
              <label
                className={` ${errors.email && 'text-destructive'} form-label`}
              >
                Emergency Email
              </label>
              <input
                type="email"
                disabled={isLoading}
                placeholder="Email"
                {...register('email', { required: true })}
                className="input !w-full"
              />
              {errors.email && (
                <p className=" form-message">{errors.email.message}</p>
              )}
            </div>
            <div className="form-item">
              <label
                htmlFor="subscription"
                className={`form-label ${
                  errors.subscription ? 'text-destructive' : ''
                }`}
              >
                Subscription Method
              </label>

              <div className="radio-group-stack">
                <div className="radio-indicator ">
                  <input
                    id="basic"
                    className="radio-item"
                    type="radio"
                    {...register('subscription', {
                      required: 'Subscription method is required',
                    })}
                    value="Basic"
                  />
                  <label htmlFor="basic">Basic</label>
                </div>

                <div className="radio-indicator ">
                  <input
                    id="premium"
                    className="radio-item"
                    type="radio"
                    {...register('subscription', {
                      required: 'Subscription method is required',
                    })}
                    value="Premium"
                  />
                  <label htmlFor="premium">Premium</label>
                </div>

                {errors.subscription && (
                  <p className="form-message">{errors.subscription.message}</p>
                )}
              </div>
            </div>

            <div className="items-top flex space-x-2">
              <div className="grid gap-1.5 leading-none">
                <div className="flex gap-2 items-center justify-left">
                  <input
                    type="checkbox"
                    {...register('terms_check', { required: true })}
                    className={`checkbox${
                      errors.terms_check ? 'border-destructive' : ''
                    }`}
                  />
                  <label
                    htmlFor="terms_check"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Accept terms and conditions
                  </label>
                </div>
                <p className="text-sm text-muted-foreground">
                  You agree to our Terms of Service and Privacy Policy.
                </p>
                {errors.terms_check && (
                  <p className="form-message">{errors.terms_check.message}</p>
                )}
              </div>
            </div>
            <div className="form-item"></div>
            <div className="w-full grid place-items-center">
              <button
                className="btn outline-btn sm-btn !text-lg max-sm:text-xs max-sm:px-2 max-sm:py-1"
                disabled={isLoading || isSubmitting}
              >
                {isLoading ? (
                  <RiLoader5Line className="size-4 animate-spin" />
                ) : (
                  <span>Start My Journey</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateRoomForm;