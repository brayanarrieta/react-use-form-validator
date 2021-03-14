type FieldRequiredProperty = string | boolean | undefined;

type FieldDescriptor = {
    value: any,
    required?: FieldRequiredProperty;
    fieldName: string;
    validator?: any;
}

export class FormFieldModel {
  constructor(fieldDescriptor: FieldDescriptor) {
    const {
      value, required, fieldName, validator,
    } = fieldDescriptor;

    this.#value = value;
    this.#required = required;
    this.#fieldName = fieldName;
    this.#validatorFunction = validator;
    this.#interacted = false;
  }

    #value: any;

    #required: FieldRequiredProperty;

    #fieldName: string;

    #validatorFunction: any;

    #interacted: boolean;

    #errorMessage: string | undefined;

    get value() {
      return this.#value;
    }

    get required() {
      return this.#required;
    }

    get hasValue() {
      return !!this.value;
    }

    get fieldName() {
      return this.#fieldName;
    }

    set errorMessage(newErrorMessage: string | undefined) {
      this.#errorMessage = newErrorMessage;
    }

    setValue = (newValue: any) => {
      if (!this.#interacted) {
        this.#interacted = true;
      }

      if (this.value === newValue) {
        return;
      }

      this.#value = newValue;
    }

    validate = () => {
      const { required } = this;
      // TODO: Integrate validator function
      const shouldSkipValidation = !required;

      if (shouldSkipValidation) return;
      if (required) {
        if (this.hasValue) {
          this.errorMessage = undefined;
          return;
        }
        const message = typeof this.#required === 'string' ? this.#required : `Field: "${this.fieldName}" is required`;
        this.errorMessage = message;
      }
    }
}
