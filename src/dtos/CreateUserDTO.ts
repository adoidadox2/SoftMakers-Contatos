export default interface CreateUserDTO {
  body: {
    name: string;
    last_name: string;
    phone: string;
    email: string;
    cep: string;
    state: string;
    city: string;
    neighborhood: string;
    street: string;
    house_number: string;
    image?: string;
  };
}
