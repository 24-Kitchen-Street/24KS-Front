import { useEffect, useRef } from "react"
import { Field } from "formik"

export function TextField({ autoFocus, name }) {
  const textbox = useRef(null)

  useEffect(() => {
    if (autoFocus) {
      textbox.current.focus()
    }
  }, [autoFocus])

  return <Field type="text" name={name} innerRef={textbox} />
}
