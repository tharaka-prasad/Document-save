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
    const [existingDocuments, setExistingDocuments] = useState<string[]>(
        Array.isArray(employee.documents) ? employee.documents : []
    );

    const { data, setData, put, processing, errors } = useForm({
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
        documents: [] as File[],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('employees.update', employee.id), {
            data: { ...data, existing_documents: existingDocuments },
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData('documents', e.target.files ? Array.from(e.target.files) : []);
    };

    const removeExistingDocument = (file: string) => {
        setExistingDocuments(prev => prev.filter(f => f !== file));
    };

    const isImage = (url: string) => /\.(jpg|jpeg|png|gif)$/i.test(url);

    return (
        <AuthenticatedLayout
            header={<h2 className="text-2xl font-bold text-gray-900">Edit Employee</h2>}
        >
            <Head title="Edit Employee" />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="bg-white shadow-md sm:rounded-lg p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Grid Layout for Form Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                    <input
                                        type="text"
                                        value={data.full_name}
                                        onChange={e => setData('full_name', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    {errors.full_name && <p className="mt-1 text-red-500 text-sm">{errors.full_name}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                    <input
                                        type="text"
                                        value={data.phone_number}
                                        onChange={e => setData('phone_number', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    {errors.phone_number && <p className="mt-1 text-red-500 text-sm">{errors.phone_number}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Address</label>
                                    <input
                                        type="text"
                                        value={data.address}
                                        onChange={e => setData('address', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    {errors.address && <p className="mt-1 text-red-500 text-sm">{errors.address}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">ID Number</label>
                                    <input
                                        type="text"
                                        value={data.id_number}
                                        onChange={e => setData('id_number', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    {errors.id_number && <p className="mt-1 text-red-500 text-sm">{errors.id_number}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Passport Number</label>
                                    <input
                                        type="text"
                                        value={data.passport_number}
                                        onChange={e => setData('passport_number', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    {errors.passport_number && <p className="mt-1 text-red-500 text-sm">{errors.passport_number}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                                    <input
                                        type="date"
                                        value={data.date_of_birth}
                                        onChange={e => setData('date_of_birth', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    {errors.date_of_birth && <p className="mt-1 text-red-500 text-sm">{errors.date_of_birth}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">City</label>
                                    <input
                                        type="text"
                                        value={data.city}
                                        onChange={e => setData('city', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    {errors.city && <p className="mt-1 text-red-500 text-sm">{errors.city}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">District</label>
                                    <input
                                        type="text"
                                        value={data.district}
                                        onChange={e => setData('district', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    {errors.district && <p className="mt-1 text-red-500 text-sm">{errors.district}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Province</label>
                                    <input
                                        type="text"
                                        value={data.province}
                                        onChange={e => setData('province', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    {errors.province && <p className="mt-1 text-red-500 text-sm">{errors.province}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Gender</label>
                                    <select
                                        value={data.gender}
                                        onChange={e => setData('gender', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    >
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                    {errors.gender && <p className="mt-1 text-red-500 text-sm">{errors.gender}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Agency</label>
                                    <input
                                        type="text"
                                        value={data.agency}
                                        onChange={e => setData('agency', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    {errors.agency && <p className="mt-1 text-red-500 text-sm">{errors.agency}</p>}
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Upload New Documents</label>
                                    <input
                                        type="file"
                                        multiple
                                        onChange={handleFileChange}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    {errors.documents && <p className="mt-1 text-red-500 text-sm">{errors.documents}</p>}
                                </div>
                            </div>

                            {/* Existing Documents */}
                            {existingDocuments.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-medium text-gray-800 mb-2">Existing Documents</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {existingDocuments.map((file, idx) => (
                                            <div key={idx} className="border rounded p-2 relative flex items-center justify-center">
                                                {isImage(file) ? (
                                                    <img src={`/storage/${file}`} alt={`Document ${idx + 1}`} className="max-h-40 object-contain" />
                                                ) : (
                                                    <a href={`/storage/${file}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                                                        {file.split('/').pop()}
                                                    </a>
                                                )}
                                                <button
                                                    type="button"
                                                    onClick={() => removeExistingDocument(file)}
                                                    className="absolute top-1 right-1 text-red-600 font-bold text-xl"
                                                >
                                                    &times;
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Buttons */}
                            <div className="flex space-x-3 justify-end mt-6">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                                >
                                    Update
                                </button>
                                <Link
                                    href={route('employees.index')}
                                    className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
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
