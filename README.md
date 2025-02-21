# Topo Auth 🦦

### 2fa authenticator [webapp](https://topoauth.org/)

* Lightweight 
* Secure
* Private


## Why use Topo?

[TOTP](https://datatracker.ietf.org/doc/html/rfc6238) is a standard for generating temporary access codes. The idea is that a service provides you with a `secret` that you can store to create temporary access `codes` using an Authenticator app like Topo.
When you want to login to the service you will have to provide your credentials and a fresh temporary code.

But,

each website promotes its own authenticator, scattering user secrets across multiple applications.
Popular authenticators include ads, sends user data over the internet or requires unnecessary permissions.

So,

the idea behind Topo is to have a free, simple and lightweight authenticator that respects privacy and security.


## Limitations

You can not share your secrets across different devices: you will have to back them up as QR codes, either as an image or a paper printed copy. This is intended.

If you clear your browser's localStorage, your data WILL BE LOST. Backup your QRs.

Some applications and websites push their own authenticator, which makes the QR code difficult to find.


## Security concerns

Topo stores your secrets in [localStorage](https://www.w3schools.com/jsref/prop_win_localstorage.asp) to keep everything in the browser and avoid cookies, however localStorage stores your data as plain text.

Because Topo is written is JavaScript, [XSS attacks](https://owasp.org/www-community/attacks/xss/) are still a potential security issue of the language. Topo tries to mitigate that by having as minimal interaction as possible with the user and the environment. The only input that could be dangerous is a malicious QR code.

##### **TL;DR: Be careful with the QRs that you scan and keep Topo on a safe device.**


## Contributing

Feel free to open issues and PRs.

#### Workflow with [vite](https://vite.dev/):

You need `nodejs` and a dependency manager like `npm`.

* `npm i` install all dependencies.
* `npm run dev` run a local development server.
* `npm run build` create a production build inside `./dist`.
* `npm run preview` run a server serving `./dist` content.
* `npm run test` interactive testing.
* `npm run ci` run all tests.


## Wishlist

[ ] Button to export a secret QR as an image file.
[ ] Button to import a QR code image file.
[ ] Button to install Topo as a [progressive webapp](https://en.wikipedia.org/wiki/Progressive_web_app). [More info](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/How_to/Trigger_install_prompt).
[ ] [A11y](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
[ ] Landing page teaching good security practices about 2fa linking to Topo.
