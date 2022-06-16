import { ChangeEvent, FocusEvent, useEffect, useState } from "react";

export interface IFormValidator {
    initialValues: any,
    validate: any
}

export default function FormValidator(formParams: IFormValidator) {

    const { initialValues, validate } = formParams;

    const [errors, setErrors]           = useState({} as any);
    const [values, setValues]           = useState(initialValues);
    const [touched, setTouchedFields]   = useState({} as any);

    useEffect((): void => { validateValues(values); }, [ values ]);

    const handleBlur        = (event: FocusEvent<HTMLInputElement>): void => setTouchedFields({...touched, [event.target.name]: true});
    const handleChange      = (event: ChangeEvent<HTMLInputElement>): void => setValues({...values, [event.target.name]: event.target.value});
    const validateValues    = (values: any): void => setErrors(validate(values));

    return {
        values,
        errors,
        touched,
        handleBlur,
        setErrors,
        handleChange
    };
}