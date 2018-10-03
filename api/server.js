const express = require('express');
const session = require('express-session');
// const upload = require('./upload/upload');
const uuidv4 = require('uuid/v4');
var request = require('request');
var http = require("http");
const loggedIn = require('connect-ensure-login').ensureLoggedIn()
require('dotenv').load();

const hashFile = require('hash-file');

const cors = require('cors');
const bodyParser = require('body-parser');
const server = express();

const pool = require('./db/database');

var crypto = require('crypto');
const passport = require('passport');
const helmet = require('helmet');
const config = require('./db/config.js').get(process.env.NODE_ENV);
const auth = require('./auth/auth.js');
const {
    Strategy: LocalStrategy
} = require('passport-local');


var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST']
};
server.use(session({
    secret: 'DDSfs#$sdgfetrt4dfSsdgf354tgdfhdghaafgadg',
    resave: true,
    saveUninitialized: false
}));

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: true
}));
server.use(cors(corsOptions));
// server.use('/static', express.static(path.join(__dirname, 'public')))

var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

server.use(allowCrossDomain);

server.use(passport.initialize());
server.use(passport.session());
server.use(helmet());

passport.use(new LocalStrategy((email, password, done) => {


    if (email === 'VRTadmin' && password === 'VRTinabox!') {


        let user = {
            id: 'admin'
        }

        return done(null, user)


    } else {


        return done(null, false)

    }



}));

passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
    let user = id;
    cb(null, user);
});
// server.use(auth);

server.set('view engine', 'ejs');
server.set('views', 'views');

server.route('/admin/login')
    .get(function (req, res) {
        res.render('login');
    })

server.post('/admin/login',
    passport.authenticate('local', {
        failureRedirect: '/login'
    }),
    function (req, res) {
        res.redirect('/admin');
    });

server.get('/logout',
    function (req, res) {
        req.logout();
        res.redirect('/admin/login');
    });

server.get('/config/:env',
    function (req, res) {

        console.log(req.params.env)

        switch (req.params.env) {
            case 'dev':
                res.sendFile(__dirname + '/client-config/app-staging-config.json');
                break;
            case 'production':
                res.sendFile(__dirname + '/client-config/app-production-config.json');
                break;
            case 'beta':
                res.sendFile(__dirname + '/client-config/app-beta-config.json');
                break;
            default:
                res.sendFile(__dirname + '/client-config/app-local-config.json');
                break;

        }
    });

server.route('/admin')
    .get(loggedIn, function (req, res) {

        getProjects = () => new Promise((res, rej) => {

            // if you got a connection...
            pool.query(`
            SELECT a.id, a.project_name, a.project_tag, a.client_tag, a.status, a.created
            FROM projects as a 
            WHERE a.active = 1
                    `, (err, rows) => {
                if (err) {
                    return rej(err);
                }

                if (!rows.length) {
                    return rej('None found!');
                }

                return res(rows);
                // CLOSE THE CONNECTION
            })
        });


        getProjects()
            .catch(err => {

                if (err === 'None found!') {

                    res.sendStatus(404);

                } else {
                    console.log(err);

                    res.sendStatus(400);

                }


            })
            .then(projects => {

                return res.render('dashboard', {
                    user: req.user,
                    projects: projects,
                });

            })
    })

server.route('/admin/new/project')
    .get(loggedIn, function (req, res) {

        return res.render('create-project', {
            user: req.user,
        });


    })
    .post(loggedIn, function (req, res) {

        let id = uuidv4();
        let project = req.body.name;
        let desc = req.body.desc;
        let tag = req.body.tag;
        let proj = req.body.proj;
        let active = req.body.active ? 1 : 0;
        let status = req.body.active ? 'Active' : 'Disabled';
        let created = new Date();


        insert = (id, project, desc, tag, proj, active, status, created) => new Promise((res, rej) => {

            // if you got a connection...
            pool.query(`
                INSERT into projects  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                    `, [id, project, desc, tag, proj, active, status, created], (err, rows) => {
                if (err) {
                    return rej(err);
                }

                return res("Saved");
                // CLOSE THE CONNECTION
            })
        });


        insert(id, project, desc, tag, proj, active, status, created)
            .catch(err => {

                console.log(err);

                let message = "An error occurred. Please try again or contact an Administrator."

                return res.render('create-project', {
                    user: req.user,
                    message: message,
                });

            }).then(response => {

                let message = "Successfully saved project!"

                return res.render('create-project', {
                    user: req.user,
                    success: message,
                });

            });
    });


