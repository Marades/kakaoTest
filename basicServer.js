// a simple node app for kakao api
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.get('/', function(req, res){
//     let msg = {
//         "message":"plz"
//     }
//     res.send(msg)
// })
app.get('/keyboard', (req, res) => {
    let keyboard = {
        "type": "text"
    }
    res.set({
        'Content-Type': 'application/json; charset=utf-8'
    }).send(JSON.stringify(keyboard));
  });

app.post('/message', function(req,res){
  let user_key = decodeURIComponent(req.body.user_key); // user's key
  let type = decodeURIComponent(req.body.type); // message type
  let content = decodeURIComponent(req.body.content); // user's message
  console.log(user_key);
  console.log(type);
  console.log(content);

  let answer = {
    "message":{
      "text":"your message is arrieved server : "+content // in case 'text'
    }
  }
  res.send(answer);
  /*
  answer can use 
  {
    "message": {
      "text": "귀하의 차량이 성공적으로 등록되었습니다. 축하합니다!",
      "photo": {
        "url": "https://photo.src",
        "width": 640,
        "height": 480
      },
      "message_button": {
        "label": "주유 쿠폰받기",
        "url": "https://coupon/url"
      }
    },
    "keyboard": {
      "type": "buttons",
      "buttons": [
        "처음으로",
        "다시 등록하기",
        "취소하기"
      ]
    }
  }
  */
});

app.listen(3000, '127.0.0.1', function(){
  console.log('Connect 3000 port!')
});

