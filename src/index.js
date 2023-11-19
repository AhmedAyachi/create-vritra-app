#!/usr/bin/env node
"use strict";

const logger=require("./Scripts/logger");
const create=require("./Scripts/create/create");
const version=require("./Scripts/version");

new Promise((_,reject)=>{
    process.on("unhandledRejection",reject);
    const args=process.argv.slice(2),firstArg=args[0];
    if(!firstArg?.startsWith("-")) return create(args);
    else if((firstArg==="-v")||(firstArg==="--version")) return version();
    else{
        reject({message:"No such command"});
    }
}).
catch(error=>{
    if(error){
        console.log("");
        logger.error(error.message||"unknown error");
    }
    process.exit(1);
});
