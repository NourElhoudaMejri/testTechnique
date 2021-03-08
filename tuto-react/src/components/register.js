import React, { Component } from 'react';
import {Label,FormGroup ,Button, 
  Card, CardBody, Col,CustomInput, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import classnames from 'classnames'
import {PersonAdd} from '@material-ui/icons'
import axios from "axios";
import { Link,withRouter} from "react-router-dom";
class Register extends Component {
 
  constructor()
  {
    super();
    this.state ={
      username:'',
      email:'',
      password:'',
      role: ''
    
         };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }



  onChange(e){
 
    this.setState({[e.target.name]:e.target.value})
 
 
   
  };
  

    onSubmit(e) {
      e.preventDefault();
  
      const newUser = {
      username:this.state.username,
      email:this.state.email,
      password:this.state.password,
      role:this.state.role,

      };
      
      
    axios
    .post("http://localhost:5000//signup", newUser)
    .then(res => {  if (response.status == 200) {
        console.log(response.data)
        
         this.props.history.push('/login')
    }}
    
    
    )
    .catch(err => console.log(err));
 
    
    };
  

ender() {
 
     const { errors } = this.state;  
    
 
    
    return (
    
    
     <div className='test'>     

     
        <Form  className='formsalarie' onSubmit={this.onSubmit}>

            <InputGroup className="mb-3">
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                    <i className="icon-user"></i>
                    </InputGroupText>
                </InputGroupAddon>
                <Input type="text" placeholder="User Name" autoComplete="username" 
                    className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.username
                    })}
                    name='username'
                    value={this.state.username}
                    onChange={this.onChange} 
                />
                {errors.username && (<div className="invalid-feedback">{errors.username}</div>)}
            </InputGroup>

            <InputGroup className="mb-3">
                <InputGroupAddon addonType="prepend">
                <InputGroupText>@</InputGroupText>
                </InputGroupAddon>
                <Input type="text" placeholder="Email" autoComplete="email" 
                    className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.email
                            })}
                    name='email'
                    value={this.state.email}
                    onChange={this.onChange} 
                />
                {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
            </InputGroup>

            <InputGroup className="mb-3">
                <InputGroupAddon addonType="prepend">
                <InputGroupText>
                    <i className="icon-lock"></i>
                </InputGroupText>
                </InputGroupAddon>
                <Input type="password" placeholder="Password" autoComplete="new-password"


                                                                                
                        className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.password
                        })}

                name='password'
                value={this.state.password}
                onChange={this.onChange}
                />
                {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
            </InputGroup>
          <Button  className='testbt' color="success" block >Créer  Compte</Button>
            </Form>
       </div>
    
    
    );
  }
}


export default withRouter (Register);