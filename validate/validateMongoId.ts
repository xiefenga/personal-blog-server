import { isMongoId } from "class-validator"

const validateMongoId = (id: string) => isMongoId(id);

export { validateMongoId }
