import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {Container} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";
import {baseAxios} from "../../utils/cust-axios";
import PremiumModal from "../../component/premium_modal";
import {inquire_health, nav_insurance, nav_signup_user} from "../../utils/url";
import {handleError} from "../../utils/exception/global-exception-handler";

export default function ContractHealthInfoPage() {
    const [validated, setValidated] = useState(false);
    const [id,setId] = useState();
    const [customerDto, setCustomerDto] = useState(Object);
    const [healthContractDto, setHealthContractDto] = useState(Object);
    const [checkedDisease, setCheckedDisease] = useState(true)
    const [premium,setPremium] = useState(0);
    const [premiumModalShow, setPremiumModalShow] = useState(false);
    const [type,setType]=useState();
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (location.state.customerDto !== undefined) {
            setCustomerDto(location.state.customerDto);
            setId(location.state.id);
            setType(location.state.type);
        }
    }, [])

    const moveBack = () =>{
        navigate(nav_insurance(),{
            replace : true,
            state : {
                mode : location.state.mode
            }
        })
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();

        }else{
            const contractInfo = {
                height : form.height.value,
                weight : form.weight.value,
                isDrinking : form.isDrinking[0].checked,
                isSmoking : form.isSmoking[0].checked,
                isDriving : form.isDriving[0].checked,
                isDangerActivity: form.isDangerActivity[0].checked,
                isHavingDisease : form.isHavingDisease[0].checked,
                isTakingDrug : form.isTakingDrug[0].checked,
                diseaseDetail : form.diseaseDetail.value
            };



            let map = Object.keys(contractInfo).map(key =>  contractInfo[key]);
            let riskCount= 0;
            map.forEach(v => {
                if (v === true) {
                    riskCount++;
                }
            })
            baseAxios().post(inquire_health(id),{
                ssn:customerDto.ssn,
                riskCount: riskCount
            })
                .then(response => {
                    setPremium(response.data.premium);
                    setPremiumModalShow(true);
                    contractInfo.premium = response.data.premium;
                    setHealthContractDto(contractInfo);
                }).catch(err =>  handleError(err));
        }
        setValidated(true);
    };

    const moveToSignUpPage = () => {
        navigate(nav_signup_user(),{
            state : {
                customerDto,
                contractDto : healthContractDto,
                id,
                type,
                mode : location.state.mode
            },
            replace : true
        })
    }


    return (
        <Container className={"w-75"}>
            <h4 className={"mb-3 mt-3"}>???????????? ?????? ??????</h4>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationCustomUsername">
                        <Form.Label>???</Form.Label>
                            <Form.Control
                                type="number"
                                name={"height"}
                                placeholder="???"
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                ??? ?????? ????????? ?????? ??????????????????
                            </Form.Control.Feedback>

                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validationCustomUsername">
                        <Form.Label>?????????</Form.Label>

                            <Form.Control
                                type="number"
                                name={"weight"}
                                placeholder="?????????"
                                aria-describedby="inputGroupPrepend"
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                ????????? ?????? ????????? ?????? ??????????????????
                            </Form.Control.Feedback>

                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                        <Form.Label>??????</Form.Label>
                        <Form.Check
                            inline
                            label="???"
                            name="isSmoking"
                            type='radio'
                            id={`inline-1`}
                            required
                        />
                        <Form.Check
                            inline
                            label="?????????"
                            name="isSmoking"
                            type='radio'
                            id={`inline-2`}
                            required
                        />

                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                        <Form.Label>??????</Form.Label>

                        <Form.Check
                            inline
                            label="???"
                            name="isDrinking"
                            type='radio'
                            id={`inline-1`}
                            required
                        />
                        <Form.Check
                            inline
                            label="?????????"
                            name="isDrinking"
                            type='radio'
                            id={`inline-2`}
                            required
                        />

                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                        <Form.Label>?????????, ???????????? ??????</Form.Label>
                        <Form.Check
                            inline
                            label="???"
                            name="isDriving"
                            type='radio'
                            id={`inline-1`}
                            required
                        />
                        <Form.Check
                            inline
                            label="?????????"
                            name="isDriving"
                            type='radio'
                            id={`inline-2`}
                            required
                        />

                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                        <Form.Label>?????? ???????????? ??? ????????? ??????</Form.Label>

                        <Form.Check
                            inline
                            label="???"
                            name="isDangerActivity"
                            type='radio'
                            id={`inline-1`}
                            required
                        />
                        <Form.Check
                            inline
                            label="?????????"
                            name="isDangerActivity"
                            type='radio'
                            id={`inline-2`}
                            required
                        />

                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                        <Form.Label>????????????</Form.Label>

                        <Form.Check
                            inline
                            label="???"
                            name="isTakingDrug"
                            type='radio'
                            id={`inline-5`}
                            required
                        />
                        <Form.Check
                            inline
                            label="?????????"
                            name="isTakingDrug"
                            type='radio'
                            id={`inline-2`}
                            required
                        />

                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                        <Form.Label>?????? ??????</Form.Label>

                        <Form.Check
                            inline
                            label="???"
                            name="isHavingDisease"
                            type='radio'
                            id={`inline-1`}
                            required
                            onClick={() => setCheckedDisease(false)}
                        />
                        <Form.Check
                            inline
                            label="?????????"
                            name="isHavingDisease"
                            type='radio'
                            id={`inline-2`}
                            required
                            onClick={() => setCheckedDisease(true)}
                        />

                    </Form.Group>
                </Row>
                <Form.Group className={"mb-3"}>
                    <Form.Label>?????? ??????</Form.Label>
                    <Form.Control
                        type="text"
                        name="diseaseDetail"
                        placeholder="?????? ??????"
                        aria-describedby="inputGroupPrepend"
                        disabled={checkedDisease}
                    />
                    <Form.Control.Feedback type="invalid">
                        ????????? ?????? ?????????
                    </Form.Control.Feedback>
                </Form.Group>

                <div className={"flex_box flex_box_end"}>
                    <Button onClick={moveBack} type="button" variant={"danger"}>????????????</Button>
                    <Button type="submit">??????</Button>
                </div>
            </Form>
            <PremiumModal _show={premiumModalShow} _setShow ={setPremiumModalShow}
                          _signUp={moveToSignUpPage} _premium={premium}
            />
        </Container>
    );
}
