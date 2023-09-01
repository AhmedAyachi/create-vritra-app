
const FileSystem=require("fs");
const logger=require("./logger");

module.exports=(args)=>new Promise((resolve,reject)=>{
    const [appname/* ,...args */]=args;
    if(appname&&(appname.length<31)){
        const processDir=process.cwd();
        const appPath=`${processDir}/${appname}`;
        if(FileSystem.existsSync(appPath)){
            reject({message:`A folder named ${logger.minorColor(appname)} already exists`});
        }
        else{
            resolve({
                app:{name:appname,path:appPath},
            });
        }
    }
    else{
        reject({message:"No app name provided or app name exceeds the 30-character limit."});
    }
});
