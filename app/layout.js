import { Jost } from 'next/font/google';
import Script from 'next/script';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '@/app/components/Sidebar/Sidebar';
import Header from '@/app/components/Header/Header';

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap'
});

export const metadata = {
  title: "Assignments using Next JS, Laravel",
  description: "",
  keywords: "",
  author: "Ridoy Paul",
  robots: "index, follow",
  charset: "UTF-8",
  language: "en-BD",
  canonical: "",
  alternate: {
    hrefLang: "bn-BD",
    href: "",
  },
  favicon: "public/assets/img/fab-icon.png",

};


export default function RootLayout({ children }) {
  return (
    <html lang="en" className={jost.className}  suppressHydrationWarning={true}>

      <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" />
        <link href="/assets/css/app.css" rel="stylesheet" />
        
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap" rel="stylesheet" />
      </head>

      <body suppressHydrationWarning={true}>
        <ToastContainer position="top-right" autoClose={2000} hideProgressBar={true} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />

        <div className="wrapper">

          {/* Sidebar  */}
          <Sidebar />

          <div className="main">
            {/* Header  */}
            <Header />

            <main className="content">
              {children}
            </main>
          </div>
        </div>

        <Script src="https://code.jquery.com/jquery-3.6.0.min.js" strategy="beforeInteractive" /> 
        <Script src="/assets/js/app.js" strategy="beforeInteractive" /> 
        
      </body>
    </html>
  );
}
