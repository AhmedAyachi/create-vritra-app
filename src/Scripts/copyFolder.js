#!/usr/bin/env node
"use strict";

const FileSystem=require("fs");
const Path=require("path");
const excluded=[".DS_Store",".git"];

module.exports=async function copyFolderSync(folderPath,dest,options={}){
    const {name=Path.basename(folderPath),onCopyEntry}=options,copyPath=`${dest}/${name}`;
    FileSystem.mkdirSync(copyPath);
    const entries=FileSystem.readdirSync(folderPath);
    entries.forEach(entryname=>{
        if(!excluded.includes(entryname)){
            const entrypath=`${folderPath}/${entryname}`;
            const stat=FileSystem.statSync(entrypath);
            const copiedTo=`${copyPath}/${entryname}`;
            if(stat.isFile()){
                FileSystem.copyFileSync(entrypath,copiedTo);
            }
            else if(stat.isDirectory()){
                copyFolderSync(entrypath,copyPath);
            }
            onCopyEntry&&onCopyEntry(copiedTo,entrypath);
        }
    });
    return copyPath;
}
