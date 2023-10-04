
export const compareAZ = (user1, user2) => {
  return user1.username.localeCompare(user2.username);
}

export const compareZA = (user1, user2) => {
  return user2.username.localeCompare(user1.username);
}

export const compareAsc = (user1, user2) => {
    return user1.rol - user2.rol;
  }

export const compareDesc = (user1, user2) => {
    return user2.rol - user1.rol;
}