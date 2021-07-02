import styled from "styled-components";
import { useEffect, useRef } from "react"
import { Field } from "formik"


const TextBoxStyle = styled.div`
  /* align-items: center; */
  width: 30%;
  text-decoration: none;
  padding: 1rem;
  z-index: 9999999999;
`

export function TextField({ autoFocus, name }) {
  const textbox = useRef(null)

  useEffect(() => {
    if (autoFocus) {
      textbox.current.focus()
    }
  }, [autoFocus])

  return <TextBoxStyle><Field type="text" name={name} innerRef={textbox} /></TextBoxStyle>
}
