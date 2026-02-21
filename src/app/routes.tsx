import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { Dashboard } from "./pages/Dashboard";
import { QuoteRequest } from "./pages/QuoteRequest";
import { Quotes } from "./pages/Quotes";
import { Shipments } from "./pages/Shipments";
import { NewShipment } from "./pages/NewShipment";
import { TrackShipment } from "./pages/TrackShipment";
import { Delivery } from "./pages/Delivery";
import { MesColis } from "./pages/MesColis";
import { Payments } from "./pages/Payments";
import { Client } from "./pages/Client";
import { Addresses } from "./pages/Addresses";
import { PublicReservation } from "./pages/PublicReservation";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/",
    Component: DashboardLayout,
    children: [
      { path: "dashboard", Component: Dashboard },
      { path: "quote-request", Component: QuoteRequest },
      { path: "quotes", Component: Quotes },
      { path: "shipments", Component: Shipments },
      { path: "new-shipment/:quoteId", Component: NewShipment },
      { path: "track-shipment", Component: TrackShipment },
      { path: "delivery", Component: Delivery },
      { path: "mes-colis", Component: MesColis },
      { path: "payments", Component: Payments },
      { path: "client", Component: Client },
      { path: "profile/addresses", Component: Addresses },
    ],
  },
  {
    path: "public-dashboard/reservation",
    Component: PublicReservation,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);