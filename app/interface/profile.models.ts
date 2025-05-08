export interface Profile {
  email: string
  idUser: number
  lastname: string
  name: string
}

export const initialState: Profile = {
  email: "",
  idUser: 0,
  lastname: "",
  name: ""
}