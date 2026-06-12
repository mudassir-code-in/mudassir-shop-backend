export function generateOtp() {
    return Math.floor(100000 * Math.random() + 900000).toString();
};

export function getOtpHtml(otp) {
    return `<div style="font-family: Arial, sans-serif; max-width: 400px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; text-align: center;">
        <h2 style="color: #333; margin-bottom: 5px;">Verification Code</h2>
        <p style="color: #666; font-size: 14px; margin-top: 0;">Please use the OTP below to verify your account.</p>
        
        <div style="background-color: #f4f6f8; padding: 15px; border-radius: 6px; font-size: 28px; font-weight: bold; letter-spacing: 5px; color: #007bff; margin: 20px 0;">
            ${otp}
        </div>
        
        <p style="color: #999; font-size: 12px; margin-bottom: 0;">This OTP is valid for 5 minutes. Do not share it with anyone.</p>
    </div>
    `;
};