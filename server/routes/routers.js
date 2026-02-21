import { randomUUID } from "node:crypto";
import { Router } from "express";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

const toInt = (value, fallback) => {
  const parsed = Number.parseInt(String(value), 10);
  return Number.isNaN(parsed) ? fallback : parsed;
};

export const createCrudRouter = ({
  resourceName,
  collection,
  idField = "id",
  idPrefix = "item",
  searchableFields = [],
}) => {
  const router = Router();

  router.get("/", (req, res) => {
    const query = String(req.query.q ?? "").toLowerCase();
    const status = String(req.query.status ?? "").toLowerCase();
    const limit = Math.max(toInt(req.query.limit, 50), 1);

    const filtered = collection.filter((entry) => {
      const matchesQuery =
        query.length === 0 ||
        searchableFields.some((field) =>
          String(entry[field] ?? "")
            .toLowerCase()
            .includes(query),
        );
      const matchesStatus =
        status.length === 0 ||
        String(entry.status ?? "")
          .toLowerCase()
          .includes(status);
      return matchesQuery && matchesStatus;
    });

    res.json({
      resource: resourceName,
      count: filtered.length,
      data: filtered.slice(0, limit),
    });
  });

  router.post("/", (req, res) => {
    const payload = req.body ?? {};
    const item = {
      [idField]: `${idPrefix}-${randomUUID().slice(0, 8)}`,
      ...payload,
      createdAt: new Date().toISOString(),
    };
    collection.unshift(item);
    res.status(201).json({
      message: `${resourceName} created`,
      data: item,
    });
  });

  router.get(`/:${idField}`, (req, res) => {
    const id = req.params[idField];
    const item = collection.find((entry) => String(entry[idField]) === id);
    if (!item) {
      return res.status(404).json({
        message: `${resourceName} not found`,
      });
    }
    return res.json({ data: item });
  });

  router.patch(`/:${idField}`, (req, res) => {
    const id = req.params[idField];
    const itemIndex = collection.findIndex((entry) => String(entry[idField]) === id);
    if (itemIndex === -1) {
      return res.status(404).json({
        message: `${resourceName} not found`,
      });
    }
    collection[itemIndex] = {
      ...collection[itemIndex],
      ...req.body,
      updatedAt: new Date().toISOString(),
    };
    return res.json({
      message: `${resourceName} updated`,
      data: collection[itemIndex],
    });
  });

  router.delete(`/:${idField}`, (req, res) => {
    const id = req.params[idField];
    const itemIndex = collection.findIndex((entry) => String(entry[idField]) === id);
    if (itemIndex === -1) {
      return res.status(404).json({
        message: `${resourceName} not found`,
      });
    }
    const [deleted] = collection.splice(itemIndex, 1);
    return res.json({
      message: `${resourceName} deleted`,
      data: deleted,
    });
  });

  return router;
};

export const createAuthRouter = ({ authStore, users }) => {
  const router = Router();

  router.post("/login", (req, res) => {
    const { email } = req.body ?? {};
    const user =
      users.find((entry) => entry.email === email) ??
      users[0] ?? {
        id: "guest",
        fullName: "Guest User",
        email: "guest@diaexpress.client",
        role: "client",
      };

    const session = {
      id: `sess-${randomUUID().slice(0, 10)}`,
      userId: user.id,
      token: `token-${randomUUID()}`,
      createdAt: new Date().toISOString(),
    };
    authStore.sessions.unshift(session);

    res.json({
      message: "Login successful",
      data: {
        user,
        token: session.token,
      },
    });
  });

  router.post("/register", (req, res) => {
    const payload = req.body ?? {};
    const user = {
      id: `usr-${randomUUID().slice(0, 8)}`,
      fullName: payload.fullName ?? "Nouveau client",
      email: payload.email ?? `client-${Date.now()}@diaexpress.client`,
      role: "client",
      company: payload.company ?? "",
      phone: payload.phone ?? "",
      createdAt: new Date().toISOString(),
    };
    users.unshift(user);
    res.status(201).json({
      message: "Registration successful",
      data: user,
    });
  });

  router.get("/me", (req, res) => {
    const token = req.headers.authorization?.replace("Bearer ", "") ?? "";
    const session = authStore.sessions.find((entry) => entry.token === token);
    const user = users.find((entry) => entry.id === session?.userId) ?? users[0] ?? null;
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({ data: user });
  });

  router.post("/logout", (req, res) => {
    const token = req.headers.authorization?.replace("Bearer ", "") ?? "";
    const sessionIndex = authStore.sessions.findIndex((entry) => entry.token === token);
    if (sessionIndex >= 0) {
      authStore.sessions.splice(sessionIndex, 1);
    }
    return res.json({ message: "Logged out" });
  });

  return router;
};

