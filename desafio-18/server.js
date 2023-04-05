const express = require('express');
const app = express();
const path = require('path')
const handlebars = require('express-handlebars')
const mongoBase = require('./src/core/db/mongodb/mongodb-connect')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const passport = require('passport')
const { fork } = require('child_process')
const parseArgs = require('minimist')
const os = require('os');
const cluster = require('cluster');
const compression = require('compression');
const flash = require('connect-flash');
require('dotenv').config()

const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./src/api/sockets/socket');
require('./src/core/passport/local-auth');

const routesAuth = require('./src/api/routers/authRouter');

const log = require('./src/core/utils/logs')
const loggerConsole = log.getLogger('default')
const loggerArchiveWarn = log.getLogger('warnArchive')
const loggerArchiveError = log.getLogger('errorArchive')

const { graphqlHTTP } = require('express-graphql')
const graphQLSchema = require('./src/graphql/shema')
const graphQLRootValue = require('./src/graphql/rootValue')

app.use('/graphql', graphqlHTTP({
  schema: graphQLSchema,
  rootValue: graphQLRootValue(),
  graphiql: true
}))



app.use((req, res, next) => {
  loggerConsole.info(`
  Ruta consultada: ${req.originalUrl}
  Metodo ${req.method}`)
  next()
})


// app.use(compression({
//   level: 9, // nivel de compresion
// }));
app.use(flash());
app.use(passport.initialize());

const config = {
  alias: {
    p: "PORT",
    m: "MODE"
  },
  default: {
    PORT: 8080,
    MODE: 'fork'
  }
}

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
  app.use(
    session({
      store: MongoStore.create({
        mongoUrl: process.env.SESSIONS,
        mongoOptions: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
        ttl: 100,
      }),
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false,
    })
  )

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));




  app.use(express.static(path.join(__dirname, 'views/handlebars')))
  app.engine('handlebars', handlebars.engine())
  app.set('views', path.join(__dirname, 'views/handlebars'))
  app.set('view engine', 'handlebars');




  app.get('/home', function (req, res) {
    if (!req.session.passport?.user?.email) {
      return res.redirect(302, 'login');
    }

    res.render('./inicio.handlebars', { productos: [] });
  });


  app.get('/login', function (req, res) {
    res.render('./login.handlebars', { productos: [] });
  });

  app.get('/login', function (req, res) {
    res.render('./login.handlebars', { productos: [] });
  });

  app.get('/register', function (req, res) {
    res.render('./register.handlebars', { productos: [] });
  });


  app.get('/register-error', function (req, res) {
    res.render('./register-error.handlebars',);
  });

  app.get('/login-error', function (req, res) {
    res.render('./login-error.handlebars',);
  });

  app.get('/logout', function (req, res) {
    res.render('./logout.handlebars',);
  });


  app.get('/producto-test', function (req, res) {

    res.render('./producto.test.handlebars', { productos: [] });
  });


  app.get('/info',compression(), (req, res) => {

    const table = `
  <table>
  <tr>
  <th>Directorio acvtual</th>
  <td>${process.cwd()}</td>
  </tr>
  <tr>
  <th>ID de proceso</th>
  <td>${process.pid}</td>
  </tr>
  <tr>
  <th>Versión de Node</th>
  <td>${process.version}</td>
  </tr>
  <tr>
  <th>Ruta ejecutable</th>
  <td>${process.execPath}</td>
  </tr>
  <tr>
  <th>Sistema operativo</th>
  <td>${process.platform}</td>
  </tr>
  <tr>
  <th>Memoria</th>
  <td>${JSON.stringify(process.memoryUsage().rss, null, 2)}</td>
  </tr>
  </table>
  `
    res.send(
      table
    )
  })
  function calcular(numb){
    const cant = numb ?? 100000000;
    const max = 1000;
    const min = 1;
    const numbers = [];
    for(let i = 0; i < cant; i++){
        let numberRandom = Math.floor((Math.random() * (max - min + 1)) + min);
        numbers.push(numberRandom);
    }
    return numbers.reduce((prev, cur) => ((prev[cur] = prev[cur] + 1 || 1), prev), {})
}

  app.get("/api/randoms", (req, res) => {
    const { cant } = req.query;
    res.json({ data: calcular(cant)});
    
    // const forkResult = fork("./utils/calculoRandom");
    // forkResult.on("message", (msg) => {
    //   if (msg == 'ready') {
    //     forkResult.send(cant ? cant : null);
    //   } else {
    //     res.json({ data: msg,  pid: process.pid });
    //   }
    // });
  });


  
  //const routes = require('./src/api/routers');
  const args = parseArgs(process.argv.slice(2))
  const PORT = args.p || 8080
  const ROUTE = '/api/';
  app.use(routesAuth);

  const MainRouter = require('./src/api/routers');

  const mainRouter = new MainRouter();

  app.use(ROUTE, mainRouter.getRouter());
  
  
    app.get('/*',function (req, res) {
      loggerArchiveWarn.fatal('No existe la ruta');
      res.send('No existe la ruta')
    } );

  server.listen(PORT, async () => {
    mongoBase.dbConnection();
    loggerConsole.debug(`Servidor en puerto http://localhost:${PORT}`);
  });

}