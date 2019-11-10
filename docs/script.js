// async function getCardsFromAddress(address) {
//     const url = `https://api.godsunchained.com/v0/user/${address}/inventory?format=compressed`;
//     const response = await fetch(url);
//     return await response.json();
// }

async function getCardsFromAddress(address) {
    return await fetch('https://api.thegraph.com/subgraphs/id/QmXdzK7sh7USzZYwZBVDk2jqZqNUNyVkyfUU9jvE9Aenm4', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    body: JSON.stringify({query: `{ owners(where:{ id: "${address}" }) { balance tokens(first: 10, skip:${getSkip()}) { id proto quality } } }`})
    })
    .then(r => r.json())
    // .then(data => console.log('data returned:', data.data));
}

function getSkip() {
    return 0;
}

function getMarkup(data) {
    const { tokens } = data.data.owners[0];

    return tokens.map((token) => {
        return `<a href="https://etherscan.io/token/0x629cdec6acc980ebeebea9e5003bcd44db9fc5ce?a=${token.id}" target="_blank"><div class="card-wrapper"><composited-card class="card" protoId="${token.proto}" quality="${token.quality}" responsiveSrcsetSizes="(min-width: 250px) 160px, 320px"></composited-card><div class="tokenid">${token.id}</div></div></a>`;
    }).join('');
}


// function getMarkup(cards, start, increment) {
//     return Object.keys(cards).map((protoId) => {
//         return cards[protoId].map((shine) => {
//             // return `<div class="card-wrapper"><composited-card class="card" protoId="${protoId}" quality="${getQuality(shine)}" responsiveSrcsetSizes="(min-width: 250px) 160px, 320px"></composited-card></div>`;
//             return '<div class="card-wrapper"><div style="width:200px;height:252px;"></div></div>';
//         });
//     }).flat().slice(start, increment).join(' ');
// }

function getQuality(shine) {
    if (shine < 1000) {
        return 4;
    }
    return (shine + '')[0];
}

async function displayCards() {
    const address = document.getElementById('input_address').value.toLowerCase() || '0x0006e4548aed4502ec8c844567840ce6ef1013f5';

    const data = await getCardsFromAddress(address);

    console.log('data:', data);

    const markup = getMarkup(data);

    // console.log('markup:', markup);

    // document.getElementById('cards').insertAdjacentHTML('beforeend', markup);
    document.getElementById('cards').innerHTML = markup;
}

window.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('display_cards').addEventListener('click', displayCards);
});