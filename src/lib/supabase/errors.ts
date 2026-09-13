export function errorKey(error:unknown):"invalidLogin"|"duplicate"|"weak"|"expired"|"forbidden"|"invalid"|"error"{
 const code=typeof error==="object"&&error!==null&&"code" in error?String(error.code):"";
 if(["invalid_credentials","email_not_confirmed"].includes(code))return "invalidLogin";
 if(["user_already_exists","email_exists"].includes(code))return "duplicate";
 if(code==="weak_password")return "weak";
 if(["session_not_found","refresh_token_not_found","refresh_token_already_used","PGRST301"].includes(code))return "expired";
 if(code==="42501")return "forbidden";
 if(["23514","23502","22P02"].includes(code))return "invalid";
 return "error";
}
