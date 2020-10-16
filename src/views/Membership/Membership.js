import React, { Component, useState } from 'react';
import { Button, Card, CardBody,CardHeader, Col, Container, Form, Input, Row} from 'reactstrap';
import {
    Badge,
    Label,
    CardText
    
  } from "reactstrap";
  import moment from "moment";
  import {database, firestore} from "../../firebasejs";
 
let tempRealTimeDb=[];
class Membership extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: localStorage.getItem("email"),
            name: "",
            cardNo: "",
            cvc: "",
            realTimeDB: [],
            today: new Date().toString()
        };
    }

    componentDidMount(){

        database.ref('membership').orderByChild("email").equalTo(this.state.userID).on('value',(snapshot)=>{
            tempRealTimeDb=[];
            snapshot.forEach(arr=>{
                tempRealTimeDb=[...tempRealTimeDb,{id:arr.key,...arr.val()}]
            });

            this.setState({
                realTimeDB: tempRealTimeDb
            })
        })

    }

    onChangeHandler = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    onSubmit = async(e) => {
        e.preventDefault();

        database.ref('membership').orderByChild('email').equalTo(this.state.userID.trim()).once('value',(snapshot)=>{
            snapshot.forEach(data=>{
                database.ref(`membership/${data.key}/`).update({todos:5, isactive: 1, issueDate: this.state.today})
            })
          },alert('Updated successful!')).catch(err=>console.log(err))

        this.setState({
            name: "",   
            cardNo: "",
            cvc: ""
            
        })
    }
    
    render() {
        return (
            <div>
                <Row>
                    <Col xs="12" sm="8">
                        <Card >
                        <CardHeader><h3>Top Up your Membership</h3></CardHeader>
                        <CardBody>
                        <CardText>You can renew your membership by paying</CardText>

                        <Form method ="POST" onSubmit={this.onSubmit}>
                        <Label>Type your name: </Label>
                            <Input type="text"  name="name" id="name" value={this.state.name} onChange={this.onChangeHandler}>
                            </Input>
                        <Label>Card number</Label>
                            <Input type="text"  name="cardNo" id="cardNo" value={this.state.cardNo} onChange={this.onChangeHandler}>
                            </Input>

                            <Label>CVC number</Label>
                            <Input type="text" name="cvc" id="cvc" value={this.state.cvc} onChange={this.onChangeHandler} />

                            <Label>Amount</Label>
                            <Input type="text" name="amount" id="amount" value="LKR. 500" onChange={this.onChangeHandler} disabled />
                            
                            <br />
                            <Button type="submit" >Renew membership</Button>
                        </Form>
                        <br />
                        </CardBody>
                        </Card>
                    
                
                    </Col>

                    <Col xs="12" sm="4">
                    <Card >
                    <CardHeader><h3>Membership Card</h3></CardHeader>
                    <CardBody>
                    <CardText>Below can find your membership details</CardText>
                    {this.state.realTimeDB.map(data =>{
                        return (
                    <Container style= {StyledHome.cardSingl}>
                         <p>Membership</p>
                         <h3>Email :<b>{data.email}</b> </h3>
                         <h6>Todos available <span>{data.todos}</span> </h6>
                         <h6>Issue date: <span>{moment(data.date).format("YYYY-MM-DD")}</span> </h6>
                         <p>  {data.isactive==0?<Badge color="danger" pill>Membership expired</Badge> :<Badge color="success" pill>Valid membership</Badge>}  </p>
                           
                    </Container>)})}

                    </CardBody>
                    </Card>
                
                </Col>
            </Row>
            </div>
        );
    }
}

const StyledHome ={
     
    ColumnSize:{

       size: 'auto',
       offset: 1
   
   },
    cardSingl:{
       backgroundImage:'linear-gradient(to right top, #0effab, #00efda, #00dbfd, #00c2ff, #00a6ff)',
       borderRadius:10,
       height:200,
       padding:10,
       margin:5,
       boxShadow: '-1px 4px 8px 0px #c7c7c7',

        
   },
   iconAligment:{
    textAlign: 'end',
    padding:10,
    marginLeft: '100'
   },
   cardMonthly:{
      backgroundImage:'linear-gradient(to right top, #f44838, #fe731e, #fe9d00, #f5c500, #e2eb12)',
      borderRadius:10,
      height:200,
      padding:10,
      margin:5,
      boxShadow: '-1px 4px 8px 0px #c7c7c7',

       
  }

}


export default Membership;