export const CITIES = [
  { label: "Kota Yogyakarta", value: "Kota Yogyakarta" },
  { label: "Sleman", value: "Sleman" },
  { label: "Bantul", value: "Bantul" },
];


export const DUMMY_SERVICES = [
  {
    barbershopId: "1",
    services: [
      {
        id: "1-1",
        name: "Potong Rambut",
        duration: 30,
        price: 35000,
        desc: "Potong rambut dengan barber profesional.",
      },
      {
        id: "1-2",
        name: "Cukur Kumis & Jenggot",
        duration: 20,
        price: 20000,
        desc: "Cukur kumis dan jenggot rapi.",
      },
      {
        id: "1-3",
        name: "Hair Spa",
        duration: 45,
        price: 50000,
        desc: "Perawatan rambut agar tetap sehat.",
      },
    ],
  },
  {
    barbershopId: "2",
    services: [
      {
        id: "2-1",
        name: "Potong Rambut",
        duration: 35,
        price: 40000,
        desc: "Potong rambut dengan gaya kekinian.",
      },
      {
        id: "2-2",
        name: "Facial",
        duration: 40,
        price: 75000,
        desc: "Perawatan wajah untuk kulit sehat dan segar.",
      },
      {
        id: "2-3",
        name: "Hair Coloring",
        duration: 60,
        price: 130000,
        desc: "Pewarnaan rambut dengan produk berkualitas.",
      },
    ],
  },
  {
    barbershopId: "3",
    services: [
      {
        id: "3-1",
        name: "Potong Rambut",
        duration: 30,
        price: 37000,
        desc: "Potong rambut modern.",
      },
      {
        id: "3-2",
        name: "Creambath",
        duration: 50,
        price: 70000,
        desc: "Perawatan rambut dan kulit kepala dengan creambath.",
      },
      {
        id: "3-3",
        name: "Cukur Kumis",
        duration: 15,
        price: 15000,
        desc: "Cukur kumis rapi.",
      },
    ],
  },
  {
    barbershopId: "4",
    services: [
      {
        id: "4-1",
        name: "Potong Rambut",
        duration: 32,
        price: 39000,
        desc: "Potong rambut premium.",
      },
      {
        id: "4-2",
        name: "Facial",
        duration: 45,
        price: 80000,
        desc: "Facial premium untuk pria.",
      },
      {
        id: "4-3",
        name: "Hair Spa",
        duration: 50,
        price: 60000,
        desc: "Hair spa dengan produk terbaik.",
      },
    ],
  },
  {
    barbershopId: "5",
    services: [
      {
        id: "5-1",
        name: "Potong Rambut",
        duration: 28,
        price: 32000,
        desc: "Potong rambut urban style.",
      },
      {
        id: "5-2",
        name: "Cukur Jenggot",
        duration: 20,
        price: 22000,
        desc: "Cukur jenggot rapi.",
      },
      {
        id: "5-3",
        name: "Hair Coloring",
        duration: 65,
        price: 125000,
        desc: "Pewarnaan rambut urban.",
      },
    ],
  },
];

export const DUMMY_STAFFS = [
  {
    barbershopId: "1",
    staffs: [
      { id: "1-1", name: "Budi", open_time: "09:30", close_time: "21:30" },
      { id: "1-2", name: "Andi", open_time: "09:30", close_time: "21:30" },
      { id: "1-3", name: "Rizal", open_time: "09:30", close_time: "21:30" },
      { id: "1-4", name: "Fajar", open_time: "09:30", close_time: "21:30" },
    ],
  },
  {
    barbershopId: "2",
    staffs: [
      { id: "2-1", name: "Deni", open_time: "10:00", close_time: "20:00" },
      { id: "2-2", name: "Rama", open_time: "10:00", close_time: "20:00" },
      { id: "2-3", name: "Yoga", open_time: "10:00", close_time: "20:00" },
      { id: "2-4", name: "Fikri", open_time: "10:00", close_time: "20:00" },
      { id: "2-5", name: "Bayu", open_time: "10:00", close_time: "20:00" },
    ],
  },
  {
    barbershopId: "3",
    staffs: [
      { id: "3-1", name: "Agus", open_time: "08:00", close_time: "22:00" },
      { id: "3-2", name: "Roni", open_time: "08:00", close_time: "22:00" },
      { id: "3-3", name: "Dian", open_time: "08:00", close_time: "22:00" },
      { id: "3-4", name: "Eko", open_time: "08:00", close_time: "22:00" },
    ],
  },
  {
    barbershopId: "4",
    staffs: [
      { id: "4-1", name: "Toni", open_time: "09:00", close_time: "21:00" },
      { id: "4-2", name: "Rizky", open_time: "09:00", close_time: "21:00" },
      { id: "4-3", name: "Fahmi", open_time: "09:00", close_time: "21:00" },
    ],
  },
  {
    barbershopId: "5",
    staffs: [
      { id: "5-1", name: "Joko", open_time: "10:00", close_time: "20:30" },
      { id: "5-2", name: "Rendi", open_time: "10:00", close_time: "20:30" },
      { id: "5-3", name: "Dimas", open_time: "10:00", close_time: "20:30" },
      { id: "5-4", name: "Adit", open_time: "10:00", close_time: "20:30" },
    ],
  },
];

