import React, { Component, useState, useEffect } from 'react';
import { Button, Card, CardBody,CardHeader, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, FormFeedback } from 'reactstrap';
import {
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    FormGroup,
    Label,
    Table,
    CardTitle,
    CardText,
    Dropdown,
    DropdownToggle,
    DropdownItem,
    DropdownMenu,
    Select,
    Alert,
    Pagination,
    PaginationItem,
    PaginationLink,
    
  } from "reactstrap";
  

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
let tempRealTimeDbToken = [];

class ToDoList extends Component {

    
    constructor(props) {
        super(props);
        this.state = {
            userID: localStorage.getItem("email"),
            toDestination:"Colombo 1",
            fromDestination:"Colombo 1",
            totalAmount: 0, 
            distance: 0,
            realTimeDB: [],
            realTimeDBToken: [],
            valueStartDist: 0,
            valueEndDist: 0,
            date: new Date(),
            activeTrue: false,
            tokenExpired: false,
            insufficientCredit: false,
            availableAmount: 0
        };
    }

    componentDidMount(){
        database.ref('journey').orderByChild("userID").equalTo(this.state.userID).on('value',(snapshot)=>{
            tempRealTimeDb=[];
            snapshot.forEach(arr=>{
                tempRealTimeDb=[...tempRealTimeDb,{id:arr.key,...arr.val()}]
            });

            this.setState({
                realTimeDB: tempRealTimeDb,
            })
        })

        database.ref('token').orderByChild("email").equalTo(this.state.userID).on('value',(snapshot)=>{
            tempRealTimeDbToken=[];
            snapshot.forEach(arr=>{
                tempRealTimeDbToken=[...tempRealTimeDbToken,{id:arr.key,...arr.val()}]
            });

            this.setState({
                realTimeDBToken: tempRealTimeDbToken,
            })
        })

    }


    onChangeHandler = (event) => {
        this.setState({
            [event.target.name]:event.target.value,
        })
        
        
    }

    calculateAmount = () => {
        if((data.findIndex(e => e.value === this.state.fromDestination)) > (data.findIndex(e => e.value === this.state.toDestination)))
        {
            const tempVar = data.findIndex(e => e.value === this.state.fromDestination) - data.findIndex(e => e.value === this.state.toDestination);
            this.setState({
                totalAmount: tempVar * 10.5,
                distance: tempVar
            })
        }
        else if((data.findIndex(e => e.value === this.state.fromDestination)) < (data.findIndex(e => e.value === this.state.toDestination)))
        {
            const tempVar = data.findIndex(e => e.value === this.state.toDestination) - data.findIndex(e => e.value === this.state.fromDestination)
            this.setState({
                totalAmount: tempVar * 10.5,
                distance: tempVar
            })
        }
        else{
            alert('Error: Both destinations are same! Can not calculate the total amount');
        }

    }
    

    checkInputAndSubmit = async(e) => {
        e.preventDefault();
        
        await this.state.realTimeDB.map( val=>{
            if(val.status==="Active")
            {
                this.setState({
                    activeTrue: true,
                })
            }
        })

        await this.state.realTimeDBToken.map( val=>{
            if(val.isactive===0)
            {
                this.setState({
                    tokenExpired: true,
                })
            }

            if((val.amount - this.state.totalAmount) < 0)
            {
                this.setState({
                    insufficientCredit: true,
                })
            }
            else{
                this.setState({
                    availableAmount: val.amount - this.state.totalAmount,
                })
            }

            
        })

        // await this.state.realTimeDBToken.map( val=>{
        //     console.log("this is amount: "+val.amount)
        //     if((val.amount - this.state.totalAmount) < 0)
        //     {
        //         this.setState({
        //             insufficientCredit: true,
        //         },()=>console.log("Credit insufficient: ", this.state.insufficientCredit))
        //     }
        //     else{
        //         this.setState({
        //             availableAmount: val.amount - this.state.totalAmount,
        //         },()=>console.log("Credit available: ", this.state.availableAmount))

        //         console.log("Available amount; ", this.state.availableAmount)
        //     }
        // })
        
        if(this.state.insufficientCredit){
            alert('Error: credit insufficient!');
        }
        else if(this.state.tokenExpired ){
            alert('Error: your token is expired');
        }
        else if(this.state.activeTrue===true){
            alert('Error: you already have a current journey');
        }
        else if(this.state.fromDestination === this.state.toDestination){
            alert('Error: Both destinations are same! Can not confirm the Journey');
        }
        else if(this.state.totalAmount === 0){
            alert('Error: You need to calculate the amount');
        }
        else{
            database.ref('journey').push().set({
                userID:this.state.userID,
                fromDestination: this.state.fromDestination,
                toDestination:this.state.toDestination,
                date: this.state.date.toString(),
                status: "Active",
                fullAmount: this.state.totalAmount,
                distance: this.state.distance
              },
              alert('Journey Confirmed! Total required payment will be deducted once the journey is completed!')
              ).catch(err=>console.log(err))

            // //   database.ref('token').orderByChild("email").equalTo(this.state.userID).update( {amount:this.state.availableAmount},(err)=>{
            // //     if (err) {
            // //         console.log(err);
    
            // //         } else {
            // //             console.log("Amount updated");
            // //             this.getData();
            // //        }
            // //  });

            // var database2=database.database().ref('token').child('email/'+this.state.userID);
            // database2.once("value",function(snapshot){
            //     console.log(snapshot.val())
            // })
            database.ref('token').orderByChild('email').equalTo(this.state.userID.trim()).once('value',(snapshot)=>{
                snapshot.forEach(data=>{
                    database.ref(`token/${data.key}/`).update({amount:this.state.availableAmount})
                })
              })
        }

        this.setState({
            toDestination:"Colombo 1",
            fromDestination:"Colombo 1",
            totalAmount: 0, 
            activeTrue: false,
            tokenExpired: false,
            insufficientCredit: false,
            availableAmount: 0
        })
        
    }

    
    render() {
        return (
            <div>
                <Row>
                    <Col xs="12" sm="12">
                    <Card >
                    <CardHeader><h3>ToDo List</h3></CardHeader>
                    <CardBody>
                    <CardText>You can view current active ToDo items</CardText>
                    
                        <h5>Active Journey</h5>

                        {/* {this.state.latestTravel.length<1
                        ?  <p>No data available</p>
                        :  (this.showLastTravel())
                        } */}
                    
                    
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