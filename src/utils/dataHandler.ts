var keys: string[] = ['platform', 'deviceInfo', 'traceId'];
export function getCustomDate(d:any){
    return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()-1} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
}
export function getTableHeader(obj:any){
    let value: string[] = [];
    keys.forEach(item => {
        value.push(obj[item]);
    })
   return value;
  }