"use client";

import { SessionProvider as Session } from "next-auth/react";
import {
  QueryClient,
  QueryClientProvider as QueryProvider,
} from "@tanstack/react-query";
import { useState } from "react";

type Props = {
  children: React.ReactNode;
};

export default function Providers({ children }: Props) {
  const [client] = useState(new QueryClient());
  return (
    <Session>
      <QueryProvider client={client}>{children}</QueryProvider>
    </Session>
  );
}
