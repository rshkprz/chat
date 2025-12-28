import z, { ZodObject, ZodRawShape } from "zod";

interface EnvOptions {
  source?: NodeJS.ProcessEnv;
  serviceName?: string;
}

export const createEnv = <TSchema extends ZodObject<ZodRawShape>>(
  schema: TSchema,
  options: EnvOptions = {}
): z.output<TSchema> => {
  const { source = process.env, serviceName = "service" } = options;

  const parsed = schema.safeParse(source);

  if (!parsed.success) {
    const formattedErrors = z.treeifyError(parsed.error);
    throw new Error(
      `[${serviceName}] Environment variable validation failed: ${JSON.stringify(formattedErrors)}`
    );
  }

  return parsed.data;
};

export type EnvSchema<TShape extends ZodRawShape> = ZodObject<TShape>;
