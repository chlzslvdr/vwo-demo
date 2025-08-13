export default function VWOScript() {
  const accountId = process.env.NEXT_PUBLIC_VWO_ACCOUNT_ID;

  if (!accountId) {
    console.warn('VWO account ID is missing. Set NEXT_PUBLIC_VWO_ACCOUNT_ID in .env.local');
    return null;
  }

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          var _vwo_code=(function(){
            var account_id=${accountId},
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
              /* rest of your SmartCode from VWO */
            };
          }());
        `
      }}
    />
  );
}
