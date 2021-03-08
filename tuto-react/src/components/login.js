import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import classnames from 'classnames'
import axios from "axios";
import { Link,withRouter} from "react-router-dom";
let history = useHistory();
class Login extends Component {



  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    };



    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  };

  onSubmit(e) {
    e.preventDefault();

    const user = {

      email: this.state.email,
      password: this.state.password,

    };
  
    axios
      .post("http://localhost:5000/login", user)
      .then(response=>{
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        const decoded = jwt_decode(token);
        localStorage.setItem('user_data', JSON.stringify(decoded) )
        if (response.status == 200) {
          console.log(response.data)
          
           this.props.history.push('/weather')
      }
      })
      
        .catch(err => console.log(err)));

    }

  

  render() {
    const { errors } = this.state;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>

                    <Form onSubmit={this.onSubmit}>


                      <h1>Connexion</h1>
                      <p className="text-muted">Connectez-vous à votre compte</p>


                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Adresse Email" autoComplete="email"

                          className={classnames('form-control form-control-lg', {
                            'is-invalid': errors.email
                          })}


                          name='email'
                          value={this.state.email}
                          onChange={this.onChange}



                        />
                        {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                      </InputGroup>





                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="mots de passe" autoComplete="current-password"


                          className={classnames('form-control form-control-lg', {
                            'is-invalid': errors.password
                          })}



                          name='password'
                          value={this.state.password}
                          onChange={this.onChange}


                        />

                        {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4">Connexion</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withRouter (Login);