'use client';

import {
  LoginTemplate,
  LoginType,
} from '@/src/components/templates/login-template';
import { signIn } from 'next-auth/react';

export default function SignUpPage() {
  return (
    <LoginTemplate
      onLogin={() =>
        signIn('google', {
          callbackUrl: `/app`,
        })
      }
      type={LoginType.SIGN_UP}
    />
  );
}
