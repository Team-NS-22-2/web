import {Form} from "react-bootstrap";
import Header from "./header";

export default function UserForm({validated, handleSubmit, button_message}){
    return (
<>

        <div className={"flex_box flex_box_center"}>
            <div className="form-signin">
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Header _content={button_message}/>
                    <Form.Group className={"mb-3"}>
                        <Form.Control
                            required
                            name="loginId"
                            type="text"
                            placeholder="Login Id"

                        />
                        <Form.Control.Feedback>사용가능합니다</Form.Control.Feedback>
                        <Form.Control.Feedback type={"invalid"}>아이디를 입력해 주세요</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className={"mb-3"}>
                        <Form.Control
                            required
                            name="password"
                            type="password"
                            placeholder="Login password"
                        />
                        <Form.Control.Feedback>사용가능합니다</Form.Control.Feedback>
                        <Form.Control.Feedback type={"invalid"}>비밀번호를 입력해 주세요</Form.Control.Feedback>
                    </Form.Group>
                    <button type="submit" className="w-100 btn btn-primary">{button_message}</button>
                </Form>
            </div>
        </div>
</>
    )
}