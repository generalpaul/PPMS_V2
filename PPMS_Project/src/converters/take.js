export class TakeValueConverter {
    toView(array, count, index) {
        return array.slice(index*count, (index*count)+count);
    }
}