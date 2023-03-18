## **Strapi : Provider Upload with Custom API**

Support : strapi v.4.8.0

Config ==> upload provider

> `**./config/plugins.js**`
>
> ```javascript
> module.exports = ({ env }) => ({
>   ...,
>   upload: {
>     config: {
>       provider: "strapi-provider-upload-customapi",
>       providerOptions: {
>         endpoint: "https://api.com/upload-files",
>         module: "customapi",
>         fileParameterName: "file",
>         headers: {},
>       },
>     },
>   },
> });
> ```

Config ==> strapi::security

> `**./config/middlewares.js**`
>
> ```javascript
> module.exports = [
>   {
>     name: 'strapi::security',
>     config: {
>       contentSecurityPolicy: {
>         useDefaults: true,
>         directives: {
>           'connect-src': ["'self'", 'https:'],
>           'img-src': ["'self'", 'data:', 'blob:', 'custom-api.com'],
>           'media-src': ["'self'", 'data:', 'blob:', 'custom-api.com'],
>           upgradeInsecureRequests: null,
>         },
>       },
>     },
>   },
>   'strapi::errors',
>   'strapi::cors',
>   'strapi::poweredBy',
>   'strapi::logger',
>   'strapi::query',
>   'strapi::body',
>   'strapi::session',
>   'strapi::favicon',
>   'strapi::public',
> ];
> ```
