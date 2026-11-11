/**
 * Cloudflare Pages Function: /api/send-email
 *
 * Automatically executed on Cloudflare Pages when deployed via Git repository.
 * Reads BREVO_API_KEY from Cloudflare Pages Environment Variables (Settings > Environment Variables).
 */

interface Env {
  BREVO_API_KEY?: string;
  TGLC_ADMISSIONS_EMAIL?: string;
}

export const onRequestPost = async (context: { request: Request; env: Env }) => {
  try {
    const data = await context.request.json();
    const brevoApiKey = context.env.BREVO_API_KEY;

    if (!brevoApiKey) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'BREVO_API_KEY is not configured in Cloudflare Pages Environment Variables.',
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const admissionsEmail = context.env.TGLC_ADMISSIONS_EMAIL || 'info@thegloballuxuryconsortium.com';

    const brevoPayload = {
      sender: {
        name: 'TGLC Albemarle Admissions Desk',
        email: admissionsEmail,
      },
      to: [
        {
          email: admissionsEmail,
          name: 'TGLC Admissions Committee',
        },
      ],
      replyTo: {
        email: data.senderEmail,
        name: data.senderName,
      },
      subject: `[TGLC Confidential] ${data.subject || 'Introduction'} — ${data.senderName}`,
      htmlContent: data.htmlContent || `<p>Inquiry received from ${data.senderName} (${data.senderEmail}, ${data.telephone})</p>`,
    };

    const brevoRes = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': brevoApiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify(brevoPayload),
    });

    if (!brevoRes.ok) {
      const errText = await brevoRes.text();
      return new Response(
        JSON.stringify({ success: false, error: 'Brevo API call failed', details: errText }),
        { status: brevoRes.status, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const brevoData = await brevoRes.json();
    return new Response(
      JSON.stringify({ success: true, messageId: brevoData.messageId }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, error: err.message || 'Internal error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
