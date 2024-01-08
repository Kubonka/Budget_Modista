type TRoute = string[];
//$public routes
export const publicRoutes: TRoute = ["/"];
//$auth routes
export const authRoutes: TRoute = ["/auth/login", "/auth/logout"];
//$authentication purposes routes
export const apiAuthPrefix = "/api/auth";
//$default redirect
export const DEFAULT_LOGIN_REDIRECT = "/all-budgets";
