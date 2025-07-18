export default function NameInput({inputsStates, setInputsStates, showValidation}) {

	return (
	<>
		<label className="mt-3 sm font-poppins-medium" htmlFor="name">Prénom{" "} <span className="text-sm">(maximun 20 caractères)</span></label>
		<input
		className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none"
		type="text"
		name="name"
		id="name"
		autoComplete="given-name"
		placeholder="Entrez votre prénom"
		value={inputsStates.name}
		onChange={e => setInputsStates({...inputsStates, name: e.target.value.trimStart().replace(/\s{2,}/g, ' ')})}
		/>
        {showValidation.name != "" && (
			<p className=" text-red-600 text-sm ">{showValidation.name}</p>
		)}
	</>
	)
}