server.route('/admin/new/offering/company')
    .get(loggedIn, function (req, res) {

        getProjects = () => new Promise((res, rej) => {

            // if you got a connection...
            pool.query(`
                SELECT a.id, a.project_name, a.project_tag, a.status
                FROM projects as a 
                WHERE a.active = 1
                    `, (err, rows) => {
                if (err) {
                    return rej(err);
                }

                if (!rows.length) {
                    return rej('None found!');
                }

                return res(rows);
                // CLOSE THE CONNECTION
            })
        });


        getProjects()
            .catch(err => {

                if (err === 'None found!') {

                    res.sendStatus(404);

                } else {
                    console.log(err);

                    res.sendStatus(400);

                }


            })
            .then(tags => {

                request.get('https://passport.gen4.info/api/companies/all', {

                }, function (error, response, body) {
                    if (!error && response.statusCode == 200) {

                        let result = JSON.parse(body);

                        return res.render('company-offering', {
                            user: req.user,
                            companies: result,
                            tags: tags
                        });


                    } else {
                        console.log("Error " + response.statusCode)
                    }
                });

            })


    })
    .post(function (req, res) {



        let id = uuidv4();
        let company = req.body.company;
        let project = req.body.jiraTag;
        let active = 1;
        let created = new Date();


        insert = (id, user, project, active, created) => new Promise((res, rej) => {

            // if you got a connection...
            pool.query(`
                INSERT into company_projects VALUES (?, ?, ?, ?, ?)
                    `, [id, company, project, active, created], (err, rows) => {
                if (err) {
                    return rej(err);
                }

                return res("Saved");
                // CLOSE THE CONNECTION
            })
        });


        insert(id, company, project, active, created)
            .catch(err => {

                console.log(err);

                let message = "An error occurred. Please try again or contact an Administrator."

                return res.render('company-offering', {
                    user: req.user,
                    message: message,
                });

            }).then(response => {

                let message = "Successfully saved offering!"

                return res.render('company-offering', {
                    user: req.user,
                    success: message,
                });

            });
    });



server.route('/admin/new/offering/user')
    .get(loggedIn, function (req, res) {


        getProjects = () => new Promise((res, rej) => {

            // if you got a connection...
            pool.query(`
            SELECT a.id, a.project_name, a.project_tag, a.status
            FROM projects as a 
            WHERE a.active = 1
                    `, (err, rows) => {
                if (err) {
                    return rej(err);
                }

                if (!rows.length) {
                    return rej('None found!');
                }

                return res(rows);
                // CLOSE THE CONNECTION
            })
        });


        getProjects()
            .catch(err => {

                if (err === 'None found!') {

                    res.sendStatus(404);

                } else {
                    console.log(err);

                    res.sendStatus(400);

                }


            })
            .then(tags => {

                request.get('https://passport.gen4.info/api/users/all', {

                }, function (error, response, body) {
                    if (!error && response.statusCode == 200) {



                        return res.render('user-offering', {
                            user: req.user,
                            users: body,
                            tags: tags
                        });


                    } else {
                        console.log("Error " + response.statusCode)
                    }
                });

            })





    })
    .post(function (req, res) {

        let id = uuidv4();
        let user = req.body.offerUId;
        let project = req.body.jiraTag;
        let active = 1;
        let created = new Date();


        insert = (id, user, project, active, created) => new Promise((res, rej) => {

            // if you got a connection...
            pool.query(`
                INSERT into user_projects VALUES (?, ?, ?, ?, ?)
                    `, [id, user, project, active, created], (err, rows) => {
                if (err) {
                    return rej(err);
                }

                return res("Saved");
                // CLOSE THE CONNECTION
            })
        });


        insert(id, user, project, active, created)
            .catch(err => {

                console.log(err);

                let message = "An error occurred. Please try again or contact an Administrator."

                return res.render('user-offering', {
                    user: req.user,
                    message: message,
                });

            }).then(response => {

                console.log(response);

                let message = "Successfully saved offering!"

                return res.render('user-offering', {
                    user: req.user,
                    success: message,
                });

            });


    });



server.route('/admin/projects')
    .get(loggedIn, function (req, res) {


        getProjects = () => new Promise((res, rej) => {

            // if you got a connection...
            pool.query(`
            SELECT a.id, a.project_name, a.project_tag, a.status, a.created
            FROM projects as a 
            WHERE a.active = 1
                    `, (err, rows) => {
                if (err) {
                    return rej(err);
                }

                if (!rows.length) {
                    return rej('None found!');
                }

                return res(rows);
                // CLOSE THE CONNECTION
            })
        });


        getProjects()
            .catch(err => {

                if (err === 'None found!') {

                    res.sendStatus(404);

                } else {
                    console.log(err);

                    res.sendStatus(400);

                }


            })
            .then(projects => {

                // return res.render('dashboard', {
                //     user: req.user,
                //     projects: projects,
                // });



            })





    })





