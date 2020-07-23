import React, {Component, useCallback} from 'react';
import {Card, CardBody, CardTitle, CardText, CardImg, Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody,Label,Row,Col, Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { postComment } from '../redux/ActionCreators';
import {Loading } from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';
import {FadeTransform, Fade, Stagger } from 'react-animation-components';


    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const minLength = (len) => (val) => val && (val.length >= len);

    class CommentForm extends Component{

        constructor(props){
            super(props);
            this.state={
                isModalOpen: false,
            };
            this.toggleModal=this.toggleModal.bind(this);
            this.handleSubmit=this.handleSubmit.bind(this);
        }

        handleSubmit(values){
            
            this.props.postComment(this.props.dishId, values.rating, values.name, values.comment);
    
        }

        toggleModal(){
            this.setState({
                isModalOpen : !this.state.isModalOpen,
            });
        }

        render(){
            return(

                <div>
                <Button outline onClick={this.toggleModal} color="primary"> Submit Comment
                </Button>
                
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}> Submit Comment </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" xs={12}>Rating</Label>
                                <Col xs={12}>
                                <Control.select model=".rating" name="rating" id="rating" className="form-control col-12">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="name" xs={12}>Your name</Label>
                                <Col xs={12}>
                                    <Control.text model=".name" name="name" id="name" className="form-control"
                                    validators={{
                                        required, minLength: minLength(2), maxLength: maxLength(15)
                                    }}/>
                                <Errors
                                    className="text-danger"
                                    model=".name"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}/>
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="comment" xs={12}>Comment</Label>
                                <Col xs={12}>
                                    <Control.textarea model=".comment" name="comment" id="comment" rows="6" className="form-control"/>
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Col xs={12}>
                                    <Button type="submit" color="primary">Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>

                    </ModalBody>
                </Modal>
                </div>
            );
        }
        
    }

    function RenderDish({dish})
    {
        return(
            <div className="col-12 col-md-5 m-1">
                <FadeTransform in
                    transformProps={{
                        exitTransform: 'scale(0.5) translateY(-50%)'
                    }}>
                    <Card>
                        <CardImg width="100%" src={baseUrl+dish.image} alt={dish.name}/>
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </FadeTransform>
            </div>
        );
    }

    function RenderComments({comments, postComment, dishId}){
        
       
        const commentVar=comments.map((comments)=> {
            return(
                <Fade in>
                <li key= {comments.id} className="list-unstyled">
                    <p>{comments.comment}</p>
                    <p> --{comments.author},
                    &nbsp; {new Intl.DateTimeFormat('en-US', {year:'numeric', month:'short', day:'2-digit'}).format(new Date(Date.parse(comments.date)))}</p>
                </li>
                </Fade>
               
            );
        }
        
        );

        return(
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
            <Stagger in>

                {commentVar}
                </Stagger>
                <CommentForm dishId={dishId} postComment={postComment} />
            </div>
        );
    }

    function DishDetail(props)
    {
        if(props.isLoading){
            return(
                <div className="container">
                    <div className="row">
                        <Loading/>
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
            )
        }
        else
        if(props.dish!=null){
            return(
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                        <BreadcrumbItem><Link to = "/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to = "/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr/>
                        </div>
                    </div>

                    <div className="row">
                        <RenderDish dish = {props.dish}/>
                        <RenderComments comments = {props.comments}
                          postComment={props.postComment}
                          dishId = {props.dish.id}
                        />
                        
                    </div>
                </div>
            );
        }
        else{ 
            return(
                <div></div>
            )
        }
    }

export default DishDetail;