// app/api/dailyRecord/route.ts
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import DailyRecord from '@/models/DailyRecord';

export async function POST(req: Request) {
  try {
    // Connect to MongoDB
    await connectToDatabase();

    // Parse the request body
    const data = await req.json();

    // Create a new daily record
    const newRecord = new DailyRecord({
      date: new Date(data.date),
      stockItems: data.stockItems,
      otherExpenses: data.otherExpenses,
      stockTotal: data.stockTotal,
      otherExpensesTotal: data.otherExpensesTotal,
      grandTotal: data.grandTotal,
    });

    // Save the record to MongoDB
    await newRecord.save();

    return NextResponse.json({ success: true, message: 'Record saved successfully!' });
  } catch (error) {
    console.error('Error saving record:', error);
    return NextResponse.json({ success: false, message: 'Error saving record.' }, { status: 500 });
  }
}

// GET METHOD
export async function GET() {
  try {
     await connectToDatabase();

    // Fetch data from the collection
    const data = await DailyRecord.find();

    // Respond with the fetched data
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch data from MongoDB." },
      { status: 500 }
    );
  }
}