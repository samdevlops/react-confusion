import React, {Component} from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle,  Breadcrumb, BreadcrumbItem,  Button, Modal, ModalHeader, ModalBody, Label, Input, Form, FormGroup, Col,  Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state={
            isNavOpen:false,
            isModalOpen: false
        };
       
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        console.log(" Current State is :" +JSON.stringify(values));
        alert(" Current State is :" +JSON.stringify(values));
    }

   

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleLogin(event){
        this.toggleModal();
        alert("Username :"+this.username.value + "Paasword :"+this.password.value +"Remember :"+this.remember.checked);
        event.preventDefault();
    }

    render(){
        return(
            <React.Fragment>
                    <div className="container">
                       <Button outline onClick={this.toggleModal}>
                            <span className="fa fa-pencil fa-lg"> </span> Submit Comment
                        </Button>   
                    </div>
          
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} >
                <ModalHeader toggle={this.toggleModal} >Submit Comment</ModalHeader>
                <ModalBody>
                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                <Row className="form-group">
                    <Label htmlFor="comment" md={12} >Rating</Label>
                </Row>
                <Row className="form-group">
                   <Col md={12}>
                    <Input md={12} type="select" name="rating" id="rating">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                         <option>4</option>
                         <option>5</option>
                    </Input>
                    </Col>
                </Row>
                <Row className="form-group">
                    <Label htmlFor="author" md={12}>Your Name</Label>
                </Row>
                <Row className="form-group">
                    
                    <Col md={12}>
                        <Control.text model=".firstname" id="firstname" name="firstname"
                             placeholder="Your Name"
                             className="form-control"
                             validators={{
                             required, minLength: minLength(3), maxLength: maxLength(15)
                              }}
                        />
                         <Errors
                             className="text-danger"
                                model=".firstname"
                                 show="touched"
                                 messages={{
                                  required: 'Required',
                                  minLength: 'Must be greater than 2 characters',
                                   maxLength: 'Must be 15 characters or less'
                             }}
                         />
                     </Col>
                </Row>
                <Row className="form-group">
                    <Label htmlFor="comment" md={12} >Comment</Label>
                </Row>
                <Row className="form-group">
                    
                    <Col md={12}>
                        <Control.textarea model=".comment" id="comment" name="comment" 
                        rows="6" 
                        className="form-control"/>
                    </Col>
                </Row>
                <Button type="submit" md={{size:8, offset:2}} color="primary">
                    Submit
                </Button>
          
            </LocalForm>
                </ModalBody>
            </Modal>
            </React.Fragment>
        );
    }
}


   function  RenderDish({dish}) {
        return (
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    }

    function RenderComments({comments}) {
        var commentList = comments.map(comment => {
            return (
                <li key={comment.id} >
                    {comment.comment}
                    <br /><br />
                    -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}
                    <br /><br />
                </li>
            );
        });

        return (
            <div>
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {commentList}
                </ul>
                <ul>
                <CommentForm/>
                </ul>
            </div>
        );
    }

    const DishDetail = (props) => {
        if (props.dish !=null) {
            return (
                <div className="container">
                <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments} />
                        
                    </div>
                </div>
                </div>
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }


export default DishDetail;