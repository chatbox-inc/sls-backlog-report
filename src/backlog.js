'use strict';
const AWS = require('aws-sdk')
const sns = new AWS.SNS()

class Backlog{

    constructor(topicArn,channel)
    {
        this.topicArn = topicArn
        this.channel = channel
    }

    message(text)
    {
        return JSON.stringify({
            channel: this.channel,
            text,
        })
    }

    getDoneCb(cb)
    {
        return (err, result) => cb(null, {
            statusCode: err ? '500' : '200',
            body: err ? err.message : JSON.stringify(result),
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }

    parseResult(taskList){
        const count = taskList.length;
        const users = {}
        let unknown = 0
        taskList.forEach((item)=>{
            const assignee = item.assignee && item.assignee.name
            if(assignee){
                if(!users[assignee]){
                    users[assignee] = {count:0,important:0}
                }
                users[assignee].count++
                if(item.dueDate){
                    const dueDate = Date.parse(item.dueDate)
                    const nowDate = Date.now() + (9-24) * 60 * 60 * 1000
                    if(dueDate<nowDate){
                        console.log(assignee)
                        console.log((new Date(dueDate).toISOString()))
                        console.log((new Date(nowDate).toISOString()))
                        users[assignee].important++
                    }
                }else{
                    users[assignee].important++
                }
            }else{
                unknown++
            }
        })

        let template = "おはようございます！\n本日の課題状況の一覧をお知らせします。\n"
        template += `全体の課題 ${count} 件\n`
        Object.keys(users).forEach((key)=>{
            template += `${key} さんの担当課題 ${users[key].count}件 期限切れ ${users[key].important}件\n`
        })
        if(unknown){
            template += `担当者不明の課題が${unknown}件あります。`;
        }
        template += `
課題の一覧は以下よりご確認下さい。
https://chatboxinc.backlog.jp/find/CHATBOX
`


        return template;
    }

    daylyReport(report,event, context, cb)
    {
        const done = this.getDoneCb(cb)

        report.issues().then((result)=>{
            if(result.ok){
                const text = this.parseResult(result.body)

                const Message = this.message(text)
                const TopicArn = this.topicArn
                const done = this.getDoneCb(cb)

                sns.publish({
                    Message,
                    Subject: "SLS BACKLOG REPORT APPLICATION",
                    TopicArn
                }, done)
            }else{
                console.log(result.body)
                throw new Error("failed to api")
            }
        }).catch((e)=>{
            done(e)
        })

    }
}

module.exports = Backlog
