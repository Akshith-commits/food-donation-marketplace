// FoodBridge Client Data Store - Hyderabad Edition
// Seeded with authentic Hyderabad donors, NGOs, 14 donations with images and geographic coordinates.

import { getFoodImage } from "./foodImages.js";

const STORAGE_KEYS = {
  DONATIONS: "foodbridge_donations_v3",
  NGOS: "foodbridge_ngos_v3",
  DONORS: "foodbridge_donors_v3",
  CURRENT_USER: "foodbridge_current_user_v3",
  INITIALIZED: "foodbridge_hyderabad_v3",
};

export const HYDERABAD_DONORS = [
  {
    id: "donor-1",
    name: "Charminar Biryani House",
    category: "Biryani & Mughlai",
    area: "Charminar",
    address: "Shop 14, Near Gulzar Houz, Charminar, Hyderabad",
    lat: 17.3616,
    lng: 78.4747,
    email: "charminar@biryani.com",
  },
  {
    id: "donor-2",
    name: "Nawab's Irani Cafe",
    category: "Irani Cafe & Bakery",
    area: "Secunderabad",
    address: "Station Road, Near Clock Tower, Secunderabad",
    lat: 17.4399,
    lng: 78.4983,
    email: "nawabs@iranicafe.com",
  },
  {
    id: "donor-3",
    name: "Jubilee Hills Banquet Hall",
    category: "Banquets & Catering",
    area: "Jubilee Hills",
    address: "Road No. 36, Jubilee Hills, Hyderabad",
    lat: 17.4319,
    lng: 78.4073,
    email: "events@jubileebanquet.com",
  },
  {
    id: "donor-4",
    name: "Madhapur Tiffin Centre",
    category: "South Indian Tiffins",
    area: "Madhapur",
    address: "Plot 82, Main Road, Madhapur, Hitech City",
    lat: 17.4483,
    lng: 78.3915,
    email: "tiffins@madhapur.com",
  },
  {
    id: "donor-5",
    name: "Banjara Hills Sweets & Bakery",
    category: "Mithai & Confectionery",
    area: "Banjara Hills",
    address: "Road No. 12, Banjara Hills, Hyderabad",
    lat: 17.4156,
    lng: 78.4357,
    email: "orders@banjarasweets.com",
  },
  {
    id: "donor-6",
    name: "Gachibowli Corporate Canteen",
    category: "Institutional Dining",
    area: "Gachibowli",
    address: "Financial District Canteen Hub, Gachibowli",
    lat: 17.4401,
    lng: 78.3489,
    email: "canteen@gachibowlihub.com",
  },
];

export const HYDERABAD_INDIVIDUAL_DONORS = [
  {
    id: "ind-1",
    name: "Priya Sharma",
    type: "individual",
    area: "Banjara Hills",
    address: "Road No. 10, Banjara Hills, Hyderabad",
    email: "priya.sharma@gmail.com",
    bio: "Home cook & community gathering host",
  },
  {
    id: "ind-2",
    name: "Arjun Reddy",
    type: "individual",
    area: "Gachibowli",
    address: "My Home Bhooja, Block B, Hitech City, Hyderabad",
    email: "arjun.reddy@techhub.in",
    bio: "Weekend event organizer & food rescue champion",
  },
  {
    id: "ind-3",
    name: "Ananya Rao",
    type: "individual",
    area: "Jubilee Hills",
    address: "Journalist Colony, Jubilee Hills, Hyderabad",
    email: "ananya.rao@outlook.com",
    bio: "Family celebration & festive surplus donor",
  },
];

