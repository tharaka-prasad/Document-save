<?php
namespace App\Http\Controllers;

use App\Models\Employees;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class EmployeesController extends Controller
{
    public function index()
    {
        $employees = Employees::orderBy('id', 'desc')->get();

        return Inertia::render('Employees/Index', [
            'employees' => $employees,
        ]);
    }

    public function create()
    {
        return Inertia::render('Employees/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'full_name'       => 'required|string|max:255',
            'email'           => 'required|email|unique:employees,email',
            'phone_number'    => 'required|numeric|unique:employees,phone_number',
            'address'         => 'required|string',
            'id_number'       => 'required|string|unique:employees,id_number',
            'passport_number' => 'required|string|unique:employees,passport_number',
            'date_of_birth'   => 'required|date',
            'city'            => 'required|string',
            'district'        => 'required|string',
            'province'        => 'required|string',
            'gender'          => 'required|string',
            'agency'          => 'required|string',
            'documents'       => 'nullable|array',
            'documents.*'     => 'file|mimes:jpg,jpeg,png,pdf,doc,docx|max:10248',
        ]);

        $uploadedPaths = [];

        if ($request->hasFile('documents')) {
            foreach ($request->file('documents') as $file) {
                $uploadedPaths[] = $file->store("employees/{$data['id_number']}", 'public');
            }
        }

        $data['documents'] = $uploadedPaths ? json_encode($uploadedPaths) : null;

        Employees::create($data);

        return Redirect::route('employees.index')->with('success', 'Employee added successfully!');
    }

    public function edit(Employees $employee)
    {
        $documents = [];
        if (! empty($employee->documents)) {
            $documents = is_array($employee->documents)
            ? $employee->documents
            : json_decode($employee->documents, true);
        }

        return Inertia::render('Employees/Edit', [
            'employee' => array_merge($employee->toArray(), [
                'documents' => $documents,
            ]),
        ]);
    }

    public function update(Request $request, Employees $employee)
    {
        $data = $request->validate([
            'full_name'          => 'required|string|max:255',
            'email'              => 'required|email|unique:employees,email,' . $employee->id,
            'phone_number'       => 'required|numeric|unique:employees,phone_number,' . $employee->id,
            'address'            => 'required|string',
            'id_number'          => 'required|string|unique:employees,id_number,' . $employee->id,
            'passport_number'    => 'required|string|unique:employees,passport_number,' . $employee->id,
            'date_of_birth'      => 'required|date',
            'city'               => 'required|string',
            'district'           => 'required|string',
            'province'           => 'required|string',
            'gender'             => 'required|string',
            'agency'             => 'required|string',
            'existing_documents' => 'nullable|array',
            'documents'          => 'nullable|array',
            'documents.*'        => 'file|mimes:jpg,jpeg,png,pdf,doc,docx|max:10248',
        ]);

        $currentDocuments = is_array($employee->documents)
        ? $employee->documents
        : json_decode($employee->documents, true) ?? [];

        $keptDocuments = $data['existing_documents'] ?? [];

        $docsToDelete = array_diff($currentDocuments, $keptDocuments);
        foreach ($docsToDelete as $filePath) {
            Storage::disk('public')->delete($filePath);
        }

        $folderId = $data['id_number'] ?? $employee->id_number ?? '';
        $folderId = trim((string) $folderId);
        if ($folderId === '') {
            $folderId = 'no-id';
        }

        $newDocuments = [];
        if ($request->hasFile('documents')) {
            foreach ($request->file('documents') as $file) {
                $newDocuments[] = $file->store("employees/{$folderId}", 'public');
            }
        }

        $finalDocuments = array_merge($keptDocuments, $newDocuments);

        $employee->update(array_merge($data, [
            'documents' => $finalDocuments,
        ]));

        return Redirect::route('employees.index')->with('success', 'Employee updated successfully!');
    }

 public function show($id)
{
    $employee = Employees::findOrFail($id);

    $docs = is_array($employee->documents)
        ? $employee->documents
        : (!empty($employee->documents) ? json_decode($employee->documents, true) : []);

    $docs = array_map(function ($path) {
        return asset('storage/' . $path);
    }, $docs);

    $employee->documents = $docs;

    return Inertia::render('Employees/View', [
        'employee' => $employee,
    ]);
}


    public function destroy(Employees $employee)
    {
        if (! empty($employee->documents)) {
            $documents = [];
            if (is_string($employee->documents)) {
                $documents = json_decode($employee->documents, true) ?? [];
            } elseif (is_array($employee->documents)) {
                $documents = $employee->documents;
            }
            foreach ($documents as $filePath) {
                if (Storage::disk('public')->exists($filePath)) {
                    Storage::disk('public')->delete($filePath);
                }
            }
        }

        $folder = "employees/{$employee->id_number}";
        if (Storage::disk('public')->exists($folder)) {
            Storage::disk('public')->deleteDirectory($folder);
        }

        $employee->delete();

        return Redirect::route('employees.index')->with('success', 'Employee deleted successfully!');
    }
}
