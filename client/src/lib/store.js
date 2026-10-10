// FoodBridge Client Data Store
// Seeded on first load with demo donors, NGOs, and 10 donations in various statuses.

const STORAGE_KEYS = {
  DONATIONS: "foodbridge_donations",
  NGOS: "foodbridge_ngos",
  DONORS: "foodbridge_donors",
  CURRENT_USER: "foodbridge_current_user",
  INITIALIZED: "foodbridge_initialized_v1",
};

export const INITIAL_DONORS = [
  { id: "donor-1", name: "Golden Spoon Bakery", category: "Bakery & Cafe", location: "Downtown Metro" },
  { id: "donor-2", name: "Fresh Mart Supermarket", category: "Grocery & Produce", location: "Westside District" },
  { id: "donor-3", name: "City Plaza Catering", category: "Hospitality & Events", location: "Central Convention Hub" },
];

export const INITIAL_NGOS = [
  {
    id: "ngo-1",
    name: "Hope Food Bank",
    contact: "contact@hopefood.org",
    city: "Downtown Metro",
    verified: true,
    joinedDate: "2026-01-15",
    description: "Serving over 500 hot meals daily across community shelters.",
  },
  {
    id: "ngo-2",
    name: "Care & Share Shelter",
    contact: "help@careshare.org",
    city: "Westside District",
    verified: true,
    joinedDate: "2026-02-02",
    description: "Emergency shelter providing food boxes and warm dinners for families.",
  },
  {
    id: "ngo-3",
    name: "Community Table Relief",
    contact: "info@communitytable.org",
    city: "East Harbor",
    verified: false,
    joinedDate: "2026-03-10",
    description: "Newly formed volunteer grassroots collective awaiting NGO accreditation.",
  },
];

