export function safeNext(value:string|null|undefined){
 return value&&/^\/(?:dashboard(?:\/profile|\/contributions\/(?:new|[0-9a-f-]{36}))?|contribute|admin(?:\/[0-9a-f-]{36})?)$/i.test(value)?value:"/dashboard";
}
