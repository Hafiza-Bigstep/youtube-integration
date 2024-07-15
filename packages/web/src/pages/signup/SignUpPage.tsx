import React, { useState } from 'react';
import Loader from '../../components/Loader';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Input, Link, Image, Alert } from 'design-web';
import routes from 'shared/config/routes';
import IMAGES from 'shared/config/images';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [firstname, SetFirstname] = useState('');
  const [lastname, SetLastname] = useState('');
  const [email, setEmail] = useState('');
  const [termcondition, setTermsCondition] = useState(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [validationError, setValidationError] = useState('');
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

  const handleSignUp = async (e: any) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    navigate('/login');
  };

  return (
    <div>
      <div className=" flex items-center justify-center min-h-screen overflow-hidden">
        <div className="relative bg-white rounded-2xl pt-5 mx-auto w-full max-w-md ">
          <div className=" flex flex-col justify-center px-6 sm:py-2">
            <div className="mx-auto flex w-full flex-col items-center justify-center">
              <a href="#">
                <Image
                  src={IMAGES.NO_IMAGE}
                  width={110}
                  height={110}
                  alt="logo"
                />
              </a>
              <div className="w-30px m-5">
                <h1 className="font-nunito text-lg font-bold tracking-wider text-dark">
                  Create your account
                </h1>
              </div>
              <form className="w-full  py-4 px-2 pt-5" onSubmit={handleSignUp}>
                {loading && <Loader />}
                {error && <Alert message={error} type="error" />}
                {validationError && (
                  <Alert message={validationError} type="error" />
                )}
                <div className="p-0.5">
                  <Input
                    label="First Name"
                    type="text"
                    className="form-input border-2 focus:border-primary"
                    value={firstname}
                    onChange={value => SetFirstname(value)}
                  />
                </div>
                <div className="p-0.5">
                  <Input
                    label="Last Name"
                    type="text"
                    className="form-input border-2 focus:border-primary"
                    value={lastname}
                    onChange={value => SetLastname(value)}
                  />
                </div>
                <div className="p-0.5">
                  <Input
                    label="Email Address"
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
                <div className="flex items-center justify-between m-0">
                  <div className="flex items-center">
                    <Checkbox
                      label="I have read and accept the "
                      className="ml-2 font-bold text-dark"
                      value={termcondition}
                      onChange={value => setTermsCondition(value)}
                    />
                  </div>
                  <div className="text-primary hover:underline">
                    <Link href="#">Terms & Conditions.</Link>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="btn !mt-6 w-full border-0 bg-btnColor-myColor font-bold capitalize text-white flex justify-center items-center"
                  onClick={() => {}}
                >
                  Sign UP
                </Button>
                <div className="relative my-2 text-center">
                  <span className="absolute inset-x-0 top-1/2 h-px w-full -translate-y-1/2 bg-gray-300"></span>
                  <span className="relative bg-white px-2 text-white-dark dark:bg-dark dark:text-white-light">
                    Already have an account?
                  </span>
                </div>
                <div className="text-center text-gray-600">
                  <Link
                    href={routes.login}
                    className="font-base text-primary hover:text-btnColor-dark "
                  >
                    Log in to your account
                  </Link>
                </div>
              </form>
              <div className="flex items-center justify-evenly space-x-10 p-4 text-sm">
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
    </div>
  );
};

export default SignUpPage;
