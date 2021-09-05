// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
/*

let mydomain = 'imateco.com';
const mydomainAPI = 'api';
const protocol = window.location.protocol;
// detect port
const mydomainport = (protocol === 'https:') ? 443 : 80;
mydomain += ':' + mydomainport;
*/


export const environment = {
    production: true,
    apiEndpoint: 'http://localhost:3000',
    tenant: '987da991dc0c80b4704c53a6fdd0a20f0400cd17644edb2801fe55655c79642716d8831ad8a2034040cfc7df0872b16647615b3b10bb9e076070bcbdc010b80a72697b2b3432b060aced4eb2a9c0dcdb24bef4b5eed318cba4fb5bd7a2de3c83'
};
