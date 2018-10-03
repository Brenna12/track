export const environment = {
  production: true,
  authentication: {
    userApiUrl: 'https://passport.gen4.info/api/userinfo',
    authUrl: 'https://passport.gen4.info/dialog/authorize',
    client_id: 'g4-lms',
    redirect_uri: 'https://track.gen4.info/auth',
    scope: 'offline_access',
    response_type: 'token'
  },
  resources: {
    userApiUrl: 'https://passport.gen4.info/api/userinfo',
    companyApiUrl: 'http://passport.gen4.info/api/companyinfo',
    projects: {
      tags: '/api/tags',
      project: '/api/project',
      client: '/api/client'
    }
  }
};
