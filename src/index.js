// const zxing = require('@zxing/library');
// require = require("esm")(module);
// const { BrowserQRCodeReader } = require('@zxing/library');

const { MongoClient, ObjectId } = require('mongodb');
const express = require("express");
const mongoose=require("mongoose");
const app=express()
const bodyParser=require("body-parser")
mongoose.set('strictQuery',true);
mongoose.connect("mongodb://127.0.0.1/latestdb");
app.use(bodyParser.urlencoded({extended:true}));
//.then(()=> console.log("database connected"))
//.catch(err => console.log(err))
const ejs=require("ejs");
app.set("view engine","ejs");
app.use(express.static("public"));
// mongoose.connect("mongodb://127.0.0.1/latestdb");//{
    // useNewUrlParser:true,useUnifiedTopology:true
 //},(err)=>{
  //   if(err)
    // {
      //   console.log(err)
     //}else{
       //  console.log("successfully connected")
    // }
 //})
const studentsSchema=new mongoose.Schema({
    username:String,
    password:String,
    email:String,
    phoneNo:String,
    image:String,
    attendance: [String],
    Day:[String],
    
});
const students=mongoose.model("students",studentsSchema);

const teachersSchema=new mongoose.Schema({
    username:String,
    password:String,
    email:String,
    phoneNo:String,
    image:String,
    
});

const teachers=mongoose.model("teachers",teachersSchema);

app.get('/', (req, res) => {
    res.render('login')
});
app.get("/studentlogin", (req, res) => {
    res.render("studentlogin")
});

app.get("/teacherlogin", (req, res) => {
    res.render("teacherlogin")
})
app.get('/teacherpage1', (req, res) => {
    res.render('teacherpage1');
    console.log(req.body.din);
});
app.get("/qrcode", (req, res) => {
    res.render("qrcode")
})
app.get('/teacherAttendance', (req, res) => {
    res.render('teacherAttendance',{chatnamet:chatnamet})
});
app.get('/studentpage1', (req, res) => {
    res.render('studentpage1')
});
app.get('/markAttendance', (req, res) => {
    res.render('markAttendance')
});
app.get('/studentAttendance', (req, res) => {
    res.render('studentAttendance',{chatnames:chatnames})
});



var input;
var num;
app.post('/qrcode', async (req, res) => {
        input = req.body.qrinput;
        num=req.body.din;
console.log(num);

        console.log(input);
})



app.get('/scanner', (req, res) => {
    res.render('scanner')

    var output;

app.post("/scanner",(req,res)=>{

    output=req.body.finally
  console.log(output);
  if(input == output) {
    console.log("hello");
    const field = "attendance." + num;
    students.updateOne(
            { username: john },
            { $set: { [field]: "P" } }
          ).then(result => {
            res.render('markAttendance')
            console.log('Updated successfully!', result);
          }).catch(err => {
            console.error('Error updating user:', err);
          });
          
}
else {
    console.log("incorrect password");
}
})

});






app.get('/viewAttendance',async (req, res) => {
    res.render('viewAttendance');
    
});
app.get('/tviewAttendance',async (req, res) => {
    res.render('tviewAttendance');
});

var chatnamet
var tcheck;
app.post('/teacherlogin', async (req, res) => {

    try {
      tcheck = await teachers.findOne({ username: req.body.username })
        console.log(tcheck);
        chatnamet=tcheck.username;
        if (tcheck.password === req.body.password) {
            res.render("teacherpage1",{tcheck:tcheck});
        }

        else {
            res.send("incorrect password")
        }
    } 
    catch (e) {

        res.send("wrong details teacherlogin")
    
    }


})
var chatnames;
var john;
var scheck;
app.post('/studentlogin', async (req, res) => {

    try {
         scheck = await students.findOne({ username: req.body.username })
         chatnames=scheck.username;
        if (scheck.password === req.body.password) {
            res.render("studentpage1",{scheck:scheck});
        }
        else {
            res.send("incorrect password")
        }
        john=scheck.username;
        console.log(john);
    } 
    
    catch (e) {

        res.send("wrong details studentlogin")
        

    }

})











// Google sheet npm package
const { GoogleSpreadsheet } = require('google-spreadsheet');

// File handling package
const fs = require('fs');

// spreadsheet key is the long id in the sheets URL
const RESPONSES_SHEET_ID = '1Z4CjEr7thIY1bvPb0RfqLEPvrBdbn4pZuCzyhYX3mkA';

// Create a new document
const doc = new GoogleSpreadsheet(RESPONSES_SHEET_ID);

