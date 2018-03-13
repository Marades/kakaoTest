var express    = require('express');
var app        = express();
// Dialogflow api 연결
var apiai = require('apiai');
// Dialogflow Agent token key 
var app_ai = apiai("83044ded0d854b77a053ac4bb2653138");
var bodyParser = require('body-parser');
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//초기 상태 get
app.get('/keyboard', function(req, res){
  const menu = {
      "type": 'text'
  };

  res.set({
      'content-type': 'application/json'
  }).send(JSON.stringify(menu));
});

//카톡 메시지 처리
app.post('/message',function (req, res) {

    const _obj = {
        user_key: req.body.user_key,
        type: req.body.type,
        content: req.body.content
    };
    // 카톡 채팅 입력 내용 출력
    console.log(_obj.content)
    // 카톡으로 받은 입력 내용을 Dialogflow API 를 통해 전달
    var request = app_ai.textRequest(_obj.content, {
        sessionId: user_key
    });
    
    request.on('response', function(response) {
    console.log(response);
    // Dialogflow 의 자연어 처리 답변을 카카오톡 답변 message 로 생성
    let massage = {
      "message": {
          "text": response.result.fulfillment.speech
      }
     //카톡으로 전송
     };
      res.set({
          'content-type': 'application/json'
      }).send(JSON.stringify(massage));

    });

    request.on('error', function(error) {
        console.log(error);
    });

    request.end();

});

//4000포트 서버 ON
app.listen(4000, function() {
    console.log("4000포트 입장");
});