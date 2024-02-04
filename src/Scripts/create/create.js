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
    const {name:appname,packageName}=app;
    const appPath=await copyFolder(templatePath,processDir,{
        name:appname,
        onCopyEntry:(copypath)=>{
            const name=Path.basename(copypath);
            if(["config.xml","package.json"].includes(name)){
                let content=FileSystem.readFileSync(copypath,{encoding:"utf8"});
                content=content.replace(/appname/g,appname.toLowerCase()).replace(new RegExp(`android-packageName=""`),`id="${packageName}" android-packageName="${packageName}"`);
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
    await prepareApp(app);
    logger.log(`\n${logger.mainColor("Vritra")} app ${logger.bold(logger.minorColor("successfully"))} created.`);
});
