import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { Types } from "mongoose";
import DailyRecord from "@/models/DailyRecord";

export async function GET(request, { params }) {
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
