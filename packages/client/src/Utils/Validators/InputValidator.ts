export type ValidatorTypes =
  | 'name'
  | 'login'
  | 'email'
  | 'password'
  | 'phone'
  | 'message'
  | 'tag'
  | 'default';

type RuleType<P> = {
  message?: string;
  value: P;
};

interface ValidationRules {
  pattern?: RuleType<string>;
  required: RuleType<boolean>;
  maxlength?: RuleType<number>;
  minlength?: RuleType<number>;
}

class InputValidator {
  private errors: string[] = [];

  private readonly type: ValidatorTypes;

  private rules: Record<ValidatorTypes, ValidationRules> = {
    name: {
      pattern: {
        value: '^[а-яА-ЯёЁa-zA-Z-]{3,20}$',
        message:
          'От 3 до 20 символов, латиница или кириллица, без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
      },
      maxlength: {
        value: 20,
      },
      minlength: {
        value: 3,
      },
      required: {
        value: true,
      },
    },
    login: {
      pattern: {
        value: '^[a-zA-Z][a-zA-Z0-9-_]{3,20}$',
        message: 'От 3 до 20 символов, только латинские символы',
      },
      maxlength: {
        value: 20,
      },
      minlength: {
        value: 3,
      },
      required: {
        value: true,
      },
    },
    password: {
      pattern: {
        value: '(?=.*\\d)(?=.*[A-ZА-ЯЁ]).{8,40}',
        message:
          'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
      },
      required: {
        value: true,
      },
      maxlength: {
        value: 40,
      },
      minlength: {
        value: 8,
      },
    },
    message: {
      required: {
        value: true,
      },
    },
    email: {
      pattern: {
        value:
          "^[a-zA-Z0-9.!#$%&' * +/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$",
        message: 'Неверный формат e-mail',
      },
      required: {
        value: true,
      },
    },
    tag: {
      pattern: {
        value: '^[A-Za-z]+$',
        message: 'Tag должен содержать одно слово',
      },
      required: {
        value: true,
      },
    },
    phone: {
      pattern: {
        value: '^[0-9+][0-9]{10,15}$',
        message: 'От 10 до 15 символов, может начинается с плюса',
      },
      required: {
        value: true,
      },
      maxlength: {
        value: 15,
      },
      minlength: {
        value: 8,
      },
    },
    default: {
      required: {
        value: true,
      },
    },
  };

  private readonly element: HTMLInputElement | HTMLTextAreaElement;

  constructor(
    input: HTMLInputElement | HTMLTextAreaElement,
    type: ValidatorTypes
  ) {
    this.type = type;
    this.element = input;

    this._setRules();
  }

  private _getRules() {
    return this.rules[this.type];
  }

  private _setRules(): void {
    const rules = this._getRules();

    Object.entries(rules).forEach(([ruleName, value]) => {
      this.element.setAttribute(ruleName, value.value);
    });
  }

  public check(): boolean {
    this.resetValidation();
    let isValid = true;
    const { validity } = this.element;
    const rules = this._getRules();

    if (validity.tooLong) {
      this._addInvalidity('Превышено максимальное кол-во символов');
      if (rules.maxlength) {
        if (rules.maxlength.message) {
          this.element.setCustomValidity(rules.maxlength.message);
          this.element.title = rules.maxlength.message;
        } else if (rules.maxlength.value) {
          this.element.setCustomValidity(
            `Превышено максимальное кол-во символов на ${
              this.element.value.length - rules.maxlength.value
            }`
          );
        }
      }
      isValid = false;
    }

    if (validity.tooShort) {
      this._addInvalidity('Значение слишком короткое');
      if (rules.minlength) {
        if (rules.minlength.message) {
          this.element.setCustomValidity(rules.minlength.message);
          this.element.title = rules.minlength.message;
        } else if (rules.minlength.value) {
          this.element.setCustomValidity(
            `Минимальное кол-во символов ${rules.minlength.value}`
          );
        }
      }
      isValid = false;
    }
    console.log('validity', validity);
    if (validity.patternMismatch) {
      this._addInvalidity('Неверный формат данных');
      if (rules.pattern?.message) {
        this.element.setCustomValidity(rules.pattern.message);
        this.element.title = rules.pattern.message;
      }
      isValid = false;
    }

    if (validity.valueMissing) {
      //this._addInvalidity('Поле обязательно для заполнения');
      if (rules.required.message) {
        this.element.setCustomValidity(rules.required.message);
        this.element.title = rules.required.message;
      }
      isValid = false;
    }

    this.element.addEventListener(
      'input',
      () => {
        this.element.setCustomValidity('');
      },
      { once: true }
    );

    return isValid;
  }

  private _addInvalidity(message: string): void {
    this.errors.push(message);
  }

  public getError(): string {
    return this.errors[0] || '';
  }

  public getErrors(): string {
    return this.errors.join('. ');
  }

  public resetValidation(): void {
    this.errors = [];
  }
}

export default InputValidator;
