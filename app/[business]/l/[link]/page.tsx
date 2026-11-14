/* Public checkout page for a payment link.
   Hand-written — NOT generated from the design.

   `public_path` from the API is `/{business}/l/{link_slug}`, which this route
   mirrors, so a link can be shared as `<console host>/acme-test/l/pay-aaa2a2`.
   Before this existed the only thing behind a shared link was the JSON API, so
   a customer opening one saw a raw payload. */
"use client";

import { use } from "react";
import PayPage from "../../../../components/PayPage";

export default function Page({
  params,
}: {
  params: Promise<{ business: string; link: string }>;
}) {
  const { business, link } = use(params);
  return <PayPage business={business} link={link} />;
}
