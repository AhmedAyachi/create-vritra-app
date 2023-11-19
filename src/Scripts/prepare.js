
const FileSystem=require("fs");
const logger=require("./logger");

module.exports=(args)=>new Promise((resolve,reject)=>{
    const [appname,...options]=args;
    if(appname&&(appname.length<31)){
        const processDir=process.cwd();
        const appPath=`${processDir}/${appname}`;
        if(FileSystem.existsSync(appPath)){
            reject({message:`A folder named ${logger.minorColor(appname)} already exists`});
        }
        else{
            const packageName=getPackageName(options,`com.${appname.toLowerCase()}.app`);
            logger.log(["",`using ${logger.minorColor(packageName)} as a package name.`]);
            resolve({
                app:{name:appname,path:appPath,packageName},
            });
        }
    }
    else{
        reject({message:"No app name provided or app name exceeds the 30-character limit."});
    }
});

const getPackageName=(options,defaultValue)=>{
    let name;
    const option=options.find(option=>option.startsWith("--packageName="));
    if(option){
        const [_,value]=option.split("=");
        name=value;
    }
    else{
        name=defaultValue;
    }
    return name;
}
