import React, { useReducer } from 'react';

const useFormReducer = (state, action) => {
  if (action.type === 'edit') {
    return { ...state, ...action.data };
  }

  return state;
};

const useFormData = (initialValues = {}) => {
  const [formValues, formValuesDispatch] = useReducer(
    useFormReducer,
    initialValues,
  );

  const setFormValue = (fieldName, fieldValue) => {
    formValuesDispatch({
      type: 'edit',
      data: {
        [fieldName]: fieldValue,
      },
    });
  };

  return {
    formValues,
    setFormValue,
  };
};

export default useFormData;
