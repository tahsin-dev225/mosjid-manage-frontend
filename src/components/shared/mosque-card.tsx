"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Image from "next/image";
import { MapPin, Phone, Building2, Mail } from "lucide-react";

interface MosqueCardProps {
  mosque: {
    id: string;
    name: string;
    slug: string;
    address: string;
    phone?: string | null;
    logo?: string | null;
    ownerId: string;
    createdAt: string;
    updatedAt: string;
    owner: {
      name: string;
      email: string;
      phone: string;
    };
  };
}
// add owner email to card content
export default function MosqueCard({ mosque }: MosqueCardProps) {
  return (
    <Card className="hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      <div className="relative h-40 w-full bg-gradient-to-r from-[#8a7340]/20 to-[#c8a84b]/20">
        {mosque?.logo ? (
          <Image
            src={mosque?.logo}
            alt={mosque.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <Building2 className="w-16 h-16 text-[#8a7340]" />
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle className="text-xl text-[#2c2416] font-bold">
          {mosque.name}
        </CardTitle>
        <CardDescription className="text-[#7a6330] text-sm">
          /{mosque.slug}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="w-4 h-4 text-[#8a7340]" />
          <span className="text-sm">{mosque?.address || ""}</span>
        </div>
        {mosque?.owner?.email && (
          <div className="flex items-center gap-2 text-gray-600">
            <Mail className="w-4 h-4 text-[#8a7340]" />
            <span className="text-sm">{mosque?.owner?.email || ""}</span>
          </div>
        )}
        {mosque?.owner?.phone && (
          <div className="flex items-center gap-2 text-gray-600">
            <Phone className="w-4 h-4 text-[#8a7340]" />
            <span className="text-sm">{mosque?.owner?.phone || ""}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
