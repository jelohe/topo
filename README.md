# [Topo Auth 🦦](https://topoauth.org/)

#### 2fa authenticator webapp

* Lightweight 
* Secure
* Private


## Why use Topo?

[TOTP](https://datatracker.ietf.org/doc/html/rfc6238) is a standard for generating temporary access codes. The idea is that a website provides you with a code called `secret` that allows you to generate temporary access `codes`. You have to input your user credentials and a valid temporary code to login on the website, providing an additional layer of security.

But:

Each website promotes their own authenticator, scattering user secrets across multiple applications.

Popular authenticators include ads and/or sends user data over the internet.

So:

The idea behind Topo is to have a free, simple and lightweight authenticator that works on most devices out of the box and respects privacy and security.


## Limitations

* You can not share your secrets across different devices: you will have to back them up as QR codes, either as an image or a paper printed copy.

* If you clear your browser's localStorage, your data WILL BE LOST. Backup your QRs.

* Some applications and websites push their own authenticator, making the QR code difficult to find.


## Security concerns

Topo stores your secrets in [localStorage](https://www.w3schools.com/jsref/prop_win_localstorage.asp) to keep everything in the browser and avoid cookies.

Because Topo is written is JavaScript, [XSS attacks](https://owasp.org/www-community/attacks/xss/) are still a potential security issue of the language. Topo tries to mitigate that by having as minimal interaction as possible with the user and the environment. The only attack vector that i could think of is a malicious QR code.

**TL;DR Be careful with the QRs that you scan and don't give anyone access to your web browser.**


## Contributing

Feel free to open issues and PRs.

#### Workflow [vite](https://vite.dev/):

`npm i` install libraries.

`npm run dev` development server.

`npm run build` production build (`/dist`).

`npm run preview` preview your build.

`npm run test` testing.
