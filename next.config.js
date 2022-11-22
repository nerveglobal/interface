//ts-check

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	env: {
		infuraKey: process.env.INFURA_KEY,
		alchemyKey: process.env.ALCHEMY_KEY,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
};

module.exports = nextConfig;
