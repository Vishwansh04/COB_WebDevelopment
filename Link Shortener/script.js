

const form = document.querySelector('form');
const input = document.querySelector('#url');
const resultDiv = document.querySelector('#result');
const submitBtn = document.querySelector('#submit-btn');

submitBtn.addEventListener('click', async () => {
    const url = input.value;

    // Add the protocol if it's missing
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        input.value = 'http://' + url;
    }

    resultDiv.innerHTML = ''; // Clear previous results
    resultDiv.style.display = 'none';

    try {
        const shortUrl = await shortenUrl(url);
        displayResult(url, shortUrl);
    } catch (error) {
        console.error('Error shortening the URL:', error.message);
        displayError();
    }
});

async function shortenUrl(url) {
    const response = await fetch(`https://tinyurl.com/api-create.php?url=${url}`);
    if (!response.ok) {
        throw new Error('Failed to shorten URL');
    }

    return response.text();
}

function displayResult(longUrl, shortUrl) {
    resultDiv.innerHTML = `
        <p>Long URL: <a href="${longUrl}" target="_blank">${longUrl}</a></p>
        <p>Short URL: <a href="${shortUrl}" target="_blank">${shortUrl}</a></p>
    `;
    resultDiv.style.display = 'block';
}

function displayError() {
    resultDiv.innerHTML = 'Error shortening the URL';
    resultDiv.style.color = 'red';
    resultDiv.style.display = 'block';
}