export const HYDERABAD_NGOS = [
  {
    id: "ngo-1",
    name: "Hyderabad Food Rescue Foundation",
    contact: "rescue@hyderabadfood.org",
    area: "Ameerpet",
    city: "Hyderabad",
    verified: true,
    lat: 17.4375,
    lng: 78.4482,
    joinedDate: "2026-01-15",
    description: "Daily city-wide food redistribution across urban destitute shelters.",
  },
  {
    id: "ngo-2",
    name: "Annapurna Seva Trust",
    contact: "contact@annapurnaseva.org",
    area: "Begumpet",
    city: "Hyderabad",
    verified: true,
    lat: 17.4411,
    lng: 78.4739,
    joinedDate: "2026-02-02",
    description: "Free lunch programs and nighttime warm meal distributions near railway hubs.",
  },
  {
    id: "ngo-3",
    name: "Charminar Community Kitchen",
    contact: "kitchen@charminarrelief.org",
    area: "Charminar",
    city: "Hyderabad",
    verified: true,
    lat: 17.3602,
    lng: 78.4721,
    joinedDate: "2026-02-20",
    description: "Old City community grassroots kitchen feeding daily-wage labor colonies.",
  },
  {
    id: "ngo-4",
    name: "Sunrise Shelter Kukatpally",
    contact: "help@sunriseshelter.org",
    area: "Kukatpally",
    city: "Hyderabad",
    verified: false,
    lat: 17.4948,
    lng: 78.3996,
    joinedDate: "2026-03-12",
    description: "Community night shelter awaiting NGO credential verification.",
  },
  {
    id: "ngo-5",
    name: "Secunderabad Youth Relief Society",
    contact: "relief@secunderabadyouth.org",
    area: "Secunderabad",
    city: "Hyderabad",
    verified: false,
    lat: 17.4420,
    lng: 78.5010,
    joinedDate: "2026-03-18",
    description: "Grassroots youth network distributing food packages to railway porters and night shelter workers.",
  },
  {
    id: "ngo-6",
    name: "Old City Bread Basket Initiative",
    contact: "support@oldcitybread.org",
    area: "Charminar",
    city: "Hyderabad",
    verified: false,
    lat: 17.3580,
    lng: 78.4710,
    joinedDate: "2026-03-22",
    description: "Neighborhood food rescue volunteer committee pending formal charity accreditation.",
  },
];

// Helper to calculate target expiry timestamps (relative to current session for live countdowns)
const now = Date.now();

