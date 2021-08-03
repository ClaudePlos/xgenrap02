const express = require('express');
const app  = express();
const oracledb = require('oracledb');
const configDB = require('./dbConfig.ts');

import { User } from '@/_models';

import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
let conn: any;
let users;

try {
  oracledb.initOracleClient({libDir: 'C:\\oracle\\instantclient_11_2'});
} catch (err) {
  console.error('Whoops!');
  console.error(err);
  process.exit(1);
}


async function runConnect() {
  
    try {
      console.log('Connect: ');
      conn = await oracledb.getConnection(configDB);
  
      const result = await conn.execute(
        'select \'select to DB\' from dual'
      );

      
      users = await conn.execute(
        'select id_operator id, kod username, haslo password from operatorzy', [], { outFormat: oracledb.OUT_FORMAT_OBJECT }
      );

  
      console.log('(ks)>Connection with DB test: ');
      console.log(result);
      //console.log(users);

    } catch (err) {
      console.log('(ks)>Error:Connection with DB test: ');
      console.error(err);
    } finally {
      if (conn) {
        try {
          await conn.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
  runConnect();


  async function getTime() {

    try {
      conn = await oracledb.getConnection(configDB);
      return await conn.execute('select current_timestamp from dual');
    } catch (err) {
      console.error(err);
    } finally {
      if (conn) {
        try {
          await conn.close();
        } catch (err) {
          console.error(err);
        }
      }
    }

  }  

// Allow any method from any host and log requests
app.use((req: any, res: any, next: any) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
    console.log(req.method);
    if('OPTIONS' === req.method) {
        res.sendStatus(200);
    } else {
        console.log(`${req.ip} ${req.method} ${req.url}`);
        next();
    }
})

// Handle POST requests that come in formatted as JSON
app.use(express.json());

/**app.use('/', routers);*/

app.get('/', (req: any, res: any) => { res.send([{message: 'http://localhost:4201/ >> OK'}]); });

app.get('/users', (req: any, res: any) => { 
  console.log('Loguje się: ' + req.query.username);
  res.send([users.rows.find(x => x.USERNAME === req.query.username)]); 
});

app.post('/users', (req: any, res: any) => { 
    console.log(req.body);
    res.send({body: req.body});  
});

//app.get('/users/authenticate', (req: any, res: any) => { res.send([{username: 'test', password: 'test'}])});
app.post('/users/authenticat2', (req: any, res: any) => { 
  console.log('Test');
  //console.log(req.body);
  //res.send({id: '123', username: 'dupa', password: 'dupa', lastName: 'dupaLast'});
  res.send(new HttpResponse({ status: 200, body: req.body }));  
});


app.get('/time', (req: any, res: any) => { 
  const currentTime = getTime();
  currentTime.then((value) => {
    console.log(value.rows);
    res.send([{time: value.rows[0] + ' >>> Get Time form ataBase OK'}])
  });
});


app.listen(4201, '127.0.0.1', function(){
    console.log('Server now listening on 4201');
})




