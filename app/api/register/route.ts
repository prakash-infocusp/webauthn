export async function POST(req) {
  try {
    const { username } = await req.json();
    if (!username)
      return new Response(JSON.stringify({ error: "Username is required" }), {
        status: 400,
      });
    return new Response(
      JSON.stringify({ message: `User ${username} registered successfully` }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
