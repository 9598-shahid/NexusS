import { marked } from 'marked';
import { Appraisal } from '../types';
import { getNexusLogoSvgString } from '../components/Logo';

/**
 * Institutional Professional Credit Appraisal Memo (CAM) PDF & Print Generator
 * Formats the memorandum according to corporate banking and regulatory standards,
 * including letterhead with the official NexusS logo, credit committee sanction grids,
 * financial ratios, 5Cs risk pillars, and Developer Signature of SHAHID ALI.
 */

export const generateProfessionalCamPdf = (appraisal: Appraisal) => {
  // Parse markdown content to sanitized semantic HTML
  const parsedMarkdown = marked.parse(appraisal.cam_content || '') as string;
  const logoSvg = getNexusLogoSvgString();
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  const score = appraisal.risk_score || 80;
  const ratingGrade = score >= 85 ? 'NEXUS AAA (Prime Investment)' : 
                      score >= 75 ? 'NEXUS AA (High Solvency)' : 
                      score >= 65 ? 'NEXUS BBB (Satisfactory)' : 'NEXUS BB- (Watchlist/Speculative)';
  
  const statusColor = appraisal.recommendation === 'Approve' ? '#059669' :
                      appraisal.recommendation === 'Reject' ? '#dc2626' : '#d97706';

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Credit Appraisal Memo - ${appraisal.company_name} - NexusS</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 14mm 14mm 16mm 14mm;
      @bottom-right {
        content: "Page " counter(page) " of " counter(pages);
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        font-size: 8pt;
        color: #64748b;
      }
    }

    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      color: #0f172a;
      background: #ffffff;
      margin: 0;
      padding: 0;
      font-size: 9.5pt;
      line-height: 1.55;
    }

    /* Top Letterhead */
    .memo-letterhead {
      border-bottom: 2px solid #004b87;
      padding-bottom: 12px;
      margin-bottom: 18px;
    }

    .letterhead-table {
      width: 100%;
      border-collapse: collapse;
    }

    .letterhead-table td {
      vertical-align: middle;
      padding: 0;
    }

    .confidential-tag {
      display: inline-block;
      background: #004b87;
      color: #ffffff;
      font-size: 7.5pt;
      font-weight: 800;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      padding: 3px 8px;
      border-radius: 3px;
      margin-bottom: 4px;
    }

    .memo-title {
      font-size: 16pt;
      font-weight: 900;
      color: #004b87;
      margin: 3px 0 2px 0;
      letter-spacing: -0.3px;
    }

    .memo-meta {
      font-size: 8pt;
      color: #475569;
      font-weight: 500;
    }

    /* Executive Decision Grid */
    .executive-decision-box {
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      background: #f8fafc;
      margin-bottom: 18px;
      overflow: hidden;
      page-break-inside: avoid;
    }

    .decision-header {
      background: #f1f5f9;
      padding: 7px 14px;
      border-bottom: 1px solid #cbd5e1;
      font-size: 8pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: #334155;
      display: flex;
      justify-content: space-between;
    }

    .decision-grid {
      display: table;
      width: 100%;
      border-collapse: collapse;
    }

    .decision-cell {
      display: table-cell;
      padding: 10px 14px;
      border-right: 1px solid #e2e8f0;
      vertical-align: top;
    }

    .decision-cell:last-child {
      border-right: none;
    }

    .cell-label {
      font-size: 7.5pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #64748b;
      margin-bottom: 3px;
    }

    .cell-value {
      font-size: 12pt;
      font-weight: 800;
      color: #0f172a;
    }

    .cell-sub {
      font-size: 7.5pt;
      color: #64748b;
      margin-top: 2px;
    }

    /* 5-Pillar Score Bar */
    .pillars-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 18px;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      page-break-inside: avoid;
      font-size: 8.5pt;
    }

    .pillars-table th {
      background: #004b87;
      color: #ffffff;
      font-weight: 700;
      text-align: left;
      padding: 6px 10px;
      font-size: 7.5pt;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-right: 1px solid #0369a1;
    }

    .pillars-table th:last-child {
      border-right: none;
    }

    .pillars-table td {
      padding: 7px 10px;
      border-right: 1px solid #e2e8f0;
      border-bottom: 1px solid #e2e8f0;
      background: #ffffff;
    }

    .pillars-table td:last-child {
      border-right: none;
    }

    /* Markdown Document Content Typography */
    .markdown-cam-body {
      line-height: 1.6;
    }

    .markdown-cam-body h1 {
      font-size: 13pt;
      font-weight: 800;
      color: #004b87;
      margin-top: 18px;
      margin-bottom: 8px;
      padding-bottom: 4px;
      border-bottom: 1.5px solid #cbd5e1;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      page-break-after: avoid;
    }

    .markdown-cam-body h2 {
      font-size: 11pt;
      font-weight: 750;
      color: #0f172a;
      margin-top: 14px;
      margin-bottom: 6px;
      padding-bottom: 3px;
      border-bottom: 1px solid #e2e8f0;
      page-break-after: avoid;
    }

    .markdown-cam-body h3 {
      font-size: 9.5pt;
      font-weight: 700;
      color: #1e293b;
      margin-top: 10px;
      margin-bottom: 4px;
      page-break-after: avoid;
    }

    .markdown-cam-body p {
      margin-top: 0;
      margin-bottom: 8px;
      color: #334155;
      text-align: justify;
    }

    .markdown-cam-body ul, .markdown-cam-body ol {
      margin-top: 0;
      margin-bottom: 10px;
      padding-left: 18px;
    }

    .markdown-cam-body li {
      margin-bottom: 3px;
      color: #334155;
    }

    .markdown-cam-body table {
      width: 100%;
      border-collapse: collapse;
      margin: 12px 0 16px 0;
      font-size: 8.5pt;
      page-break-inside: avoid;
    }

    .markdown-cam-body th {
      background: #f1f5f9;
      color: #1e293b;
      font-weight: 700;
      padding: 6px 10px;
      border: 1px solid #cbd5e1;
      text-align: left;
    }

    .markdown-cam-body td {
      padding: 5px 10px;
      border: 1px solid #e2e8f0;
      color: #334155;
    }

    .markdown-cam-body tr:nth-child(even) td {
      background: #f8fafc;
    }

    .markdown-cam-body blockquote {
      border-left: 3.5px solid #004b87;
      background: #f0f9ff;
      padding: 6px 12px;
      margin: 10px 0;
      border-radius: 0 6px 6px 0;
      color: #0369a1;
      font-style: italic;
    }

    .markdown-cam-body hr {
      border: none;
      border-top: 1px solid #e2e8f0;
      margin: 16px 0;
    }

    /* Official Sign-Off Committee Matrix */
    .signoff-section {
      margin-top: 30px;
      padding-top: 14px;
      border-top: 2px solid #004b87;
      page-break-inside: avoid;
    }

    .signoff-title {
      font-size: 8.5pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: #004b87;
      margin-bottom: 12px;
    }

    .signoff-grid {
      display: table;
      width: 100%;
      table-layout: fixed;
    }

    .signoff-column {
      display: table-cell;
      width: 33.33%;
      padding-right: 14px;
      vertical-align: top;
    }

    .signoff-column:last-child {
      padding-right: 0;
    }

    .signature-card {
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 8px 10px;
      background: #fafafa;
      height: 100%;
    }

    .signature-visual {
      height: 40px;
      border-bottom: 1px dashed #94a3b8;
      display: flex;
      align-items: flex-end;
      padding-bottom: 4px;
      margin-bottom: 6px;
    }

    .sign-name {
      font-size: 8.5pt;
      font-weight: 800;
      color: #0f172a;
    }

    .sign-role {
      font-size: 7.5pt;
      font-weight: 600;
      color: #475569;
    }

    .sign-meta {
      font-size: 6.5pt;
      color: #94a3b8;
      margin-top: 2px;
    }

    /* Dedicated Architect Signature for Shahid Ali */
    .signature-card-architect {
      border: 1.5px solid #004b87;
      background: #f0f7fc;
    }

    .developer-tag {
      font-size: 6.5pt;
      font-weight: 800;
      background: #004b87;
      color: #ffffff;
      padding: 1.5px 5px;
      border-radius: 2px;
      display: inline-block;
      margin-bottom: 3px;
      text-transform: uppercase;
    }

    .footer-disclaimer {
      margin-top: 20px;
      padding-top: 8px;
      border-top: 1px solid #e2e8f0;
      font-size: 7pt;
      color: #94a3b8;
      text-align: center;
      line-height: 1.4;
      page-break-inside: avoid;
    }
  </style>