// Credentials for the service account
const CREDENTIALS = JSON.parse(fs.readFileSync('min-380612-8a889c207184.json'));

const getRow = async (email) => {

    // use service account creds
    await doc.useServiceAccountAuth({
        client_email:"id-1min@min-380612.iam.gserviceaccount.com",
        private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC31mKulTX2ZU7K\nWLwhhkR3JgvbVKq6VVypZKJnOtiC8u//EIpqt0B9E0FN9/2rDC4mlgAkMsRl7kzO\nXkewBDOMPeUJZ8AP4rrOwwp2WF884VdvePWuQD5Q+x0RNplEjDMGIWpaPO9QXwbe\nZUmW8ZOW/HQ2LVH0reZDxmEJlBRp4Cl6bW0iUhSpmMl18Q8bYVZaAEEtyqZU6i/B\nYrxOceGL9zWu6QTwYDszznsGpdLe8OiVAmQeUo/G7qgQKFjLU4XQjt17YHoNrdDC\n8fYgFDnzOqfGheDe0Y2P5SvmL3OYBjWmNbsNX1CU/u0Nwmc/fx6Z0D6aKXSBTXES\n/FjAVnk9AgMBAAECggEACgR4IcxGrFOuke8jkpjBlVPblIrjYhOcYNdM1DQ22m0z\nhQzD23cl3/WTJZUBsSGQ8uWnQfxe4Fu2ZWO/eJ4Z/aaHxatDd3oi33kYUlo+wk9Y\ngjNaATHwqLKuTaL8ghQ5BDirlhmORC0Rb5VJsnHH2ZPjHz/5SyHIvjZf+54ik0xI\nVqL5IgmEUnZ+8sLZMuWVNvVGY0aMSgq4JAsydVot9bBWDKMJoQaXWd38BwvO4RtU\nOCiIBKHnMCRsVWAt+05GQaLKCcgfBgS15R0bYvJJyxabenvPO2oa1VXZHLbYcP7A\nlSUunysLAV0x9HoeHa7lzXyGMWAwL8S6jiyrm9MGvwKBgQD7AVhlafsNYKq15K+O\nQ8uZj3GWn3K/FOUvcEM+DoPZc4Gpn2xMZeJ63aYanDAghrRePPScCdvJsEXJKCFu\n58iQw9xfocroMqSR61DWH1b50duCHmVVYNJzzkf4zkcd4UrBZSBoorWKH0axZRTc\nZUlKR8iQf5MbISoVQ9If3Bbv7wKBgQC7fuDV/mCuIj60b0F7dck5L6Vs5zCdesDH\nlUJwh8jN+u1ykP4IsUfyy0Ry7q7b6pEnRp3I21MTUG4UH4jLLDmpZGmuyDBsgnC0\nmRJpXnF5VQQdLe5QXBPAiU3iNDz75EMsMan3UL/FKgqf06LUqqh3kWmEgnrOOcG5\nV28y8S19kwKBgQCJFSMBv++sTq7syAhY2g3Hv995M3unf/HrBpSyv5qil8KosLik\nwL//+i1NOx/No8O98+xji77NV8fFJHWd7FhNN6qTT/lQ9teKGcn8JwGJTmNjnNYa\n2tYVCQOljoKofvIkzOX2P2aGGK6zE1FhTK/KMYoH4KSmnGYvVurbG4grYQKBgC3A\ncCzHvd/AC30MCPaPb2K89aj1YS+MXK5XBbdf6ugYawihyNtmJyBf6XwCMjkHrBPh\nb28r1cHIxpOyfjbVu9xR3FgCEY7o5YesMonzuczZqf9UzepeDZPV7WNdS+RLdvi5\nxbfLxH/gGmeVxQ4P9rv2h8EF9eGMxnDrnP7ZSzhxAoGAWzyhpMYfJ5yctyAKQavB\nUmvL73+Pe9eVD70s9YMuTEExsG3Tdd+0ZcFLLJ6Q4AQtAZYen4txAoH2uwu9mslr\nN8RNjwQ5D/Llqvj6oGHt/U1qpljkB/AB6gPBoCKw9DBMJALDKGxShln7jTxEmzro\nx/EZEYSmDSExyv5tvhWlrCE=\n-----END PRIVATE KEY-----\n"
    });

    // load the documents info
    await doc.loadInfo();

    // Index of the sheet
    let sheet = doc.sheetsByIndex[0];

    // Get all the rows
    let rows = await sheet.getRows();

    for (let index = 0; index < rows.length; index++) {
        const row = rows[index];
        if (row.email == email) {
            console.log(row.user_name);
            console.log(row.password);
        }
    };
};

 //getRow('email@gmail.com');



