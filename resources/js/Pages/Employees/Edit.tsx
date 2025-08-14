import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

type Employee = {
    id: number;
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

interface EditProps {
    employee: Employee;
}

export default function Edit({ employee }: EditProps) {
    // State for existing documents
    const [existingDocuments, setExistingDocuments] = useState<string[]>(
        Array.isArray(employee.documents) ? employee.documents : []
    );

    // Form state
    const { data, setData, put, processing, errors } = useForm<{
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
        documents: File[];
    }>({
        full_name: employee.full_name,
        email: employee.email,
        phone_number: employee.phone_number,
        address: employee.address,
        id_number: employee.id_number,
        passport_number: employee.passport_number,
        date_of_birth: employee.date_of_birth,
        city: employee.city,
        district: employee.district,
        province: employee.province,
        gender: employee.gender,
        agency: employee.agency,
        documents: [],
    });

    // Submit handler
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('employees.update', employee.id), {
            data: {
                ...data,
                existing_documents: existingDocuments,
            },
        });
    };

    // Handle new file uploads
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData('documents', e.target.files ? Array.from(e.target.files) : []);
    };

    // Remove existing document
    const removeExistingDocument = (file: string) => {
        setExistingDocuments(prev => prev.filter(f => f !== file));
    };

    // Check if file is an image
    const isImage = (url: string) => /\.(jpg|jpeg|png|gif)$/i.test(url);

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Edit Employee</h2>}
        >
            <Head title="Edit Employee" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                {/* Full Name */}
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    value={data.full_name}
                                    onChange={e => setData('full_name', e.target.value)}
                                    className="border rounded px-3 py-2 w-full"
                                />
                                {errors.full_name && <div className="text-red-500">{errors.full_name}</div>}

                                {/* Email */}
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    className="border rounded px-3 py-2 w-full"
                                />
                                {errors.email && <div className="text-red-500">{errors.email}</div>}

                                {/* Phone Number */}
                                <input
                                    type="text"
                                    placeholder="Phone Number"
                                    value={data.phone_number}
                                    onChange={e => setData('phone_number', e.target.value)}
                                    className="border rounded px-3 py-2 w-full"
                                />
                                {errors.phone_number && <div className="text-red-500">{errors.phone_number}</div>}

                                {/* Address */}
                                <input
                                    type="text"
                                    placeholder="Address"
                                    value={data.address}
                                    onChange={e => setData('address', e.target.value)}
                                    className="border rounded px-3 py-2 w-full"
                                />
                                {errors.address && <div className="text-red-500">{errors.address}</div>}

                                {/* ID Number */}
                                <input
                                    type="text"
                                    placeholder="ID Number"
                                    value={data.id_number}
                                    onChange={e => setData('id_number', e.target.value)}
                                    className="border rounded px-3 py-2 w-full"
                                />
                                {errors.id_number && <div className="text-red-500">{errors.id_number}</div>}

                                {/* Passport Number */}
                                <input
                                    type="text"
                                    placeholder="Passport Number"
                                    value={data.passport_number}
                                    onChange={e => setData('passport_number', e.target.value)}
                                    className="border rounded px-3 py-2 w-full"
                                />
                                {errors.passport_number && <div className="text-red-500">{errors.passport_number}</div>}

                                {/* Date of Birth */}
                                <input
                                    type="date"
                                    placeholder="Date of Birth"
                                    value={data.date_of_birth}
                                    onChange={e => setData('date_of_birth', e.target.value)}
                                    className="border rounded px-3 py-2 w-full"
                                />
                                {errors.date_of_birth && <div className="text-red-500">{errors.date_of_birth}</div>}

                                {/* City */}
                                <input
                                    type="text"
                                    placeholder="City"
                                    value={data.city}
                                    onChange={e => setData('city', e.target.value)}
                                    className="border rounded px-3 py-2 w-full"
                                />
                                {errors.city && <div className="text-red-500">{errors.city}</div>}

                                {/* District */}
                                <input
                                    type="text"
                                    placeholder="District"
                                    value={data.district}
                                    onChange={e => setData('district', e.target.value)}
                                    className="border rounded px-3 py-2 w-full"
                                />
                                {errors.district && <div className="text-red-500">{errors.district}</div>}

                                {/* Province */}
                                <input
                                    type="text"
                                    placeholder="Province"
                                    value={data.province}
                                    onChange={e => setData('province', e.target.value)}
                                    className="border rounded px-3 py-2 w-full"
                                />
                                {errors.province && <div className="text-red-500">{errors.province}</div>}

                                {/* Gender */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                                    <select
                                        value={data.gender}
                                        onChange={e => setData('gender', e.target.value)}
                                        className="border rounded px-3 py-2 w-full"
                                    >
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                    {errors.gender && <div className="text-red-500">{errors.gender}</div>}
                                </div>

                                {/* Agency */}
                                <input
                                    type="text"
                                    placeholder="Agency"
                                    value={data.agency}
                                    onChange={e => setData('agency', e.target.value)}
                                    className="border rounded px-3 py-2 w-full"
                                />
                                {errors.agency && <div className="text-red-500">{errors.agency}</div>}

                                {/* Upload new documents */}
                                <input
                                    type="file"
                                    multiple
                                    onChange={handleFileChange}
                                    className="border rounded px-3 py-2 w-full"
                                />
                                {errors.documents && <div className="text-red-500">{errors.documents}</div>}
                            </div>

                            {/* Existing Documents */}
                            {existingDocuments.length > 0 && (
                                <div className="mt-4">
                                    <strong>Existing Documents:</strong>
                                    <div className="grid grid-cols-2 gap-4 mt-2">
                                        {existingDocuments.map((file, idx) => (
                                            <div key={idx} className="border p-2 rounded shadow-sm relative">
                                                {isImage(file) ? (
                                                    <img
                                                        src={`/storage/${file}`}
                                                        alt={`Document ${idx + 1}`}
                                                        className="max-h-40 w-auto object-contain mx-auto"
                                                    />
                                                ) : (
                                                    <a
                                                        href={`/storage/${file}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 underline"
                                                    >
                                                        {file.split('/').pop()}
                                                    </a>
                                                )}
                                                <button
                                                    type="button"
                                                    onClick={() => removeExistingDocument(file)}
                                                    className="absolute top-1 right-1 text-red-600 font-bold"
                                                >
                                                    &times;
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Buttons */}
                            <div className="flex space-x-2 mt-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                >
                                    Update
                                </button>
                                <Link
                                    href={route('employees.index')}
                                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
