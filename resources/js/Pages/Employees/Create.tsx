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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setData('documents', [...data.documents, ...Array.from(e.target.files)]);
            e.target.value = '';
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
        <AuthenticatedLayout header={<h2 className="text-2xl font-bold text-gray-900">Add Employee</h2>}>
            <Head title="Add Employee" />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="bg-white shadow-md sm:rounded-lg p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        value={data.full_name}
                                        onChange={e => setData('full_name', e.target.value)}
                                        className="border rounded px-3 py-2 w-full focus:ring focus:ring-blue-200"
                                    />
                                    {errors.full_name && <div className="text-red-500 text-sm mt-1">{errors.full_name}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        className="border rounded px-3 py-2 w-full focus:ring focus:ring-blue-200"
                                    />
                                    {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                    <input
                                        type="text"
                                        value={data.phone_number}
                                        onChange={e => setData('phone_number', e.target.value)}
                                        className="border rounded px-3 py-2 w-full focus:ring focus:ring-blue-200"
                                    />
                                    {errors.phone_number && <div className="text-red-500 text-sm mt-1">{errors.phone_number}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                    <input
                                        type="text"
                                        value={data.address}
                                        onChange={e => setData('address', e.target.value)}
                                        className="border rounded px-3 py-2 w-full focus:ring focus:ring-blue-200"
                                    />
                                    {errors.address && <div className="text-red-500 text-sm mt-1">{errors.address}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">ID Number</label>
                                    <input
                                        type="text"
                                        value={data.id_number}
                                        onChange={e => setData('id_number', e.target.value)}
                                        className="border rounded px-3 py-2 w-full focus:ring focus:ring-blue-200"
                                    />
                                    {errors.id_number && <div className="text-red-500 text-sm mt-1">{errors.id_number}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Passport Number</label>
                                    <input
                                        type="text"
                                        value={data.passport_number}
                                        onChange={e => setData('passport_number', e.target.value)}
                                        className="border rounded px-3 py-2 w-full focus:ring focus:ring-blue-200"
                                    />
                                    {errors.passport_number && <div className="text-red-500 text-sm mt-1">{errors.passport_number}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                                    <input
                                        type="date"
                                        value={data.date_of_birth}
                                        onChange={e => setData('date_of_birth', e.target.value)}
                                        className="border rounded px-3 py-2 w-full focus:ring focus:ring-blue-200"
                                    />
                                    {errors.date_of_birth && <div className="text-red-500 text-sm mt-1">{errors.date_of_birth}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                    <input
                                        type="text"
                                        value={data.city}
                                        onChange={e => setData('city', e.target.value)}
                                        className="border rounded px-3 py-2 w-full focus:ring focus:ring-blue-200"
                                    />
                                    {errors.city && <div className="text-red-500 text-sm mt-1">{errors.city}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                                    <input
                                        type="text"
                                        value={data.district}
                                        onChange={e => setData('district', e.target.value)}
                                        className="border rounded px-3 py-2 w-full focus:ring focus:ring-blue-200"
                                    />
                                    {errors.district && <div className="text-red-500 text-sm mt-1">{errors.district}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Province</label>
                                    <input
                                        type="text"
                                        value={data.province}
                                        onChange={e => setData('province', e.target.value)}
                                        className="border rounded px-3 py-2 w-full focus:ring focus:ring-blue-200"
                                    />
                                    {errors.province && <div className="text-red-500 text-sm mt-1">{errors.province}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                                    <select
                                        value={data.gender}
                                        onChange={e => setData('gender', e.target.value)}
                                        className="border rounded px-3 py-2 w-full focus:ring focus:ring-blue-200"
                                    >
                                        <option value="">Select</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                    {errors.gender && <div className="text-red-500 text-sm mt-1">{errors.gender}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Agency</label>
                                    <input
                                        type="text"
                                        value={data.agency}
                                        onChange={e => setData('agency', e.target.value)}
                                        className="border rounded px-3 py-2 w-full focus:ring focus:ring-blue-200"
                                    />
                                    {errors.agency && <div className="text-red-500 text-sm mt-1">{errors.agency}</div>}
                                </div>

                                <div className="col-span-1 sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Documents</label>
                                    <input
                                        type="file"
                                        multiple
                                        onChange={handleFileChange}
                                        className="border rounded px-3 py-2 w-full focus:ring focus:ring-blue-200"
                                    />
                                    {errors.documents && <div className="text-red-500 text-sm mt-1">{errors.documents}</div>}

                                    {data.documents.length > 0 && (
                                        <ul className="mt-2 space-y-1">
                                            {data.documents.map((file, i) => (
                                                <li key={i} className="flex justify-between items-center border rounded px-2 py-1">
                                                    <span>{file.name}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeFile(i)}
                                                        className="text-red-500 hover:underline ml-2"
                                                    >
                                                        Remove
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>

                            <div className="flex space-x-2">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                >
                                    Save
                                </button>
                                <Link
                                    href={route('employees.index')}
                                    className="px-5 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
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
