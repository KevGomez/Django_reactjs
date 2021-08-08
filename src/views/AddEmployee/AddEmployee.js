import React, { Component} from 'react';
import { Button, Card, CardBody,CardHeader, Col, Form, Input, Row} from 'reactstrap';
import {
    Label,
    CardText
} from "reactstrap";
import alertify from "alertifyjs/build/alertify";
import * as BaseService from '../../BaseService';

class AddEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: localStorage.getItem("username"),
            empCode: "",
            empName: "",
            empMobile: "",
        };
    }

    componentDidMount(){
        if(localStorage.getItem("username") == null)
        {
        window.location.href = "/"
        }
    }

    onChangeHandler = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    onSubmit = async(e) => {
        e.preventDefault();
        const url = '/addemp'
        const data ={
            empCode: this.state.empCode,
            empName: this.state.empName,
            empMobile: this.state.empMobile,
            user: this.state.user
        }

        console.log(data)

        BaseService.AddEmployeeService(url ,data).then((res) => {
            console.log(res.data)
            alertify.alert("Success", "Employee Added!!").set('onok', function(closeEvent){ window.location.reload();});
          })
          .catch((err) => {
            alertify.alert("Failed","Employee adding Failed!!! Make sure to provide relevant information").set('onok', function(closeEvent){ window.location.reload();});
        });
    }
    
    render() {
        return (
            <div>
                <Row>
                    <Col xs="12" sm="8">
                        <Card >
                        <CardHeader><h3>Add Employees to the System</h3></CardHeader>
                        <CardBody>
                        <CardText>Provide Employee Information</CardText>

                        <Form method ="POST" onSubmit={this.onSubmit}>
                            <Label>Enter the Employee Code: </Label>
                                <Input type="text"  name="empCode" id="empCode" value={this.state.empCode} onChange={this.onChangeHandler} required />
                            <Label>Enter the Employee Name</Label>
                                <Input type="text"  name="empName" id="empName" value={this.state.empName} onChange={this.onChangeHandler} required />
                            <Label>Enter the Employee Mobile</Label>
                                <Input type="text" name="empMobile" id="empMobile" value={this.state.empMobile} onChange={this.onChangeHandler} required />
                            <br />
                            <Button type="submit" >Add Employee</Button>
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


export default AddEmployee;