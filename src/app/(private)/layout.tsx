import React from 'react'
import NavBar from '@/components/app/navBar';

export default function PrivateLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <section>
            <NavBar />
            {children}
        </section>
    )
}

