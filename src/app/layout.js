import './globals.css';
import VWOScript from '../components/VWOScript';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <VWOScript />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
