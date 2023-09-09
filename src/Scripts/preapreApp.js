#!/usr/bin/env node
"use strict";

const FileSystem=require("fs");
const {exec,execSync}=require("child_process");

module.exports=(appPath)=>new Promise((resolve,reject)=>{
    FileSystem.mkdirSync(appPath+"/www");
    exec("git --version",(error)=>{
        (!error)&&execSync("git init",{cwd:appPath,stdio:"inherit"});
        execSync("npm i",{cwd:appPath,stdio:"inherit"});
        exec("code --version",(error)=>{
            (!error)&&execSync("code .",{cwd:appPath});
            resolve();
        });
    });
});
