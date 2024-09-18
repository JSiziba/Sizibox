import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'timeAgo',
    standalone: true
})
export class TimeAgoPipe implements PipeTransform {

    transform(value: Date, ...args: unknown[]): string {
        if (!value) return "";

        const now = new Date();
        const seconds = Math.floor((now.getTime() - new Date(value).getTime()) / 1000);
        const intervals: { [key: string]: number } = {
            year: 31536000,
            month: 2592000,
            week: 604800,
            day: 86400,
            hour: 3600,
            minute: 60,
            second: 1
        };

        let counter;

        for (const i in intervals) {
            counter = Math.floor(seconds / intervals[i]);
            if (counter > 0) {
                return `${counter} ${i}${counter === 1 ? '' : 's'} ago`;
            }
        }

        return "Just now";
    }

}
