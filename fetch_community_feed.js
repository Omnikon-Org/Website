// fetch_community_feed.js
// Loads recent discussions (GraphQL) or falls back to organization issues/PRs (REST)

(async () => {
  const container = document.getElementById('community-feed');
  if (!container) return;

  // Wait for env to load if it hasn't already
  if (!window.envLoaded) {
    await new Promise(resolve => window.addEventListener('envLoaded', resolve, { once: true }));
  }

  const token = window.env?.GIT_DEMONDIE_ALL || window.env?.GITHUB_TOKEN;
  
  // Clear loading/placeholder text
  container.innerHTML = '';

  const renderItem = (userLogin, userAvatar, title, timeStr, link) => {
    const div = document.createElement('div');
    div.className = 'flex gap-4 items-start hover:bg-surface-variant/30 p-2 transition duration-200 border-l border-transparent hover:border-primary';

    // Avatar image or text fallback
    const avatar = document.createElement('div');
    avatar.className = 'w-8 h-8 rounded-full border border-primary/20 flex-shrink-0 flex items-center justify-center overflow-hidden bg-primary/10';
    if (userAvatar) {
      const img = document.createElement('img');
      img.src = userAvatar;
      img.alt = userLogin;
      img.className = 'w-full h-full object-cover';
      avatar.appendChild(img);
    } else {
      avatar.className += ' text-primary text-xs font-bold';
      avatar.textContent = userLogin.charAt(0).toUpperCase();
    }

    const content = document.createElement('div');
    content.className = 'flex-grow min-w-0';
    
    const header = document.createElement('div');
    header.className = 'flex justify-between items-baseline mb-1 gap-2';
    
    const userSpan = document.createElement('span');
    userSpan.className = 'text-on-surface font-label-mono text-sm truncate';
    userSpan.textContent = userLogin;
    
    const timeSpan = document.createElement('span');
    timeSpan.className = 'text-on-surface-variant text-code-sm font-code-sm text-[10px] whitespace-nowrap';
    timeSpan.textContent = timeStr;
    
    header.appendChild(userSpan);
    header.appendChild(timeSpan);

    const bodyP = document.createElement('p');
    bodyP.className = 'text-on-surface-variant text-code-sm font-code-sm truncate hover:text-primary transition-colors cursor-pointer';
    bodyP.textContent = title;
    if (link) {
      bodyP.addEventListener('click', () => window.open(link, '_blank'));
    }

    content.appendChild(header);
    content.appendChild(bodyP);

    div.appendChild(avatar);
    div.appendChild(content);
    container.appendChild(div);
  };

  const getTimeAgo = (dateStr) => {
    const date = new Date(dateStr);
    const diffMs = Date.now() - date.getTime();
    const diffMins = Math.max(0, Math.floor(diffMs / 60000));
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  // 1. Try GraphQL Discussions
  if (token) {
    try {
      const query = `
        query {
          repository(owner: "Demon-Die", name: "Website") {
            discussions(first: 8, orderBy: {field: CREATED_AT, direction: DESC}) {
              nodes {
                title
                url
                createdAt
                author {
                  login
                  avatarUrl
                }
              }
            }
          }
        }
      `;
      const resp = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          Authorization: `bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
      });
      if (resp.ok) {
        const result = await resp.json();
        const nodes = result.data?.repository?.discussions?.nodes;
        if (nodes && nodes.length > 0) {
          nodes.forEach(node => {
            renderItem(
              node.author?.login || 'anonymous',
              node.author?.avatarUrl,
              node.title,
              getTimeAgo(node.createdAt),
              node.url
            );
          });
          return; // Success
        }
      }
    } catch (e) {
      console.warn('GraphQL query failed, falling back to REST issues', e);
    }
  }

  // 2. Fallback: REST search api for issues and pull requests in the org (representing discussions)
  let data;
  try {
    const headers = token ? { Authorization: `token ${token}` } : {};
    let resp = await fetch('https://api.github.com/search/issues?q=org:Demon-Die+sort:created-desc', { headers });
    if (!resp.ok && resp.status === 401 && token) {
      console.warn('GitHub search issues returned 401 with token, retrying anonymously...');
      resp = await fetch('https://api.github.com/search/issues?q=org:Demon-Die+sort:created-desc');
    }
    if (!resp.ok) throw new Error('GitHub search issues failed');
    data = await resp.json();
  } catch (e) {
    try {
      console.warn('Authenticated search failed, trying final anonymous request...', e);
      const resp = await fetch('https://api.github.com/search/issues?q=org:Demon-Die+sort:created-desc');
      if (!resp.ok) throw new Error('Anonymous backup search failed');
      data = await resp.json();
    } catch (err) {
      console.error('Failed to load community feed:', err);
      container.innerHTML = '<p class="text-on-surface-variant text-code-sm">Unable to load community feed.</p>';
      return;
    }
  }

  const items = data.items || [];
  if (items.length === 0) {
    container.innerHTML = '<p class="text-on-surface-variant text-code-sm">No discussions or activity found.</p>';
    return;
  }
  items.slice(0, 8).forEach(item => {
    renderItem(
      item.user?.login || 'anonymous',
      item.user?.avatar_url,
      item.title,
      getTimeAgo(item.created_at),
      item.html_url
    );
  });
})();
