import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'VWO Test',
  description: 'Dummy site for A/B testing with VWO',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Paste your VWO SmartCode here */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // VWO SmartCode - replace with exact script from your account
              var _vwo_code=(function(){
                var account_id=123456, // your account ID
                settings_tolerance=2000,
                library_tolerance=2500,
                use_existing_jquery=false,
                is_spa=1;
                return {
                  use_existing_jquery:use_existing_jquery,
                  library_tolerance:library_tolerance,
                  settings_tolerance:settings_tolerance,
                  hide_element:'body',
                  f:false,d:document,/* rest of VWO script */
                };
              }());
            `
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
