import { apiRequest } from './queryClient';
import type { Project } from '@shared/schema';

export interface CreateProjectRequest {
  name: string;
  shortCode: string;
  status?: 'active' | 'inactive';
}

export interface UpdateProjectRequest {
  name?: string;
  shortCode?: string;
  status?: 'active' | 'inactive';
}

export async function getProjects() {
  const response = await apiRequest("GET", "/api/projects");
  return response.json();
}

export async function getProject(id: number) {
  const response = await apiRequest("GET", `/api/projects/${id}`);
  return response.json();
}

export async function createProject(projectData: CreateProjectRequest) {
  const response = await apiRequest("POST", "/api/projects", projectData);
  return response.json();
}

export async function updateProject(id: number, projectData: UpdateProjectRequest) {
  const response = await apiRequest("PUT", `/api/projects/${id}`, projectData);
  return response.json();
}

export async function deleteProject(id: number) {
  const response = await apiRequest("DELETE", `/api/projects/${id}`);
  return response.json();
}