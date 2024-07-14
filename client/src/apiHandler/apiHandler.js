export const postRequest = async (url, body) => {
	console.log(body, url);
	const resp = await fetch(url, {
		method: "POST",
		body: JSON.stringify(body),
		headers: {
			"Content-Type": "application/json",
		},
	});

	let data = await resp.json();
	return data;
};
