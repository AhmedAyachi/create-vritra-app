#!/usr/bin/env node
"use strict";

const {execSync}=require("child_process");

module.exports=async (appPath)=>{
    const gitStatus=execSync(`git --version`).toString();
    if(gitStatus.startsWith("git")){
        execSync("git init",{cwd:appPath,stdio:"inherit"});
    }
    console.log("");
    execSync("npm i",{cwd:appPath,stdio:"inherit"});
}
