export default function LastnameInput({inputsStates, setInputsStates, showValidation}) {

	let contentError = ""

	if (inputsStates.lastname.length === 0)
		contentError = "Ce champ ne peut pas être vide"

	return (
	<>
		<label className="mt-3 font-poppins-medium" htmlFor="lastname">Nom</label>
		<input
		className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none"
		type="text"
		name="lastname"
		id="lastname"
		autoComplete="family-name"
		placeholder="Entrez votre nom"
		value={inputsStates.lastname}
				onChange={e => setInputsStates({...inputsStates, lastname: e.target.value})}
		/>
		{showValidation.lastname && (
			<p className=" text-red-600 text-sm ">{contentError}</p>
		)}
	</>
	)
}
