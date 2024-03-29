import React from "react";
// react plugin used to create datetimepicker
import ReactDatetime from "react-datetime";

// reactstrap components
import {
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
} from "reactstrap";

// Core Components

const DateTime = ({value, setValue, initialValue}) => {
  const [focus, setFocus] = React.useState("");
  return (
    <>
      <FormGroup className={focus}>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="ni ni-calendar-grid-58"></i>
            </InputGroupText>
          </InputGroupAddon>
          <ReactDatetime
            value={value}
            initialValue={initialValue}
            initialViewDate={initialValue}
            onChange={(e)=> setValue(new Date(e))}
            inputProps={{
              placeholder: "Date & Time",
              onFocus: () => setFocus("focused"),
              onBlur: () => setFocus(""),
            }}
          />
        </InputGroup>
      </FormGroup>
    </>
  );
}

export default DateTime;
