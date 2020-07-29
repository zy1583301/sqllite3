import app from '../app';
import util from 'util';
const  journalDb = require('../api/sqllite');
const port = normalizePort(process.env.PORT || "3000");
app.listen(port,()=>{
  console.log('listening port on'+ port)
})
journalDb.connect(function(error: any){
  console.log('connect')
  if (error){
    throw error;
  } else {
    journalDb.setup(function(err: any){
      console.log('setuopppppppppppp')
      if (err){
          util.log('ERROR ' + err);
          throw err;
      }
    });
  }
});

function normalizePort(val: string) {
  var port = parseInt(val, 10);
  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}