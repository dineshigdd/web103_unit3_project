import { pool } from "../config/database.js"

const events = [
  {
    id: 1,
    title: "Indie Night Live",
    artists: "The Velvet Tones, Midnight Echo",
    event_date: "2026-03-14",
    event_time: "19:30:00",
    remaining: "2026-03-14T19:30:00",
    venue: "Echo Lounge",
    genre: "Indie",
    ticket_price: 15,
    image: "/images/indie-night.png"
  },
  {
    id: 2,
    title: "Hip-Hop Takeover",
    artists: "DJ Pulse, MC Nova",
    event_date: "2026-03-20",
    event_time: "21:00:00",
    remaining: "2026-03-20T21:00:00",
    venue: "House of Blues",
    genre: "Hip-Hop",
    ticket_price: 25,
    image: "/images/hiphop-takeover.png"
  },
  {
    id: 3,
    title: "Acoustic Open Mic",
    artists: "Various Student Artists",
    event_date: "2026-03-10",
    event_time: "18:00:00",
    remaining: "2026-03-10T18:00:00",
    venue: "Pavilion",
    genre: "Acoustic",
    ticket_price: 0,
    image: "/images/acoustic.png"
  },
  {
    id: 4,
    title: "EDM Glow Fest",
    artists: "DJ Neon, Bass Surge",
    event_date: "2026-04-02",
    event_time: "20:00:00",
    remaining: "2026-04-02T20:00:00",
    venue: "American Airlines Center",
    genre: "EDM",
    ticket_price: 35,
    image: "/images/edm-glowfest.png"
  },
  {
    id: 5,
    title: "Jazz Under the Stars",
    artists: "The Blue Note Collective",
    event_date: "2026-03-28",
    event_time: "19:00:00",
    remaining: "2026-03-28T19:00:00",
    venue: "Echo Lounge",
    genre: "Jazz",
    ticket_price: 20,
    image: "/images/jazz.png"
  },
  {
    id: 6,
    title: "Campus Spring Music Fest",
    artists: "Skyline Drive, Echo Bloom, DJ Pulse",
    event_date: "2026-04-10",
    event_time: "17:00:00",
    remaining: "2026-04-10T17:00:00",
    venue: "House of Blues",
    genre: "Mixed",
    ticket_price: 10,
    image: "/images/mixed.png"
  }
];

export default events;




