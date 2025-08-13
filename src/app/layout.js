export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* VWO SmartCode directly in the server-rendered head */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              var _vwo_code=(function(){
                var account_id=1130496,
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
                  t: function() {
                    var f=this;
                    function d() {
                      var a=document.createElement('script');
                      a.src='https://dev.visualwebsiteoptimizer.com/j.php?a='+account_id+'&u='+encodeURIComponent(document.URL)+'&r='+Math.random();
                      a.type='text/javascript';a.innerText;a.onerror=function(){};
                      document.getElementsByTagName('head')[0].appendChild(a);
                    }
                    setTimeout(d, 0);
                  }
                };
              }());
              _vwo_code.t();
            `
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
