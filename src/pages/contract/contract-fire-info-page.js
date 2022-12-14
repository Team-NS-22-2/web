import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {useLocation, useNavigate} from "react-router-dom";
import {Container} from "react-bootstrap";
import {getBuildingTypeFromCheckedForm} from "../../utils/convert-values";
import {baseAxios} from "../../utils/cust-axios";
import PremiumModal from "../../component/premium_modal";
import {inquire_fire, nav_signup_user} from "../../utils/url";
import {handleError} from "../../utils/exception/global-exception-handler";

export default function ContractFireInfoPage() {
    const [validated, setValidated] = useState(false);
    const [id, setId] = useState();
    const [customerDto, setCustomerDto] = useState(Object);
    const [fireContractDto, setFireContractDto] = useState(Object);
    const [premium,setPremium] = useState();
    const [premiumModalShow, setPremiumModalShow] = useState(false);
    const [type, setType] = useState();

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
            // return;
        }else{

            const contractDto = {
                isSelfOwned : form.isSelfOwned[0].checked,
                isActualResidence: form.isActualResidence[0].checked,
                buildingArea : form.buildingArea.value,
                collateralAmount : form.collateralAmount.value,
                buildingType : getBuildingTypeFromCheckedForm(form.buildingType)
            }
            baseAxios().post(inquire_fire(id),{
                buildingType: contractDto.buildingType,
                collateralAmount : contractDto.collateralAmount
            }).then(function (response) {
                    setPremium(response.data.premium);
                    setPremiumModalShow(true);
                    contractDto.premium = response.data.premium;
                    setFireContractDto(contractDto);
                })
                .catch(function (error) {
                    handleError(error)
                });
        }
        setValidated(true);
    };

    const moveToSignUpPage = () => {
        navigate(nav_signup_user(),{
            state : {
                customerDto,
                contractDto : fireContractDto,
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
                <Form.Group className={"mb-3"}>
                    <div>
                        <Form.Label>????????????</Form.Label>
                    </div>
                    <Form.Check inline label="???" name="isSelfOwned" type='radio' required/>
                    <Form.Check inline label="?????????" name="isSelfOwned" type='radio' required/>
                </Form.Group>

                <Form.Group className={"mb-3"}>
                    <div>
                        <Form.Label>????????????</Form.Label>
                    </div>
                    <Form.Check inline label="?????????" name="buildingType" type='radio' required/>
                    <Form.Check inline label="?????????" name="buildingType" type='radio' required/>
                    <Form.Check inline label="?????????" name="buildingType" type='radio' required/>
                    <Form.Check inline label="?????????" name="buildingType" type='radio' required/>
                    <Form.Control.Feedback type="invalid">
                        ?????? ????????? ??????????????????
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className={"mb-3"}>
                    <Form.Label>????????????</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="number"
                            placeholder="????????????"
                            aria-describedby="inputGroupPrepend"
                            name = "buildingArea"
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            ???????????? ?????? ????????? ?????? ??????????????????
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>

                <Form.Group className={"mb-3"}>
                    <div>
                        <Form.Label>????????? ??????</Form.Label>
                    </div>
                    <Form.Check inline label="???" name="isActualResidence" type='radio' required/>
                    <Form.Check inline label="?????????" name="isActualResidence" type='radio' required/>
                </Form.Group>
                <Form.Group className={"mb-3"}>
                    <Form.Label>????????????</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="????????????"
                        name={"collateralAmount"}
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
