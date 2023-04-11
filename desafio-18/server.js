const Koa = require('koa');
const app = new Koa();
const path = require('path');
const { koaBody } = require('koa-body');
const serve = require('koa-static');
const Router = require('koa-router');
const session = require('koa-session');
//const MongoStore = require('connect-mongo')
const MongoStore = require('koa-generic-session-mongo');
const passport = require('koa-passport');
const { fork } = require('child_process');
const parseArgs = require('minimist');
const os = require('os');
const cluster = require('cluster');
const compress = require('koa-compress');
const flash = require('koa-flash');
const { graphqlHTTP } = require('koa-graphql');
const graphQLSchema = require('./src/graphql/shema');
const graphQLRootValue = require('./src/graphql/rootValue');
const static = require('koa-static');
const views = require('koa-views');
const render = views(path.join(__dirname, 'views/handlebars'), { map: { html: 'handlebars' } });
const co = require('co');

const mongoBase = require('./src/core/db/mongodb/mongodb-connect')



const server = require('http').createServer(app.callback());
module.exports.io = require('socket.io')(server);
require('./src/api/sockets/socket');
require('./src/core/passport/local-auth');


const router = new Router();

const routesAuth = require('./src/api/routers/authRouter');

const log = require('./src/core/utils/logs');
const loggerConsole = log.getLogger('default');
const loggerArchiveWarn = log.getLogger('warnArchive');
const loggerArchiveError = log.getLogger('errorArchive');

app.use(koaBody());
//app.use(flash());
app.use(passport.initialize());

const config = {
  alias: {
    p: 'PORT',
    m: 'MODE'
  },
  default: {
    PORT: 8080,
    MODE: 'fork'
  }
};
let { MODE } = parseArgs(process.argv.slice(2), config)
console.log(MODE);
if (MODE == 'cluster' && cluster.isMaster) {
  const nums = os.cpus().length
  console.log('CPU: ', nums)
  console.log(`${process.pid}`);
  for (let index = 0; index < nums; index++) {
    cluster.fork();
  }

  cluster.on('exit', worker => {
    console.log(`worker ${worker.process.pid} died, ${new Date().toLocaleString()}`);
    cluster.fork();
  });
} else {

  app.keys = [process.env.SECRET];

  app.keys = ['secret'];
app.use(
	session({maxAge:6000}, app));

  // app.use(session({
  //   store: new MongoStore({
  //     url: process.env.SESSIONS,
  //     ttl: 100,
  //   }),
  //   resave: false,
  //   saveUninitialized: false,
  // }, app));


  // app.use(express.json());
  // app.use(express.urlencoded({ extended: true }));



  // console.log(__dirname);

  // app.use(express.static(path.join(__dirname, 'views/handlebars')))
  // app.engine('handlebars', handlebars.engine())
  // app.set('views', path.join(__dirname, 'views/handlebars'))
  // app.set('view engine', 'handlebars');

  app.use(serve('views/handlebars'));
  app.use(views(path.join(__dirname, 'views/handlebars'), {
    extension: 'handlebars',
    map: {
      handlebars: 'handlebars'
    }
  }));



  router.get('/home', async (ctx) => {
    if (!ctx.session.passport?.user?.email) {
      return ctx.redirect('login');
    }

    await ctx.render('./inicio.handlebars', { productos: [] });
  });

  router.get('/login', async (ctx) => {
    await ctx.render('./login.handlebars', { productos: [] });
  });

  router.get('/register', async (ctx) => {
    await ctx.render('./register.handlebars', { productos: [] });
  });

  router.get('/register-error', async (ctx) => {
    await ctx.render('./register-error.handlebars');
  });

  router.get('/login-error', async (ctx) => {
    await ctx.render('./login-error.handlebars');
  });

  router.get('/logout', async (ctx) => {
    await ctx.render('./logout.handlebars');
  });

  router.get('/producto-test', async (ctx) => {
    await ctx.render('./producto.test.handlebars', { productos: [] });
  });








  //const routes = require('./src/api/routers');
  const args = parseArgs(process.argv.slice(2))
  const PORT = args.p || 8080
  const ROUTE = '/api/';
  router.use(routesAuth);

  const MainRouter = require('./src/api/routers');

  const mainRouter = new MainRouter();

  //app.use(ROUTE, mainRouter.getRouter());


  // app.get('/*', function (req, res) {
  //   loggerArchiveWarn.fatal('No existe la ruta');
  //   res.send('No existe la ruta')
  // });

  router.use(ROUTE, mainRouter.getRouter());
  app.use(router.routes());
  //app.use(router.allowedMethods());

  server.listen(PORT, async () => {
    mongoBase.dbConnection();
    loggerConsole.debug(`Servidor en puerto http://localhost:${PORT}`);
  });

}