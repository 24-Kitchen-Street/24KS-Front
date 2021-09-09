import styled from "styled-components";
import { useEffect, useRef } from "react"
import { Field } from "formik"



var stylingObject = {
  input: {
    // display: "flex",
    color: "black",
    fontFamily: "'Libre Baskerville', serif",
    fontSize: "22px",
    borderRadius: "10px",
    background: "#fbedfe",
    textAlign: "center",
    // width: "50%",
    border: "none",
    outline: "none",
    height: "30px",
    zIndex: "99999999999"
  },
}

export function TextField({ autoFocus, name, type = "text" }) {
  const textbox = useRef(null)

  useEffect(() => {
    if (autoFocus) {
      textbox.current.focus()
    }
  }, [autoFocus])

  return <Field style={stylingObject.input} type={type} name={name} innerRef={textbox} />
}
