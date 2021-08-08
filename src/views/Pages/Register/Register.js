import React, { Component } from 'react';
import { Button, Card, CardBody, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, FormFeedback,Modal,ModalHeader,ModalBody,ModalFooter,FormGroup,Label } from 'reactstrap';

import "alertifyjs/build/css/alertify.min.css";
import "alertifyjs/build/css/alertify.css";
import "alertifyjs/build/css/themes/default.min.css";
import alertify from "alertifyjs/build/alertify";
import * as BaseService from '../../../BaseService';
// alertify.success('Ok')
class Register extends Component {

  constructor(props){
    super(props);
    this.state={
      valid:false,
      invalid:false,
      valid1:false,
      invalid1:false,
      username:'',
      password:'',
      confirmPass:'',
      firstname: '',
      lastname: '',
      email:'',
      large:false,
      error: ''
    }
  }



  componentDidMount() {

  }

  onChangeHandler=(e)=>{
    this.setState({[e.target.name]:e.target.value})
  }


  onPasswordChange=(e)=>{
    this.setState({[e.target.name]:e.target.value})
      if(e.target.value.length<7)
      {
        this.setState(
          {
            valid1: false,
            invalid1: true,
          }
        );

      }else{
        this.setState(
          {
            invalid1: false,
            valid1: true,
          }
        );

      }
  }


  HandlepasswordConfirm=(e)=>{

    if (e.target.value === this.state.password) {
      this.setState(
        {
          valid: true,
          invalid: false,
        }
      );
    } else {
      this.setState(
        {
          invalid: true,
          valid: false,
        }
      );
    }
  }


  onSubmitHandler=(e)=>{
    
      e.preventDefault();
        const url = '/register/'
      let data={
        username: this.state.username,
        first_name: this.state.firstname,
        last_name: this.state.lastname,
        email: this.state.email,
        password: this.state.password,
        password2: this.state.password
      }

      BaseService.RegisterService(url ,data).then((res) => {
        console.log(res.data)
        if(res.data.status == 'error'){
          alertify.alert("Failed","Registration Failed!").set('onok', function(closeEvent){ window.location.reload();});
        }
        else{
          alertify.alert("Success", "Registration Success!!").set('onok', function(closeEvent){ window.location.href = '/';});
        }
      })
      .catch((err) => {
        alertify.alert("Failed","Registration Failed!!!").set('onok', function(closeEvent){ window.location.reload();});
      });
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                
                    <h1>REGISTER</h1>
                    <p className="text-muted">Create an account</p>
                    <Form onSubmit={this.onSubmitHandler}>
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-user"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" placeholder="Username" name="username" value={this.state.username} onChange={this.onChangeHandler}   autoComplete="username" required />
                        </InputGroup>

                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                          <InputGroupText>+</InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" placeholder="First Name" name="firstname" value={this.state.firstname} onChange={this.onChangeHandler}   autoComplete="firstname" required />
                        </InputGroup>

                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                          <InputGroupText>-</InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" placeholder="Last Name" name="lastname" value={this.state.lastname} onChange={this.onChangeHandler}   autoComplete="lastname" required />
                        </InputGroup>

                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>@</InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" placeholder="Email" name="email" autoComplete="email" value={this.state.email} onChange={this.onChangeHandler} required />
                        </InputGroup>

                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-lock"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="password" placeholder="Password" name="password" value={this.state.password} autoComplete="new-password" valid={this.state.valid1} invalid={this.state.invalid1} onChange={this.onPasswordChange} required/>
                          <FormFeedback>Password length should be more than 7</FormFeedback>
                        </InputGroup>

                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-lock"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="password" placeholder="Repeat password" name="confirmPass" autoComplete="new-password" valid={this.state.valid} invalid={this.state.invalid} onChange={this.HandlepasswordConfirm} required />
                          <FormFeedback>Passwords doesn't match</FormFeedback>
                        </InputGroup>


                        <Button color="primary" type="submit" block>Register</Button>
                    </Form>
                </CardBody>

              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
