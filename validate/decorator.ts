import { ValidationOptions, registerDecorator, isMongoId } from "class-validator";

function IsArrayOfMongoId(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isArrayOfMongoId',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (Array.isArray(value)) {
            return value.every(id => isMongoId(id))
          }
          return false;
        },
      },
    });
  };
}

export { IsArrayOfMongoId }