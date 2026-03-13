import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const companyId = params.id;

    // Get category IDs
    const categoriesRes = await query(
      `SELECT c.id FROM categories c
       JOIN company_categories cc ON c.id = cc.category_id
       WHERE cc.company_id = $1`,
      [companyId]
    );

    // Get feature IDs
    const featuresRes = await query(
      `SELECT f.id FROM features f
       JOIN company_features cf ON f.id = cf.feature_id
       WHERE cf.company_id = $1`,
      [companyId]
    );

    // Get integration IDs
    const integrationsRes = await query(
      `SELECT i.id FROM integrations i
       JOIN company_integrations ci ON i.id = ci.integration_id
       WHERE ci.company_id = $1`,
      [companyId]
    );

    // Get certification IDs
    const certificationsRes = await query(
      `SELECT c.id FROM certifications c
       JOIN company_certifications cc ON c.id = cc.certification_id
       WHERE cc.company_id = $1`,
      [companyId]
    );

    // Get badge IDs
    const badgesRes = await query(
      `SELECT b.id FROM badges b
       JOIN company_badges cb ON b.id = cb.badge_id
       WHERE cb.company_id = $1`,
      [companyId]
    );

    return NextResponse.json({
      categories: categoriesRes.rows.map((r) => r.id),
      features: featuresRes.rows.map((r) => r.id),
      integrations: integrationsRes.rows.map((r) => r.id),
      certifications: certificationsRes.rows.map((r) => r.id),
      badges: badgesRes.rows.map((r) => r.id),
    });
  } catch (error) {
    console.error('Error fetching company relations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch company relations' },
      { status: 500 }
    );
  }
}
