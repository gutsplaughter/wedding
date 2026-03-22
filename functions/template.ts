export function getTemplate({
  redirectPath,
  withError
}: {
  redirectPath: string;
  withError: boolean;
}): string {
  return `
  <!doctype html>
  <html lang="en" data-theme="dark">

    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Protected Site</title>
      <meta name="description" content="This site is password protected.">
      <link rel="shortcut icon" href="https://picocss.com/favicon.ico">

      <link rel="stylesheet" href="https://unpkg.com/@picocss/pico@latest/css/pico.min.css">
      <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital@1&display=swap" rel="stylesheet">

      <style>
        :root {
          --pico-font-family: 'Crimson Pro';
        }

        html {
          background-image: url('https://images.pexels.com/photos/167684/pexels-photo-167684.jpeg');
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center center;
          min-height: 100vh;
          overflow: hidden;
        }
          
        body {
          color: #A3C6A8;
          text-align: center;
        }

        body > main {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-height: calc(100vh - 7rem);
          padding: 1rem 0;
          max-width: 600px;
          margin: 0 auto;
        }

        .error {
          color: #E54636;
          padding: 0.25em 0.25em;
        }

        h1 {
          color: #A3C6A8;
          padding: 0.2em 0.2em;
          font-size: 2.5rem;
        }

        h2 {
          color: #A3C6A8;
          font-size: 1.0rem !important;
        }
          
        button {
          background-color: #A3C6A8;
          margin-bottom: 0px !important;
        }

        p {
          margin-bottom: 0px !important;
        }

        @media (max-width: 600px) {
          body > main {
            margin: 1.5rem;
            padding: 1.5rem 0.5rem;
            min-height: unset;
            max-width: 100%;
          }

          h2 {
            font-size: 1.25rem !important;
          }

          html {
            background-position: top center;
            background-size: cover;
          }
        }
      </style>
    </head>

    <body>
      <main>
        <article>
          <hgroup>
            <h1>Welcome</h1>
            <h2>Please enter your first and last name for access to our site.</h2>
          </hgroup>
          ${withError ? `<p class="error">Incorrect password, please try again.</p>` : ''}
          <form method="post" action="/cfp_login">
            <input type="hidden" name="redirect" value="${redirectPath}"/>
            <input type="text" name="password" placeholder="Full Name (case sensitive)" aria-label="Password" autocomplete="current-password" required autofocus>
            <button type="submit" class="contrast">Login</button>
          </form>
          <p style="color: #A3C6A8; text-align: right">♡ Elise & Ryan</p>
        </article>
      </main>
    </body>
  </html>
  `;
}
