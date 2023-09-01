'use client';

import { signIn, getProviders, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const SignInWithGoogle = () => {
  const [providers, setProviders] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    const setupProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };

    setupProviders();
  }, []);

  return (
    <>
      {!session?.user &&
        providers &&
        Object.values(providers).map((provider, key) => (
          <button
            className="button button--primary"
            type="button"
            key={key}
            onClick={() => {
              signIn(provider.id);
            }}
          >
            Sign in with {provider.name}
          </button>
        ))}
    </>
  );
};

export default SignInWithGoogle;
