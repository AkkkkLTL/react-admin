export const getQuery = (urlStr:string) => {
  const startIndex = urlStr.indexOf("?");
  const queryStr = urlStr.substring(startIndex + 1)
    .replace(/=/g, ':')
    .split('&');
  
  queryStr.forEach((item, i) => {
    const startIndex = item.indexOf(':');
    let key:string = item.substring(0, startIndex),
      value:string | number = item.substring(startIndex + 1),
      isNum:boolean = !Object.is(Number(value), NaN);
    
    key = `"${key}"`;
    value = isNum ? Number(value) : `"${value}"`;
    queryStr[i] = key + ':' + value;
  });

  const query = JSON.parse(`{${queryStr.join(',')}}`);
  return query;
}