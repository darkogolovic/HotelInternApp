import supabase, { supabaseUrl } from "./supabase";

export async function singup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error("Logout nemoguc");
}

export async function updateCurrentUser({ password, fullName, avatar, id }) {
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };
  //1. Update pass or full name
  const { data, error } = supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);

  //2. Upload the avatar image

  const fileName = `avatar-${id}-${Math.random()}`;

  const { error: avatarError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (avatarError) throw new Error(avatarError.message);

  //3. Update avatar in the user

  const { data: updateUser, error: error2 } = supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars//${fileName}`,
    },
  });

  if (error2) throw new Error(error2.message);
}
