type FieldDescriptor = {
    value: any,
    required?: FieldRequiredProperty;
    fieldName: string;
    validator?: any;
}

type FieldRequiredProperty = string | boolean | undefined;

export class FormFieldModel {
  constructor(fieldDescriptor: FieldDescriptor) {
    const {
      value, required, fieldName, validator,
    } = fieldDescriptor;

    this._value = value;
    this._required = required;
    this._fieldName = fieldName;
    this._validatorFunction = validator;
    this._interacted = false;
  }

    _value: any;

    _required: FieldRequiredProperty;

    _fieldName: string;

    _validatorFunction: any;

    _interacted: boolean;

    _errorMessage: string | undefined;

    get value() {
      return this._value;
    }

    get required() {
      return this._required;
    }

    get hasValue() {
      return !!this.value;
    }

    get fieldName() {
      return this._fieldName;
    }

    setErrorMessage = (newErrorMessage: string | undefined) => this._errorMessage = newErrorMessage;

    setValue = (newValue: any) => {
      if (!this._interacted) {
        this._interacted = true;
      }

      if (this._value === newValue) {
        return;
      }

      this._value = newValue;
    }

    validate = () => {
      const { required } = this;
      // TODO: Integrate validator function
      const shouldSkipValidation = !required;

      if (shouldSkipValidation) return;
      if (required) {
        const message = !this.hasValue ? typeof this._required === 'string' ? this._required : `Field: "${this.fieldName}" is required` : undefined;
        this.setErrorMessage(message);
      }
    }
}
