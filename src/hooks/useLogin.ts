import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { mutate } from 'swr';
import api from 'utils/api';
import setAuthToken from 'utils/setAuthToken';

function useLogin() {
  const router = useRouter();

  const login = useCallback(
    async (values: { email: string; password: string }) => {
      const { data } = await api.post('/auth/login', values);
      setAuthToken(data);
      await mutate('/profile/show');
      router.replace('/');
    },
    [router]
  );

  return login;
}

export default useLogin;
