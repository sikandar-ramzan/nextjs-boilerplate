import { NextResponse } from "next/server";

export interface Status {
  status: string;
  message: string;
  uptime: string;
  memory: {
    rss: string;
    heapTotal: string;
    heapUsed: string;
  };
}

export async function GET(): Promise<NextResponse<Status>> {
  try {
    const uptime = process.uptime();
    const memory = process.memoryUsage();

    return NextResponse.json(
      {
        status: "On",
        message: "The app is running",
        uptime: `${uptime.toFixed(2)} seconds`,
        memory: {
          rss: `${(memory.rss / 1024 / 1024).toFixed(2)} MB`,
          heapTotal: `${(memory.heapTotal / 1024 / 1024).toFixed(2)} MB`,
          heapUsed: `${(memory.heapUsed / 1024 / 1024).toFixed(2)} MB`,
        },
      },
      { status: 200 }
    ) as NextResponse<Status>;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { status: "Error", message: "Failed to fetch status" },
      { status: 500 }
    ) as NextResponse<Status>;
  }
}
