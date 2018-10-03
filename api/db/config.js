var config = {
    production: {
        database: {
            host: '10.0.12.4',
            user: 'progress-dev',
            password: 'c14g529$Wx1rJNcl%THV',
            database : 'progress',
        },
        authentication: {
            tokenInfo: 'https://passport.gen4.info/api/tokeninfo',
            origin: 'https://track.gen4.info'
        }
    },
    default: {
        database: {
            host: '10.0.12.4',
            user: 'progress-dev',
            password: 'c14g529$Wx1rJNcl%THV',
            database : 'progress',
        },
        authentication: {
            tokenInfo: 'http://localhost/api/tokeninfo',
            origin: 'http://localhost:4200'
        }
    }
}

exports.get = function get(env) {
    return config[env] || config.default;
}