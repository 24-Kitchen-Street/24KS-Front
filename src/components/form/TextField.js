import { useEffect, useRef } from "react"
import { Field } from "formik"

export function TextField({ autoFocus, name, type = "text" }) {
  const textbox = useRef(null)

  useEffect(() => {
    if (autoFocus) {
      textbox.current.focus()
    }
  }, [autoFocus])

  return <Field type={type} name={name} innerRef={textbox} />
}