export const INITIAL_DONATIONS = [
  {
    id: "don-1",
    donorId: "donor-1",
    foodName: "Hyderabadi Chicken Dum Biryani",
    category: "Cooked Meals",
    quantity: 65,
    unit: "plates",
    area: "Charminar",
    pickupAddress: "Shop 14, Near Gulzar Houz, Charminar, Hyderabad",
    lat: 17.3616,
    lng: 78.4747,
    expiryTime: "Expiring soon",
    expiryTimestamp: now + 42 * 60 * 1000, // 42 mins from now (turns red!)
    description: "Freshly prepared degh of aromatic basmati chicken biryani with mirchi ka salan and dahi ki chutney packets.",
    status: "available",
    donorName: "Charminar Biryani House",
    claimedByName: null,
    createdAt: new Date(now - 15 * 60 * 1000).toISOString(),
  },
  {
    id: "don-2",
    donorId: "donor-3",
    foodName: "Vegetable Pulao & Mirchi Ka Salan",
    category: "Cooked Meals",
    quantity: 80,
    unit: "meals",
    area: "Jubilee Hills",
    pickupAddress: "Road No. 36, Jubilee Hills Banquet Hall, Hyderabad",
    lat: 17.4319,
    lng: 78.4073,
    expiryTime: "Today at 3:30 PM",
    expiryTimestamp: now + 3 * 3600 * 1000,
    description: "Surplus wedding banquet buffet food, sealed in thermal food containers with sealed serving spoons.",
    status: "available",
    donorName: "Jubilee Hills Banquet Hall",
    claimedByName: null,
    createdAt: new Date(now - 40 * 60 * 1000).toISOString(),
  },
  {
    id: "don-3",
    donorId: "donor-2",
    foodName: "Irani Chai & Osmania Biscuits",
    category: "Bakery",
    quantity: 120,
    unit: "packets",
    area: "Secunderabad",
    pickupAddress: "Station Road, Near Clock Tower, Secunderabad",
    lat: 17.4399,
    lng: 78.4983,
    expiryTime: "Today at 5:00 PM",
    expiryTimestamp: now + 5 * 3600 * 1000,
    description: "Crisp handmade Osmania tea biscuits packed in pairs with insulated flasks of sweet Irani chai.",
    status: "available",
    donorName: "Nawab's Irani Cafe",
    claimedByName: null,
    createdAt: new Date(now - 60 * 60 * 1000).toISOString(),
  },
  {
    id: "don-4",
    donorId: "donor-4",
    foodName: "Idli and Sambar with Coconut Chutney",
    category: "Cooked Meals",
    quantity: 90,
    unit: "plates",
    area: "Madhapur",
    pickupAddress: "Plot 82, Main Road, Madhapur, Hitech City",
    lat: 17.4483,
    lng: 78.3915,
    expiryTime: "Expiring soon",
    expiryTimestamp: now + 35 * 60 * 1000, // 35 mins from now (turns red!)
    description: "Steaming hot fluffy idlis and spicy drumstick sambar packed in food-grade foil containers.",
    status: "available",
    donorName: "Madhapur Tiffin Centre",
    claimedByName: null,
    createdAt: new Date(now - 30 * 60 * 1000).toISOString(),
  },
  {
    id: "don-5",
    donorId: "donor-5",
    foodName: "Double Ka Meetha & Khubani Ka Meetha",
    category: "Dessert",
    quantity: 45,
    unit: "kg",
    area: "Banjara Hills",
    pickupAddress: "Road No. 12, Banjara Hills, Hyderabad",
    lat: 17.4156,
    lng: 78.4357,
    expiryTime: "Tonight at 8:00 PM",
    expiryTimestamp: now + 7 * 3600 * 1000,
    description: "Traditional royal Hyderabadi bread pudding and sweet stewed apricot compote garnished with almonds.",
    status: "available",
    donorName: "Banjara Hills Sweets & Bakery",
    claimedByName: null,
    createdAt: new Date(now - 80 * 60 * 1000).toISOString(),
  },
  {
    id: "don-6",
    donorId: "donor-6",
    foodName: "Dal Tadka & Steamed Rice Packs",
    category: "Cooked Meals",
    quantity: 110,
    unit: "meals",
    area: "Gachibowli",
    pickupAddress: "Financial District Canteen Hub, Gachibowli",
    lat: 17.4401,
    lng: 78.3489,
    expiryTime: "Today at 4:30 PM",
    expiryTimestamp: now + 4 * 3600 * 1000,
    description: "Nutritious toor dal with cumin-garlic tempering, steamed sona masoori rice, and pickle pouches.",
    status: "available",
    donorName: "Gachibowli Corporate Canteen",
    claimedByName: null,
    createdAt: new Date(now - 95 * 60 * 1000).toISOString(),
  },
  {
    id: "don-7",
    donorId: "donor-4",
    foodName: "Chapati and Curry Packs (Paneer Butter Masala)",
    category: "Cooked Meals",
    quantity: 70,
    unit: "packets",
    area: "Ameerpet",
    pickupAddress: "Greenlands Road, Ameerpet, Hyderabad",
    lat: 17.4375,
    lng: 78.4482,
    expiryTime: "Today at 6:00 PM",
    expiryTimestamp: now + 5.5 * 3600 * 1000,
    description: "Fresh soft whole wheat chapatis paired with rich cottage cheese curry in bento containers.",
    status: "claimed",
    donorName: "Madhapur Tiffin Centre",
    claimedByName: "Hyderabad Food Rescue Foundation",
    createdAt: new Date(now - 120 * 60 * 1000).toISOString(),
  },
  {
    id: "don-8",
    donorId: "donor-1",
    foodName: "Hyderabadi Chicken Dum Biryani",
    category: "Cooked Meals",
    quantity: 50,
    unit: "plates",
    area: "Charminar",
    pickupAddress: "Shop 14, Near Gulzar Houz, Charminar, Hyderabad",
    lat: 17.3616,
    lng: 78.4747,
    expiryTime: "Today at 3:00 PM",
    expiryTimestamp: now + 2.5 * 3600 * 1000,
    description: "Surplus batch from afternoon rush, packed in insulated takeaway boxes.",
    status: "claimed",
    donorName: "Charminar Biryani House",
    claimedByName: "Charminar Community Kitchen",
    createdAt: new Date(now - 150 * 60 * 1000).toISOString(),
  },
  {
    id: "don-9",
    donorId: "donor-3",
    foodName: "Vegetable Pulao & Raita Tubs",
    category: "Cooked Meals",
    quantity: 60,
    unit: "meals",
    area: "Begumpet",
    pickupAddress: "Prakash Nagar, Begumpet, Hyderabad",
    lat: 17.4411,
    lng: 78.4739,
    expiryTime: "Today at 5:30 PM",
    expiryTimestamp: now + 4.5 * 3600 * 1000,
    description: "Fragrant basmati vegetable pulao with cooling cucumber mint raita.",
    status: "claimed",
    donorName: "Jubilee Hills Banquet Hall",
    claimedByName: "Annapurna Seva Trust",
    createdAt: new Date(now - 170 * 60 * 1000).toISOString(),
  },
  {
    id: "don-10",
    donorId: "donor-5",
    foodName: "Khubani Ka Meetha Trays",
    category: "Dessert",
    quantity: 30,
    unit: "kg",
    area: "Banjara Hills",
    pickupAddress: "Road No. 12, Banjara Hills, Hyderabad",
    lat: 17.4156,
    lng: 78.4357,
    expiryTime: "Today at 7:00 PM",
    expiryTimestamp: now + 6 * 3600 * 1000,
    description: "Chilled apricot dessert tubs with malai garnish, transport in cooler box required.",
    status: "picked_up",
    donorName: "Banjara Hills Sweets & Bakery",
    claimedByName: "Hyderabad Food Rescue Foundation",
    createdAt: new Date(now - 220 * 60 * 1000).toISOString(),
  },
  {
    id: "don-11",
    donorId: "donor-4",
    foodName: "Idli and Sambar Tiffin Hampers",
    category: "Cooked Meals",
    quantity: 85,
    unit: "plates",
    area: "Kukatpally",
    pickupAddress: "KPHB Colony Main Road, Kukatpally, Hyderabad",
    lat: 17.4948,
    lng: 78.3996,
    expiryTime: "Today at 2:00 PM",
    expiryTimestamp: now + 1.5 * 3600 * 1000,
    description: "Picked up by volunteer van for neighborhood shelter distribution.",
    status: "picked_up",
    donorName: "Madhapur Tiffin Centre",
    claimedByName: "Annapurna Seva Trust",
    createdAt: new Date(now - 250 * 60 * 1000).toISOString(),
  },
  {
    id: "don-12",
    donorId: "donor-2",
    foodName: "Irani Chai and Osmania Biscuits",
    category: "Bakery",
    quantity: 100,
    unit: "packets",
    area: "Secunderabad",
    pickupAddress: "Station Road, Secunderabad",
    lat: 17.4399,
    lng: 78.4983,
    expiryTime: "Today at 4:30 PM",
    expiryTimestamp: now + 3.5 * 3600 * 1000,
    description: "Dispatched from Secunderabad cafe via community cargo trike.",
    status: "picked_up",
    donorName: "Nawab's Irani Cafe",
    claimedByName: "Charminar Community Kitchen",
    createdAt: new Date(now - 280 * 60 * 1000).toISOString(),
  },
  {
    id: "don-13",
    donorId: "donor-1",
    foodName: "Hyderabadi Chicken Dum Biryani Feast",
    category: "Cooked Meals",
    quantity: 150,
    unit: "plates",
    area: "Charminar",
    pickupAddress: "Shop 14, Near Gulzar Houz, Charminar, Hyderabad",
    lat: 17.3616,
    lng: 78.4747,
    expiryTime: "Yesterday",
    expiryTimestamp: now - 18 * 3600 * 1000,
    description: "Distributed across urban shelters near Falaknuma and Old City.",
    status: "delivered",
    donorName: "Charminar Biryani House",
    claimedByName: "Charminar Community Kitchen",
    createdAt: new Date(now - 24 * 3600 * 1000).toISOString(),
  },
  {
    id: "don-14",
    donorId: "donor-6",
    foodName: "Chapati & Dal Tadka Family Packs",
    category: "Cooked Meals",
    quantity: 95,
    unit: "meals",
    area: "Hitech City",
    pickupAddress: "Madhapur-Gachibowli Link Rd, Hitech City",
    lat: 17.4435,
    lng: 78.3772,
    expiryTime: "Yesterday",
    expiryTimestamp: now - 20 * 3600 * 1000,
    description: "Served hot to migrant worker settlements and street shelter residents.",
    status: "delivered",
    donorName: "Gachibowli Corporate Canteen",
    claimedByName: "Hyderabad Food Rescue Foundation",
    createdAt: new Date(now - 26 * 3600 * 1000).toISOString(),
  },
];

