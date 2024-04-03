export interface UsersData {
  [key: string]:
    | {
        email: string
        password: string
      }
    | any
}

export const usersData: UsersData = {
  default: {
    email: "kittl1@yandex.ru",
    password: "kittl1kittl",
  },
}