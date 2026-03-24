import { toast } from "react-toastify";

const API_BASE = "http://localhost:5000/api";

async function apiFetch(path, options = {}) {
  const url = `${API_BASE}${path}`;

  const opts = { ...options };
  // Always send credentials by default
  opts.credentials = opts.credentials ?? "include";

  // If a body is provided and no Content-Type header set, assume JSON
  // Skip this for FormData since browser will set the boundary
  if (opts.body && !(opts.headers && (opts.headers["Content-Type"] || opts.headers["content-type"])) && !(opts.body instanceof FormData)) {
    opts.headers = { ...(opts.headers || {}), "Content-Type": "application/json" };
  }

  const res = await fetch(url, opts);

  // Centralize 401 handling: if unauthorized and not an auth route, redirect to login
  if (res.status === 401 && !path.startsWith("/auth")) {
    try {
      window.location.href = "/admin";
    } catch (e) {
      // In non-browser environments, just throw
      throw new Error("Unauthorized");
    }
  }

  // If response is not OK, call the global error handler with parsed message (if any)
  // Skip error toasts for 401 on auth endpoints (handled by redirect)
  if (!res.ok && !(res.status === 401 && path.startsWith("/auth"))) {
    let message = `Request failed with status ${res.status}`;
    try {
      const payload = await res.json();
      if (payload && (payload.error || payload.message)) {
        message = payload.error || payload.message;
      }
    } catch (e) {
      // ignore JSON parse errors
    }

    try {
      apiErrorHandler({ status: res.status, message, response: res });
    } catch (e) {
      // swallow handler errors
      console.error("apiErrorHandler failed", e);
    }
  }

  return res;
}

// Default global error handler — can be overridden by calling `setApiErrorHandler`
let apiErrorHandler = ({ status, message }) => {
  try {
    toast.error(message || `API error (${status})`);
  } catch (e) {
    // noop in non-browser environments
    console.error(message || `API error (${status})`);
  }
};

export function setApiErrorHandler(fn) {
  if (typeof fn === "function") apiErrorHandler = fn;
}

export async function login(username, password) {
  return apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export async function checkAuth() {
  return apiFetch("/auth/check");
}

export async function logout() {
  return apiFetch("/auth/logout", {
    method: "POST",
  });
}

export async function getProjects() {
  const res = await apiFetch("/projects/", { credentials: "omit" });
  return res.json();
}

export async function createProject(data) {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("tech_stack", data.techStack || "");
  formData.append("github_link", data.githubUrl || "");
  if (data.coverImage) {
    formData.append("cover_image", data.coverImage);
  }

  return apiFetch("/projects/", {
    method: "POST",
    body: formData,
    headers: {}, // Remove Content-Type to let browser set it with boundary
  });
}

export async function updateProject(id, data) {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("tech_stack", data.techStack || "");
  formData.append("github_link", data.githubUrl || "");
  if (data.coverImage) {
    formData.append("cover_image", data.coverImage);
  }
  if (data.deleteCoverImage) {
    formData.append("delete_cover_image", "true");
  }

  return apiFetch(`/projects/${id}`, {
    method: "PUT",
    body: formData,
    headers: {}, // Remove Content-Type to let browser set it with boundary
  });
}

export async function deleteProject(id) {
  return apiFetch(`/projects/${id}`, {
    method: "DELETE",
  });
}