const addRow = async (rows) => {

    // use service account creds
    await doc.useServiceAccountAuth({
        client_email:"id-1min@min-380612.iam.gserviceaccount.com",
        private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC31mKulTX2ZU7K\nWLwhhkR3JgvbVKq6VVypZKJnOtiC8u//EIpqt0B9E0FN9/2rDC4mlgAkMsRl7kzO\nXkewBDOMPeUJZ8AP4rrOwwp2WF884VdvePWuQD5Q+x0RNplEjDMGIWpaPO9QXwbe\nZUmW8ZOW/HQ2LVH0reZDxmEJlBRp4Cl6bW0iUhSpmMl18Q8bYVZaAEEtyqZU6i/B\nYrxOceGL9zWu6QTwYDszznsGpdLe8OiVAmQeUo/G7qgQKFjLU4XQjt17YHoNrdDC\n8fYgFDnzOqfGheDe0Y2P5SvmL3OYBjWmNbsNX1CU/u0Nwmc/fx6Z0D6aKXSBTXES\n/FjAVnk9AgMBAAECggEACgR4IcxGrFOuke8jkpjBlVPblIrjYhOcYNdM1DQ22m0z\nhQzD23cl3/WTJZUBsSGQ8uWnQfxe4Fu2ZWO/eJ4Z/aaHxatDd3oi33kYUlo+wk9Y\ngjNaATHwqLKuTaL8ghQ5BDirlhmORC0Rb5VJsnHH2ZPjHz/5SyHIvjZf+54ik0xI\nVqL5IgmEUnZ+8sLZMuWVNvVGY0aMSgq4JAsydVot9bBWDKMJoQaXWd38BwvO4RtU\nOCiIBKHnMCRsVWAt+05GQaLKCcgfBgS15R0bYvJJyxabenvPO2oa1VXZHLbYcP7A\nlSUunysLAV0x9HoeHa7lzXyGMWAwL8S6jiyrm9MGvwKBgQD7AVhlafsNYKq15K+O\nQ8uZj3GWn3K/FOUvcEM+DoPZc4Gpn2xMZeJ63aYanDAghrRePPScCdvJsEXJKCFu\n58iQw9xfocroMqSR61DWH1b50duCHmVVYNJzzkf4zkcd4UrBZSBoorWKH0axZRTc\nZUlKR8iQf5MbISoVQ9If3Bbv7wKBgQC7fuDV/mCuIj60b0F7dck5L6Vs5zCdesDH\nlUJwh8jN+u1ykP4IsUfyy0Ry7q7b6pEnRp3I21MTUG4UH4jLLDmpZGmuyDBsgnC0\nmRJpXnF5VQQdLe5QXBPAiU3iNDz75EMsMan3UL/FKgqf06LUqqh3kWmEgnrOOcG5\nV28y8S19kwKBgQCJFSMBv++sTq7syAhY2g3Hv995M3unf/HrBpSyv5qil8KosLik\nwL//+i1NOx/No8O98+xji77NV8fFJHWd7FhNN6qTT/lQ9teKGcn8JwGJTmNjnNYa\n2tYVCQOljoKofvIkzOX2P2aGGK6zE1FhTK/KMYoH4KSmnGYvVurbG4grYQKBgC3A\ncCzHvd/AC30MCPaPb2K89aj1YS+MXK5XBbdf6ugYawihyNtmJyBf6XwCMjkHrBPh\nb28r1cHIxpOyfjbVu9xR3FgCEY7o5YesMonzuczZqf9UzepeDZPV7WNdS+RLdvi5\nxbfLxH/gGmeVxQ4P9rv2h8EF9eGMxnDrnP7ZSzhxAoGAWzyhpMYfJ5yctyAKQavB\nUmvL73+Pe9eVD70s9YMuTEExsG3Tdd+0ZcFLLJ6Q4AQtAZYen4txAoH2uwu9mslr\nN8RNjwQ5D/Llqvj6oGHt/U1qpljkB/AB6gPBoCKw9DBMJALDKGxShln7jTxEmzro\nx/EZEYSmDSExyv5tvhWlrCE=\n-----END PRIVATE KEY-----\n"
    });


    await doc.loadInfo();

    // Index of the sheet
    let sheet = doc.sheetsByIndex[0];

    for (let index = 0; index < rows.length; index++) {
        const row = rows[index];
        await sheet.addRow(row);
    }
};

 
//     var input;
// app.post('/qrcode', async (req, res) => {
//         input = req.body.din;
//         console.log(input);
// })

