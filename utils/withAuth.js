import { useEffect } from 'react';
import { useRouter } from 'next/router';

const withAuth = (WrappedComponent) => {
  const Auth = (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('token');

      if (!token) {

        router.replace('/signin');
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return Auth;
};

export default withAuth;
