// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  config: 'http://localhost:3000/config/dev',
  authentication: {
    authUrl: 'http://localhost/dialog/authorize',
    client_id: 'g4-lms',
    redirect_uri: 'http://localhost:4200/auth',
    scope: 'offline_access',
    response_type: 'token'
  },
  resources: {
    userApiUrl: 'http://localhost/api/userinfo',
    companyApiUrl: 'http://localhost/api/companyinfo',
    projects: {
      tags: 'http://localhost:3000/tags',
      project: 'http://localhost:3000/project',
      client: 'http://localhost:3000/client'
    }
  }

};
