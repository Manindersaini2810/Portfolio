const API_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

async function request(path, init) {
  const response = await fetch(`${API_BASE_URL}/api${path}`, {
    ...init,
    headers: {
      ...(init?.body ? { 'Content-Type': 'application/json' } : {}),
      ...init?.headers,
    },
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.message ?? `Request failed (${response.status})`);
  }

  return response.json();
}

export function getProjects() {
  return request('/projects');
}

export function getCertificates() {
  return request('/certificates');
}

export function sendContactMessage(data) {
  return request('/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
