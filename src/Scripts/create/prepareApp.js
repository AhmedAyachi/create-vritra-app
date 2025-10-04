#!/usr/bin/env node
"use strict";

const FileSystem=require("fs");
const logger=require("../logger");
const {exec,execSync}=require("child_process");

module.exports=(app)=>new Promise((resolve,reject)=>{
    const appPath=app.path;
    FileSystem.mkdirSync(appPath+"/www");
    exec("git --version",(error)=>{
        if(!error) execSync("git init",{cwd:appPath,stdio:"inherit"});
        execSync("npm i",{cwd:appPath,stdio:"inherit"});
        logger.log(["",
            `Most of the vulnerabilities mentioned above might be caused by the ${logger.minorColor("cordova-serve")}`,
            `and ${logger.minorColor("connect-phonegap")} packages required by the ${logger.mainColor("vritra-scripts")} package.`,
            "Try to skip auditing the vritra-scripts dev package to check the actual health status.",
        ]);
        exec("code --version",(error)=>{
            if(!error) execSync("code .",{cwd:appPath});
            resolve();
        });
    });
});
