import React, { useState } from 'react';
import Loader from '../../components/Loader';

import { useNavigate } from 'react-router-dom';
import { Button, Input, Link, Image, Alert } from 'design-web';
import routes from 'shared/config/routes';
import IMAGES from 'shared/config/images';

const VerifyOTP: React.FC = () => {
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [resent, setResent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
  };

  const handleResend = async (e: any) => {
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
                Enter OTP for Verify Account
              </h1>
            </div>
            <form
              className="w-full sm:w-90vw min-w-[25vw] space-y-3 py-4 px-8 dark:text-white"
              onSubmit={handleSubmit}
            >
              {loading && <Loader />}
              {error && <Alert message={error} type="error" />}

              <div className="mb-7">
                {resent ? (
                  <span>
                    We have resended a verification on (Users mail here), Please
                    verify the code{' '}
                  </span>
                ) : (
                  <span>
                    We have sent a verification on (Users mail here), please
                    verify the code{' '}
                  </span>
                )}
              </div>
              <Input
                label="OTP"
                type="text"
                className="form-input border-2 focus:border-primary"
                value={otp}
                onChange={value => setOtp(value)}
                isRequired={true}
              />
              <div className="mt-2">
                <span>Didn’t receive any code? </span>
                {countdown > 0 ? (
                  <span>Resend code in {countdown}s</span>
                ) : (
                  <Button
                    type="button"
                    onClick={() => handleResend}
                    className="text-primary underline"
                  >
                    Resend now
                  </Button>
                )}
              </div>

              <Button
                type="submit"
                className="btn !mt-6 w-full border-0 bg-primary uppercase text-white hover:bg-btnColor-myColor"
                onClick={() => {}}
              >
                Verify OTP
              </Button>
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

export default VerifyOTP;