export const INITIAL_DONATIONS = [
  {
    id: "don-1",
    foodName: "40 Fresh Baguettes & Croissants",
    category: "Bakery",
    quantity: 40,
    unit: "pieces",
    pickupAddress: "128 Baker Street, Downtown",
    expiryTime: "Today at 7:00 PM",
    description: "Baked fresh this morning. Packed in food-grade kraft boxes ready for pickup.",
    status: "available",
    donorName: "Golden Spoon Bakery",
    claimedByName: null,
    createdAt: "2026-10-10T08:30:00.000Z",
  },
  {
    id: "don-2",
    foodName: "75 Catered Rice & Grilled Chicken Bowls",
    category: "Cooked Meals",
    quantity: 75,
    unit: "meals",
    pickupAddress: "400 Grand Ave, Suite 10, Convention Center",
    expiryTime: "Today at 9:30 PM",
    description: "Surplus banquet meal boxes, temperature held and sealed with allergen labels.",
    status: "available",
    donorName: "City Plaza Catering",
    claimedByName: null,
    createdAt: "2026-10-10T09:15:00.000Z",
  },
  {
    id: "don-3",
    foodName: "30 Organic Fruit Crates (Apples & Oranges)",
    category: "Produce",
    quantity: 30,
    unit: "crates",
    pickupAddress: "85 Market Boulevard, Westside",
    expiryTime: "Tomorrow at 2:00 PM",
    description: "Crisp and ripe seasonal fruit crates, inspected for freshness and quality.",
    status: "available",
    donorName: "Fresh Mart Supermarket",
    claimedByName: null,
    createdAt: "2026-10-10T09:45:00.000Z",
  },
  {
    id: "don-4",
    foodName: "60 Mixed Pastries & Artisan Muffins",
    category: "Bakery",
    quantity: 60,
    unit: "pieces",
    pickupAddress: "128 Baker Street, Downtown",
    expiryTime: "Today at 6:30 PM",
    description: "Blueberry muffins, cinnamon swirls and chocolate croissants boxed and ready.",
    status: "available",
    donorName: "Golden Spoon Bakery",
    claimedByName: null,
    createdAt: "2026-10-10T10:00:00.000Z",
  },
  {
    id: "don-5",
    foodName: "50 Gourmet Vegetable Lasagna Trays",
    category: "Cooked Meals",
    quantity: 50,
    unit: "portions",
    pickupAddress: "400 Grand Ave, Suite 10, Convention Center",
    expiryTime: "Today at 10:00 PM",
    description: "Freshly prepared vegetarian pasta trays, kept refrigerated.",
    status: "claimed",
    donorName: "City Plaza Catering",
    claimedByName: "Hope Food Bank",
    createdAt: "2026-10-10T07:20:00.000Z",
  },
  {
    id: "don-6",
    foodName: "25 Crates of Fresh Dairy & Greek Yogurts",
    category: "Dairy",
    quantity: 25,
    unit: "crates",
    pickupAddress: "85 Market Boulevard, Westside",
    expiryTime: "Oct 12 at 5:00 PM",
    description: "Refrigerated whole milk jugs and assorted yogurts well within sell-by date.",
    status: "claimed",
    donorName: "Fresh Mart Supermarket",
    claimedByName: "Care & Share Shelter",
    createdAt: "2026-10-09T18:00:00.000Z",
  },
  {
    id: "don-7",
    foodName: "100 Fresh Sandwich Platters",
    category: "Cooked Meals",
    quantity: 100,
    unit: "sandwiches",
    pickupAddress: "400 Grand Ave, Suite 10, Convention Center",
    expiryTime: "Today at 8:00 PM",
    description: "Assorted deli turkey, roast beef, and hummus wraps prepared for executive luncheon.",
    status: "picked_up",
    donorName: "City Plaza Catering",
    claimedByName: "Hope Food Bank",
    createdAt: "2026-10-10T06:45:00.000Z",
  },
  {
    id: "don-8",
    foodName: "35 Cartons of Cereal & Rolled Oats",
    category: "Pantry",
    quantity: 35,
    unit: "boxes",
    pickupAddress: "85 Market Boulevard, Westside",
    expiryTime: "Nov 30 at 12:00 PM",
    description: "Unopened pantry breakfast staples, perfect for family nutrition hampers.",
    status: "picked_up",
    donorName: "Fresh Mart Supermarket",
    claimedByName: "Care & Share Shelter",
    createdAt: "2026-10-09T15:30:00.000Z",
  },
  {
    id: "don-9",
    foodName: "120 Hot Soup & Stew Portions",
    category: "Cooked Meals",
    quantity: 120,
    unit: "portions",
    pickupAddress: "400 Grand Ave, Suite 10, Convention Center",
    expiryTime: "Oct 08 at 9:00 PM",
    description: "Hearty lentil and vegetable broth delivered hot in thermal insulated urns.",
    status: "delivered",
    donorName: "City Plaza Catering",
    claimedByName: "Hope Food Bank",
    createdAt: "2026-10-08T14:00:00.000Z",
  },
  {
    id: "don-10",
    foodName: "80 Loaves of Whole Grain Sourdough",
    category: "Bakery",
    quantity: 80,
    unit: "loaves",
    pickupAddress: "128 Baker Street, Downtown",
    expiryTime: "Oct 09 at 8:00 PM",
    description: "Batch of rustic sourdough loaves from artisan bakery.",
    status: "delivered",
    donorName: "Golden Spoon Bakery",
    claimedByName: "Care & Share Shelter",
    createdAt: "2026-10-09T08:00:00.000Z",
  },
];

// Seed storage if not present
function initializeStore() {
  if (typeof window === "undefined") return;
  const isInitialized = localStorage.getItem(STORAGE_KEYS.INITIALIZED);
  if (!isInitialized) {
    localStorage.setItem(STORAGE_KEYS.DONORS, JSON.stringify(INITIAL_DONORS));
    localStorage.setItem(STORAGE_KEYS.NGOS, JSON.stringify(INITIAL_NGOS));
    localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify(INITIAL_DONATIONS));
    localStorage.setItem(STORAGE_KEYS.INITIALIZED, "true");
  }
}

// Ensure seeded on module load
initializeStore();

export function getDonations() {
  initializeStore();
  const raw = localStorage.getItem(STORAGE_KEYS.DONATIONS);
  return raw ? JSON.parse(raw) : [];
}

export function addDonation(data) {
  initializeStore();
  const donations = getDonations();
  const newDonation = {
    id: `don-${Date.now()}`,
    foodName: data.foodName || "Untitled Food Item",
    category: data.category || "General",
    quantity: Number(data.quantity) || 1,
    unit: data.unit || "items",
    pickupAddress: data.pickupAddress || "Pickup location not specified",
    expiryTime: data.expiryTime || "Today",
    description: data.description || "",
    status: "available",
    donorName: data.donorName || "Anonymous Donor",
    claimedByName: null,
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

// User Session Management
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

export function resetDemoData() {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.DONORS, JSON.stringify(INITIAL_DONORS));
  localStorage.setItem(STORAGE_KEYS.NGOS, JSON.stringify(INITIAL_NGOS));
  localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify(INITIAL_DONATIONS));
  localStorage.setItem(STORAGE_KEYS.INITIALIZED, "true");
}
