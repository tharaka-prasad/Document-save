<?php
namespace App\Http\Controllers;

use App\Models\Employees;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
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
            'documents.*'     => 'file|mimes:jpg,jpeg,png,pdf,doc,docx|max:2048',
        ]);

        $uploadedPaths = [];

        if ($request->hasFile('documents')) {
            foreach ($request->file('documents') as $file) {
                $path            = $file->store("employees/{$data['id_number']}", 'public');
                $uploadedPaths[] = $path;
            }
        }

        $data['documents'] = json_encode($uploadedPaths);

        Employees::create($data);

        return Redirect::route('employees.index')->with('success', 'Employee added successfully!');
    }

    public function edit(Employees $employee)
    {
        return Inertia::render('Employees/Edit', [
            'employee' => $employee,
        ]);
    }

    public function update(Request $request, Employees $employee)
    {
        $data = $request->validate([
            'full_name'       => 'required|string|max:255',
            'email'           => 'required|email|unique:employees,email,' . $employee->id,
            'phone_number'    => 'required|numeric|unique:employees,phone_number,' . $employee->id,
            'address'         => 'required|string',
            'id_number'       => 'required|string|unique:employees,id_number,' . $employee->id,
            'passport_number' => 'required|string|unique:employees,passport_number,' . $employee->id,
            'date_of_birth'   => 'required|date',
            'city'            => 'required|string',
            'district'        => 'required|string',
            'province'        => 'required|string',
            'gender'          => 'required|string',
            'agency'          => 'required|string',
            'documents'       => 'nullable|array',
        ]);

        $employee->update($data);

        return Redirect::route('employees.index')->with('success', 'Employee updated successfully!');
    }
    public function show(Employees $employee)
    {
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
