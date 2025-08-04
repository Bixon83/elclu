import React, { PropsWithChildren } from 'react';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="bg-cluGrayBg text-gray-900 min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
