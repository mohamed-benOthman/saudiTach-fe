import { MatPaginatorIntl } from '@angular/material/paginator';

const arabicRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length == 0 || pageSize == 0) { return `${length}0 من `; }

    length = Math.max(length, 0);

    const startIndex = page * pageSize;

    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length ?
        Math.min(startIndex + pageSize, length) :
        startIndex + pageSize;

    return `${endIndex} - ${startIndex + 1} من ${length}`;
}


const englishRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length == 0 || pageSize == 0) { return `0 of ${length}`; }

    length = Math.max(length, 0);

    const startIndex = page * pageSize;

    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length ?
        Math.min(startIndex + pageSize, length) :
        startIndex + pageSize;

    return `${startIndex + 1} - ${endIndex} of ${length}`;
}

export function getArabicPaginatorIntl() {
    const paginatorIntl = new MatPaginatorIntl();

    paginatorIntl.itemsPerPageLabel = (localStorage.getItem('language')==='ar') ? 'الحسابات لكل صفحة' : 'items per page' ;
    paginatorIntl.nextPageLabel = (localStorage.getItem('language')==='ar') ? 'الصفحة التالية' : 'next page' ;
    paginatorIntl.previousPageLabel = (localStorage.getItem('language')==='ar') ? 'الصفحة السابقة' : 'previous page' ;
    paginatorIntl.getRangeLabel =  (localStorage.getItem('language')==='ar') ? arabicRangeLabel : englishRangeLabel  ;

    return paginatorIntl;
}
