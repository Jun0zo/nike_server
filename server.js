const express = require('express');
const axios = require('axios');
var cors = require('cors');
// const app = asyncify(express());
const app = express();
const port = 3000;
app.use(cors())

app.get('/', (req, res) => {
    const wish_list = req.query['wish'].split(',');
    const refurl = req.query['refurl'];

    console.log(wish_list)
    const options = {
        method:'get',
        url: 'https://www.nike.com/kr/ko_kr/productSkuInventory?productId=10000030700&customYN=false&_=1592107473094',
        headers:{
            "referer": refurl,
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36",
            "x-requested-with": "XMLHttpRequest",
            "Host": "www.nike.com"
        }
    }
    var is_exist = false
    axios(options).then((response) => {
        var shoes_datas = response.data.skuPricing;
        for(var i=0; i<shoes_datas.length; i++){
            if(shoes_datas[i].quantity == 1){
                var size = shoes_datas[i].externalId.split("  ")[1];
                console.log(size);
                if(wish_list.indexOf(size)!==-1){
                    res.send(size);
                    console.log("===================" + "find : " + size);
                    is_exist = true;
                    break;
                }
            }
        }
        if(!is_exist)
            res.send('no exist');
    });
})


app.listen(port, function(){
    console.log('running at ' + port );
});