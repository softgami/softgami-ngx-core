import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'fileSizeFormatter',
})
export class FileSizeFormatterPipe implements PipeTransform {

    transform(sizeInBytes: number, arg?: string): string {

        if (sizeInBytes === undefined || sizeInBytes === null || typeof sizeInBytes !== 'number' || isNaN(sizeInBytes)) {
            return '';
        }
        arg = (arg && typeof arg === 'string') ? arg.toUpperCase() : 'AUTO';

        switch (arg) {
            case 'KB':
                return this.formatToKB(sizeInBytes);
            case 'MB':
                return this.formatToMB(sizeInBytes);
            case 'AUTO':
            default:
                return this.formatAuto(sizeInBytes);
        }

    }

    formatToKB(sizeInBytes: number): string {

        return (sizeInBytes / 1024).toFixed(2).toString() + 'KB';

    }

    formatToMB(sizeInBytes: number): string {

        return ((sizeInBytes / 1024) / 1024).toFixed(2).toString() + 'MB';

    }

    formatAuto(sizeInBytes: number): string {

        if (sizeInBytes < 1024 * 1024) {
            return this.formatToKB(sizeInBytes);
        } else {
            return this.formatToMB(sizeInBytes);
        }

    }

}
