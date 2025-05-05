'use client'
import { signIn } from 'next-auth/react';

export default function Login() {
  return (
    <button
      onClick={() => signIn('linkedin')}
      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Sign up with LinkedIn
    </button>
  );
}