// Area coordinates map for new user-posted donations
export const HYDERABAD_AREA_COORDS = {
  "Charminar": { lat: 17.3616, lng: 78.4747 },
  "Secunderabad": { lat: 17.4399, lng: 78.4983 },
  "Jubilee Hills": { lat: 17.4319, lng: 78.4073 },
  "Madhapur": { lat: 17.4483, lng: 78.3915 },
  "Banjara Hills": { lat: 17.4156, lng: 78.4357 },
  "Gachibowli": { lat: 17.4401, lng: 78.3489 },
  "Kukatpally": { lat: 17.4948, lng: 78.3996 },
  "Begumpet": { lat: 17.4411, lng: 78.4739 },
  "Ameerpet": { lat: 17.4375, lng: 78.4482 },
  "Hitech City": { lat: 17.4435, lng: 78.3772 },
};

export function initializeStore(force = false) {
  if (typeof window === "undefined") return;
  const isInitialized = localStorage.getItem(STORAGE_KEYS.INITIALIZED);
  if (!isInitialized || force) {
    localStorage.setItem(STORAGE_KEYS.DONORS, JSON.stringify(HYDERABAD_DONORS));
    localStorage.setItem(STORAGE_KEYS.NGOS, JSON.stringify(HYDERABAD_NGOS));
    localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify(INITIAL_DONATIONS));
    localStorage.setItem(STORAGE_KEYS.INITIALIZED, "true");
  } else {
    // Safe, idempotent migration for existing records in localStorage
    // 1. Migrate donations missing donorId
    try {
      const rawDonations = localStorage.getItem(STORAGE_KEYS.DONATIONS);
      if (rawDonations) {
        const parsedDonations = JSON.parse(rawDonations);
        let donationsMigrated = false;
        const donorNameToId = {
          "Charminar Biryani House": "donor-1",
          "Nawab's Irani Cafe": "donor-2",
          "Jubilee Hills Banquet Hall": "donor-3",
          "Madhapur Tiffin Centre": "donor-4",
          "Banjara Hills Sweets & Bakery": "donor-5",
          "Gachibowli Corporate Canteen": "donor-6",
          "Priya Sharma": "ind-1",
          "Arjun Reddy": "ind-2",
          "Ananya Rao": "ind-3",
        };
        const updatedDonations = parsedDonations.map((item) => {
          if (!item.donorId) {
            donationsMigrated = true;
            const mappedId = donorNameToId[item.donorName] || (item.donorName ? `donor-${item.donorName.toLowerCase().replace(/[^a-z0-9]/g, "-")}` : "donor-1");
            return { ...item, donorId: mappedId };
          }
          return item;
        });
        if (donationsMigrated) {
          localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify(updatedDonations));
        }
      }
    } catch (e) {
      console.warn("Donation migration notice:", e);
    }

    // 2. Migrate NGOs: Ensure all seeded NGOs exist without overwriting verification status
    try {
      const rawNgos = localStorage.getItem(STORAGE_KEYS.NGOS);
      if (rawNgos) {
        const existingNgos = JSON.parse(rawNgos);
        const existingIds = new Set(existingNgos.map((n) => n.id));
        const missingNgos = HYDERABAD_NGOS.filter((n) => !existingIds.has(n.id));
        if (missingNgos.length > 0) {
          const mergedNgos = [...existingNgos, ...missingNgos];
          localStorage.setItem(STORAGE_KEYS.NGOS, JSON.stringify(mergedNgos));
        }
      }
    } catch (e) {
      console.warn("NGO migration notice:", e);
    }
  }
}