export const createTrackingRouter = ({ tracking, shipments }) => {
  const router = Router();

  router.get("/", (_req, res) => {
    res.json({
      count: tracking.length,
      data: tracking,
    });
  });

  router.get("/:trackingNumber", (req, res) => {
    const trackingNumber = req.params.trackingNumber;
    const entry = tracking.find(
      (item) => item.trackingNumber === trackingNumber || item.id === trackingNumber,
    );
    if (!entry) {
      return res.status(404).json({
        message: "Tracking number not found",
      });
    }
    const shipment = shipments.find((item) => item.trackingNumber === trackingNumber) ?? null;
    return res.json({
      data: {
        ...entry,
        shipment,
      },
    });
  });

  router.post("/:trackingNumber/events", (req, res) => {
    const trackingNumber = req.params.trackingNumber;
    const entry = tracking.find((item) => item.trackingNumber === trackingNumber);
    if (!entry) {
      return res.status(404).json({
        message: "Tracking number not found",
      });
    }

    const event = {
      date: new Date().toISOString(),
      location: req.body?.location ?? "N/A",
      status: req.body?.status ?? "Mise a jour",
      description: req.body?.description ?? "Aucune description",
    };
    entry.events.unshift(event);
    entry.updatedAt = new Date().toISOString();

    return res.status(201).json({
      message: "Tracking event added",
      data: entry,
    });
  });

  return router;
};

export const createPricingRouter = ({ pricing }) => {
  const router = createCrudRouter({
    resourceName: "pricing",
    collection: pricing,
    idPrefix: "prc",
    searchableFields: ["id", "packageType"],
  });

  router.get("/estimate/calc", (req, res) => {
    const packageType = String(req.query.packageType ?? "standard").toLowerCase();
    const weightKg = Math.max(toInt(req.query.weightKg, 1), 1);
    const entry =
      pricing.find((item) => String(item.packageType).toLowerCase() === packageType) ?? pricing[0];

    const estimate = entry.baseFcfa + entry.perKgFcfa * weightKg;
    res.json({
      data: {
        packageType: entry.packageType,
        weightKg,
        baseFcfa: entry.baseFcfa,
        perKgFcfa: entry.perKgFcfa,
        estimateFcfa: estimate,
      },
    });
  });

  return router;
};

export const createUploadsRouter = ({ uploads }) => {
  const router = Router();

  router.get("/", (_req, res) => {
    res.json({
      count: uploads.length,
      data: uploads,
    });
  });

  router.post("/", upload.single("file"), (req, res) => {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded. Use form-data field name 'file'.",
      });
    }
    const uploadEntry = {
      id: `upl-${randomUUID().slice(0, 8)}`,
      originalName: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      uploadedAt: new Date().toISOString(),
    };
    uploads.unshift(uploadEntry);
    return res.status(201).json({
      message: "Upload successful",
      data: uploadEntry,
    });
  });

  return router;
};

