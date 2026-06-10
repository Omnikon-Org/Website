// fetch_recent_activity.js
// Loads recent organization events from GitHub and renders them into #recent-activity

(async () => {
  const container = document.getElementById('recent-activity');
  if (!container) return;

  // Wait for env to load if it hasn't already
  if (!window.envLoaded) {
    await new Promise(resolve => window.addEventListener('envLoaded', resolve, { once: true }));
  }

  const token = window.env?.GIT_DEMONDIE_ALL || window.env?.GITHUB_TOKEN || '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';
  const headers = token ? { Authorization: `token ${token}` } : {};

  try {
    const resp = await fetch('https://api.github.com/orgs/Demon-Die/events', { headers });
    if (!resp.ok) throw new Error('GitHub events request failed');
    const events = await resp.json();

    // Clear static placeholders/loading text
    container.innerHTML = '';

    if (!events || events.length === 0) {
      container.innerHTML = '<p class="text-on-surface-variant text-code-sm">No recent activity found.</p>';
      return;
    }

    // Limit to most recent 8 events
    events.slice(0, 8).forEach(event => {
      const div = document.createElement('div');
      div.className = 'flex items-start gap-4';
      
      const icon = document.createElement('span');
      icon.className = 'material-symbols-outlined text-primary text-sm mt-0.5';

      let iconName = 'history';
      let actionText = 'performed action';
      const type = event.type;

      if (type === 'PushEvent') {
        iconName = 'commit';
        actionText = 'pushed to';
      } else if (type === 'PullRequestEvent') {
        iconName = 'call_merge';
        const action = event.payload?.action || 'opened';
        actionText = `${action} pull request in`;
      } else if (type === 'IssuesEvent') {
        iconName = 'info';
        const action = event.payload?.action || 'opened';
        actionText = `${action} issue in`;
      } else if (type === 'CreateEvent') {
        iconName = 'add_circle';
        actionText = 'created branch/tag in';
      } else if (type === 'IssueCommentEvent') {
        iconName = 'comment';
        actionText = 'commented in';
      } else if (type === 'WatchEvent') {
        iconName = 'star';
        actionText = 'starred';
      }

      icon.textContent = iconName;

      const content = document.createElement('div');
      content.className = 'flex-grow';
      const p = document.createElement('p');
      p.className = 'text-on-surface font-code-sm text-code-sm';
      const actor = event.actor?.login || 'Someone';
      const repoName = event.repo?.name ? event.repo.name.replace('Demon-Die/', '') : '';
      
      p.innerHTML = `<span class="text-primary">${actor}</span> ${actionText} <span class="text-on-surface-variant font-bold">${repoName}</span>`;
      content.appendChild(p);

      const time = document.createElement('span');
      time.className = 'text-on-surface-variant text-code-sm font-code-sm text-[10px] whitespace-nowrap';
      
      const date = new Date(event.created_at);
      const diffMs = Date.now() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);

      if (diffMins < 1) {
        time.textContent = 'just now';
      } else if (diffMins < 60) {
        time.textContent = `${diffMins}m ago`;
      } else if (diffHours < 24) {
        time.textContent = `${diffHours}h ago`;
      } else {
        time.textContent = `${diffDays}d ago`;
      }

      div.appendChild(icon);
      div.appendChild(content);
      div.appendChild(time);
      container.appendChild(div);
    });
  } catch (e) {
    console.error('Failed to load recent activity:', e);
    container.innerHTML = '<p class="text-on-surface-variant text-code-sm">Unable to load recent activity.</p>';
  }
})();
