import falso from '@ngneat/falso';

const generateFakePerson = () => ({
	email: falso.randEmail(),
	name: falso.randFullName(),
});

const numberOfDocuments = 100;

const fakePeople = Array.from(
	{ length: numberOfDocuments },
	() => generateFakePerson,
);

console.log(JSON.stringify(fakePeople, null, 2));