// Auto initialize on load
initializeStore();

export function getDonations() {
  initializeStore();
  const raw = localStorage.getItem(STORAGE_KEYS.DONATIONS);
  if (!raw) return [];
  try {
    const list = JSON.parse(raw);
    return list.map((item) => ({
      ...item,
      imageUrl: item.imageUrl || getFoodImage(item.foodName, item.category),
    }));
  } catch (err) {
    console.error("Error reading donations from localStorage", err);
    return [];
  }
}

export function addDonation(data) {
  initializeStore();
  const donations = getDonations();
  const areaKey = data.area || "Madhapur";
  const coords = HYDERABAD_AREA_COORDS[areaKey] || { lat: 17.4400, lng: 78.4000 };

  // Calculate approximate expiry timestamp if not explicitly given
  let expTimestamp = data.expiryTimestamp;
  if (!expTimestamp) {
    expTimestamp = Date.now() + 3 * 3600 * 1000; // default 3 hours
  }

  const activeUser = getCurrentUser();
  const resolvedDonorId = data.donorId || activeUser?.id || "donor-1";
  const resolvedDonorName = data.donorName || activeUser?.name || "Charminar Biryani House";

  const newDonation = {
    id: `don-${Date.now()}`,
    donorId: resolvedDonorId,
    foodName: data.foodName || "Surplus Food Batch",
    category: data.category || "Cooked Meals",
    quantity: Number(data.quantity) || 1,
    unit: data.unit || "meals",
    area: areaKey,
    pickupAddress: data.pickupAddress || `${areaKey}, Hyderabad`,
    lat: coords.lat + (Math.random() - 0.5) * 0.005,
    lng: coords.lng + (Math.random() - 0.5) * 0.005,
    expiryTime: data.expiryTime || "Today at 9:00 PM",
    expiryTimestamp: expTimestamp,
    description: data.description || "",
    status: "available",
    donorName: resolvedDonorName,
    claimedByName: null,
    imageUrl: data.imageUrl || getFoodImage(data.foodName, data.category),
    createdAt: new Date().toISOString(),
  };

  const updated = [newDonation, ...donations];
  localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify(updated));
  return newDonation;
}

