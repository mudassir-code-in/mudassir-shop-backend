export function getOrderHtml(fullname, phonenumber, street, landmark, city, state, pincode, products, customOrderId) {

    let productRows = '';
    products.forEach(item => {
    const productName = item.productId?.name || "Product Name Unavailable";
    const productDesc = item.productId?.description || "No description provided";
    const productPrice = item.productId?.price || 0;
    

    const itemTotal = productPrice * item.quantity;

    productRows += `
        <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-size: 14px; color: #333;">
                <b>${productName}</b>
            </td>
            <td style="padding: 10px; border: 1px solid #ddd; font-size: 13px; color: #555;">
                ${productDesc}
            </td>
            <td style="padding: 10px; border: 1px solid #ddd; text-align: center; font-size: 14px;">
                ${item.quantity}
            </td>
            <td style="padding: 10px; border: 1px solid #ddd; text-align: right; font-size: 14px; color: #2c3e50;">
                ₹${productPrice}
            </td>
            <td style="padding: 10px; border: 1px solid #ddd; text-align: right; font-size: 14px; font-weight: bold; color: #27ae60;">
                ₹${itemTotal}
            </td>
        </tr>
    `;
});

    return `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 700px; margin: 0 auto; padding: 25px; border: 1px solid #e0e0e0; border-radius: 8px; color: #333; background-color: #ffffff;">
            
            <div style="background-color: #2c3e50; padding: 15px; border-radius: 6px 6px 0 0; text-align: center;">
                <h2 style="color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 1px;">🚨 New order recieved! 🎉</h2>
            </div>
            
            <div style="margin-top: 20px; padding: 10px; background-color: #ebf5fb; border-left: 4px solid #3498db; font-size: 14px;">
                <b>Order ID (Unique ID): ${customOrderId}</b> <br/>
                <b>Customer:</b> ${fullname} | <b>Phone:</b> ${phonenumber}
            </div>
            
            <h3 style="color: #2c3e50; border-bottom: 2px solid #f2f2f2; padding-bottom: 8px; margin-top: 25px;">📦 Ordered Products</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
                <thead>
                    <tr style="background-color: #f8f9fa; border-bottom: 2px solid #ddd;">
                        <th style="padding: 10px; border: 1px solid #ddd; text-align: left; font-size: 13px; color: #555; width: 25%;">Product Details</th>
                        <th style="padding: 10px; border: 1px solid #ddd; text-align: left; font-size: 13px; color: #555; width: 35%;">Description</th>
                        <th style="padding: 10px; border: 1px solid #ddd; text-align: center; font-size: 13px; color: #555; width: 10%;">Qty</th>
                        <th style="padding: 10px; border: 1px solid #ddd; text-align: right; font-size: 13px; color: #555; width: 15%;">Price</th>
                        <th style="padding: 10px; border: 1px solid #ddd; text-align: right; font-size: 13px; color: #555; width: 15%;">Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${productRows}
                </tbody>
            </table>
            
            <h3 style="color: #2c3e50; border-bottom: 2px solid #f2f2f2; padding-bottom: 8px;">🏠 Delivery Address</h3>
            <div style="background-color: #fdfefe; padding: 15px; border: 1px dashed #2ecc71; border-radius: 6px; line-height: 1.6; font-size: 14px; color: #2c3e50;">
                <p style="margin: 0 0 5px 0;"><b>Name:</b> ${fullname}</p>
                <p style="margin: 0 0 5px 0;"><b>Street/Address:</b> ${street}</p>
                <p style="margin: 0 0 5px 0;"><b>Landmark:</b> ${landmark || 'N/A'}</p>
                <p style="margin: 0 0 5px 0;"><b>City/Village:</b> ${city}</p>
                <p style="margin: 0 0 5px 0;"><b>State:</b> ${state}</p>
                <p style="margin: 0;"><b>Pincode:</b> <span style="background-color: #f1c40f; padding: 2px 6px; border-radius: 3px; font-weight: bold; color: #000;">${pincode}</span></p>
            </div>
            
            <hr style="border: 0; border-top: 1px solid #eee; margin-top: 30px; margin-bottom: 15px;">
            <p style="font-size: 11px; color: #95a5a6; text-align: center; margin: 0;">
                This is a system-generated email. Please process, pack, and dispatch the order at the earliest.
            </p>
        </div>
    `;
}