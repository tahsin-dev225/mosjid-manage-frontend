export interface Musulli {
  id: string;
  mosqueId: string;
  linkedUserId: string | null;
  name: string;
  phone: number;
  image: string | null;
  monthlyFee: number;
  startMonth: number;
  startYear: number;
  paidTillMonth: number;
  paidTillYear: number;
  paymentDue: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMusulliPayload {
  mosqueId: string;
  name: string;
  phone: number;
  monthlyFee: number;
  startMonth: number;
  startYear: number;
  paidTillMonth?: number;
  paidTillYear?: number;
  paymentDue?: number;
  isActive?: boolean;
}
