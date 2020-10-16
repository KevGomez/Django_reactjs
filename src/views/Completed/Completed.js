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

class Completed extends Component {

    
    constructor(props) {
        super(props);
        this.state = {
            userID: localStorage.getItem("email"),
            realTimeDB: []
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

    }


    
    render() {
        return (
            <div>
                <Row>
                    <Col xs="12" sm="8">
                    <Card >
                    <CardHeader><h3>Completed ToDo List</h3></CardHeader>
                    <CardBody>
                    <CardText>You can view currently completed ToDo items</CardText>

                        {this.state.realTimeDB.map(data=>{

                        if(data.status=="Completed"){
                            return(
                        <Alert style={StyledHome.rowShadow} color="warning" key={data.id}>
                            <Badge color="danger"  pill>Completed Todos</Badge>
                            <p>ToDo: 
                            <b> {data.todo} </b> 
                            <br />
                            Date:
                            <b> {moment(data.date).format("YYYY-MM-DD")} </b> 
                            </p>
                        </Alert>
                            )
                        }

                     })}
                    
                    
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


export default Completed;