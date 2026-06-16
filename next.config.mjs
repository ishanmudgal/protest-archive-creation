// When deploying to GitHub Pages, the site is served from a sub-path:
//   https://<username>.github.io/<repo-name>/
// The GitHub Actions workflow sets GITHUB_PAGES=true so the base path and
// static export are only applied for that build. Local dev and Vercel are
// unaffected (they serve from the root).
const isGithubPages = process.env.GITHUB_PAGES === 'true'
const repoName = 'protest-archive-creation'

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  ...(isGithubPages
    ? {
        output: 'export',
        basePath: `/${repoName}`,
        assetPrefix: `/${repoName}/`,
        trailingSlash: true,
      }
    : {}),
}

export default nextConfig
