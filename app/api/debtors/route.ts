import { NextResponse } from "next/server";

// Mock database (replace with your actual DB logic)
const debtors: { name: string; amountOwed: number; debtDate: string; isPaidOff: boolean }[] = [];

// GET: Fetch all debtors
export async function GET() {
  return NextResponse.json({ success: true, data: debtors });
}

// POST: Add or update a debtor
export async function POST(request: Request) {
  const { name, amountOwed, debtDate, isPaidOff } = await request.json();

  if (!name || amountOwed == null) {
    return NextResponse.json({ success: false, message: "Name and amount are required" }, { status: 400 });
  }

  const existingDebtor = debtors.find((debtor) => debtor.name === name);

  if (existingDebtor) {
    existingDebtor.amountOwed = isPaidOff ? amountOwed : existingDebtor.amountOwed + amountOwed;
    existingDebtor.debtDate = debtDate || new Date().toISOString();
    existingDebtor.isPaidOff = isPaidOff ?? false;
  } else {
    debtors.push({
      name,
      amountOwed,
      debtDate: debtDate || new Date().toISOString(),
      isPaidOff: isPaidOff ?? false,
    });
  }

  return NextResponse.json({ success: true, message: "Debtor added/updated successfully" });
}

// PUT: Mark a debtor as paid off
export async function PUT(request: Request) {
  const { name } = await request.json();

  if (!name) {
    return NextResponse.json({ success: false, message: "Name is required" }, { status: 400 });
  }

  const debtor = debtors.find((debtor) => debtor.name === name);
  if (!debtor) {
    return NextResponse.json({ success: false, message: "Debtor not found" }, { status: 404 });
  }

  debtor.isPaidOff = true;
  return NextResponse.json({ success: true, message: "Debt marked as paid off" });
}

// DELETE: Remove a debtor
export async function DELETE(request: Request) {
  const { name } = await request.json();

  if (!name) {
    return NextResponse.json({ success: false, message: "Name is required" }, { status: 400 });
  }

  const index = debtors.findIndex((debtor) => debtor.name === name);
  if (index === -1) {
    return NextResponse.json({ success: false, message: "Debtor not found" }, { status: 404 });
  }

  debtors.splice(index, 1);
  return NextResponse.json({ success: true, message: "Debtor removed successfully" });
}
