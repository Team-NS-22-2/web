import {Form} from "react-bootstrap";
import React from "react";

export default function CustomFormTextGroup  ({_name, _pattern, _errorMessage, _value, _setValue, _placeholder,
     _block,
_label} ){
    return <Form.Group className={"mb-3 mt-3"}>
        {_label === undefined ? null : <Form.Label>{_label}</Form.Label>}
        <Form.Control
            value={_value}
            onChange={(event) => _setValue(event.target.value)}
            name={_name}
            required
            type="text"
            disabled={_block}
            placeholder= {_placeholder !== undefined ? _placeholder : _name}
            pattern= {_pattern}
        />
        <Form.Control.Feedback>사용 가능합니다!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
            {_errorMessage}
        </Form.Control.Feedback>
    </Form.Group>;
}