import falso from '@ngneat/falso';

const NUMBER_DOCUMENT = 100;

const generateFakePerson = () => ({
	email: falso.randEmail(),
	name: falso.randFullName(),
	passwordHash: falso.password(),
});


const fakePeople = Array.from(
	{ length: NUMBER_DOCUMENT },
	() => generateFakePerson,
);

console.log(JSON.stringify(fakePeople, null, 2));
