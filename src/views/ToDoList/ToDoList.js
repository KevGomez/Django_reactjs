import React, { Component, useState, useEffect } from 'react';
import { Button, Card, CardBody,CardHeader, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, FormFeedback } from 'reactstrap';
import {
    Label,
    CardText,
    Alert,
    Badge
  } from "reactstrap";
  import moment from "moment";

  

  import {database, firestore} from "../../firebasejs";

  const data = [
      {id: 1, value: 'Colombo 1'}, 
      {id: 2, value: 'Kollupitiya'},
      {id: 3, value: 'Bambalapitiya'},
      {id: 4, value: 'Wellawatta'}, 
      {id: 5, value: 'Dehiwala'},
      {id: 6, value: 'Mount Lavnia'}, 
      {id: 7, value: 'Ratmalana'},
      {id: 8, value: 'Moratuwa'}

    ];

    //db connection attributes
// const [realtimeDB,setRealTimeDb]=useState([]);
// const [fireStore,setFireStore]=useState([]);
// const [error,setError]=useState('');

let tempRealTimeDb = [];
let tempRealTimeDbMembership = [];

class ToDoList extends Component {

    
    constructor(props) {
        super(props);
        this.state = {
            userID: localStorage.getItem("email"),
            todo:"",
            realTimeDB: [],
            realTimeDBMembership: [],
            date: new Date(),
            noTodos: false,
            availableTodos: 0,
            totalAmount: 0
        };
    }

    componentDidMount(){
        database.ref('todolist').orderByChild("userID").equalTo(this.state.userID).on('value',(snapshot)=>{
            tempRealTimeDb=[];
            snapshot.forEach(arr=>{
                tempRealTimeDb=[...tempRealTimeDb,{id:arr.key,...arr.val()}]
            });

            this.setState({
                realTimeDB: tempRealTimeDb,
            })
        })

        database.ref('membership').orderByChild("email").equalTo(this.state.userID).on('value',(snapshot)=>{
            tempRealTimeDbMembership=[];
            snapshot.forEach(arr=>{
                tempRealTimeDbMembership=[...tempRealTimeDbMembership,{id:arr.key,...arr.val()}]
            });

            this.setState({
                realTimeDBMembership: tempRealTimeDbMembership
            })
        })

        this.getData();

    }

    getData = async() => {
        await this.state.realTimeDBMembership.map( val=>{
            this.setState({
                totalAmount: val.todos
            })
        })
    }


    onChangeHandler = (event) => {
        this.setState({
            [event.target.name]:event.target.value,
        }) 
    }
    

    checkInputAndSubmit = async(e) => {
        e.preventDefault();

        await this.state.realTimeDBMembership.map( val=>{
            if(val.todos===0)
            {
                this.setState({
                    noTodos: true,
                })
            }
            else{
                this.setState({
                    availableTodos: parseInt(val.todos) - 1
                })
            }
        })
        
        if(this.state.noTodos){
            alert('Error: credit insufficient!');
        }
        else{
            database.ref('todolist').push().set({
                userID:this.state.userID,
                todo: this.state.todo,
                date: this.state.date.toString(),
                status: "Active",
              },
              alert('ToDo added successfully!')
              ).catch(err=>console.log(err))

            database.ref('membership').orderByChild('email').equalTo(this.state.userID.trim()).once('value',(snapshot)=>{
                snapshot.forEach(data=>{
                    database.ref(`membership/${data.key}/`).update({todos:this.state.availableTodos})
                })
              })
        }

        this.setState({
            noTodos: false,
            availableTodos: 0,
            todo: ""
        })
        
    }

    
    render() {
        return (
            <div>
                <Row>
                    <Col xs="12" sm="8">
                    <Card >
                    <CardHeader><h3>ToDo List</h3></CardHeader>
                    <CardBody>
                    <CardText>You can view current active ToDo items</CardText>

                        {this.state.realTimeDB.map(data=>{

                        if(data.status=="Active"){
                            return(
                        <Alert style={StyledHome.rowShadow} color="warning" key={data.id}>
                            <Badge color="success"  pill>Active Todos</Badge>
                            <p>ToDo: 
                            <b> {data.todo} </b> 
                            <br />
                            Date:
                            <b> {moment(data.date).format("YYYY-MM-DD")} </b> 
                            
                            <Button className="ml-auto d-block mr-3" outline color="danger" onClick={()=>{this.deactivateToDo(data.id)}}> Done </Button> 
                            </p>
                        </Alert>
                            )
                        }

                     })}
                    
                    
                    </CardBody>
                    </Card>

                   
                    </Col>

                    <Col xs="12" sm="4">
                        <Card >
                        <CardHeader><h3>Add new ToDos</h3></CardHeader>
                        <CardBody>
                        <CardText>You can add new ToDo according to the membership</CardText>

                        <Form method ="POST" onSubmit={this.checkInputAndSubmit}>
                        <Label>Enter the ToDo title:</Label>
                            <Input type="text" name="todo" id="todo" placeholder="Type ToDo" onChange={this.onChangeHandler} >
                            </Input>
                            <br />
                            <Button type="submit" >Create ToDo</Button>
                        </Form>
                        <br />
                        </CardBody>
                        </Card>
                    
                
                    </Col>
            </Row>
            </div>
        );
    }
}

const StyledHome ={
    s1: { 
         backgroundColor:'red',
         
         borderRadius:7
        
       },
   notificationPanal: { 
           backgroundColor:'green',
          
           alignItems: 'center',
           borderRadius:7
       },
   
        ColumnSize:{
   
           size: '6',
           offset: 1
       
       },
       imageStyle:{
           width:'100%',
           borderRadius:10
   
       },
      
       rowShadow:{
        boxShadow: '-1px 4px 8px 0px #c7c7c7',
       }
   
   }


export default ToDoList;