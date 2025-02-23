type paramsType = {
	params: { id: string };
};

export function load({ params }: paramsType) {
	return params;
}
