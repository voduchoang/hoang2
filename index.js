const express = require('express')
const aws = require('aws-sdk')
const app = express()

aws.config.update({
    region: 'ap-southeast-1',
    endpoint: 'http://dynamodb.ap-southeast-1.amazonaws.com',
    accessKeyId: '',
    secretAccessKey: ''
})

const docClient = new aws.DynamoDB.DocumentClient()

app.set('view engine', 'ejs')
app.set('views', './views')

app.get('/', (req, res)=>{
    var params = {
        TableName: 'test'
    }
   
    docClient.scan(params ,(error, data)=>{
    if(!error){
        res.render('home', {
            users: data.Items 
        })
    }
   })
})

app.listen(3000, ()=>{
    console.log('Server chay tren Port: 3000')
})