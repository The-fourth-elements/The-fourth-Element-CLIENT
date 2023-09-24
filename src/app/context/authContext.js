'use client';

import { SessionProvider } from 'next-auth/react';

export default function ProviderNextAuth({ children }) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}