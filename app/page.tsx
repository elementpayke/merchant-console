"use client";

import dynamic from "next/dynamic";

const Console = dynamic(() => import("../components/Console"), {
  ssr: false,
  loading: () => (
    <div className="ep-splash">
      <div>
        <img src="/elementpay-logo.png" alt="" />
        Loading ElementPay Merchant Console…
      </div>
    </div>
  ),
});

export default function Page() {
  return <Console />;
}
