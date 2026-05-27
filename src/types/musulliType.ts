export interface Musulli {
  id: string;
  mosqueId: string;
  linkedUserId: string | null;
  name: string;
  phone: string;
  address: string;
  image: string | null;
  monthlyFee: number;
  joinedAt: string;
  totalPaid: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  totalMonths: number;
  expectedAmount: number;
  dueAmount: number;
  paidMonths: number;
  paidTill: string | null;
}

export interface CreateMusulliPayload {
  mosqueId: string;
  name: string;
  phone: string;
  address: string;
  monthlyFee: number;
  joinedAt: string;
}

export type UpdateMusulliPayload = Partial<CreateMusulliPayload>;

export interface CreateMonthlyPaymentPayload {
  musulliId: string;
  billingMonth: Date | string;
}

export interface UpdateMonthlyPaymentPayload {
  monthlyPaymentId: string;
  amount: number;
  note?: string;
}

export interface CollectFeePayload {
  musulliId: string;
  amount: number;
  paidMonth: string;
  note?: string;
}
