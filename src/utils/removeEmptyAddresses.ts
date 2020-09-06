import { getRepository } from "typeorm";
import Address from "../models/Address";

export default async () => {
  const addressRepository = getRepository(Address);

  const addressArray = await addressRepository.find({
    relations: ["residents"],
  });

  const emptyAddresses = addressArray.filter(
    (address) => !address.residents.length
  );

  const emptyIds = emptyAddresses.map((address) => {
    return address.id;
  });

  if (emptyIds.length) {
    await addressRepository.delete(emptyIds);
  }
};
