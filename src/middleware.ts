import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";

const publicRoutes = [
  { path: "/sign-in", whenAuthenticated: "redirect" },
  { path: "/details", whenAuthenticated: "next" },
] as const;

const privateRoutes = [
  { path: "/admin/**", role: "admin" },
  { path: "/client/**", role: "client" },
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/sign-in";

function decodeMockJWT(token: string) {
  try {
    const payloadBase64 = token.split(".")[1];
    return JSON.parse(Buffer.from(payloadBase64, "base64url").toString());
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const publicRoute = publicRoutes.find((route) => route.path === path);
  const privateRoute = privateRoutes.find((route) => {
    const routePattern = new RegExp("^" + route.path.replace(/\*\*/g, ".*") + "$");
    return routePattern.test(path);
  });

  const authToken = request.cookies.get("token");

  if (!authToken && publicRoute) {
    return NextResponse.next();
  }

  if (!authToken && privateRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;
    return NextResponse.redirect(redirectUrl);
  }

  if (authToken && publicRoute?.whenAuthenticated === "redirect") {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/";
    return NextResponse.redirect(redirectUrl);
  }

  if (authToken && privateRoute) {
    const token = authToken.value;
    const user = decodeMockJWT(token);
    console.log("Decoded user from token:", user);
    if (!user) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;
      return NextResponse.redirect(redirectUrl);
    }

    const userRole = user.role as string;

    if (privateRoute.role && privateRoute.role !== userRole) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/unauthorized";
      return NextResponse.redirect(redirectUrl);
    }

    return NextResponse.next();
  }


  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
