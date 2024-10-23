#!/usr/bin/env node
"use strict";

const FileSystem=require("fs");
const Path=require("path");
const logger=require("../logger");
const prepare=require("../prepare");
const copyFolder=require("../copyFolder");
const prepareApp=require("./prepareApp");

module.exports=(args)=>prepare(args).then(async ({app})=>{
    const templatePath=`${__dirname}/Template`;
    const processDir=process.cwd();
    const {name:appName,packageName}=app;
    await copyFolder(templatePath,processDir,{
        name:appName,
        onCopyEntry:(copypath)=>{
            const entryName=Path.basename(copypath);
            if(entryName==="package.json"){
                let content=FileSystem.readFileSync(copypath,{encoding:"utf8"});
                const name=appName.split(/(?=[A-Z])/).map(word=>word.toLowerCase()).join("-");
                content=content.replace(/appname/g,name);
                FileSystem.writeFileSync(copypath,content,{encoding:"utf8"});
            }
            else if(entryName==="config.xml"){
                let content=FileSystem.readFileSync(copypath,{encoding:"utf8"});
                content=content.replace(new RegExp(`android-packageName=""`),`id="${packageName}" android-packageName="${packageName}"`).replace("AppName",appName);
                FileSystem.writeFileSync(copypath,content,{encoding:"utf8"});
            }
            else if(entryName==="gitignore.txt"){
                FileSystem.renameSync(copypath,`${Path.dirname(copypath)}/.gitignore`);
            }
        },
    });
    await prepareApp(app);
    logger.log(`\n${logger.mainColor("vritra")} app ${logger.minorColor("successfully")} created.`);
});
