import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
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
    documents: string[];
};

type Props = {
    employee: Employee;
};

export default function Edit({ employee }: Props) {
    const [existingDocs, setExistingDocs] = useState<string[]>(employee.documents || []);
    const [newDocs, setNewDocs] = useState<File[]>([]);

    const { data, setData, post, errors } = useForm({
        _method: 'PUT',
        full_name: employee.full_name || '',
        email: employee.email || '',
        phone_number: employee.phone_number || '',
        address: employee.address || '',
        id_number: employee.id_number || '',
        passport_number: employee.passport_number || '',
        date_of_birth: employee.date_of_birth || '',
        city: employee.city || '',
        district: employee.district || '',
        province: employee.province || '',
        gender: employee.gender || 'male',
        agency: employee.agency || '',
        existing_documents: existingDocs,
        documents: [] as File[],
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setNewDocs([...newDocs, ...files]);
            setData('documents', [...newDocs, ...files]);
        }
    };

    const handleRemoveExisting = (filePath: string) => {
        const updated = existingDocs.filter((doc) => doc !== filePath);
        setExistingDocs(updated);
        setData('existing_documents', updated);
    };

    const handleRemoveNew = (index: number) => {
        const updated = [...newDocs];
        updated.splice(index, 1);
        setNewDocs(updated);
        setData('documents', updated);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('employees.update', employee.id), { forceFormData: true });
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-2xl font-bold text-gray-900">Edit Employee</h2>}>
            <Head title="Edit Employee" />

            <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white shadow rounded-lg max-w-4xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                    {/** Full Name */}
                    <div>
                        <label className="block font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            value={data.full_name}
                            onChange={(e) => setData('full_name', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring focus:ring-blue-200"
                        />
                        {errors.full_name && <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>}
                    </div>

                    {/** Email */}
                    <div>
                        <label className="block font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring focus:ring-blue-200"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    {/** Phone Number */}
                    <div>
                        <label className="block font-medium text-gray-700">Phone Number</label>
                        <input
                            type="text"
                            value={data.phone_number}
                            onChange={(e) => setData('phone_number', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring focus:ring-blue-200"
                        />
                        {errors.phone_number && <p className="text-red-500 text-sm mt-1">{errors.phone_number}</p>}
                    </div>

                    {/** Address */}
                    <div>
                        <label className="block font-medium text-gray-700">Address</label>
                        <input
                            type="text"
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring focus:ring-blue-200"
                        />
                        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                    </div>

                    {/** ID Number */}
                    <div>
                        <label className="block font-medium text-gray-700">ID Number</label>
                        <input
                            type="text"
                            value={data.id_number}
                            onChange={(e) => setData('id_number', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring focus:ring-blue-200"
                        />
                        {errors.id_number && <p className="text-red-500 text-sm mt-1">{errors.id_number}</p>}
                    </div>

                    {/** Passport Number */}
                    <div>
                        <label className="block font-medium text-gray-700">Passport Number</label>
                        <input
                            type="text"
                            value={data.passport_number}
                            onChange={(e) => setData('passport_number', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring focus:ring-blue-200"
                        />
                        {errors.passport_number && <p className="text-red-500 text-sm mt-1">{errors.passport_number}</p>}
                    </div>

                    {/** Date of Birth */}
                    <div>
                        <label className="block font-medium text-gray-700">Date of Birth</label>
                        <input
                            type="date"
                            value={data.date_of_birth}
                            onChange={(e) => setData('date_of_birth', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring focus:ring-blue-200"
                        />
                        {errors.date_of_birth && <p className="text-red-500 text-sm mt-1">{errors.date_of_birth}</p>}
                    </div>

                    {/** City */}
                    <div>
                        <label className="block font-medium text-gray-700">City</label>
                        <input
                            type="text"
                            value={data.city}
                            onChange={(e) => setData('city', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring focus:ring-blue-200"
                        />
                        {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                    </div>

                    {/** District */}
                    <div>
                        <label className="block font-medium text-gray-700">District</label>
                        <input
                            type="text"
                            value={data.district}
                            onChange={(e) => setData('district', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring focus:ring-blue-200"
                        />
                        {errors.district && <p className="text-red-500 text-sm mt-1">{errors.district}</p>}
                    </div>

                    {/** Province */}
                    <div>
                        <label className="block font-medium text-gray-700">Province</label>
                        <input
                            type="text"
                            value={data.province}
                            onChange={(e) => setData('province', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring focus:ring-blue-200"
                        />
                        {errors.province && <p className="text-red-500 text-sm mt-1">{errors.province}</p>}
                    </div>

                    {/** Gender */}
                    <div>
                        <label className="block font-medium text-gray-700">Gender</label>
                        <select
                            value={data.gender}
                            onChange={(e) => setData('gender', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring focus:ring-blue-200"
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
                    </div>

                    {/** Agency */}
                    <div>
                        <label className="block font-medium text-gray-700">Agency</label>
                        <input
                            type="text"
                            value={data.agency}
                            onChange={(e) => setData('agency', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring focus:ring-blue-200"
                        />
                        {errors.agency && <p className="text-red-500 text-sm mt-1">{errors.agency}</p>}
                    </div>

                    {/** Existing Documents */}
                    <div className="sm:col-span-2">
                        <label className="block font-medium text-gray-700">Existing Documents</label>
                        <div className="mt-2 space-y-2">
                            {existingDocs.length > 0 ? (
                                existingDocs.map((doc, i) => (
                                    <div key={i} className="flex justify-between items-center border p-2 rounded">
                                        <a href={`/storage/${doc}`} target="_blank" className="text-blue-600 hover:underline">{doc.split('/').pop()}</a>
                                        <button type="button" onClick={() => handleRemoveExisting(doc)} className="text-red-600 hover:underline">Remove</button>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500">No existing documents</p>
                            )}
                        </div>
                    </div>

                    {/** Upload New Documents */}
                    <div className="sm:col-span-2">
                        <label className="block font-medium text-gray-700">Upload New Documents</label>
                        <input type="file" multiple onChange={handleFileChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm px-3 py-2" />
                        <div className="mt-2 space-y-2">
                            {newDocs.map((file, i) => (
                                <div key={i} className="flex justify-between items-center border p-2 rounded">
                                    <span>{file.name}</span>
                                    <button type="button" onClick={() => handleRemoveNew(i)} className="text-red-600 hover:underline">Remove</button>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                <div className="flex justify-end space-x-2 mt-4">
                    <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">Update</button>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
