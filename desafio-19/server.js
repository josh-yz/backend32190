import express from 'express';
import path from 'path';
import handlebars from 'express-handlebars';
import {dbConnection} from './src/core/db/mongodb/mongodb-connect.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import { fork } from 'child_process';
import parseArgs from 'minimist';
import os from 'os';
import cluster from 'cluster';
import compression from 'compression';
import flash from 'connect-flash';
import dotenv from 'dotenv';
import http from 'http';
import {Server}  from 'socket.io';
import * as url from 'url'


const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

console.log(__dirname);


import './src/core/passport/local-auth.js';
import routesAuth from './src/api/routers/authRouter.js';
import log from './src/core/utils/logs.js';

const app = express();
const server = http.createServer(app);
// export const io = new Server(server);
const io = new Server(server);


//export const io = io(server);
import MainRouter from './src/api/routers/index.js';


dotenv.config();


const loggerConsole = log.getLogger('default');
const loggerArchiveWarn = log.getLogger('warnArchive');
const loggerArchiveError = log.getLogger('errorArchive');

// const { graphqlHTTP } = require('express-graphql');
// const graphQLSchema = require('./src/graphql/shema');
// const graphQLRootValue = require('./src/graphql/rootValue');

// app.use('/graphql', graphqlHTTP({
//   schema: graphQLSchema,
//   rootValue: graphQLRootValue(),
//   graphiql: true
// }))


import messageRepository from './src/api/repository/messageRepository.js';
import productRepository from './src/api/repository/productRepository.js';
const messageService = new messageRepository();
const productService = new productRepository();


let productAll = async () => {
    const arr = await productService.findAll();
    //(io) seria todo el servidor socket (va a emitir un mensaje a todos los cliente conectodos)
    // (client) solo emite al cliente que hizo el llammado 
    //(cliente.broadcast) // emite a todos menos ek que lo emitio
    io.sockets.emit('products-list', { productos: arr });
}

let messegeAll = async () => {
    const { normalizedMessage, compression } = await messageService.findAll();
    io.sockets.emit('messeges-list', { messeges: normalizedMessage, compression });
}

// Mensajes de Sockets
io.on('connection', async client => {

    ///cada ver que se conecta genera un id unico para el usuario
    client.on('product-new', async (payload) => {
        await productService.create(payload);
        await productAll();
    });
    /// (on) te permite estar escuchando el mensaje
    client.on('products', async () => {
        await productAll();

    });

    client.on('messages', async () => {
        await messegeAll();
    });

    client.on("message-new", async (payload) => {

        await messageService.create(payload);
        await messegeAll();
    });

    client.on('disconnect', () => {
        console.log('cliente desconectado');
    });

});



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



  const tut = `${__dirname}/views/handlebars'`



  app.use(express.static('./views/handlebars'));
  app.engine('handlebars', handlebars.engine())
  app.set('views','./views/handlebars')
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



  const mainRouter = new MainRouter();

  app.use(ROUTE, mainRouter.getRouter());
  
  
    app.get('/*',function (req, res) {
      loggerArchiveWarn.fatal('No existe la ruta');
      res.send('No existe la ruta')
    } );

  server.listen(PORT, async () => {
    await dbConnection();
    loggerConsole.debug(`Servidor en puerto http://localhost:${PORT}`);
  });

}

