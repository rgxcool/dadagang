import { Resend } from 'resend';
import { OrderData } from '@/types/order';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderEmail(order: OrderData, adminEmail: string) {
  const mapsUrl = order.mapsUrl || 'N/A';
  
  const emailContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #16a34a; color: white; padding: 20px; border-radius: 8px; }
    .section { margin: 20px 0; }
    .label { font-weight: bold; color: #16a34a; }
    .order-item { background-color: #f0f0f0; padding: 15px; border-radius: 8px; margin: 10px 0; }
    .total { font-size: 20px; font-weight: bold; color: #16a34a; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📦 New Order Received</h1>
    </div>
    
    <div class="section">
      <h2>Order Details</h2>
      <div class="order-item">
        <p><span class="label">Product:</span> ${order.productName}</p>
        <p><span class="label">Quantity:</span> ${order.quantity} unit(s)</p>
        <p><span class="label">Unit Price:</span> ₹${order.price}</p>
        <p><span class="label">Delivery Charge:</span> ₹${order.deliveryCharge}</p>
      </div>
    </div>
    
    <div class="section">
      <h2>Customer Information</h2>
      <p><span class="label">Name:</span> ${order.customerName}</p>
      <p><span class="label">Phone:</span> ${order.phoneNumber}</p>
      <p><span class="label">Address:</span> ${order.address}</p>
      <p><span class="label">Requested Delivery Time:</span> ${order.deliveryTime}</p>
    </div>
    
    <div class="section">
      <h2>Location</h2>
      <p><span class="label">Coordinates:</span> ${order.latitude}, ${order.longitude}</p>
      <p><span class="label">Google Maps Link:</span> <a href="${mapsUrl}">${mapsUrl}</a></p>
    </div>
    
    ${order.notes ? `
    <div class="section">
      <h2>Customer Notes</h2>
      <p>${order.notes}</p>
    </div>
    ` : ''}
    
    <div class="section">
      <div class="total">Total Amount: ₹${order.totalPrice}</div>
    </div>
    
    <div class="section" style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
      <p>Order created at: ${new Date(order.createdAt).toLocaleString()}</p>
    </div>
  </div>
</body>
</html>
  `;

  try {
    const response = await resend.emails.send({
      from: 'orders@drinkdelivery.com',
      to: adminEmail,
      subject: `New Order - ${order.productName} (Qty: ${order.quantity})`,
      html: emailContent,
    });

    return { success: true, messageId: response.data?.id };
  } catch (error) {
    console.error('Email send error:', error);
    throw error;
  }
}
