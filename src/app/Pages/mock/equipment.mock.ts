import { Equipment } from "../Model/equipment.model";


export const EQUIPMENT_LIST: Equipment[] = [
  {
    name: "Treadmill T-800",
    id: "TR-001",
    zone: "Cardio A",
    status: "IN_USE",
    duration: "28 min",
    freeIn: "5 min"
  },
  {
    name: "Bench Press Flat",
    id: "BP-004",
    zone: "Free Weights",
    status: "FREE",
    duration: "15 min"
  },
  {
    name: "Rower Concept 2",
    id: "RW-002",
    zone: "Cardio B",
    status: "IN_USE",
    duration: "22 min",
    freeIn: "12 min"
  },
    {
    name: "Spin Bike",
    id: "SP-101",
    zone: "Studio A",
    status: "MAINTENANCE",
    duration: "45 min",
    freeIn: "--"
  },
  
];
