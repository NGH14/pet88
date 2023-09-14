import mongoose from 'mongoose';
const DepartmentSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: true,
		},
		city: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
		photos: {
			type: [String],
		},
		services: {
			type: [String],
		},
		title: {
			type: String,
			required: true,
		},
		desc: {
			type: String,
			required: true,
		},
		rating: {
			type: Number,
			min: 0,
			max: 5,
		},
		rooms: {
			type: [String],
		},
		grooming: {
			type: [String],
		},
		open: String,
		close: String,
	},
	{ timestamps: true },
);

export const Department = mongoose.model('Department', DepartmentSchema);
export const getAllDepartment = () => Department.find();
export const getDepartmentByID = (id: string) => Department.findById(id);
export const createNewDepartment = (values: Record<string, string | Array<object> | Object>) => new Department(values).save();
export const createListDepartments = (values: Record<string, any>) => Department.create(values);
export const deleteDepartment = (id: string) => Department.findByIdAndDelete(id);
export const deleteDepartments= (listId: Array<string>) => Department.deleteMany({
	_id: {
		$in: listId,
	},
});
export const updateDepartment = (id: string, values: Record<string, string | Array<object> | Object>) => Department.findByIdAndUpdate(id, values, { returnDocument: 'after' }
)



