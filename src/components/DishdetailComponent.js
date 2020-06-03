import React, {Component} from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, 
         Breadcrumb, BreadcrumbItem,  Button, Modal, ModalHeader, ModalBody,
         Label, Input, Form, FormGroup, Col,  Row } 
        from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

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
        //alert(" Current State is :" +JSON.stringify(values));
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
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
                        <Control.text model=".author" id="author" name="author"
                             placeholder="Your Name"
                             className="form-control"
                             validators={{
                             required, minLength: minLength(3), maxLength: maxLength(15)
                              }}
                        />
                         <Errors
                             className="text-danger"
                                model=".author"
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
            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Card>
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
            </FadeTransform>
        );
    }

    function RenderComments({comments, postComment, dishId}) {
        var commentList = comments.map(comment => {
            return (
                <Stagger in>
                        {comments.map((comment) => {
                            return (
                                <Fade in>
                                <li key={comment.id}>
                                <p>{comment.comment}</p>
                                <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                </li>
                                </Fade>
                            );
                        })}
                </Stagger>
            );
        });

        return (
            <div>
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {commentList}
                </ul>
                <ul>
                <CommentForm dishId={dishId} postComment={postComment}/>
                </ul>
            </div>
        );
    }

    const DishDetail = (props) => {
        if(props.isLoading){
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if(props.errMess){
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }

        else if (props.dish !=null) {
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
                        <RenderComments comments={props.comments} 
                        postComment = {props.postComment}
                        dishId ={props.dish.id}
                        />
                        
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