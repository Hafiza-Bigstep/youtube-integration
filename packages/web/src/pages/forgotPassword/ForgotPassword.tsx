import React, { useEffect, useState } from 'react';
import Loader from '../../components/Loader';

import { useNavigate } from 'react-router-dom';
import { Button, Input, Link, Image, Alert } from 'design-web';
import routes from 'shared/config/routes';
import IMAGES from 'shared/config/images';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
  };

  return (
    <div className="flex items-center justify-center h-screen  overflow-hidden bg-gray-100">
      <div className="relative bg-white rounded-2xl pt-5 mx-auto w-full max-w-md">
        <div className="flex flex-col justify-center px-6 sm:py-2">
          <div className="mx-auto w-full flex flex-col items-center justify-center">
            <a href="#">
              <Image
                src={IMAGES.NO_IMAGE}
                width={110}
                height={110}
                alt="logo"
              />
            </a>
            <div className="mt-5 text-center">
              <h1 className="font-lato text-lg font-bold text-black">
                Reset your password{' '}
              </h1>
              <p className="mt-5 font-poppins     text-center !leading-snug text-dark">
                Enter your email and we&apos;ll send you instructions on how to
                reset your password{' '}
              </p>
            </div>
            <form
              className=" w-full space-y-3 py-4 px-2"
              onSubmit={handleSubmit}
            >
              {loading && <Loader />}
              {error && <Alert message={error} type="error" />}

              <div className="p-0.5">
                <Input
                  label="Email"
                  type="email"
                  className="form-input border-2 focus:border-primary"
                  value={email}
                  onChange={value => setEmail(value)}
                  isRequired={true}
                />
              </div>
              <Button
                type="submit"
                className="btn mt-6 w-full bg-primary text-white "
                onClick={() => {}}
              >
                Continue
              </Button>
              <div className="relative my-7 text-center md:mb-9"></div>

              <div className="relative my-7 text-center">
                <span className="absolute inset-x-0 top-1/2 h-px w-full -translate-y-1/2 bg-gray-300"></span>
                <span className="relative bg-white px-2 font-semibold uppercase text-gray-600">
                  or
                </span>
              </div>
              <div className="text-center text-gray-600">
                Don&apos;t have a account?{' '}
                <Link href={routes.singup} className="text-primary underline">
                  Create One
                </Link>
              </div>
            </form>

            <div className="flex items-center justify-evenly space-x-10 p-6 text-sm text-gray-600">
              <span className="text-screen/1.5h text-gray">
                <Link href={routes.help}>Help</Link>
              </span>
              <span className="text-screen/1.5h text-gray">
                <Link href={routes.termsConditions}>Privacy Policy</Link>
              </span>
              <span className="text-screen/1.5h text-gray">
                <Link href={routes.refundTerm}>Terms</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
