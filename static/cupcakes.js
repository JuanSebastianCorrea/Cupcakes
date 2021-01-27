let BASE_URL = 'http://127.0.0.1:5000/api';

function renderCupcakeHTML(cupcake) {
	return `<div class="cupcake-div col-6" data-cupcake-id="${cupcake.id}">
                
                    <img src="${cupcake.image}" class="rounded-sm">
                    <div>
                    ${cupcake.flavor} / ${cupcake.size} / ${cupcake.rating}
                    </div>
                
            </div>`;
}

async function showInitialCupcakes() {
	res = await axios.get(`${BASE_URL}/cupcakes`);

	for (cupcakeData of res.data.cupcakes) {
		$('#initial-cupcakes-div').append(renderCupcakeHTML(cupcakeData));
	}
}

$('#new-cupcake-form').on('submit', async function(e) {
	e.preventDefault();
	let flavor = $('#flavor').val();
	let size = $('#size').val();
	let rating = $('#rating').val();
	let image = $('#image').val();

	if (image === '') {
		image = 'https://tinyurl.com/demo-cupcake';
	}
	res = await axios.post(`${BASE_URL}/cupcakes`, { flavor, size, rating, image });
	$('#initial-cupcakes-div').append(renderCupcakeHTML(res.data.cupcake));
	$('#new-cupcake-form').trigger('reset');
});

$('#cupcake-search-form').on('keyup', async function(e) {
	e.preventDefault();
	let searchterm = $('#searchterm').val();

	if (searchterm == '') {
		res = await axios.get(`${BASE_URL}/cupcakes`);
		$('#initial-cupcakes-div').empty();

		for (cupcake of res.data.cupcakes) {
			$('#initial-cupcakes-div').append(renderCupcakeHTML(cupcake));
		}

		$('#new-cupcake-form').trigger('reset');
	} else {
		res = await axios.get(`${BASE_URL}/cupcakes/${searchterm}`);
		$('#initial-cupcakes-div').empty();

		for (cupcake of res.data.cupcakes) {
			$('#initial-cupcakes-div').append(renderCupcakeHTML(cupcake));
		}

		$('#new-cupcake-form').trigger('reset');
	}
});

showInitialCupcakes();
