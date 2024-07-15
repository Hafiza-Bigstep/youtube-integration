import React, { useEffect, useState } from 'react';
import Loader from '../../components/Loader';
import { useAuth } from 'shared/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Input, Link, Image, Alert } from 'design-web';
import routes from 'shared/config/routes';
import IMAGES from 'shared/config/images';

const LoginPage: React.FC = () => {
  const { emitToken } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [validationError, setValidationError] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated, authToken } = useAuth();

  const validateForm = () => {
    if (!email) {
      setValidationError('Email is required.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setValidationError('Invalid email format.');
      return false;
    }
    if (!password) {
      setValidationError('Password is required.');
      return false;
    }
    return true;
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    emitToken('token', '/');
    navigate('/');
  };

  useEffect(() => {
    if (isAuthenticated && authToken && authToken.length > 0) {
      navigate('/');
    }
  }, [isAuthenticated, authToken, navigate]);

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
                Log in to your account
              </h1>
            </div>
            <form className="w-full  py-4 px-2" onSubmit={handleLogin}>
              {loading && <Loader />}
              {error && <Alert message={error} type="error" />}
              {validationError && (
                <Alert message={validationError} type="error" />
              )}
              <div className="p-0.5">
                <Input
                  label="Email"
                  type="email"
                  className="form-input border-2 focus:border-primary"
                  value={email}
                  onChange={value => setEmail(value)}
                />
              </div>
              <div className="p-0.5">
                <Input
                  label="Password"
                  type="password"
                  className="form-input border-2 focus:border-primary"
                  value={password}
                  onChange={value => setPassword(value)}
                  isRequired={true}
                />
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center">
                  <Checkbox
                    label="Remember me"
                    className="ml-2 font-bold text-dark"
                    value={rememberMe}
                    onChange={value => setRememberMe(value)}
                  />
                </div>
                <div className="text-primary hover:underline">
                  <Link href={routes.forgotpassword}>
                    Forget your Password?
                  </Link>
                </div>
              </div>
              <Button
                type="submit"
                className="btn mt-6 w-full bg-primary text-white"
                onClick={() => {}}
              >
                Sign In
              </Button>
              <div className="relative my-7 text-center">
                <span className="absolute inset-x-0 top-1/2 h-px w-full -translate-y-1/2 bg-gray-300"></span>
                <span className="relative bg-white px-2 font-semibold uppercase text-gray-600">
                  or
                </span>
              </div>
              <div className="text-center text-gray-600">
                Don&apos;t have a account? &nbsp;
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

export default LoginPage;
