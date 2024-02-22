import { Title } from "@/components";
import { FormAddress } from "./ui/FormAddress";
import { getCountries, getUserAddress } from "@/actions";
import { auth } from "@/auth.config";

export default async function NamePage() {

  const session = await auth()

  const countries = await getCountries()

  const userAddress = await getUserAddress(session!.user.id)

  let userAddressFormat = null

  if(userAddress){

    const { countryId, address2, userId,id, ...restUserAddress} = userAddress

    userAddressFormat = {
      ...restUserAddress,
      country: countryId,
      ...(address2? {address2}: {address2: undefined})
    }
  }

	return (
		<div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
			<div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
				<Title title="Dirección" subTitle="Dirección de entrega" />

				<FormAddress countries={countries} userAddressStored={userAddressFormat} />
			</div>
		</div>
	);
}
