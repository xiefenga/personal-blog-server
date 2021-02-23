import { validate } from "class-validator"
import gatherValidationError from "../util/handleVErrors";

const validateModel = async (obj: Object, skip: boolean = false) => gatherValidationError(await validate(obj, { skipUndefinedProperties: skip }))

export default validateModel;
