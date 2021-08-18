import styled from "styled-components";
import { useEffect, useRef } from "react"
import { Field } from "formik"



var stylingObject = {
  input: {
    display: "flex",
    color: "black",
    fontFamily: "'Libre Baskerville', serif",
    fontSize: "22px",
    borderRadius: "20px",
    background: "rgba(0, 255, 255, 0.5)",
    textAlign: "center",
    width: "50%",
    borderBottom: "5px dotted red",
    border: "none",
    outline: "none",
    height: "30px"
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
