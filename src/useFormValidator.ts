import React from 'react';
import { FormFieldModel } from './FormFieldModel';
import { useConstructor } from './useConstructor';

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
  const [fields, setFields] = React.useState(() => _getFieldsStructure());

  React.useEffect(() => {
    _addFields();
  }, [descriptors]);

  const _getFieldsStructure = () => {
    const fieldsKeys = _getFieldsKeys();
    const fieldsStructure = fieldsKeys.reduce((acc: any, key) => {
      acc[key] = new FormFieldModel(descriptors[key]);
      return acc;
    }, {});
    return fieldsStructure;
  };

  const _addFields = () => {
    const fieldsStructure = _getFieldsStructure();
    setFields(fieldsStructure);
  };

  const _getFieldsKeys = (): string[] => Object.keys(descriptors);

  const validate = () => {
    const fieldsKeys = _getFieldsKeys();
    return Promise.all(
      fieldsKeys.map((key) => Promise.resolve(fields[key].validate())),
    );
  };

  return [fields, validate];
};

export default useFormValidator;
