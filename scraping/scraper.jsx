//Recipe Scraping

async function getRecipies(url) {

    try {
        var tmp = encodeURIComponent(JSON.stringify(url));
        const response = await fetch(`http://localhost:5000/scrape-recipe?array=${tmp}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const responseData = await response.json(); // Parse response body as JSON
        return responseData;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

export default getRecipies;