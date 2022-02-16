const SUPABASE_URL = 'https://oulietmefshvjsdknixn.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91bGlldG1lZnNodmpzZGtuaXhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDQ0NTAyNzcsImV4cCI6MTk2MDAyNjI3N30.xLaRALCsmulIZooLc5FTZDT0SLfAZjEKegSSVtKRgFI';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function createTodo(description) {
    const response = await client.from('todos').insert({ description });

    return checkError(response);
}

export async function deleteAllTodos() {
    const response = await client.from('todos').delete().match({ user_id: getUser().id });

    return checkError(response);
}

export async function getTodos() {
    // get all todos for this user from supabase
    const response = await client.from('todos').select('*').order('id');

    return checkError(response);
}

export async function completeTodo(id) {
    // find the and update (set complete to true), the todo that matches the correct id
    const response = await client.from('todos').update({ complete: true }).match({ id });

    return checkError(response);
}

export async function fetchTodos() {
    const resp = await client.from('todos').select('*').order('id');
    return checkError(resp);
}

export async function getUser() {
    return client.auth.session();
}

export async function checkAuth() {
    const user = await getUser();

    if (!user) location.replace('../');
}

export async function redirectIfLoggedIn() {
    if (await getUser()) {
        location.replace('./todos');
    }
}

export async function signupUser(email, password) {
    const response = await client.auth.signUp({ email, password });

    return response.user;
}

export async function signInUser(email, password) {
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return (window.location.href = '../');
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
