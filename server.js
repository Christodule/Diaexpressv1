import express from "express";
import cors from "cors";
import morgan from "morgan";

import { mockDb } from "./server/data/mockDb.js";
import {
  createAdminRouter,
  createAuthRouter,
  createCrudRouter,
  createPricingRouter,
  createPublicRouter,
  createTrackingRouter,
  createUploadsRouter,
} from "./server/routes/routers.js";

const app = express();
const PORT = Number(process.env.PORT ?? 4000);

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (_req, res) => {
  res.json({
    service: "DIAEXPRESS Logistics API",
    version: "v1",
    docs: {
      adminV1: "/api/v1/admin",
      adminLegacy: "/api/admin",
      public: "/api/v1/public",
    },
  });
});

// Resource modules requested for server.js mounting
app.use(
  "/api/v1/auth",
  createAuthRouter({ authStore: mockDb.auth, users: mockDb.users }),
);
app.use(
  "/api/v1/users",
  createCrudRouter({
    resourceName: "users",
    collection: mockDb.users,
    idPrefix: "usr",
    searchableFields: ["id", "fullName", "email", "company"],
  }),
);
app.use(
  "/api/v1/quotes",
  createCrudRouter({
    resourceName: "quotes",
    collection: mockDb.quotes,
    idPrefix: "dev",
    searchableFields: ["id", "origin", "destination", "status"],
  }),
);
app.use(
  "/api/v1/shipments",
  createCrudRouter({
    resourceName: "shipments",
    collection: mockDb.shipments,
    idPrefix: "dxp",
    searchableFields: ["id", "trackingNumber", "origin", "destination", "status"],
  }),
);
app.use(
  "/api/v1/bookings",
  createCrudRouter({
    resourceName: "bookings",
    collection: mockDb.bookings,
    idPrefix: "bkg",
    searchableFields: ["id", "shipmentId", "status"],
  }),
);
app.use(
  "/api/v1/tracking",
  createTrackingRouter({ tracking: mockDb.tracking, shipments: mockDb.shipments }),
);
app.use("/api/v1/pricing", createPricingRouter({ pricing: mockDb.pricing }));
app.use(
  "/api/v1/package-types",
  createCrudRouter({
    resourceName: "packageTypes",
    collection: mockDb.packageTypes,
    idPrefix: "pkg",
    searchableFields: ["id", "label"],
  }),
);
app.use(
  "/api/v1/expeditions",
  createCrudRouter({
    resourceName: "expeditions",
    collection: mockDb.expeditions,
    idPrefix: "exp",
    searchableFields: ["id", "shipmentId", "routeCode", "status"],
  }),
);
app.use(
  "/api/v1/admin-quotes",
  createCrudRouter({
    resourceName: "adminQuotes",
    collection: mockDb.adminQuotes,
    idPrefix: "admq",
    searchableFields: ["id", "quoteId", "decision", "assignedTo"],
  }),
);
app.use(
  "/api/v1/market-points",
  createCrudRouter({
    resourceName: "marketPoints",
    collection: mockDb.marketPoints,
    idPrefix: "mrk",
    searchableFields: ["id", "name", "city", "country"],
  }),
);
app.use(
  "/api/v1/payments",
  createCrudRouter({
    resourceName: "payments",
    collection: mockDb.payments,
    idPrefix: "pay",
    searchableFields: ["id", "quoteId", "shipmentId", "status", "method"],
  }),
);
app.use(
  "/api/v1/addresses",
  createCrudRouter({
    resourceName: "addresses",
    collection: mockDb.addresses,
    idPrefix: "adr",
    searchableFields: ["id", "userId", "label", "city", "country"],
  }),
);
app.use(
  "/api/v1/reservations",
  createCrudRouter({
    resourceName: "reservations",
    collection: mockDb.reservations,
    idPrefix: "rsv",
    searchableFields: ["id", "origin", "destination", "status"],
  }),
);
app.use(
  "/api/v1/schedules",
  createCrudRouter({
    resourceName: "schedules",
    collection: mockDb.schedules,
    idPrefix: "sch",
    searchableFields: ["id", "shipmentId", "vehicle", "status"],
  }),
);
app.use("/api/v1/uploads", createUploadsRouter({ uploads: mockDb.uploads }));

// Admin v1/v2 + legacy and public routes
const adminRouter = createAdminRouter({
  users: mockDb.users,
  quotes: mockDb.quotes,
  shipments: mockDb.shipments,
  adminQuotes: mockDb.adminQuotes,
  payments: mockDb.payments,
});
app.use("/api/v1/admin", adminRouter);
app.use("/api/admin", adminRouter); // legacy
app.use(
  "/api/v1/public",
  createPublicRouter({
    quotes: mockDb.quotes,
    reservations: mockDb.reservations,
    tracking: mockDb.tracking,
    pricing: mockDb.pricing,
  }),
);

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
    path: req.originalUrl,
  });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`DIAEXPRESS API listening on http://localhost:${PORT}`);
});