export function claimDonation(donationId, ngoName) {
  initializeStore();
  const donations = getDonations();
  let updatedItem = null;
  const updated = donations.map((d) => {
    if (d.id === donationId) {
      updatedItem = {
        ...d,
        status: "claimed",
        claimedByName: ngoName,
      };
      return updatedItem;
    }
    return d;
  });
  localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify(updated));
  return updatedItem;
}

export function updateStatus(donationId, newStatus) {
  initializeStore();
  const donations = getDonations();
  let updatedItem = null;
  const updated = donations.map((d) => {
    if (d.id === donationId) {
      updatedItem = {
        ...d,
        status: newStatus,
      };
      return updatedItem;
    }
    return d;
  });
  localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify(updated));
  return updatedItem;
}

export function getNgos() {
  initializeStore();
  const raw = localStorage.getItem(STORAGE_KEYS.NGOS);
  return raw ? JSON.parse(raw) : [];
}

export function verifyNgo(ngoId) {
  initializeStore();
  const ngos = getNgos();
  let updatedNgo = null;
  const updated = ngos.map((ngo) => {
    if (ngo.id === ngoId) {
      updatedNgo = { ...ngo, verified: true };
      return updatedNgo;
    }
    return ngo;
  });
  localStorage.setItem(STORAGE_KEYS.NGOS, JSON.stringify(updated));

  // If currently active user session is this NGO, keep active session in sync
  const curUser = getCurrentUser();
  if (curUser && curUser.role === "ngo" && (curUser.id === ngoId || curUser.name === updatedNgo?.name)) {
    setCurrentUser({ ...curUser, verified: true });
  }

  return updatedNgo;
}

export function getDonors() {
  initializeStore();
  const raw = localStorage.getItem(STORAGE_KEYS.DONORS);
  return raw ? JSON.parse(raw) : [];
}

export function getStats() {
  const donations = getDonations();
  const ngos = getNgos();

  const totalDonations = donations.length;
  const mealsSaved = donations.reduce((sum, d) => sum + (Number(d.quantity) || 0), 0);
  const delivered = donations.filter((d) => d.status === "delivered").length;
  const activeNgos = ngos.filter((n) => n.verified).length;
  const availableCount = donations.filter((d) => d.status === "available").length;
  const claimedCount = donations.filter((d) => d.status === "claimed").length;
  const pickedUpCount = donations.filter((d) => d.status === "picked_up").length;

  return {
    totalDonations,
    mealsSaved,
    delivered,
    activeNgos,
    availableCount,
    claimedCount,
    pickedUpCount,
  };
}

export function getCurrentUser() {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return raw ? JSON.parse(raw) : null;
}

export function setCurrentUser(user) {
  if (typeof window === "undefined") return;
  if (!user) {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  } else {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  }
}

export function logout() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
}

// Hidden reset function callable from browser console only
export function resetDemoData() {
  if (typeof window === "undefined") return;
  initializeStore(true);
  console.log("%c[FoodBridge]%c Store successfully reset to default Hyderabad dataset.", "color:#f97316;font-weight:bold;", "color:#fff;");
}

// Expose on window for developers / console testing only
if (typeof window !== "undefined") {
  window.resetFoodBridgeData = resetDemoData;
}
