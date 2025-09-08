//'use server';

let sessionUser: { username: string } | null = null;

export async function login(username: string) {
  sessionUser = { username };
  return sessionUser;
}

export async function getSession() {
  return sessionUser;
}

export async function logout() {
  sessionUser = null;
}
