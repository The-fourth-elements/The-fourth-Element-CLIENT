
export const compareAZ = (user1, user2) => {
    return user1.name.localeCompare(user2.name);
}

export const compareZA = (user1, user2) => {
    return user2.name.localeCompare(user1.name);
  }

export const compareAsc = (user1, user2) => {
    return user1.rol - user2.rol;
  }

export const compareDesc = (user1, user2) => {
    return user2.rol - user1.rol;
}