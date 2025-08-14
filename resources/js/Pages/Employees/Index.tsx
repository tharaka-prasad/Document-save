import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

type Employee = {
    id: number;
    full_name: string;
    email: string;
    phone_number: string;
    agency: string;
};

interface IndexProps {
    employees: Employee[];
}

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
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Employees</h2>}
        >
            <Head title="Employees" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-4">
                        <Link
                            href={route('employees.create')}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Add Employee
                        </Link>
                    </div>

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Agency</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {employees.map((emp) => (
                                    <tr key={emp.id}>
                                        <td className="px-6 py-4">{emp.full_name}</td>
                                        <td className="px-6 py-4">{emp.email}</td>
                                        <td className="px-6 py-4">{emp.phone_number}</td>
                                        <td className="px-6 py-4">{emp.agency}</td>
                                        <td className="px-6 py-4 space-x-2">
                                            <Link
                                                href={route('employees.show', emp.id)}
                                                className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                                            >
                                                View
                                            </Link>
                                            <Link
                                                href={route('employees.edit', emp.id)}
                                                className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(emp.id)}
                                                className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {employees.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-4 text-center">
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
