import React from 'react';
import { FormFieldModel } from './FormFieldModel';

// const exampleState = {
//     fieldName: {
//         required: true // when we pass and string replace the message
//         validator: () => {}
//     }
// }

// const returnField = {
//     fieldName: {value, onFieldChange, error}
// }
const useFormValidator = (descriptors: any = {}) => {
  const getFieldsKeys = (): string[] => Object.keys(descriptors);

  const getFieldsStructure = () => {
    const fieldsKeys = getFieldsKeys();
    const fieldsStructure = fieldsKeys.reduce((acc: any, key) => {
      acc[key] = new FormFieldModel(descriptors[key]);
      return acc;
    }, {});
    return fieldsStructure;
  };

  const [fields, setFields] = React.useState(() => getFieldsStructure());

  const addFields = () => {
    const fieldsStructure = getFieldsStructure();
    setFields(fieldsStructure);
  };

  React.useEffect(() => {
    addFields();
  }, [descriptors]);

  const validate = () => {
    const fieldsKeys = getFieldsKeys();
    return Promise.all(
      fieldsKeys.map((key) => Promise.resolve(fields[key].validate())),
    );
  };

  return [fields, validate];
};

export default useFormValidator;
