import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

type EmployeeFormData = {
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
};

export default function Create() {
    const { data, setData, post, processing, errors } = useForm<EmployeeFormData>({
        full_name: '',
        email: '',
        phone_number: '',
        address: '',
        id_number: '',
        passport_number: '',
        date_of_birth: '',
        city: '',
        district: '',
        province: '',
        gender: '',
        agency: '',
        documents: [],
    });

    // Handle multiple files and allow selecting more files later
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setData('documents', [...data.documents, ...Array.from(e.target.files)]);
            e.target.value = ''; // reset input to allow re-select
        }
    };

    const removeFile = (index: number) => {
        setData('documents', data.documents.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('employees.store'), { forceFormData: true });
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold text-gray-800">Add Employee</h2>}>
            <Head title="Add Employee" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" placeholder="Full Name" value={data.full_name} onChange={e => setData('full_name', e.target.value)} className="border rounded px-3 py-2 w-full" />
                                {errors.full_name && <div className="text-red-500">{errors.full_name}</div>}

                                <input type="email" placeholder="Email" value={data.email} onChange={e => setData('email', e.target.value)} className="border rounded px-3 py-2 w-full" />
                                {errors.email && <div className="text-red-500">{errors.email}</div>}

                                <input type="text" placeholder="Phone Number" value={data.phone_number} onChange={e => setData('phone_number', e.target.value)} className="border rounded px-3 py-2 w-full" />
                                {errors.phone_number && <div className="text-red-500">{errors.phone_number}</div>}

                                <input type="text" placeholder="Address" value={data.address} onChange={e => setData('address', e.target.value)} className="border rounded px-3 py-2 w-full" />
                                {errors.address && <div className="text-red-500">{errors.address}</div>}

                                <input type="text" placeholder="ID Number" value={data.id_number} onChange={e => setData('id_number', e.target.value)} className="border rounded px-3 py-2 w-full" />
                                {errors.id_number && <div className="text-red-500">{errors.id_number}</div>}

                                <input type="text" placeholder="Passport Number" value={data.passport_number} onChange={e => setData('passport_number', e.target.value)} className="border rounded px-3 py-2 w-full" />
                                {errors.passport_number && <div className="text-red-500">{errors.passport_number}</div>}

                                <input type="date" value={data.date_of_birth} onChange={e => setData('date_of_birth', e.target.value)} className="border rounded px-3 py-2 w-full" />
                                {errors.date_of_birth && <div className="text-red-500">{errors.date_of_birth}</div>}

                                <input type="text" placeholder="City" value={data.city} onChange={e => setData('city', e.target.value)} className="border rounded px-3 py-2 w-full" />
                                {errors.city && <div className="text-red-500">{errors.city}</div>}

                                <input type="text" placeholder="District" value={data.district} onChange={e => setData('district', e.target.value)} className="border rounded px-3 py-2 w-full" />
                                {errors.district && <div className="text-red-500">{errors.district}</div>}

                                <input type="text" placeholder="Province" value={data.province} onChange={e => setData('province', e.target.value)} className="border rounded px-3 py-2 w-full" />
                                {errors.province && <div className="text-red-500">{errors.province}</div>}

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                                    <select value={data.gender} onChange={e => setData('gender', e.target.value)} className="border rounded px-3 py-2 w-full">
                                        <option value="">Select</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                    {errors.gender && <div className="text-red-500">{errors.gender}</div>}
                                </div>

                                <input type="text" placeholder="Agency" value={data.agency} onChange={e => setData('agency', e.target.value)} className="border rounded px-3 py-2 w-full" />
                                {errors.agency && <div className="text-red-500">{errors.agency}</div>}

                                {/* Multiple Documents */}
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Documents</label>
                                    <input type="file" multiple onChange={handleFileChange} className="border rounded px-3 py-2 w-full" />
                                    {errors.documents && <div className="text-red-500">{errors.documents}</div>}

                                    {data.documents.length > 0 && (
                                        <ul className="mt-2">
                                            {data.documents.map((file, i) => (
                                                <li key={i} className="flex justify-between items-center">
                                                    {file.name}
                                                    <button type="button" onClick={() => removeFile(i)} className="text-red-500 ml-2">Remove</button>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>

                            <div className="flex space-x-2">
                                <button type="submit" disabled={processing} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
                                <Link href={route('employees.index')} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Cancel</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
