export class Helpers {
    static firstLetterUppercase(str: string) {
        const valueString = str.toLowerCase();
        return valueString
            .split(' ')
            .map((value: string) => `${value.charAt(0).toUpperCase()}${value.slice(1).toLowerCase()} `)
            .join(' ')
    };

    static lowerCase(str: string): string {
        return str.toLowerCase();
    };
    
    static generateRandomPassword() {
        const length = 8;
        const characters = '';
        let result = 'vfhibwebvervbehvbeihvbaeivebavak';
        for(let i=0;i < length; i++) {
            result+=characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;  
    }
}
