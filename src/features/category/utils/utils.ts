
function reduceEmptyKeys<T extends Record<string, unknown>>(obj: T) {
    return Object.entries(obj).reduce((acc, [key, value]) => {
        if (value !== "" && value !== undefined && value !== null) {
            (acc as any)[key] = value;
        }
        return acc;
    }, {} as Partial<T>);
}

export { reduceEmptyKeys };