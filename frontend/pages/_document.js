import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <div id="g_id_onload"
          data-client_id="241050613763-tnnn25debunpshr0ebmo9ih27jglq2dc.apps.googleusercontent.com"
          data-context="use"
          data-ux_mode="popup"
          data-login_uri="/api/login"
          data-auto_select="true"
          data-close_on_tap_outside="false"
          data-itp_support="true"
          data-skip_prompt_cookie="credential">
        </div>
        <Main />
        <NextScript />
        <script src="http://accounts.google.com/gsi/client" async></script>
      </body>
    </Html>
  )
}
