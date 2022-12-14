import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {useLocation, useNavigate} from "react-router-dom";
import {Container} from "react-bootstrap";
import {car_no_pattern} from "../../utils/reg-pattern";
import {getCarTypeFromCheckedForm} from "../../utils/convert-values";
import {baseAxios} from "../../utils/cust-axios";
import PremiumModal from "../../component/premium_modal";
import {inquire_car, nav_signup_user} from "../../utils/url";
import {handleError} from "../../utils/exception/global-exception-handler";

export default function ContractCarInfoPage() {
    const [validated, setValidated] = useState(false);

    const [customerDto, setCustomerDto] = useState(Object);
    const [carContractDto, setCarContractDto] = useState(Object);
    const [id,setId] = useState();
    const [premium,setPremium] = useState(0);
    const [premiumModalShow, setPremiumModalShow] = useState(false);
    const  [type ,setType] = useState();
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (location.state.customerDto !== undefined) {
            setCustomerDto(location.state.customerDto);
            setId(location.state.id);
            setType(location.state.type);
        }
    }, [])

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();

        if (form.checkValidity() === false) {
            event.stopPropagation();
        }else{

            const contractDto = {
                value : form.value.value,
                modelName : form.modelName.value,
                modelYear : form.modelYear.value,
                carNo : form.carNo.value,
                carType : getCarTypeFromCheckedForm(form.car_type)
            }

            baseAxios().post(inquire_car(id),{
                    ssn:customerDto.ssn,
                    value: contractDto.value
            })
                .then(response => {
                    setPremium(response.data.premium);
                    setPremiumModalShow(true);
                    contractDto.premium = response.data.premium;
                    setCarContractDto(contractDto);
                }).catch(err =>  handleError(err));

        }


        setValidated(true);

    };

    const moveToSignUpPage = () => {
        navigate(nav_signup_user(),{
            state : {
                customerDto,
                contractDto : carContractDto,
                id,
                type,
                mode : location.state.mode
            },
            replace : true
        })
    }

    return (
        <Container className={"w-75"}>
            <h4 className={"mb-3 mt-3"}>??????????????? ?????? ??????</h4>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className={"mb-3"}>
                        <Form.Label>??????</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="??????"
                            pattern="^[???-???]{2,6}"
                        />
                        <Form.Control.Feedback>?????? ???????????????!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            ????????? ???????????? ????????? ??????????????????
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className={"mb-3"}>
                        <Form.Label>????????????</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                type="text"
                                placeholder="?????? ??????"
                                name={"carNo"}
                                pattern = {car_no_pattern}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                ?????? ?????? ?????? ????????? ?????? ??????????????????
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>


                    <Form.Group className={"mb-3"}>
                        <Form.Label>????????????</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                type="number"
                                placeholder="????????????"
                                aria-describedby="inputGroupPrepend"
                                required
                                name={"value"}
                            />
                            <Form.Control.Feedback type="invalid">
                                ?????? ?????? ?????? ????????? ?????? ??????????????????
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                <Form.Group className={"mb-3"}>
                    <div>
                    <Form.Label>??????</Form.Label>
                    </div>
                    <Form.Check required inline  label="??????"  name="car_type" type='radio'/>
                    <Form.Check required inline label="??????" name="car_type" type='radio'/>
                    <Form.Check required inline label="?????????" name="car_type" type='radio'/>
                    <Form.Check required inline label="??????" name="car_type" type='radio'/>
                    <Form.Check required inline label="?????????" name="car_type" type='radio'/>
                    <Form.Check required inline label="??????" name="car_type" type='radio'/>
                    <Form.Check required inline label="????????????" name="car_type" type='radio'/>
                    <Form.Control.Feedback type="invalid">
                        ????????? ????????? ?????????
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className={"mb-3"}>
                    <Form.Label>?????? ??????</Form.Label>
                    <Form.Control
                        name="modelName"
                        type="text"
                        placeholder="?????? ??????"
                        aria-describedby="inputGroupPrepend"
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        ???????????? ????????? ?????? ?????????
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className={"mb-3"}>
                    <Form.Label>??????</Form.Label>
                    <Form.Control
                        type="number"
                        name={"modelYear"}
                        placeholder="??????"
                        aria-describedby="inputGroupPrepend"
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        ???????????? ????????? ?????? ?????????
                    </Form.Control.Feedback>
                </Form.Group>
                <div className={"flex_box flex_box_end"}>
                    <Button type="button" variant={"danger"}>????????????</Button>
                    <Button type="submit">??????</Button>
                </div>
            </Form>
            <PremiumModal _show={premiumModalShow} _setShow ={setPremiumModalShow}
                          _signUp={moveToSignUpPage} _premium={premium}
            />
        </Container>
    );
}
