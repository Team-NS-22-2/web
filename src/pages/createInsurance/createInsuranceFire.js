import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, {useEffect, useState} from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { calculate_fire_premium, nav_create_insurance_list } from '../../utils/url';
import Modal from 'react-bootstrap/Modal';
import {baseAxios, tokenAxios} from "../../utils/cust-axios";
import {getBuildingTypeFromCheckedForm} from "../../utils/convert-values";
import { create_fire_insurance } from '../../utils/url';
import {handleError} from "../../utils/exception/global-exception-handler";

export default function CreateInsuranceFire() {
    const navigate = useNavigate();

    const [dto, setDto] = useState(Object)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [premium,setPremium] = useState(0);
    const [guaranteeList, setGuaranteeList] = useState([]);
    const [fireDatailList, setFireDetailList] = useState([]);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();

        const standardPremiumDto = {
            damageAmount : form.damageAmount.value,
            countContract : form.countContract.value,
            businessExpense : form.businessExpense.value,
            profitMargin : form.profitMargin.value
        };

        const fireDetailDto = {
            targetBuildingType : getBuildingTypeFromCheckedForm(form.buildingType),
            colleteralAmountCriterion: form.collateralAmountCriterion.value
        }

        const insuranceBasicInfoDto = {
            name : form.insuranceName.value,
            description : form.description.value,
            contractPeriod : form.contractPeriod.value,
            paymentPeriod : form.paymentPeriod.value
        };

        const guaranteeDtoList = {
            name : form.guaranteeName.value,
            description : form.guaranteeDescription.value,
            amount : form.amount.value
        };

        const FireDetailDtoList = {
            targetBuildingType : getBuildingTypeFromCheckedForm(form.buildingType),
            collateralAmountCriterion : form.collateralAmountCriterion.value
        };

        let map = Object.keys(standardPremiumDto).map(key =>  standardPremiumDto[key]);
            let riskCount= 0;
            map.forEach(v => {
                if (v === true) {
                    riskCount++;
                }
            })

        let map2 = Object.keys(fireDetailDto).map(key =>  fireDetailDto[key]);
            let count= 0;
            map2.forEach(v => {
                if (v === true) {
                    count++;
                }
            })

            let map3 = Object.keys(insuranceBasicInfoDto).map(key =>  insuranceBasicInfoDto[key]);
            let count1= 0;
            map3.forEach(v => {
                if (v === true) {
                    count1++;
                }
            })

        let map4 = Object.keys(guaranteeDtoList).map(key =>  guaranteeDtoList[key]);
            let count2= 0;
            map4.forEach(v => {
                if (v === true) {
                    count2++;
                }
            })

            let map5 = Object.keys(FireDetailDtoList).map(key =>  FireDetailDtoList[key]);
            let Rcount= 0;
            map5.forEach(v => {
                if (v === true) {
                    Rcount++;
                }
            })

            setDto({
                standardPremiumDto,fireDetailDto
            })

            tokenAxios().post(calculate_fire_premium()
            ,{
                standardPremiumDto:dto.standardPremiumDto,
                fireDetailDto:dto.fireDetailDto
            }
            ).then(response => {
            setPremium(response.data.premium);
            handleShow();
            setDto({
                insuranceBasicInfoDto, guaranteeDtoList, FireDetailDtoList
            })
            setGuaranteeList([guaranteeDtoList]);
            setFireDetailList([FireDetailDtoList]);
            }).catch(err => handleError(err));
    }

    const handleRegister = (event) => {
        const form = event.currentTarget;
        event.preventDefault();

        
            tokenAxios().post(create_fire_insurance()
            ,{
                insuranceBasicInfoDto:dto.insuranceBasicInfoDto ,
                guaranteeDtoList:guaranteeList,
                fireDetailDtoList:fireDatailList
            }
            ).then ( () =>
                navigate(nav_create_insurance_list())
            ).catch(err => handleError(err))

    }

    return(
        <div>
            <Container>
            <h4 className={"mb-3 mt-3"}>???????????? ?????? ??????</h4>
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationCustomUsername">
                        <Form.Label>?????? ??????</Form.Label>
                            <Form.Control
                                type="text"
                                name={"insuranceName"}
                                placeholder="?????? ??????"
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                ????????? ????????? ??????????????????.
                            </Form.Control.Feedback>

                    </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustomUsername">
                    <Form.Label>?????? ??????</Form.Label>
                    <Form.Control
                        type="text"
                        name={"description"}
                        placeholder="?????? ??????"
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        ?????? ????????? ??????????????????.
                    </Form.Control.Feedback>
                </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationCustomUsername">
                        <Form.Label>????????????</Form.Label>
                            <Form.Control
                                type="number"
                                name={"contractPeriod"}
                                placeholder="????????????"
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                ???????????? ?????? ????????? ?????? ??????????????????
                            </Form.Control.Feedback>

                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validationCustomUsername">
                        <Form.Label>????????????</Form.Label>

                            <Form.Control
                                type="number"
                                name={"paymentPeriod"}
                                placeholder="????????????"
                                aria-describedby="inputGroupPrepend"
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                ???????????? ?????? ????????? ?????? ??????????????????
                            </Form.Control.Feedback>

                    </Form.Group>
                </Row>
                <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustomUsername">
                        <Form.Label>?????? ??????</Form.Label>
                            <Form.Control
                                type="text"
                                name={"guaranteeName"}
                                placeholder="?????? ??????"
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                ????????? ????????? ??????????????????.
                            </Form.Control.Feedback>

                    </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustomUsername">
                    <Form.Label>?????? ??????</Form.Label>
                    <Form.Control
                        type="text"
                        name={"guaranteeDescription"}
                        placeholder="?????? ??????"
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        ?????? ????????? ??????????????????.
                    </Form.Control.Feedback>
                </Form.Group>
                </Row>
                <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustomUsername">
                        <Form.Label>Amount</Form.Label>

                            <Form.Control
                                type="number"
                                name={"amount"}
                                placeholder="Amount"
                                aria-describedby="inputGroupPrepend"
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Amount ?????? ????????? ?????? ??????????????????
                            </Form.Control.Feedback>

                    </Form.Group>
                
                </Row>
                <Row className="mb-3">
                <Form.Group className={"mb-3"}>
                    <div>
                        <Form.Label>?????? ????????????</Form.Label>
                    </div>
                    <Form.Check inline label="?????????" name="buildingType" type='radio' required/>
                    <Form.Check inline label="?????????" name="buildingType" type='radio' required/>
                    <Form.Check inline label="?????????" name="buildingType" type='radio' required/>
                    <Form.Check inline label="?????????" name="buildingType" type='radio' required/>
                    <Form.Control.Feedback type="invalid">
                        ?????? ?????? ????????? ??????????????????
                    </Form.Control.Feedback>
                </Form.Group>
                </Row>
                <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustomUsername">
                        <Form.Label>collateralAmountCriterion</Form.Label>

                            <Form.Control
                                type="number"
                                name={"collateralAmountCriterion"}
                                placeholder="collateralAmountCriterion"
                                aria-describedby="inputGroupPrepend"
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Amount ?????? ????????? ?????? ??????????????????
                            </Form.Control.Feedback>

                    </Form.Group>
                
                </Row>
                <hr></hr>
                <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustomUsername">
                        <Form.Label>???????????????</Form.Label>

                            <Form.Control
                                type="number"
                                name={"damageAmount"}
                                placeholder="???????????????"
                                aria-describedby="inputGroupPrepend"
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                ??????????????? ?????? ????????? ?????? ??????????????????
                            </Form.Control.Feedback>

                    </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustomUsername">
                        <Form.Label>????????????</Form.Label>

                            <Form.Control
                                type="number"
                                name={"countContract"}
                                placeholder="????????????"
                                aria-describedby="inputGroupPrepend"
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                ???????????? ?????? ????????? ?????? ??????????????????
                            </Form.Control.Feedback>

                    </Form.Group>
                </Row>
                <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustomUsername">
                        <Form.Label>?????????</Form.Label>

                            <Form.Control
                                type="number"
                                name={"businessExpense"}
                                placeholder="?????????"
                                aria-describedby="inputGroupPrepend"
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                ????????? ?????? ????????? ?????? ??????????????????
                            </Form.Control.Feedback>

                    </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustomUsername">
                        <Form.Label>?????????(%)</Form.Label>

                            <Form.Control
                                type="number"
                                name={"profitMargin"}
                                placeholder="?????????"
                                aria-describedby="inputGroupPrepend"
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                ????????? ????????? ?????? ??????????????????
                            </Form.Control.Feedback>

                    </Form.Group>
                </Row>
                <div className={"flex_box flex_box_end"}>
                    <Button type="submit">????????? ??????</Button>
                    <Button type="button" variant={"danger"} onClick={() => navigate(nav_create_insurance_list())}>????????????</Button>
                    
                </div>
            </Form>
            <Modal show={show} onHide={handleClose}
               backdrop="static"
               keyboard={false}
        >
            <Modal.Header closeButton>
            <Modal.Title>????????? ??????</Modal.Title>
            </Modal.Header>
            <Modal.Body> ???????????? {premium}??? ?????????. </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    ??????
                </Button>
                <Button variant="primary" onClick={handleRegister}>
                    ??????
                </Button>
            </Modal.Footer>
        </Modal>
            </Container>
        </div>
    );
}