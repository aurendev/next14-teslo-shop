
import { Title } from "@/components";


import { OrdersTable } from "./ui/OrdersTable";
import { getPaginated } from "@/actions";

export default async function OrdersPage() {
	const res = await getPaginated()

	const { users = [] } = res;


	return (
		<>
			<Title title="Mantenimiento de Usuarios" />

			<div className="mb-10">
				<OrdersTable  users={users} />
			</div>
		</>
	);
}
