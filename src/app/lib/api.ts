const API_BASE = "/api/v1";

export type ApiResponse<T> = {
  data: T;
  message?: string;
  count?: number;
};

type RequestOptions = {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
};

async function request<T>(path: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
  const response = await fetch(`${API_BASE}${path}`, {
    method: options.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const payload = (await response.json()) as ApiResponse<T> & { message?: string };
  if (!response.ok) {
    throw new Error(payload.message ?? "API request failed");
  }

  return payload;
}

export type Quote = {
  id: string;
  origin: string;
  destination: string;
  weightKg: number;
  packageType: string;
  status: string;
  amountFcfa?: number;
  pickupDate?: string;
  createdAt?: string;
};

export type Shipment = {
  id: string;
  trackingNumber: string;
  origin: string;
  destination: string;
  status: string;
  progress?: number;
  currentLocation?: string;
  estimatedDelivery?: string;
  createdAt?: string;
};

export type TrackingRecord = {
  id: string;
  trackingNumber: string;
  shipmentId?: string;
  status: string;
  updatedAt?: string;
  events: Array<{
    date: string;
    location: string;
    status: string;
    description: string;
  }>;
  shipment?: Shipment | null;
};

export const fetchQuotes = async () => {
  const response = await request<Quote[]>("/quotes");
  return response.data;
};

export const createQuoteRequest = async (payload: {
  origin: string;
  destination: string;
  weightKg: number;
  packageType: string;
  pickupDate: string;
  estimatedAmountFcfa: number;
}) => {
  const response = await request<Quote>("/public/quote-request", {
    method: "POST",
    body: payload,
  });
  return response.data;
};

export const fetchShipments = async () => {
  const response = await request<Shipment[]>("/shipments");
  return response.data;
};

export const createShipment = async (payload: {
  quoteId: string;
  origin: string;
  destination: string;
  status: string;
  progress: number;
  trackingNumber: string;
  currentLocation: string;
  estimatedDelivery: string;
}) => {
  const response = await request<Shipment>("/shipments", {
    method: "POST",
    body: payload,
  });
  return response.data;
};

export const fetchTrackingRecord = async (trackingNumber: string) => {
  const response = await request<TrackingRecord>(`/tracking/${encodeURIComponent(trackingNumber)}`);
  return response.data;
};

export const createReservation = async (payload: {
  origin: string;
  destination: string;
  weightKg: number;
  pickupDate: string;
  senderName: string;
  recipientName: string;
}) => {
  const response = await request("/public/reservation", {
    method: "POST",
    body: payload,
  });
  return response.data;
};

export const estimatePricing = async (packageType: string, weightKg: number) => {
  const params = new URLSearchParams({
    packageType,
    weightKg: String(weightKg),
  });
  const response = await request<{ estimateFcfa: number }>(
    `/public/pricing-estimate?${params.toString()}`,
  );
  return response.data;
};