export const DUMMY_BARBERSHOPS = [
  {
    id: "1",
    name: "Barbershop Keren",
    username: "barberkeren",
    location: "Jl. Mawar No. 123, Jakarta",
    cover_images: [
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    ],
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    open_time: "09:30",
    close_time: "21:30",
    staff_count: 4,
  },
  {
    id: "2",
    name: "Barbershop Elite",
    username: "elitebarber",
    location: "Jl. Melati No. 45, Bandung",
    cover_images: [
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    ],
    photo: "https://randomuser.me/api/portraits/men/45.jpg",
    open_time: "10:00",
    close_time: "20:00",
    staff_count: 5,
  },
  {
    id: "3",
    name: "Barbershop Modern",
    username: "modernbarber",
    location: "Jl. Kenanga No. 88, Surabaya",
    cover_images: [
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80",
    ],
    photo: "https://randomuser.me/api/portraits/men/33.jpg",
    open_time: "08:00",
    close_time: "22:00",
    staff_count: 4,
  },
  {
    id: "4",
    name: "Barbershop Premium",
    username: "premiumbarber",
    location: "Jl. Anggrek No. 12, Yogyakarta",
    cover_images: [
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80",
    ],
    photo: "https://randomuser.me/api/portraits/men/44.jpg",
    open_time: "09:00",
    close_time: "21:00",
    staff_count: 3,
  },
  {
    id: "5",
    name: "Barbershop Urban",
    username: "urbanbarber",
    location: "Jl. Dahlia No. 77, Medan",
    cover_images: [
      "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80",
    ],
    photo: "https://randomuser.me/api/portraits/men/35.jpg",
    open_time: "10:00",
    close_time: "20:30",
    staff_count: 4,
  },
];

export const DUMMY_BOOKINGS = [
  {
    date: "2025-06-16",
    start: "10:30",
    duration: 30,
    staffId: "1-1", // staff 1 barbershop 1
  },
  {
    date: "2025-06-16",
    start: "10:30",
    duration: 30,
    staffId: "2-1", // staff 1 barbershop 2
  },
  {
    date: "2025-06-16",
    start: "10:30",
    duration: 30,
    staffId: "3-1", // staff 1 barbershop 3
  },
  {
    date: "2025-06-16",
    start: "10:30",
    duration: 30,
    staffId: "4-1", // staff 1 barbershop 4
  },
  {
    date: "2025-06-16",
    start: "10:30",
    duration: 30,
    staffId: "5-1", // staff 1 barbershop 5
  },
  {
    date: "2025-06-16",
    start: "11:00",
    duration: 30,
    staffId: "1-2", // staff 2 barbershop 1
  },
  {
    date: "2025-06-16",
    start: "11:00",
    duration: 30,
    staffId: "2-2", // staff 2 barbershop 2
  },
  {
    date: "2025-06-16",
    start: "11:00",
    duration: 30,
    staffId: "3-2", // staff 2 barbershop 3
  },
  {
    date: "2025-06-16",
    start: "11:00",
    duration: 30,
    staffId: "4-2", // staff 2 barbershop 4
  },
  {
    date: "2025-06-16",
    start: "11:00",
    duration: 30,
    staffId: "5-2", // staff 2 barbershop 5
  },
  {
    date: "2025-06-16",
    start: "11:30",
    duration: 30,
    staffId: "1-3", // staff 3 barbershop 1
  },
  {
    date: "2025-06-16",
    start: "11:30",
    duration: 30,
    staffId: "2-3", // staff 3 barbershop 2
  },
  {
    date: "2025-06-16",
    start: "11:30",
    duration: 30,
    staffId: "3-3", // staff 3 barbershop 3
  },
  {
    date: "2025-06-16",
    start: "11:30",
    duration: 30,
    staffId: "4-3", // staff 3 barbershop 4
  },
  {
    date: "2025-06-16",
    start: "11:30",
    duration: 30,
    staffId: "5-3", // staff 3 barbershop 5
  },
];