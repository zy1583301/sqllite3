
import express from 'express'
import util from 'util';
const journalDb = require('../api/sqllite');

const router = express.Router();
/**
 *
 * @api {post} /addJournal 添加日志信息
 * @apiVersion 1.0.0
 * @apiName addJournal
 * @apiGroup addJournal

 * @apiParam {Object} journal 日志信息
 * @apiParamExample {json} Request-Example:
 *     {
 *      "platform": "H5",
 *      "traceId": "H5|3ac1279c-201f-4343-b13e-a779e8208a6e|fromback",
 *      "deviceInfo": "JSON.stringify(object)",
 *     }
 * @apiSuccess {Boolean} success 成功与否
 * @apiSuccess {Number} code 成功状态码
 * @apiSuccess {String} msg 操作信息
 ** @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success":true,
 *       "code": 1,
 *        "msg": "操作成功"
 *     }
 *
 */

router.post('/addJournal', function(req:any, res:any){
  // console.log(req.body)
  journalDb.addNew(req.body,
    function(error:any){
      if (!error) {
        res.json({success:true, code: 1, msg:'操作成功'})
      } else {
        res.json({success:false, code: 0, msg:'操作失败'})
      }
        
    });
});

/**
 *
 * @api {delete} /deleteAll 删除所有日志
 * @apiVersion 1.0.0
 * @apiName deleteAll
 * @apiGroup delete
 * @apiSuccess {Boolean} success 成功与否
 * @apiSuccess {Number} code 成功状态码
 * @apiSuccess {String} msg 操作信息
 ** @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success":true,
 *       "code": 1,
 *        "msg": "操作成功"
 *     }
 *
 */
router.delete('/deleteAll', function(req:any, res:any){
  journalDb.deleteAll(
    function(error:any){
      if (!error) {
        res.json({success:true, code: 1, msg:'操作成功'})
      } else {
        res.json({success:false, code: 0, msg:'操作失败'})
      }
        
    });
});

/**
 *
 * @api {delete} /deletel 删除单条日志
 * @apiVersion 1.0.0
 * @apiName delete
 * @apiGroup delete
 * @apiParam {Object} id 日志信息
 * @apiParamExample {json} Request-Example:
 *     {
 *      id: '1'
 *     }
 * @apiSuccess {Boolean} success 成功与否
 * @apiSuccess {Number} code 成功状态码
 * @apiSuccess {String} msg 操作信息
 ** @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success":true,
 *       "code": 1,
 *        "msg": "操作成功"
 *     }
 *
 */

router.delete('/delete', function(req:any, res:any){
  journalDb.delete(
    req.query.id,
    function(error:any){
      if (!error) {
        res.json({success:true, code: 1, msg: '操作成功'});
      } else {
        res.json({success:false, code: 0, msg: '操作失败'});
      }
        
    });
});

router.post('/drop',function(req:any, res:any){
  journalDb.dropTable(function(err: any){
    console.log('dropTable')
    if(!err) {
      journalDb.setup(function(error: any){
        if (error){
            util.log('ERROR ' + error);
            res.json({success: false, code: 0, msg: error});
        }else {
          res.json({success: true, code: 1, msg: '操作成功'});
        }
      });
    } else {
      res.json({success: false, code: 0, msg: err});
    }
  })
})

/**
 *
 * @api {get} /queryJournalByPage 添加日志信息
 * @apiVersion 1.0.0
 * @apiName queryJournalByPage
 * @apiGroup queryJournal

 * @apiParam {Object} pageInfo 查询信息
 * @apiParamExample {json} Request-Example:
 *     {
 *      "platform": "H5",
 *      "traceId": "H5|3ac1279c-201f-4343-b13e-a779e8208a6e|fromback",
 *      "deviceInfo": "JSON.stringify(object)",
 *      "limit": 10,
 *      "page": 1
 *     }
 * @apiSuccess {Boolean} success 成功与否
 * @apiSuccess {Number} code 成功状态码
 * @apiSuccess {String} msg 操作信息
 ** @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success":true,
 *       "code": 1,
 *       "msg": "操作成功",
 *       "total": 999,
 *       "data": [...]
 *     }
 *
 */
router.get('/queryJournalByPage', function(req:any, res:any){
  journalDb.findJournalByLimit(req.query,function(error: any,journals?: object[],total?: number){
    console.log('find journal')
    if (!error) {
      res.json({
        success: true,
        data: journals,
        total: total,
        code: 1,
        msg: 'query success'
    });
    } else {
      res.json({
        success: false,
        data: "",
        total: 0,
        code: 0,
        msg: error
      });
    }
  });
});
export default  router;