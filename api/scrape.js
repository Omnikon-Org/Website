// api/scrape.js
// Vercel Serverless Function to fetch page metadata from an article URL

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const urlParam = req.query.url || req.body?.url;
  if (!urlParam) {
    return res.status(400).json({ error: 'URL query parameter is required' });
  }

  try {
    // Validate URL format
    const targetUrl = new URL(urlParam);

    // Fetch the target URL content
    const response = await fetch(targetUrl.toString(), {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
      }
    });

    if (!response.ok) {
      return res.status(502).json({ error: `Failed to fetch target page: status ${response.status}` });
    }

    const html = await response.text();

    // Extract Open Graph & meta tags using regex
    const getMetaTag = (propertyOrName) => {
      // Look for property="..." content="..." or name="..." content="..."
      const propRegex = new RegExp(`<meta[^>]+(?:property|name)=["']${propertyOrName}["'][^>]+content=["']([^"']+)["']`, 'i');
      const contentRegex = new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${propertyOrName}["']`, 'i');
      
      const match1 = html.match(propRegex);
      if (match1) return decodeHtmlEntities(match1[1]);
      
      const match2 = html.match(contentRegex);
      if (match2) return decodeHtmlEntities(match2[1]);
      
      return null;
    };

    const getTitleTag = () => {
      const match = html.match(/<title[^>]*>([^<]+)<\/title>/i);
      return match ? decodeHtmlEntities(match[1].trim()) : null;
    };

    // Helper to decode HTML entities
    function decodeHtmlEntities(text) {
      if (!text) return '';
      return text
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&#x27;/g, "'")
        .replace(/&ndash;/g, '–')
        .replace(/&mdash;/g, '—');
    }

    // Extract fields
    const title = getMetaTag('og:title') || getMetaTag('twitter:title') || getTitleTag() || 'Untitled Article';
    const description = getMetaTag('og:description') || getMetaTag('twitter:description') || getMetaTag('description') || '';
    const image = getMetaTag('og:image') || getMetaTag('twitter:image') || '';
    
    // Author heuristics
    let author = getMetaTag('author') || getMetaTag('og:article:author') || getMetaTag('twitter:creator') || '';
    
    // Date heuristics
    const publishedAt = getMetaTag('article:published_time') || getMetaTag('datePublished') || getMetaTag('og:article:published_time') || new Date().toISOString();

    // Determine Platform
    let platform = 'Personal Blog';
    const host = targetUrl.hostname.toLowerCase();
    if (host.includes('dev.to')) {
      platform = 'Dev.to';
      // Dev.to author heuristic: dev.to/username
      if (!author || author.trim() === '' || author.trim() === '@') {
        const pathParts = targetUrl.pathname.split('/');
        if (pathParts.length > 1 && pathParts[1]) {
          author = pathParts[1];
        }
      }
    } else if (host.includes('medium.com')) {
      platform = 'Medium';
    } else if (host.includes('hashnode') || host.endsWith('hashnode.dev')) {
      platform = 'Hashnode';
    } else if (host.includes('substack.com')) {
      platform = 'Substack';
    } else if (host.includes('github.io')) {
      platform = 'GitHub Pages';
    }

    return res.status(200).json({
      url: targetUrl.toString(),
      title,
      description,
      image,
      author: author || 'Unknown Author',
      platform,
      published_at: publishedAt
    });

  } catch (error) {
    return res.status(500).json({ error: 'Internal scraping error', details: error.message });
  }
}
