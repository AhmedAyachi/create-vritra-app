#!/usr/bin/env node
"use strict";

const logger=require("./logger");

module.exports=async ()=>{
    const pkgjson=require("../../package.json");
    logger.log(["",
        `create-vritra-app ${logger.mainColor("v"+pkgjson.version)}`,"",
        `The template's vritra-plugins target the following cordova platforms:`,
        `   ${logger.minorColor("cordova-ios")} ~8.1.0`,
        `   ${logger.minorColor("cordova-android")} ~15.0.0`,
        `   ${logger.minorColor("cordova-browser")} ~7.0.0 as a development platform only.`,
    ]);
};
