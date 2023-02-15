export class Helpers {
    static firstletterUppercase(str; string) {
        const valueString = str.toLowerCase();
        return valueString
            .split(' ')
            .map((value: string) => `${value.charAt(0).toUpperCase()}${value.slice(1).toLowerCase()} `)
    }
}