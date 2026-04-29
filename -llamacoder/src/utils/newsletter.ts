// Newsletter utility functions

export interface NewsletterSchedule {
  nextSendDate: Date;
  daysUntil: number;
  time: string;
}

export function getNextMondayNewsletter(): NewsletterSchedule {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
  
  // Calculate days until next Monday
  let daysUntilMonday: number;
  
  if (dayOfWeek === 1) {
    // Today is Monday
    const currentHour = now.getHours();
    if (currentHour < 9) {
      // Before 9 AM, send today
      daysUntilMonday = 0;
    } else {
      // After 9 AM, send next Monday
      daysUntilMonday = 7;
    }
  } else if (dayOfWeek === 0) {
    // Sunday
    daysUntilMonday = 1;
  } else {
    // Tuesday through Saturday
    daysUntilMonday = 8 - dayOfWeek;
  }
  
  const nextSendDate = new Date(now);
  nextSendDate.setDate(now.getDate() + daysUntilMonday);
  nextSendDate.setHours(9, 0, 0, 0); // 9:00 AM CET
  
  return {
    nextSendDate,
    daysUntil: daysUntilMonday,
    time: "9:00 AM CET"
  };
}

export function formatNewsletterDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  };
  return date.toLocaleDateString('en-US', options);
}

// Simulated subscriber list (in production, this would be a database)
export interface Subscriber {
  email: string;
  name: string;
  subscribedAt: Date;
  isActive: boolean;
}

// Email template for Tool of the Week
export function generateNewsletterEmail(toolName: string, toolDescription: string, toolUrl: string): string {
  return `
    <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #0a0a0a; padding: 40px 20px; text-align: center;">
        <h1 style="color: #ffffff; font-size: 24px; margin-bottom: 8px;">
          🔧 Tool of the Week
        </h1>
        <p style="color: #737373; font-size: 14px;">Your weekly AI tool recommendation from ArchAI</p>
      </div>
      
      <div style="background: #171717; padding: 40px 20px;">
        <h2 style="color: #ffffff; font-size: 20px; margin-bottom: 16px;">
          ${toolName}
        </h2>
        <p style="color: #a3a3a3; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
          ${toolDescription}
        </p>
        <a href="${toolUrl}" style="display: inline-block; background: #ffffff; color: #000000; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600;">
          Explore Tool →
        </a>
      </div>
      
      <div style="background: #0a0a0a; padding: 20px; text-align: center;">
        <p style="color: #525252; font-size: 12px;">
          You're receiving this because you subscribed to ArchAI Premium.
          <br />
          <a href="#" style="color: #737373;">Unsubscribe</a> · 
          <a href="#" style="color: #737373;">View in browser</a>
        </p>
      </div>
    </div>
  `;
}

// Function to send newsletter to all subscribers (simulated)
export async function sendMondayNewsletter(subscribers: Subscriber[]): Promise<{ success: boolean; sent: number }> {
  // In production, this would integrate with an email service like SendGrid, Mailgun, or AWS SES
  console.log(`📧 Sending newsletter to ${subscribers.length} subscribers...`);
  
  // Simulate sending delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    success: true,
    sent: subscribers.length
  };
}