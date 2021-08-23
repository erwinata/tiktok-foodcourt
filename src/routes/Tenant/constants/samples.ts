import dayjs from "dayjs";
import { getRandomImg } from "helpers/image";
import { ICategory } from "types/interfaces/ICategory";
import { ICustomer } from "types/interfaces/ICustomer";
import { INotif } from "types/interfaces/INotif";
import { IOrder } from "types/interfaces/IOrder";
import { IOrderItem } from "types/interfaces/IOrderItem";
import { IProduct } from "types/interfaces/IProduct";
import { IUser } from "types/interfaces/IUser";

export const sampleNotifs: INotif[] = [
  {
    text: "Andre telah menyelesaikan pembayaran sejumlah Rp.130.000",
    isNew: true,
    date: dayjs().subtract(3, "m").toDate(),
  },
  {
    text: "Rudi telah menyelesaikan pembayaran sejumlah Rp.60.000",
    isNew: true,
    date: dayjs().subtract(3, "d").toDate(),
  },
  {
    text: "Bambang telah menyelesaikan pembayaran sejumlah Rp.19.000",
    isNew: false,
    date: dayjs().subtract(1, "w").toDate(),
  },
  {
    text: "Zuky telah menyelesaikan pembayaran sejumlah Rp.130.000",
    isNew: false,
    date: dayjs().subtract(3, "w").toDate(),
  },
  {
    text: "Lala telah menyelesaikan pembayaran sejumlah Rp.130.000",
    isNew: false,
    date: dayjs().subtract(3, "y").toDate(),
  },
];

export const sampleUser: IUser = {
  id: 1,
  name: "Putri Ayu Rizky",
};

export const sampleCustomer: ICustomer = {
  name: "#2341231233",
  code: "2341231233",
};

export const sampleProducts: IProduct[] = [
  {
    id: 1,
    nama: "Ayam Kremes",
    harga: 15000,
    deskripsi: "lorem ipsum dolor sit amet skut cust ares",
    photo: getRandomImg(),
    kategoriId: 1,
    status: "1",
    stok: 100,
    hargaAsli: 13000,
  },
  {
    id: 2,
    nama: "Ayam Bakar",
    harga: 20000,
    deskripsi: "lorem ipsum dolor sit amet skut cust ares",
    photo: getRandomImg(),
    kategoriId: 1,
    status: "1",
    stok: 100,
    hargaAsli: 18000,
  },
  {
    id: 3,
    nama: "Ayam Bakar Madu",
    harga: 23000,
    deskripsi: "lorem ipsum dolor sit amet skut cust ares",
    photo: getRandomImg(),
    kategoriId: 1,
    status: "1",
    stok: 100,
    hargaAsli: 18000,
  },
  {
    id: 4,
    nama: "Es Teh",
    harga: 2000,
    deskripsi: "lorem ipsum dolor sit amet skut cust ares",
    photo: getRandomImg(),
    kategoriId: 2,
    status: "1",
    stok: 100,
    hargaAsli: 18000,
  },
  {
    id: 5,
    nama: "Nasi Putih",
    harga: 4000,
    deskripsi: "lorem ipsum dolor sit amet skut cust ares",
    photo: getRandomImg(),
    kategoriId: 1,
    status: "1",
    stok: 100,
    hargaAsli: 18000,
  },
  {
    id: 6,
    nama: "French Fries",
    harga: 10000,
    deskripsi: "lorem ipsum dolor sit amet skut cust ares",
    photo: getRandomImg(),
    kategoriId: 3,
    status: "1",
    stok: 100,
    hargaAsli: 18000,
  },
];

export const sampleCartItems: IOrderItem[] = [
  {
    product: sampleProducts[0],
    qty: 2,
    discount: 0,
  },
  {
    product: sampleProducts[1],
    qty: 1,
    discount: 3000,
  },
];

export const sampleOrder: IOrder = {
  number: "20210702-0567_asdj13jj",
  createdAt: dayjs().subtract(1, "d").toDate(),
  paidAt: dayjs().toDate(),
  status: 0,
  customer: sampleCustomer,
  discountTotal: 0,
  total: 50000,
  subTotal: 50000,
  items: sampleCartItems,
  cashierId: 1,
};

const tabItems = [
  "Semua",
  "Favorit",
  "Paket Ayam",
  "Paket Steak",
  "Side Dish",
  "Lainnya",
];

export const sampleCategories: ICategory[] = [
  {
    id: 0,
    nama: "Semua",
  },
  {
    id: -1,
    nama: "Favorite",
  },
  {
    id: 1,
    nama: "Makanan",
  },
  {
    id: 2,
    nama: "Minuman",
  },
  {
    id: 3,
    nama: "Side Dish",
  },
  {
    id: 4,
    nama: "Lainnya",
  },
];
