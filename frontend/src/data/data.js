import { iconsImgs } from "../utils/images";
import { personsImgs } from "../utils/images";

export const navigationLinks = [
  { id: 1, title: "Home", image: iconsImgs.home },
  { id: 2, title: "Tickets", image: iconsImgs.budget },
  { id: 6, title: "Reports", image: iconsImgs.report },
  { id: 3, title: "Fines", image: iconsImgs.bills },

  { id: 9, title: "Account", image: iconsImgs.user },
  { id: 10, title: "Fines", image: iconsImgs.bills },
];

export const transactions = [
  {
    id: 11,
    name: "Sarah Parker",
    image: personsImgs.person_four,
    date: "23/12/04",
    amount: 22000,
  },
  {
    id: 12,
    name: "Krisitine Carter",
    image: personsImgs.person_three,
    date: "23/07/21",
    amount: 20000,
  },
  {
    id: 13,
    name: "Irene Doe",
    image: personsImgs.person_two,
    date: "23/08/25",
    amount: 30000,
  },
];

export const reportData = [
  {
    id: 14,
    month: "Jan",
    value1: 45,
    value2: null,
  },
  {
    id: 15,
    month: "Feb",
    value1: 45,
    value2: 60,
  },
  {
    id: 16,
    month: "Mar",
    value1: 45,
    value2: null,
  },
  {
    id: 17,
    month: "Apr",
    value1: 45,
    value2: null,
  },
  {
    id: 18,
    month: "May",
    value1: 45,
    value2: null,
  },
];

export const budget = [
  {
    id: 19,
    title: "Broken Sink",
    type: "Pending",
    amount: "12 January 2024",
  },
  {
    id: 20,
    title: "Leaking Toilet",
    type: "Pending",
    amount: "2 February 2024",
  },
  {
    id: 21,
    title: "Broken Heart",
    type: "Pending",
    amount: "14 February 2024",
  },
  {
    id: 22,
    title: "Sexuality Unknown",
    type: "Resolved",
    amount: "30 March 2024",
  },
  {
    id: 23,
    title: "Wifi Connectivity",
    type: "Resolved",
    amount: "5 April 2024",
  },
];

export const subscriptions = [
  {
    id: 24,
    title: "LinkedIn",
    due_date: "23/12/04",
    amount: 20000,
  },
  {
    id: 25,
    title: "Netflix",
    due_date: "23/12/10",
    amount: 5000,
  },
  {
    id: 26,
    title: "DSTV",
    due_date: "23/12/22",
    amount: 2000,
  },
];

export const savings = [
  {
    id: 27,
    image: personsImgs.person_one,
    saving_amount: 250000,
    title: "Pay kid bro’s fees",
    date_taken: "23/12/22",
    amount_left: 40000,
  },
];
