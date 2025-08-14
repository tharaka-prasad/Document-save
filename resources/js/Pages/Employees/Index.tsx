import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

type Employee = {
    id: number;
    full_name: string;
    email: string;
    phone_number: string;
    agency: string;
};

type IndexProps = {
    employees: Employee[];
};

export default function Index({ employees }: IndexProps) {
    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this employee?')) {
            destroy(route('employees.destroy', id), {
                method: 'delete',
                preserveScroll: true,
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-2xl font-bold text-gray-900">Employees</h2>}
        >
            <Head title="Employees" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-6 flex justify-end">
                        <Link
                            href={route('employees.create')}
                            className="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
                        >
                            Add Employee
                        </Link>
                    </div>

                    {/* Responsive Table */}
                    <div className="overflow-x-auto bg-white shadow-md sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Phone
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Agency
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {employees.length > 0 ? (
                                    employees.map((emp) => (
                                        <tr
                                            key={emp.id}
                                            className="hover:bg-gray-50 transition"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">{emp.full_name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{emp.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{emp.phone_number}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{emp.agency}</td>
                                            <td className="px-6 py-4 whitespace-nowrap space-x-2">
                                                <Link
                                                    href={route('employees.show', emp.id)}
                                                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                                                >
                                                    View
                                                </Link>
                                                <Link
                                                    href={route('employees.edit', emp.id)}
                                                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(emp.id)}
                                                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-6 py-4 text-center text-gray-500"
                                        >
                                            No employees found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
