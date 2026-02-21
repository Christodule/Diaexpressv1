const now = new Date().toISOString();

export const mockDb = {
  users: [
    {
      id: "usr_1",
      fullName: "Jean Kouassi",
      email: "jean.kouassi@diaexpress.client",
      role: "client",
      company: "Import Export CI",
      phone: "+2250700000000",
      createdAt: now,
    },
    {
      id: "usr_2",
      fullName: "Awa Traore",
      email: "awa.traore@diaexpress.client",
      role: "client",
      company: "Sahel Trading",
      phone: "+221770000000",
      createdAt: now,
    },
  ],
  quotes: [
    {
      id: "DEV-2026-001",
      customerId: "usr_1",
      origin: "Abidjan, CI",
      destination: "Paris, FR",
      weightKg: 250,
      packageType: "standard",
      status: "approved",
      amountFcfa: 450000,
      pickupDate: "2026-02-24",
      createdAt: now,
    },
    {
      id: "DEV-2026-002",
      customerId: "usr_2",
      origin: "Dakar, SN",
      destination: "Lyon, FR",
      weightKg: 180,
      packageType: "express",
      status: "pending",
      amountFcfa: 390000,
      pickupDate: "2026-02-25",
      createdAt: now,
    },
  ],
  shipments: [
    {
      id: "DXP-2026-001",
      quoteId: "DEV-2026-001",
      trackingNumber: "TRK-2026-001",
      origin: "Abidjan, CI",
      destination: "Paris, FR",
      status: "in_transit",
      progress: 60,
      currentLocation: "Casablanca, Maroc",
      estimatedDelivery: "2026-02-28",
      createdAt: now,
    },
  ],
  bookings: [
    {
      id: "BKG-2026-001",
      shipmentId: "DXP-2026-001",
      pickupWindow: "2026-02-24T09:00:00.000Z",
      status: "confirmed",
      createdAt: now,
    },
  ],
  tracking: [
    {
      id: "TRK-2026-001",
      trackingNumber: "TRK-2026-001",
      shipmentId: "DXP-2026-001",
      status: "in_transit",
      events: [
        {
          date: "2026-02-21T09:20:00.000Z",
          location: "Casablanca, Maroc",
          status: "En transit",
          description: "Transfert au hub régional.",
        },
        {
          date: "2026-02-20T18:10:00.000Z",
          location: "Abidjan, CI",
          status: "Collecté",
          description: "Colis collecté chez l'expéditeur.",
        },
      ],
      updatedAt: now,
    },
  ],
  pricing: [
    {
      id: "PRC-STD",
      packageType: "standard",
      baseFcfa: 8000,
      perKgFcfa: 1500,
      deliverySpeed: "3-5 jours",
      active: true,
    },
    {
      id: "PRC-EXP",
      packageType: "express",
      baseFcfa: 12000,
      perKgFcfa: 2200,
      deliverySpeed: "1-2 jours",
      active: true,
    },
  ],
  packageTypes: [
    { id: "standard", label: "Standard", fragile: false, hazardous: false },
    { id: "express", label: "Express", fragile: false, hazardous: false },
    { id: "fragile", label: "Fragile", fragile: true, hazardous: false },
  ],
  expeditions: [
    {
      id: "EXP-2026-001",
      shipmentId: "DXP-2026-001",
      routeCode: "CI-FR-AIR",
      mode: "air",
      status: "ongoing",
      createdAt: now,
    },
  ],
  adminQuotes: [
    {
      id: "ADM-Q-2026-001",
      quoteId: "DEV-2026-002",
      priority: "high",
      assignedTo: "ops@diaexpress.admin",
      decision: "pending",
      updatedAt: now,
    },
  ],
  marketPoints: [
    {
      id: "MRK-ABJ-01",
      name: "Hub Abidjan Port",
      country: "CI",
      city: "Abidjan",
      type: "hub",
      active: true,
    },
    {
      id: "MRK-PAR-01",
      name: "Point relais Paris Nord",
      country: "FR",
      city: "Paris",
      type: "relay",
      active: true,
    },
  ],
  payments: [
    {
      id: "PAY-2026-001",
      quoteId: "DEV-2026-001",
      shipmentId: "DXP-2026-001",
      amountFcfa: 450000,
      method: "card",
      status: "paid",
      paidAt: now,
    },
  ],
  addresses: [
    {
      id: "ADR-001",
      userId: "usr_1",
      label: "Bureau principal",
      line1: "Zone Industrielle de Yopougon",
      city: "Abidjan",
      country: "CI",
      isDefault: true,
    },
  ],
  reservations: [
    {
      id: "RSV-2026-001",
      origin: "Abidjan, CI",
      destination: "Paris, FR",
      weightKg: 20,
      senderName: "Jean Kouassi",
      recipientName: "Marie Dubois",
      status: "submitted",
      createdAt: now,
    },
  ],
  schedules: [
    {
      id: "SCH-2026-001",
      shipmentId: "DXP-2026-001",
      vehicle: "AF Cargo 774",
      departureAt: "2026-02-25T10:00:00.000Z",
      arrivalAt: "2026-02-28T09:00:00.000Z",
      status: "planned",
    },
  ],
  uploads: [],
  auth: {
    sessions: [],
  },
};

export const listResource = (resourceName) => mockDb[resourceName];
