import { useEffect, useRef } from "react"
import { Field } from "formik"
import styled from "styled-components";


var stylingObject = {
  input: {
    color: "#00bfb6",
    background: "transparent",
    textAlign: "center",
    width: "80%",
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
