import type { Metadata } from 'next';
import Script from 'next/script'
import { Inter } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Optimizely Web Experimentation - React Example',
  description: 'Used to explain how to integrate Optimizely Web Experimentation with React',
};

export default ({children}: Readonly<{children: React.ReactNode}>) => {
  return (
    <html lang='en' data-bs-theme='dark'>
      <Script src="/optimizely.js" strategy="afterInteractive"/>
      <body className={inter.className}>
        <Container className='my-4'>
          {children}
        </Container>
      </body>
    </html>
  );
}
