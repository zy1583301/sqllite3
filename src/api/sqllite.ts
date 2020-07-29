interface PageInfo {
    page: number;
    limit: number;
    traceId: string,
    saveTime: string,
    platform: string,
    [propName:string]: string | number
}
interface LimitCallback {
    (error:any, journals?:any[], totals?:number): void
}
interface CallbackVoid {
   (err: any) : void
}
//数据库接口库
import util from 'util';
var sqlite3 = require('sqlite3').verbose();
var db: any = undefined;
import { getCustomDate,  getTableHeader } from '../utils/dataHandler'
import { getLimitSql, getTotalSql} from '../utils/getSql'
/*
 数据库名是直接硬编码的，所以当调用connect和setup函数时，当前目录中就会生成journal.sqlite3文件
 */

exports.connect = function(callback: CallbackVoid){
    db = new sqlite3.Database("journal.sqlite3", sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
        function(err: any){
            if (err) {
                util.log('FAIL on creating database ' + err);
                callback(err);
            } else {
                callback(null);
            }
        });
}

exports.setup = function(callback: CallbackVoid){
    db.run("CREATE TABLE IF NOT EXISTS journal " +
        "(id INTEGER PRIMARY KEY,platform VARCHAR(100), deviceInfo TEXT, traceId VARCHAR(100), saveTime DATETIME)",
        function(err: any){
            if (err) {
                util.log('FAIL on creating table ' + err);
                callback(err);
            } else {
                callback(null);
            }
        });
}

// 增加新日志 √
exports.addNew = function(journal: object, callback: CallbackVoid){
    db.run("INSERT INTO journal (platform, deviceInfo, traceId, saveTime) " + "VALUES (?, ?, ?, ?);",
        [...getTableHeader(journal), getCustomDate(new Date())],
        function(error: any){
            if (error){
                util.log('FAIL on add ' + error);
                callback(error);
            } else {
                callback(null);
            }
        });
}

/*
run函数接受一个字符串参数，其中?表示占位符，占位符的值必须通过一个数组传递进来
调用者提供了一个回调函数，然后通过这个回调函数来声明错误
 */

exports.delete = function(id: number | string, callback: CallbackVoid){
    db.run("DELETE FROM journal WHERE id = ?;",
        [id],
        function(err: any){
            if (err){
                util.log('FAIL to delete ' + err);
                callback(err);
            } else {
                callback(null);
            }
        });
}
// 清空数据  条件到时候再定
exports.deleteAll = function(callback: CallbackVoid){
    db.run("DELETE FROM journal WHERE id >= 0 ;",
        function(err: any){
            if (err){
                util.log('FAIL to delete ' + err);
                callback(err);
            } else {
                callback(null);
            }
        });
}
// 将表删除
exports.dropTable = function(callback: CallbackVoid) {
  db.run("DROP TABLE journal;", function(err: any){
    if (!err) {
        callback(null);
    } else {
        callback(err);
    }
  })
}

// 分页查询 and 模糊查询
exports.findJournalByLimit = function(pageInfo: PageInfo,callback: LimitCallback) {
    db.all(getTotalSql(pageInfo), function(err: any, docs: object[]){
        if (!err) {
            db.all(getLimitSql(pageInfo), function(error: any, journals: object[]){
                if(!error) {
                    callback(error, journals, docs.length)
                } else {
                    callback(error, journals, docs.length)
                }
            })
        } else {
            callback(err)
        }
    });
}