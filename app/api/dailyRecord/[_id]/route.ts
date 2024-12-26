import { NextResponse } from "next/server";
import connectToDatabase from '@/lib/mongodb';
import { Types } from "mongoose";
import DailyRecord from "@/models/DailyRecord";

// GET /api/records/:id
export async function GET(request: Request,{ params }: { params: { _id: string } }) {
  const { _id } = params;

  if (!Types.ObjectId.isValid(_id)) {
    return NextResponse.json(
      { error: "Invalid record ID" },
      { status: 400 }
    );
  }

  try {
    await connectToDatabase();
    const record = await DailyRecord.findById(_id);

    if (!record) {
      return NextResponse.json(
        { error: "Record not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: record }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch the record" },
      { status: 500 }
    );
  }
}



// process.env.NEXT_PUBLIC_BASE_URL}/api/records/${_id}
