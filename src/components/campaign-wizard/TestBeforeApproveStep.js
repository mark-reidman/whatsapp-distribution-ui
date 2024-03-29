import React, { useContext, useEffect, useRef } from "react";
import {WizardContext, actionTypes} from './WizardContext.js'
import {OrderService} from '../../services/OrderService.js'
import { phoneNumberCorrection } from './utils.js'

// reactstrap components
import {
    Button,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col,
    Spinner
} from "reactstrap";


const TestBeforeApproveStep = () => {

    const [state, dispatch] = useContext(WizardContext);
    const [isSendInProgress, setIsSendInProgress] = React.useState(false);
    const [didSendTestMessage, setDidSendTestMessage] = React.useState(false);
    const [numOne, setNumOne] = React.useState("");
    const [numOneName, setNumOneName] = React.useState("");
    
    const [isNumOneValid, setIsNumOneValid] = React.useState(false);
    // const [numTwo, setNumTwo] = React.useState("");
    // const [numThree, setNumThree] = React.useState("");

    const orderService = new OrderService()
    
    const updateNumOne = (e) => {
        let phoneNumber = phoneNumberCorrection(e.target.value);
        if (phoneNumber !== "") {
            setNumOne(phoneNumber);
            setIsNumOneValid(true);
        }
        else {
            phoneNumber = e.target.value
            setNumOne(e.target.value);
            setIsNumOneValid(false);
        }
        dispatch({type: actionTypes.setCampaignTestNumberOne, payload: phoneNumber });
    }

    const updateNumOneName = (e) => {
        setNumOneName(e.target.value);
        dispatch({type: actionTypes.setCampaignTestNumberOneName, payload: e.target.value });
    }

    // const updateNumTwo = (e) => {
    //     setNumTwo(e.target.value);
    //     dispatch({type: actionTypes.setCampaignTestNumberTwo, payload: e.target.value });
    // }

    // const updateNumThree = (e) => {
    //     setNumThree(e.target.value);
    //     dispatch({type: actionTypes.setCampaignTestNumberThree, payload: e.target.value });
    // }

    useEffect(() => {
        let phoneNumber = phoneNumberCorrection(state.campaignTestNumberOne);
        if (phoneNumber !== "") {
            setNumOne(phoneNumber);
            setIsNumOneValid(true);
        }
        else {
            setNumOne(state.campaignTestNumberOne);
            setIsNumOneValid(false);
        }
        // setNumTwo(state.campaignTestNumberTwo);
        // setNumThree(state.campaignTestNumberThree);
        
      })

    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const sendTestMessage = () => {
        setIsSendInProgress(true);
        orderService.sendTestMessage(state).then((res) => {
            setIsSendInProgress(false);
            if(res.data == true){
                setDidSendTestMessage(true);
                sleep(30000).then(() => {
                    setDidSendTestMessage(false);
                });
            }
            else {
                setDidSendTestMessage(false);
            }
        });
        
    }

    return (
        <>
            <Form
                className="p-3"
                id="contact-form-3"
                method="post"
                role="form"
            >
                <h3 className="align-center">נא בחר מספר לשליחת הודעת בדיקה</h3>
                <Row>
                    <Col md="4">
                        {/* <FormGroup >
                            <label>מספר שלישי</label>
                            <FormGroup>
                                <InputGroup className="mb-4">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="fab fa-whatsapp"></i>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder=""
                                        value={numThree}
                                        onChange={updateNumThree}
                                        type="number"
                                    ></Input>
                                </InputGroup>
                            </FormGroup>
                        </FormGroup> */}
                    </Col>
                    <Col md="4">
                        <FormGroup >
                            {/* <label>מספר שני</label>
                            <FormGroup>
                                <InputGroup className="mb-4">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="fab fa-whatsapp"></i>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder=""
                                        value={numTwo}
                                        onChange={updateNumTwo}
                                        type="number"
                                    ></Input>
                                </InputGroup>
                            </FormGroup> */}
                        </FormGroup>
                    </Col>
                    <Col md="4">
                        <FormGroup >
                            <label>מספר ראשון</label>
                            <FormGroup>
                                <InputGroup className="mb-4">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="fab fa-whatsapp"></i>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder=""
                                        value={numOne}
                                        onChange={updateNumOne}
                                        type="number"
                                    ></Input>
                                </InputGroup>
                            </FormGroup>
                        </FormGroup>
                        <FormGroup >
                            <label>שם הלקוח</label>
                            <FormGroup>
 
                                <Input
                                    placeholder=""
                                    value={numOneName}
                                    onChange={updateNumOneName}
                                    type="text"
                                ></Input>
                                
                            </FormGroup>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md="4"></Col>
                    <Col md="4">
                        
                    </Col>
                    <Col md="4" className="align-center">
                        <Button
                            className="btn-icon"
                            color="success"
                            type="button"
                            disabled={!isNumOneValid || isSendInProgress|| didSendTestMessage }
                            onClick={sendTestMessage}
                        >
                            {isSendInProgress ? <Spinner color="" type="grow" size="sm"></Spinner> : <></>}
                            {!isSendInProgress && didSendTestMessage ? "הודעה נשלחה, יש להמתין 30 שניות" : ""}
                            {!isSendInProgress && !didSendTestMessage ?
                                <>
                                    <span className="btn-inner--icon">
                                        <i className="fab fa-whatsapp"></i>
                                    </span>
                                    <span className="btn-inner--text">שלח הודעות בדיקה</span>
                                </>
                                : <></>}                            
                        </Button>
                    </Col>
                </Row>

            </Form>
        </>
    );
}

export default TestBeforeApproveStep;
