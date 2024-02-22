"use client";

import { changeRole } from "@/actions";
import { User } from "@/interfaces/user.interface";

interface Props {
	users: User[];
}

export const OrdersTable = ({ users }: Props) => {
	return (
		<table className="min-w-full">
			<thead className="bg-gray-200 border-b">
				<tr>
					<th
						scope="col"
						className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
					>
						Email
					</th>
					<th
						scope="col"
						className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
					>
						Nombre completo
					</th>
					<th
						scope="col"
						className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
					>
						Role
					</th>
				</tr>
			</thead>
			<tbody>
				{users.map((user) => (
					<tr
						key={user.id}
						className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
					>
						<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
							{user.email}
						</td>
						<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
							{user.name}
						</td>
						<td className="pr-2">
							<select
								className="w-full p-2 bg-transparent "
								value={user.role}
								onChange={(e) => changeRole(user.id, e.target.value as any) }
								name=""
								id=""
							>
								<option value="user">user</option>
								<option value="admin">admin</option>
							</select>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};
