export class DataHelper {

    convertArrayToChainString(arrayItems: any[], charSeparator: string = '|'): string {
        let result = '';
        if (arrayItems.length > 0) {
            arrayItems.forEach(element => {
                result += element + charSeparator;
            });
            result = result.substring(0, result.length - 1);
        }
        return result;
    }
}