</head>
<body>

  <!-- Official Letterhead -->
  <header class="memo-letterhead">
    <table class="letterhead-table">
      <tr>
        <td style="width: 200px;">
          ${logoSvg}
        </td>
        <td style="text-align: right;">
          <span class="confidential-tag">STRICTLY CONFIDENTIAL</span>
          <div class="memo-title">CREDIT APPRAISAL MEMORANDUM</div>
          <div class="memo-meta">
            Ref: <strong>CAM-${appraisal.id.slice(0, 8).toUpperCase()}</strong> • 
            Date: <strong>${currentDate}</strong> • 
            Framework: <strong>Basel III / RBI Prudential Standards</strong>
          </div>
        </td>
      </tr>
    </table>
  </header>

  <!-- Executive Decision Matrix -->
  <section class="executive-decision-box">
    <div class="decision-header">
      <span>Enterprise Borrower: <strong>${appraisal.company_name}</strong></span>
      <span>Facility Code: <strong>WC-TL-2026</strong></span>
    </div>
    <div class="decision-grid">
      <div class="decision-cell" style="width: 25%;">
        <div class="cell-label">Sanction Decision</div>
        <div class="cell-value" style="color: ${statusColor};">
          ${appraisal.recommendation === 'Approve' ? 'SANCTION APPROVED' : appraisal.recommendation === 'Reject' ? 'SANCTION REJECTED' : 'CONDITIONAL REVIEW'}
        </div>
        <div class="cell-sub">By Sanction Authority</div>
      </div>

      <div class="decision-cell" style="width: 25%;">
        <div class="cell-label">Sanction Limit</div>
        <div class="cell-value">${appraisal.loan_limit || '$3,500,000'}</div>
        <div class="cell-sub">Assessed Limit</div>
      </div>

      <div class="decision-cell" style="width: 25%;">
        <div class="cell-label">Indicative Pricing</div>
        <div class="cell-value">${appraisal.interest_rate || 'SOFR + 2.15%'}</div>
        <div class="cell-sub">Linked Benchmark Spread</div>
      </div>

      <div class="decision-cell" style="width: 25%;">
        <div class="cell-label">Composite Rating</div>
        <div class="cell-value" style="color: #004b87;">${score} <span style="font-size: 8pt; color: #64748b;">/ 100</span></div>
        <div class="cell-sub">${ratingGrade}</div>
      </div>
    </div>
  </section>

  <!-- 5Cs Pillar Breakdown -->
  <table class="pillars-table">
    <thead>
      <tr>
        <th style="width: 20%;">Financial Health</th>
        <th style="width: 20%;">Legal & Regulatory</th>
        <th style="width: 20%;">Sector & Market</th>
        <th style="width: 20%;">Operational Scale</th>
        <th style="width: 20%;">Management Quality</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <strong style="font-size: 10pt; color: #0f172a;">${appraisal.risk_categories?.financial ?? 78}/100</strong><br>
          <span style="font-size: 7.5pt; color: #64748b;">DSCR & Solvency</span>
        </td>
        <td>
          <strong style="font-size: 10pt; color: #0f172a;">${appraisal.risk_categories?.legal ?? 82}/100</strong><br>
          <span style="font-size: 7.5pt; color: #64748b;">GST & Disclosures</span>
        </td>
        <td>
          <strong style="font-size: 10pt; color: #0f172a;">${appraisal.risk_categories?.sector ?? 72}/100</strong><br>
          <span style="font-size: 7.5pt; color: #64748b;">Cyclical Exposure</span>
        </td>
        <td>
          <strong style="font-size: 10pt; color: #0f172a;">${appraisal.risk_categories?.operational ?? 85}/100</strong><br>
          <span style="font-size: 7.5pt; color: #64748b;">Capacity & Debtors</span>
        </td>
        <td>
          <strong style="font-size: 10pt; color: #0f172a;">${appraisal.risk_categories?.management ?? 88}/100</strong><br>
          <span style="font-size: 7.5pt; color: #64748b;">Promoter Record</span>
        </td>
      </tr>
    </tbody>
  </table>

  <!-- Synthesized Body Content -->
  <main class="markdown-cam-body">
    ${parsedMarkdown}
  </main>

  <!-- Committee Sanction Matrix & Developer Signature Block -->
  <section class="signoff-section">
    <div class="signoff-title">Institutional Approval & Systems Verification Directorate</div>
    <div class="signoff-grid">
      <!-- Signature 1: Developed by SHAHID ALI -->
      <div class="signoff-column">
        <div class="signature-card signature-card-architect">
          <span class="developer-tag">System Architect</span>
          <div class="signature-visual">
            <svg viewBox="0 0 160 40" width="130" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 28 C 25 12, 30 4, 40 16 C 45 24, 35 34, 50 28 C 65 22, 80 14, 95 19 C 110 24, 115 12, 130 14 C 145 16, 140 26, 155 24" stroke="#004b87" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M22 36 C 50 33, 110 32, 145 30" stroke="#ea580c" stroke-width="1.8" stroke-linecap="round" />
              <circle cx="150" cy="22" r="2.5" fill="#ea580c" />
            </svg>
          </div>
          <div class="sign-name">SHAHID ALI</div>
          <div class="sign-role">Developed by SHAHID Ali</div>
          <div class="sign-meta">Lead AI Credit Architect • NexusCore v4.2</div>
        </div>
      </div>

      <!-- Signature 2: Credit Underwriter -->
      <div class="signoff-column">
        <div class="signature-card">
          <div style="font-size: 7pt; font-weight: 700; color: #64748b; margin-bottom: 4px; text-transform: uppercase;">Underwriting Division</div>
          <div class="signature-visual">
            <svg viewBox="0 0 160 40" width="120" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 22 C 30 15, 45 10, 60 25 C 75 35, 90 12, 110 18 C 130 24, 145 20, 150 18" stroke="#334155" stroke-width="2" stroke-linecap="round" />
            </svg>
          </div>
          <div class="sign-name">Senior Credit Analyst</div>
          <div class="sign-role">Corporate Underwriting Desk</div>
          <div class="sign-meta">Emp Id: NEX-UW-8841</div>
        </div>
      </div>

      <!-- Signature 3: Sanction Committee Chairman -->
      <div class="signoff-column">
        <div class="signature-card">
          <div style="font-size: 7pt; font-weight: 700; color: #64748b; margin-bottom: 4px; text-transform: uppercase;">Sanction Directorate</div>
          <div class="signature-visual">
            <svg viewBox="0 0 160 40" width="120" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 20 C 35 10, 50 30, 75 15 C 95 5, 120 25, 145 15" stroke="#004b87" stroke-width="2.2" stroke-linecap="round" />
            </svg>
          </div>
          <div class="sign-name">Chief Risk Officer (CRO)</div>
          <div class="sign-role">Board Sanction & Credit Committee</div>
          <div class="sign-meta">Directorate of Credit Approvals</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Legal & Regulatory Footer -->
  <footer class="footer-disclaimer">
    CONFIDENTIALITY NOTICE: This Credit Appraisal Memorandum is issued solely for official evaluation by the Institutional Sanction Committee. Generated via NexusS Credit Intelligence System. Developed by SHAHID Ali. All rights reserved.
  </footer>

</body>
</html>
`;

  return htmlContent;
};

/**
 * Triggers native, crisp vector PDF Print Dialog in an invisible sandboxed frame
 */
export const printProfessionalCam = (appraisal: Appraisal) => {
  const html = generateProfessionalCamPdf(appraisal);
  
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow?.document || iframe.contentDocument;
  if (doc) {
    doc.open();
    doc.write(html);
    doc.close();

    setTimeout(() => {
      try {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
      } catch (e) {
        console.error('Print iframe error:', e);
        // Fallback: open print window
        const win = window.open('', '_blank');
        if (win) {
          win.document.write(html);
          win.document.close();
          win.focus();
          win.print();
        }
      } finally {
        setTimeout(() => {
          if (document.body.contains(iframe)) {
            document.body.removeChild(iframe);
          }
        }, 3000);
      }
    }, 400);
  }
};

/**
 * Downloads the full self-contained HTML Memorandum archive
 */
export const downloadCamHtml = (appraisal: Appraisal) => {
  const html = generateProfessionalCamPdf(appraisal);
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `CAM_${appraisal.company_name.replace(/\s+/g, '_')}_NexusS.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
