import { Lusitana } from 'next/font/google';
import { Inter } from 'next/font/google';

// import localFont from 'next/font/local';
// export const inter = localFont({ src: '../public/font/inter.woff'});
 
export const inter = Inter({ subsets: ['latin'] });
export const lusitana = Lusitana({ subsets: ['latin'] ,weight: ['400', '700']});