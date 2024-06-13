import { NextResponse } from "next/server";
import {
  withAuth,
  NextRequestWithAuth,
  NextAuthMiddlewareOptions,
} from "next-auth/middleware";

const middleware = (request: NextRequestWithAuth) => {
  const isPrivateRoutes = request.nextUrl.pathname.startsWith("/dashboard");
  const isLoggedUser = request.nextauth?.token;

  if (isPrivateRoutes && !isLoggedUser) {
    return NextResponse.rewrite(new URL("/denied", request.url));
  }
};

const callbackOptions: NextAuthMiddlewareOptions = {};

export default withAuth(middleware, callbackOptions);

export const config = {
  matcher: "/dashboard",
};