// const { myVariable } = require('./views/scanner.ejs');
// console.log(myVariable); // Output: Hello World


// const myVariable = require('./public/script.js');
// Enable support for ES modules
require = require("esm")(module);


// // console.log(myVariable);
// // import { myVariable } from './public/script.js';

// // console.log(myVariable); // Output: 42
// import pkg from './public/script.js';
// const { myVariable } = pkg;

// if(input == output) {
//     console.log("hello");
// }
// else {
//     console.log("incorrect password")
// }


// var output=0;
// app.post("/scanner",(req,res)=>{
//     output=req.body.finally
//   console.log(output);
//   if(input == output) {
//     console.log("hello");
   
// }
// else {
//     console.log("incorrect password")
//     students.updateOne(
//             { username: john },
//             { $set: { 'attendance.4': 'l' } }
//           ).then(result => {
//             console.log('Updated successfully!', result);
//           }).catch(err => {
//             console.error('Error updating user:', err);
//           });
// }
// })


app.post('/closeqr', async (req, res) => {
try {
    const Acheck1 = await students.findOne({ username: "Lokesh" });
    const Acheck2= await students.findOne({ username: "Prachi" });
    const Acheck3= await students.findOne({ username: "Avnish" })
    const Acheck4= await students.findOne({ username: "Kaushal" })
    const Acheck5= await students.findOne({ username: "Awasthi" })
    const Acheck6= await students.findOne({ username: "Rishabh" })
    const Acheck7 = await students.findOne({ username: "Nishtha" })
    const Acheck8 = await students.findOne({ username: "Srishti" })
    const Acheck9 = await students.findOne({ username: "Komal" })
    const Acheck10 = await students.findOne({ username: "Aadit" })
    const Acheck11 = await students.findOne({ username: "Porwal" })
    const Acheck12 = await students.findOne({ username: "Terse" })
    const Acheck13 = await students.findOne({ username: "Pratham" })
    const Acheck14 = await students.findOne({ username: "Karan" })
    // const avnish = await students.findOne({ username:"Avnish"});
    // const prachi = await students.findOne({ username:"Prachi"});
    // const lok = post[loki];
// console.log(prachi.loki);
// console.log(avnish.attendance[n]);
// console.log(scheck.attendance[n]);
console.log(Acheck1.attendance[num])
lokesh=Acheck1.attendance[num];
prachi=Acheck2.attendance[num];
avnish=Acheck3.attendance[num];
kaushal=Acheck4.attendance[num];
awasthi=Acheck5.attendance[num];
rishabh=Acheck6.attendance[num];
nishtha=Acheck7.attendance[num];
srishti=Acheck8.attendance[num];
komal=Acheck9.attendance[num];
aadit=Acheck10.attendance[num];
porwal=Acheck11.attendance[num];
terse=Acheck12.attendance[num];
pratham=Acheck13.attendance[num];
karan=Acheck14.attendance[num];
day=Acheck1.Day[num];



// tom=prachi.day;
input="default";
let rows = [{
DAY:day,
LOKESH: lokesh,
PRACHI: prachi,
AVNISH: avnish,
KAUSHAL:kaushal,
AWASTHI: awasthi,
RISHABH: rishabh,
NISHTHA: nishtha,
SRISHTI:srishti,
KOMAL:komal,
AADIT:aadit,
PORWAL: porwal,
TERSE:terse,
PRATHAM: pratham,
KARAN: karan
}];

addRow(rows);
// res.render("viewAttendance");
}
catch (e) {

res.send("wrong details")


}
})




// chat box-------





const http = require('http');
const socketIO = require('socket.io');

const server = http.createServer(app);
const io = socketIO(server);


const users = {};

io.on('connection', socket => {
  // If any new user joins, let other users connected to the server know!
  socket.on('new-user-joined', name => {
    users[socket.id] = name;
    socket.broadcast.emit('user-joined', name);
  });

  // If someone sends a message, broadcast it to other people
  socket.on('send', message => {
    socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
  });

  // If someone leaves the chat, let others know
  socket.on('disconnect', message => {
    socket.broadcast.emit('left', users[socket.id]);
    delete users[socket.id];
  });
});

server.listen(5000, () => {
  console.log('Server running on port 5000');
});
