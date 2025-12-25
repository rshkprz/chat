export const createEnv = (schema, options = {}) => {
    const { source = process.env, serviceName = "service" } = options;
    const parsed = schema.safeParse(source);
    if (!parsed.success) {
        const formattedErrors = parsed.error.format();
        throw new Error(`[${serviceName}] Environment variable validation failed: ${JSON.stringify(formattedErrors)}`);
    }
    return parsed.data;
};
//# sourceMappingURL=env.js.map