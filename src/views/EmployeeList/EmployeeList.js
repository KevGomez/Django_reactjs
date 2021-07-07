import React, { Component } from 'react';
import { Card, CardBody,CardHeader, Col, Button, Modal, Form, Input, ModalHeader, ModalBody, FormGroup, Row, ModalFooter } from 'reactstrap';
import {
    Label,
    CardText,
    Alert,
    Badge
  } from "reactstrap";
  import alertify from "alertifyjs/build/alertify";
  import * as BaseService from '../../BaseService';
import { FlareSharp } from '@material-ui/icons';

class EmployeeList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            user: localStorage.getItem("username"),
            openModal: false,
            empCode: '',
            empName: '',
            empMobile: '',
            empID: ''
        };
    }

    componentDidMount(){
        if(localStorage.getItem("username") == null){
            window.location.href="/"
        }
        else{
            const url = '/getlist/'
            BaseService.GetEmployeeList(url).then((res) => {
                console.log(res.data)
                this.setState({
                    data: res.data
                })
              })
              .catch((err) => {
                console.log(err)
        });
        }
    }

    onChangeHandler = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    deleteEmployee = (id) => {
       console.log(id)
       const url = '/delete/' + id + '/'
       BaseService.DeleteEmployeeService(url).then((res) => {
        console.log(res.data)
        alertify.alert("Success", "Employee Deleted!!").set('onok', function(closeEvent){ window.location.reload();});
      })
      .catch((err) => {
        alertify.alert("Failed","Employee deleting Failed!!! Make sure to provide relevant information").set('onok', function(closeEvent){ window.location.reload();});
    });
    }

    editEmployee = (code, name, mobile, id) => {
        this.setState({
            openModal: true,
            empCode: code,
            empName: name,
            empMobile: mobile,
            empID: id
        })
    }

    updateEmployee= async(e) => {
        e.preventDefault();

        const url = '/update/' + this.state.empID + "/"
        const data ={
            empCode: this.state.empCode,
            empName: this.state.empName,
            empMobile: this.state.empMobile,
            user: this.state.user
        }

        console.log(data)

        BaseService.UpdateEmployeeService(url ,data).then((res) => {
            console.log(res.data)
            alertify.alert("Success", "Employee Updated!!").set('onok', function(closeEvent){ window.location.reload();});
            this.setState({
                openModal: false
            });
          })
          .catch((err) => {
            alertify.alert("Failed","Employee adding Failed!!! Make sure to provide relevant information").set('onok', function(closeEvent){ window.location.reload();});
        });
    }

    render() {
        return (
        <div>
            <Row>
                <Col xs="12" sm="5">
                    <Card >
                    <CardHeader><h3>Employee List</h3></CardHeader>
                    <CardBody>
                    <CardText>You can view all the employees that you added</CardText>

                    {this.state.data.map(data=>{

                        if(data.user == this.state.user){
                            return(
                                <Alert style={StyledHome.rowShadow} color="warning" key={data.id}>
                                    <Badge color="success" pill>Added by {data.user}</Badge>
                                    <Button className="ml-auto d-block mr-3" outline color="success" onClick={() => {this.editEmployee(data.empCode, data.empName, data.empMobile, data.id)}}> Edit </Button> 
                                    <p>Employee Code:
                                    <b> {data.empCode} </b> 
                                    <br />
                                    </p>
                                    <p>Employee Name:
                                    <b> {data.empName} </b> 
                                    <br />
                                    </p>
                                    <p>Employee Mobile:
                                    <b> {data.empMobile} </b> 
                                    <br />
                                    <Button className="ml-auto d-block mr-3" outline color="danger" onClick={() => {this.deleteEmployee(data.id)}}> Delete </Button> 
                                    </p>
                                </Alert>
                            )
                        }

                     })}
                    
                    </CardBody>
                    </Card>
                </Col>
            </Row>

        <Modal
            isOpen={this.state.openModal}
          >
            <Form method = "POST" onSubmit={this.updateEmployee}>
              <ModalHeader toggle={this.toggleLarge}><i className="fa fa-pencil fa-lg mt-4" style={{paddingRight:"8px"}}></i>Edit Employee</ModalHeader>
              <ModalBody >

                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="date-input">Emp Code</Label>
                  </Col>
                  <Col xs="12" md="9">
                                 <Input
                                    type="text"
                                    id="empCode"
                                    name="empCode"
                                    value={this.state.empCode}
                                    onChange={this.onChangeHandler}
                                    required
                                  />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="date-input">Emp Name</Label>
                  </Col>
                  <Col xs="12" md="9">
                                 <Input
                                    type="text"
                                    id="empName"
                                    name="empName"
                                    value={this.state.empName}
                                    onChange={this.onChangeHandler}
                                    required
                                  />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="date-input">Emp Mobile</Label>
                  </Col>
                  <Col xs="12" md="9">
                                 <Input
                                    type="text"
                                    id="empMobile"
                                    name="empMobile"
                                    value={this.state.empMobile}
                                    onChange={this.onChangeHandler}
                                    required
                                  />
                  </Col>
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button id="submitbtn" type="submit" color="success">
                  Save
                </Button>
                <Button color="secondary" onClick={()=>this.setState({openModal:false})}>
                  Cancel
                </Button>
              </ModalFooter>
            </Form>
          </Modal>
            
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


export default EmployeeList;