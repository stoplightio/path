const PROTOCOL = /^[A-Za-z]{2,}:\/\//;

export const isURL = (uri: string) => PROTOCOL.test(uri);
