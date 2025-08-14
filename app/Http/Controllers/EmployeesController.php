<?php
namespace App\Http\Controllers;

use App\Models\Employees;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Laravel\Pail\ValueObjects\Origin\Console;

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
            'full_name'          => 'sometimes|required|string|max:255',
            'email'              => 'sometimes|required|email|unique:employees,email,' . $employee->id,
            'phone_number'       => 'sometimes|required|numeric|unique:employees,phone_number,' . $employee->id,
            'address'            => 'sometimes|required|string',
            'id_number'          => 'sometimes|required|string|unique:employees,id_number,' . $employee->id,
            'passport_number'    => 'sometimes|required|string|unique:employees,passport_number,' . $employee->id,
            'date_of_birth'      => 'sometimes|required|date',
            'city'               => 'sometimes|required|string',
            'district'           => 'sometimes|required|string',
            'province'           => 'sometimes|required|string',
            'gender'             => 'sometimes|required|string',
            'agency'             => 'sometimes|required|string',
            'documents'          => 'nullable|array',
            'documents.*'        => 'file|mimes:jpg,jpeg,png,pdf,doc,docx|max:2048',
            'existing_documents' => 'nullable|array',
        ]);

        $existingDocuments = $data['existing_documents'] ?? json_decode($employee->documents ?? '[]', true);

        if ($request->hasFile('documents')) {
            foreach ($request->file('documents') as $file) {
                $path                = $file->store("employees/{$employee->id_number}", 'public');
                $existingDocuments[] = $path;
            }
        }

        $data['documents'] = json_encode($existingDocuments);

        $employee->update($data);

        return redirect()->route('employees.index')->with('success', 'Employee updated successfully!');
    }

    public function show($id)
    {
        $employee = Employees::findOrFail($id);

        $docs = $employee->documents ? json_decode($employee->documents, true) : [];

        // Convert storage path → full URL
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
        $employee->delete();

        return Redirect::route('employees.index')->with('success', 'Employee deleted successfully!');
    }
}
