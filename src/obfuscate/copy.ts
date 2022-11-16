export const copy = <T>(obj: T): T => {
    return JSON.parse(JSON.stringify(obj))
}