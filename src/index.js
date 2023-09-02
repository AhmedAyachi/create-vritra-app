#!/usr/bin/env node
"use strict";

const FileSystem=require("fs");
const Path=require("path");
const logger=require("./Scripts/logger");
const preapre=require("./Scripts/prepare");
const copyFolder=require("./Scripts/copyFolder");
const preapreApp=require("./Scripts/preapreApp");

preapre(process.argv.slice(2)).
then(async ({app})=>{
    const templatePath=`${__dirname}/Template`;
    const processDir=process.cwd();
    const appname=app.name;
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
            else if(name==="gitignore.txt"){
                FileSystem.renameSync(copypath,`${Path.dirname(copypath)}/.gitignore`);
            }
        },
    });
    await preapreApp(appPath);
    logger.log(`\n${logger.mainColor("Corella")} app ${logger.bold(logger.sucessColor("successfully"))} created`);
}).
catch(error=>{
    if(error){
        console.log("");
        logger.error(error.message||"unknown error");
    }
    process.exit(1);
});
