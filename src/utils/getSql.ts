interface PageInfo {
  page: number;
  limit: number;
  traceId: string,
  saveTime: string,
  platform: string,
  [propName:string]: string | number
}
// 升序 ASC  降序 DESC
export function getLimitSql(pageInfo: PageInfo) {
  let { page, limit, traceId, saveTime, platform } = pageInfo;
  let limitSql: string = `select * from journal
    where platform like '%${platform}%' and traceId like '%${traceId}%' and saveTime like '%${saveTime}%'
    order by saveTime ASC
    Limit ${limit} Offset ${(page-1)*limit}`;
  return limitSql;
}

export function getTotalSql(pageInfo: PageInfo) {
  let { traceId, saveTime, platform } = pageInfo;
  let totalSql: string = `select * from journal
  where platform like'%${platform}%' and traceId like '%${traceId}%' and saveTime like '%${saveTime}%'`
  return totalSql;
}