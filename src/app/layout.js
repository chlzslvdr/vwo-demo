import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              var _vwo_code=(function(){
                var account_id=${process.env.NEXT_PUBLIC_VWO_ACCOUNT_ID},
                settings_tolerance=2000,
                library_tolerance=2500,
                use_existing_jquery=false,
                is_spa=1;
                return {
                  use_existing_jquery:use_existing_jquery,
                  library_tolerance:library_tolerance,
                  settings_tolerance:settings_tolerance,
                  hide_element:'body',
                  /* DO NOT EDIT BELOW THIS LINE */
                  f:false,d:document,
                  // rest of VWO's code...
                };
              }());
            `
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
