import React from "react";

export function useForm(inputValues) {
  const [values, setValues] = React.useState(inputValues);

  function handleChange(e) {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }

  return { values, setValues, handleChange }
}