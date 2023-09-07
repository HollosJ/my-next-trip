'use client';

import { signIn, getProviders, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const SignInWithGoogle = () => {
  const [providers, setProviders] = useState(null);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter;

  useEffect(() => {
    const setupProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };

    setupProviders();
  }, []);

  const handleSignIn = async (provider) => {
    setLoading(true);
    await signIn(provider.id);

    setLoading(false);
  };

  return (
    <>
      {!session?.user &&
        providers &&
        Object.values(providers).map((provider, key) => (
          <button
            className="button button--primary"
            type="button"
            key={key}
            onClick={() => handleSignIn(provider)}
            disabled={loading}
          >
            {loading ? 'Signing In...' : `Sign in with ${provider.name}`}
          </button>
        ))}
    </>
  );
};

export default SignInWithGoogle;
