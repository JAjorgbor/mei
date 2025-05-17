export async function GET() {
  return Response.json({ authSecret: process.env.AUTH_SECRET })
}
