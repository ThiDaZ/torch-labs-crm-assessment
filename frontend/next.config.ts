import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	async rewrites() {

    if(!process.env.API_URL) {
      throw new Error("CRITICAL: BACKEND_URL environment variable is missing!");
    }

		return [
			{
				source: "/api/:path*",
				destination: `${process.env.API_URL}/:path*`,
			},
		];
	},
};

export default nextConfig;
