'use strict';
const Backlog = require("./src/backlog")
import Report from "./src/BacklogReport"

const topicArn = process.env.SLS_TOPICARN

module.exports.chatbox = (event, context, cb)=>{
    const backlog = new Backlog(topicArn,"#chatbox")
    const report = new Report(
        process.env.SLS_BL_ROOMKEY,
        process.env.SLS_BL_APIKEY,
        process.env.SLS_BL_PROJECTID);
    backlog.daylyReport(report,event, context, cb)
}

// module.exports.chatbox = (event, context, cb)=>{
//     const backlog = new Backlog(topicArn,"#chatbox")
//     backlog.run(event, context, cb)
// }