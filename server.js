
let dbMysql = require('./database')
let express = require('express');
let app = express();
let bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));




app.get('/',(req,res)=>{
    return res.send({message: 'RESTFULAPI CRUD API with NODEJS , Express',
                    written_by: 'Soravit'
    })
})

//get all
app.get('/employees',(req,res)=>{
    dbMysql.query('SELECT * FROM Employee',(err , results , fields) =>{
        if(err) throw err;
        let api_status = {code:"" , status:""}
        if(results === undefined || results.length === 0){
            api_status.code = "4000"
            api_status.status = "Fail to Find All Employee"
        }else{
          api_status.code = "0000"
            api_status.status = "Success"
        }
        return res.send({data:results,api_status})
    })
})

//update id
app.post('/employees',(req,res) =>{
    let name = req.body.data.name;
    let empId = req.body.data.emp_id;
    let salary = req.body.data.salary;

    if(!name || !empId || !salary){
        return res.status(400).send({message:"Pls give me the name or empId or salary"})
    }else{
        dbMysql.query('INSERT INTO Employee (name , emp_code , salary) VALUES(?,?,?)',[name,empId,salary],(err,results,field)=>{
            
            let api_status = {code:"" , status:""}
            if(err){
                api_status.code = "4000"
                api_status.status = "Fail to update Employee"
                throw err
            }else{
                api_status.code = "0000"
                api_status.status = "Success to update Employee"
                return res.send({data:results,api_status})
            }
        })
    }
})

app.get('/employees/:id' , (req,res)=>{
    let id = req.params.id
    
    if(!id){
        return res.status(400).send({message:"Pls give me the id"})
    }else{
        dbMysql.query("SELECT * FROM employee WHERE id = ?" , id , (err , result , field)=>{
            
            let api_status = {code:"" , status:""}
            if(err){
                api_status.code = "4000"
                api_status.status = "Fail to Get By Employee"
                throw err
            }else{
                if(result[0] === undefined || result[0] === null){
                    api_status.code = "4000"
                    api_status.status = "Data Not Found"
                    return res.send({api_status})
                }else{
                api_status.code = "0000"
                api_status.status = "Success to Get By Employee"
                return res.send({data:result[0],api_status})
                }
            }
        })
    }
})


app.put('/employees',(req,res)=>{
    let id = req.body.data.id
    let name = req.body.data.name
    let empId = req.body.data.emp_id
    let salary = req.body.data.salary
    let api_status = {code:"",status:""}

    let validate = id === undefined || name === undefined || empId === undefined || salary === undefined;
    if(validate){
        api_status.code = "4000"
        api_status.status = "Error to Update Employee Pls give the id or name or empId or salary "
    }
    dbMysql.query('UPDATE employee SET name = ?,emp_code = ?,salary = ? WHERE id = ?',[name , empId , salary , id] , (err , results , field)=>{
        if(err){
            api_status.code = "4000"
            api_status.status = "Error to Update Employee"
            throw err
        }else{
            if(results.changedRows === 0){
                api_status.code = "4000"
                api_status.status = "Employee not found"
                return res.send({api_status})
            }
            api_status.code = "0000"
            api_status.status = "Success"
            return res.send({api_status})
        }
    })
})




app.listen(3000,()=>{
    console.log('APP RUNNING ON PORT : 3000');
})

module.exports = app;