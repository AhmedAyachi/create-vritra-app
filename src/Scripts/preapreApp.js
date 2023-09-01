#!/usr/bin/env node
"use strict";

const {exec,execSync}=require("child_process");

module.exports=(appPath)=>new Promise((resolve,reject)=>{
    exec("git --version",(error)=>{
        (!error)&&execSync("git init",{cwd:appPath,stdio:"inherit"});
        execSync("npm i",{cwd:appPath,stdio:"inherit"});
        exec("code --version",(error)=>{
            (!error)&&execSync("code .",{cwd:appPath});
            resolve();
        });
    });
});