server.get('/tags', auth, function (req, res, next) {



    getProjects = (cid, user_id) => new Promise((res, rej) => {

        // if you got a connection...
        pool.query(`
        SELECT DISTINCT a.id, a.project_name, a.project_tag, a.status
        FROM projects as a 
        JOIN company_projects as b
        ON a.id = b.project_id 
        LEFT JOIN user_projects as c
        ON a.id = c.project_id
        WHERE b.company_id = ?
        OR c.user_id = ?

                `, [cid, user_id], (err, rows) => {
            if (err) {
                return rej(err);
            }

            if (!rows.length) {
                return rej('None found!');
            }

            return res(rows);
            // CLOSE THE CONNECTION
        })
    });


    if (!req.query.client || !req.query.user) {
        // If they dont belong to a company, send back 404 not found.
        res.send('None Found').status(404);

    } else {
        console.log(req.query)
        let cid = req.query.client;
        let user = req.query.user;
        getProjects(cid, user)
            .catch(err => {

                if (err === 'None found!') {

                    res.sendStatus(404);

                } else {
                    console.log(err);

                    res.sendStatus(400);

                }


            })
            .then(result => {



                res.json(result);
            })

    }
});
server.get('/client', auth, function (req, res, next) {


    let jira = 'https://projects.gen4.info/rest/api/2/search?jql="Client(s)"=';



    getCompanyJiraTag = (cid) => new Promise((res, rej) => {

        // if you got a connection...
        pool.query('select jira_tag from jira_company_tags where company_id = ?', [cid], (err, rows) => {

            if (err) {
                return rej('An error occurred.');
            }

            if (!rows.length) {
                return rej('None found!');
            }

            return res(rows[0]);
            // CLOSE THE CONNECTION
        })
    });



    if (!req.query.client) {
        // If they dont belong to a company, send back 404 not found.
        res.send('None Found');

    } else {

        let cid = req.query.client;

        getCompanyJiraTag(cid)
            .catch(reason => {
                console.log("Get Courses Failure:", reason);

                if (reason === 'None found!') {

                    res.send(404);

                } else {

                    res.sendStatus(400);

                }

            }).then(result => {

                let link = jira + result.jira_tag;

                request.get(link, {
                    'auth': {
                        'user': 'bb',
                        'pass': 'brenna',
                        'sendImmediately': true
                    }
                }, function (error, response, body) {
                    if (!error && response.statusCode == 200) {

                        let json = JSON.parse(body);

                        res.json(json);

                    } else {
                        console.log("Error " + response.statusCode)
                    }
                });

            });

    }



});
server.get('/project', auth, function (req, res, next) {


    getProject = (project) => new Promise((res, rej) => {

        // if you got a connection...
        pool.query('select client_tag, project_tag FROM projects WHERE id = ?', [project], (err, rows) => {

            if (err) {
                return rej(err);
            }

            if (!rows.length) {
                return rej('None found!');
            }

            return res(rows[0]);
            // CLOSE THE CONNECTION
        })
    });

    if (!req.query.project) {
        // If they dont belong to a company, send back 404 not found.
        return res.send('None Found');

    } else {
        let project = req.query.project;

        getProject(project)
            .catch(reason => {
                console.log("Get Courses Failure:", reason);

                if (reason === 'None found!') {

                    res.send(404);

                } else {
                    console.log(reason);

                    res.sendStatus(400);

                }

            }).then(result => {

                let p = result.project_tag
                let c = result.client_tag
                console.log(p, c)


                let jira = 'https://projects.gen4.info/rest/api/2/search?jql=project=' + p + ' AND "Client(s)"=' + c + ' AND sprint in openSprints()';


                let link = jira;
                // let link = jira + 'QMRS';

                request.get(link, {
                    'auth': {
                        'user': 'bb',
                        'pass': 'brenna',
                        'sendImmediately': true
                    }
                }, function (error, response, body) {
                    if (!error && response.statusCode == 200) {

                        let json = JSON.parse(body);

                        res.json(json);


                    } else {
                        console.log("Error " + response.statusCode)
                    }
                });

            });

    }



});
server.listen(3000, () => {
    console.log('Server started!');
});