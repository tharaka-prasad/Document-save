import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

type Employee = {
    full_name: string;
    email: string;
    phone_number: string;
    address: string;
    id_number: string;
    passport_number: string;
    date_of_birth: string;
    city: string;
    district: string;
    province: string;
    gender: string;
    agency: string;
    documents?: string[];
};

interface ViewProps {
    employee: Employee;
}

export default function View({ employee }: ViewProps) {
    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Employee Details</h2>}
        >
            <Head title="Employee Details" />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg p-6 space-y-4">

                        <div><strong>Full Name:</strong> {employee.full_name}</div>
                        <div><strong>Email:</strong> {employee.email}</div>
                        <div><strong>Phone Number:</strong> {employee.phone_number}</div>
                        <div><strong>Address:</strong> {employee.address}</div>
                        <div><strong>ID Number:</strong> {employee.id_number}</div>
                        <div><strong>Passport Number:</strong> {employee.passport_number}</div>
                        <div><strong>Date of Birth:</strong> {employee.date_of_birth}</div>
                        <div><strong>City:</strong> {employee.city}</div>
                        <div><strong>District:</strong> {employee.district}</div>
                        <div><strong>Province:</strong> {employee.province}</div>
                        <div><strong>Gender:</strong> {employee.gender}</div>
                        <div><strong>Agency:</strong> {employee.agency}</div>

                        <div>
                            <strong>Documents:</strong>
                            {employee.documents && employee.documents.length > 0 ? (
                                <ul className="list-disc ml-6 mt-2">
                                    {employee.documents.map((file, index) => (
                                        <li key={index}>
                                            <a
                                                href={`/storage/${file}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 underline"
                                            >
                                                {file.split('/').pop()}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No documents uploaded.</p>
                            )}
                        </div>

                        <div className="mt-4">
                            <Link
                                href={route('employees.index')}
                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                            >
                                Back to Employees
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
