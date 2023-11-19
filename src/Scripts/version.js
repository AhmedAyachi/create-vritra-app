#!/usr/bin/env node
"use strict";

const logger=require("./logger");

module.exports=async ()=>{
    const pkgjson=require("../../package.json");
    logger.log(["",
        `create-vritra-app ${logger.minorColor("v"+pkgjson.version)}`,"",
        `Supported Cordova Platforms:`,
        `   ${logger.mainColor("cordova-ios")} ~7.0.0`,
        `   ${logger.mainColor("cordova-android")} ~10.1.2`,
        `   ${logger.mainColor("cordova-browser")} as a development platform only.`,"",
    ]);
};
