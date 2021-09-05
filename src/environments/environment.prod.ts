// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

/*let mydomain = 'imateco.com';
const mydomainAPI = 'api';
const protocol = window.location.protocol;
// detect port
const mydomainport = (protocol === 'https:') ? 443 : 80;
mydomain += ':' + mydomainport;*/

export const environment = {
    production: true,
    apiEndpoint: '/api',
    tenant: 'f1581a49978b9dd95f0f7073fbe1359618d03c5953560743e899226e7794f6bfdd38ab828188c136d0b96686437de4cb134d55cc98a09ee91029ae89878339081112fa5b9119266a296cdd28a2deec74927920660f95566e6ba1b6e0ff88ca50'
};
