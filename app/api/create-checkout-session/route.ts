import { metadata } from '@/app/layout';

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

import { cookies } from 'next/headers';
import { stripe } from '@/libs/stripe';
import { createOrRetrieveCustomer } from '@/libs/supabase-admin';
import { NextResponse } from 'next/server';
import { getURL } from '@/libs/helpers';

export async function POST(req: Request) {
  const { price, quantity = 1, metadata = {} } = await req.json();

  try {
    const supabase = createRouteHandlerClient({
      cookies,
    });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const customer = await createOrRetrieveCustomer({
      uuid: user?.id || '',
      email: user?.email || '',
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      customer,
      line_items: [
        {
          price: price.id,
          quantity,
        },
      ],
      mode: 'subscription',
      allow_promotion_codes: true,
      subscription_data: {
        trial_from_plan: true,
        metadata,
      },
      success_url: `${getURL()}/account`,
      cancel_url: `${getURL()}/`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err: any) {
    console.log(err);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
