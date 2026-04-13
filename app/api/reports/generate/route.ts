import { NextRequest, NextResponse } from 'next/server';
import { generateReportFromScan } from '@/lib/data';
import { z } from 'zod';

// POST /api/reports/generate - Generate a report from a scan
const generateReportSchema = z.object({
  scanId: z.string().min(1, 'Scan ID is required'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = generateReportSchema.parse(body);

    const report = await generateReportFromScan(validatedData.scanId);

    return NextResponse.json({ report }, { status: 201 });
  } catch (error) {
    console.error('Error generating report:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    if (error instanceof Error && error.message === 'Scan not found') {
      return NextResponse.json(
        { error: 'Scan not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to generate report' },
      { status: 500 }
    );
  }
}
