export type EquipmentStatus = 'IN_USE' | 'FREE' | 'MAINTENANCE';

export interface Equipment {
  name: string;
  id: string;
  zone: string;
  status: string;
  duration: number;
  freeIn?: string;
}
