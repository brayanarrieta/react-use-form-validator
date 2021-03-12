const { toString } = Object.prototype;

export const isObject = (o: any) => o && toString.call(o) === '[object Object]';
