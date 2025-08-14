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
    documents: string[];
};

interface ViewProps {
    employee: Employee;
}

export default function View({ employee }: ViewProps) {
    const isImage = (url: string) => /\.(jpg|jpeg|png|gif)$/i.test(url);

    return (
        <AuthenticatedLayout
            header={<h2 className="text-2xl font-bold text-gray-900">Employee Details</h2>}
        >
            <Head title="Employee Details" />

            <div className="py-12">
                <div className="mx-auto max-w-5xl sm:px-6 lg:px-8">

                    {/* Back Button */}
                    <div className="mb-6">
                        <Link
                            href={route('employees.index')}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
                        >
                            ← Back to Employees
                        </Link>
                    </div>

                    {/* Employee Card */}
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">

                        {/* Header */}
                        <div className="px-6 py-5 border-b bg-gray-50">
                            <h3 className="text-2xl font-semibold text-gray-800">{employee.full_name}</h3>
                            <p className="text-gray-600">{employee.email}</p>
                        </div>

                        {/* Employee Info */}
                        <div className="px-6 py-6 grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
                            {[
                                { label: 'Phone', value: employee.phone_number },
                                { label: 'Address', value: employee.address },
                                { label: 'ID Number', value: employee.id_number },
                                { label: 'Passport Number', value: employee.passport_number },
                                { label: 'Date of Birth', value: employee.date_of_birth },
                                { label: 'City', value: employee.city },
                                { label: 'District', value: employee.district },
                                { label: 'Province', value: employee.province },
                                { label: 'Gender', value: employee.gender },
                                { label: 'Agency', value: employee.agency },
                            ].map((field, index) => (
                                <div key={index} className="bg-gray-50 p-3 rounded shadow-sm flex flex-col">
                                    <span className="text-sm font-medium text-gray-500">{field.label}</span>
                                    <span className="mt-1 text-gray-800">{field.value || '—'}</span>
                                </div>
                            ))}
                        </div>

                        {/* Documents Section */}
                        <div className="px-6 py-6 border-t">
                            <h4 className="text-lg font-semibold text-gray-800 mb-3">Documents</h4>
                            {employee.documents.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {employee.documents.map((file, index) => (
                                        <div
                                            key={index}
                                            className="border rounded-lg p-3 hover:shadow-lg transition flex flex-col items-center justify-center"
                                        >
                                            {isImage(file) ? (
                                                <img
                                                    src={file}
                                                    alt={`Document ${index + 1}`}
                                                    className="h-48 w-full object-contain rounded"
                                                />
                                            ) : (
                                                <div className="flex items-center space-x-2">
                                                    <svg
                                                        className="w-6 h-6 text-gray-500"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M12 4v16m8-8H4"
                                                        />
                                                    </svg>
                                                    <a
                                                        href={file}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 underline break-all"
                                                    >
                                                        {file.split('/').pop()}
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500">No documents uploaded.</p>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
