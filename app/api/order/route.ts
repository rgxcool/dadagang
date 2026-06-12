import { NextRequest, NextResponse } from 'next/server';
import { OrderData } from '@/types/order';
import { sendOrderEmail } from '@/lib/email';
import { generateGoogleMapsUrl, isValidCoordinates } from '@/lib/location';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as Partial<OrderData>;

    // Validate required fields
    const requiredFields = ['customerName', 'phoneNumber', 'address', 'quantity', 'productName', 'price'];
    const missingFields = requiredFields.filter((field) => !body[field as keyof OrderData]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { message: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate phone number
    const phoneDigits = body.phoneNumber!.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      return NextResponse.json(
        { message: 'Invalid phone number' },
        { status: 400 }
      );
    }

    // Generate Google Maps URL if coordinates are provided
    let mapsUrl: string | undefined;
    if (body.latitude && body.longitude && isValidCoordinates(body.latitude, body.longitude)) {
      mapsUrl = generateGoogleMapsUrl(body.latitude, body.longitude);
    }

    // Create order object
    const order: OrderData = {
      productId: body.productId || 0,
      productName: body.productName!,
      price: body.price!,
      deliveryCharge: body.deliveryCharge || 30,
      quantity: body.quantity!,
      customerName: body.customerName!,
      phoneNumber: body.phoneNumber!,
      address: body.address!,
      latitude: body.latitude,
      longitude: body.longitude,
      mapsUrl,
      deliveryTime: body.deliveryTime || 'Not specified',
      notes: body.notes || '',
      totalPrice: body.totalPrice || 0,
      createdAt: new Date().toISOString(),
    };

    // Send email to admin
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@drinkdelivery.com';
    
    try {
      await sendOrderEmail(order, adminEmail);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Continue with order even if email fails
      // In production, you might want to handle this differently
    }

    // Generate order ID
    const orderId = `ORD-${Date.now()}`;

    // Return success response
    return NextResponse.json(
      {
        success: true,
        orderId,
        message: 'Order placed successfully',
        order,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Order creation error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return NextResponse.json(
      { message: `Failed to process order: ${errorMessage}` },
      { status: 500 }
    );
  }
}
