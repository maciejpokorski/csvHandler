export interface Order {
  id: string;
  customer: string;
  products: string
}

export interface Product {
  id: string,
  name: string,
  cost: number,
}

export interface OrderPrice {
  id: string,
  customer: string,
  euros: number,
}

export interface Customer {
  id: string,
  firstname: string,
  lastname: string,
}

export type BufferEncoding = 'ascii' | 'utf8' | 'utf-8' | 'utf16le' | 'ucs2' | 'ucs-2' | 'base64' | 'latin1' | 'binary' | 'hex';