export const createAdminRouter = ({ users, quotes, shipments, adminQuotes, payments }) => {
  const router = Router();

  const adminQuotesRouter = createCrudRouter({
    resourceName: "adminQuotes",
    collection: adminQuotes,
    idPrefix: "admq",
    searchableFields: ["id", "quoteId", "decision", "assignedTo"],
  });

  adminQuotesRouter.patch("/:id/decision", (req, res) => {
    const quote = adminQuotes.find((item) => item.id === req.params.id);
    if (!quote) {
      return res.status(404).json({
        message: "Admin quote not found",
      });
    }
    quote.decision = req.body?.decision ?? quote.decision;
    quote.updatedAt = new Date().toISOString();
    return res.json({
      message: "Admin quote decision updated",
      data: quote,
    });
  });

  router.get("/stats", (_req, res) => {
    const paidAmount = payments
      .filter((payment) => payment.status === "paid")
      .reduce((acc, payment) => acc + Number(payment.amountFcfa || 0), 0);

    res.json({
      data: {
        users: users.length,
        quotes: quotes.length,
        shipments: shipments.length,
        pendingQuotes: quotes.filter((quote) => quote.status === "pending").length,
        activeShipments: shipments.filter((shipment) => shipment.status !== "delivered").length,
        paidAmountFcfa: paidAmount,
      },
    });
  });

  router.get("/users", (_req, res) => {
    res.json({ count: users.length, data: users });
  });

  router.get("/shipments", (_req, res) => {
    res.json({ count: shipments.length, data: shipments });
  });

  router.use("/quotes", adminQuotesRouter);
  return router;
};

export const createPublicRouter = ({ quotes, reservations, tracking, pricing }) => {
  const router = Router();

  router.get("/health", (_req, res) => {
    res.json({
      status: "ok",
      service: "diaexpress-api",
      timestamp: new Date().toISOString(),
    });
  });

  router.get("/tracking/:trackingNumber", (req, res) => {
    const trackingNumber = req.params.trackingNumber;
    const record = tracking.find((entry) => entry.trackingNumber === trackingNumber);
    if (!record) {
      return res.status(404).json({
        message: "Tracking number not found",
      });
    }
    return res.json({ data: record });
  });

  router.post("/quote-request", (req, res) => {
    const payload = req.body ?? {};
    const quote = {
      id: `DEV-${new Date().getFullYear()}-${String(quotes.length + 1).padStart(3, "0")}`,
      customerId: payload.customerId ?? "public-client",
      origin: payload.origin ?? "",
      destination: payload.destination ?? "",
      weightKg: Number(payload.weightKg ?? 0),
      packageType: payload.packageType ?? "standard",
      status: "pending",
      amountFcfa: Number(payload.estimatedAmountFcfa ?? 0),
      pickupDate: payload.pickupDate ?? "",
      createdAt: new Date().toISOString(),
    };
    quotes.unshift(quote);
    return res.status(201).json({
      message: "Quote request received",
      data: quote,
    });
  });

  router.post("/reservation", (req, res) => {
    const payload = req.body ?? {};
    const reservation = {
      id: `RSV-${new Date().getFullYear()}-${String(reservations.length + 1).padStart(3, "0")}`,
      origin: payload.origin ?? "",
      destination: payload.destination ?? "",
      weightKg: Number(payload.weightKg ?? 0),
      pickupDate: payload.pickupDate ?? "",
      senderName: payload.senderName ?? "",
      recipientName: payload.recipientName ?? "",
      status: "submitted",
      createdAt: new Date().toISOString(),
    };
    reservations.unshift(reservation);
    return res.status(201).json({
      message: "Reservation submitted",
      data: reservation,
    });
  });

  router.get("/pricing-estimate", (req, res) => {
    const packageType = String(req.query.packageType ?? "standard").toLowerCase();
    const weightKg = Math.max(toInt(req.query.weightKg, 1), 1);
    const rule =
      pricing.find((entry) => String(entry.packageType).toLowerCase() === packageType) ?? pricing[0];
    const estimateFcfa = rule.baseFcfa + rule.perKgFcfa * weightKg;
    return res.json({
      data: {
        packageType: rule.packageType,
        weightKg,
        estimateFcfa,
      },
    });
  });

  return router;
};
