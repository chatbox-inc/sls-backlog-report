const event = {}

const eventBody = {"created":"2016-12-29T14:52:32Z","project":{"archived":false,"projectKey":"CHATBOX","name":"chatbox 社内課題","id":143,"subtaskingEnabled":true,"textFormattingRule":"markdown"},"id":6919666,"type":1,"content":{"summary":"カッティングシート、サイズ感テスト","key_id":465,"customFields":[],"dueDate":"2016-12-30","description":"窓に貼って確認する！","priority":{"name":"高","id":2},"resolution":{"name":"","id":null},"actualHours":null,"issueType":{"color":"#934981","name":"デザイン","displayOrder":0,"id":54449,"projectId":143},"milestone":[],"versions":[],"parentIssueId":null,"estimatedHours":null,"id":1060795,"assignee":{"name":"r.yasui","id":493,"roleType":94,"lang":"null","userId":"r.yasui"},"category":[],"startDate":"","status":{"name":"未対応","id":1}},"notifications":[],"createdUser":{"nulabAccount":null,"name":"r.yasui","mailAddress":null,"id":493,"roleType":2,"userId":null}}

event.body = JSON.stringify(eventBody)

console.log(JSON.stringify(event))