import React, {Component, useCallback} from 'react';
import {Card, CardBody, CardTitle, CardText, CardImg, Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody,Label,Row,Col, Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';


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
            console.log("Current state is: "+ JSON.stringify(values));
            alert("Current state is: "+ JSON.stringify(values));
            //event.preventDefault();
    
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
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name}/>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }

    function RenderComments({comments}){
        
        const commentVar=comments.map((comments)=> {
            return(
                <li key= {comments.id} className="list-unstyled">
                    <p>{comments.comment}</p>
                    <p> --{comments.author},
                    &nbsp; {new Intl.DateTimeFormat('en-US', {year:'numeric', month:'short', day:'2-digit'}).format(new Date(Date.parse(comments.date)))}</p>
                </li>
               
            );
        }
        );

        return(
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                {commentVar}
                <CommentForm/>
            </div>
        );
    }

    function DishDetail(props)
    {
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
                        <RenderComments comments = {props.comments}/>
                        
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