#!/usr/bin/env node
"use strict";

const logger=require("./logger");

module.exports=async ()=>{
    const pkgjson=require("../../package.json");
    logger.log(["",
        `create-vritra-app ${logger.mainColor("v"+pkgjson.version)}`,"",
        `The template's vritra-plugins support the following cordova platforms:`,
        `   ${logger.minorColor("cordova-ios")} ~7.0.0`,
        `   ${logger.minorColor("cordova-android")} ~10.1.2`,
        `   ${logger.minorColor("cordova-browser")} as a development platform only.`,
    ]);
};
