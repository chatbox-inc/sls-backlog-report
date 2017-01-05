"use strict"

import request from "superagent"

class BacklogReport{

    constructor(roomkey,apikey,projectId) {
        this.entry = `https://${roomkey}.backlog.jp`;
        this.apikey = apikey;
        this.projectId = projectId;

    }

    /**
     * 課題の取得
     * https://developer.nulab-inc.com/ja/docs/backlog/api/2/get-issues
     */
    issues(){
        return new Promise((resolve)=>{
            let tsNow = Date.now() + 9 * 60 * 60 * 1000;
            let nowString = (new Date(tsNow)).toISOString().substr(0,10);
            console.log(nowString)
            request.get(this.entry+"/api/v2/issues")
                .query({"projectId[]":this.projectId})
                .query("statusId[]=1&statusId[]=2&statusId[]=3")
                .query({parentChild:1})
                // .query({"assigneeId[]":assigneeId})
                // .query({dueDateUntil:nowString})
                .query({apiKey:this.apikey})
                .end((err,res)=>{
                    if(!res){
                        throw err
                    }else{
                        resolve(res)
                    }
                })
        })
    }
}

export default BacklogReport