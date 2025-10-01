import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { API_URL } from "@/utils/constants";
import { pipeline } from "stream/promises";

const secret = process.env.NEXTAUTH_SECRET;

const nextProxy = async (req: NextApiRequest, res: NextApiResponse) => {
    // The token type will be inferred from your JWT session strategy
    // See the type augmentation section below for custom properties
    const token = await getToken({ req, secret });

    // Construct the full target URL
    const targetUrl = new URL(req.url!.replace("/api/proxy", ""), API_URL);

    // Explicitly type the headers object
    const headers: Record<string, any> = { ...req.headers };
    delete headers.host;

    // Don't forward cookies to the target server
    headers.cookie = "";
    headers["x-device-type"] = "pc";

    // Add authentication headers if a token exists
    if (token) {
        // These properties will now have type safety
        headers["x-tenant-name"] = token.tenantName;
        headers.Authorization = `Bearer ${token.accessToken}`;
    }

    try {
        const proxyRes = await fetch(targetUrl.toString(), {
            method: req.method,
            headers: headers as HeadersInit, // Cast to HeadersInit for fetch
            // The body can be a ReadableStream, which `req` is.
            body: req.method !== "GET" && req.method !== "HEAD" ? req : null,
            // duplex: 'half' is required for streaming request bodies in Node
            // @ts-ignore - This property may not be in all TypeScript versions
            duplex: "half",
        });

        // Copy status and headers from the proxy response to the client response
        res.statusCode = proxyRes.status;
        proxyRes.headers.forEach((value, key) => {
            res.setHeader(key, value);
        });

        // Stream the proxy response body to the client
        if (proxyRes.body) {
            await pipeline(proxyRes.body as any, res);
        } else {
            res.end();
        }
    } catch (error) {
        console.error("Proxy Error:", error);
        res.status(502).json({ status: 502, message: "Error connecting to the API service." });
    }
};

export default nextProxy;

export const config = {
    api: {
        bodyParser: false,
        responseLimit: false,
    },
};