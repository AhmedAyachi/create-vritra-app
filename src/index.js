#!/usr/bin/env node
"use strict";

const FileSystem=require("fs");
const Path=require("path");
const logger=require("./Scripts/logger");
const copyFolder=require("./Scripts/copyFolder");
const preapreApp=require("./Scripts/preapreApp");

new Promise(async (_,reject)=>{
    process.on("unhandledRejection",reject);
    const [appname/* ,...args */]=process.argv.slice(2);
    const processDir=process.cwd();
    if(FileSystem.existsSync(`${processDir}/${appname}`)){
        reject({message:`A folder named ${appname} already exists`});
    }
    else{
        const templatePath=`${__dirname}/Template`;
        const appPath=await copyFolder(templatePath,processDir,{
            name:appname,
            onCopyEntry:(copypath)=>{
                const name=Path.basename(copypath);
                if(["config.xml","package.json"].includes(name)){
                    let content=FileSystem.readFileSync(copypath,{encoding:"utf8"});
                    content=content.replace(/appname/g,appname.toLowerCase());
                    if(name==="config.xml"){
                        content=content.replace("AppName",appname);
                    }
                    FileSystem.writeFileSync(copypath,content,{encoding:"utf8"});
                }
            },
        });
        await preapreApp(appPath);
        logger.log(`\n${logger.mainColor("Corella")} app ${logger.bold(logger.sucessColor("successfully"))} created`);
    }   
}).
catch(error=>{
    error&&logger.error(error.message||"unknown error");
    process.exit(1);
});
