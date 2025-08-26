import { getServerSession } from "next-auth";

export default async function Details() {
  const session = await getServerSession();
  console.log(session);

  return <div>Details Page</div>;
}