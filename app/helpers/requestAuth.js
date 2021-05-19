export const requestAuth = async (query, variables, router) => {
    fetch('http://localhost:4000/shop-api', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables }),
    })
        .then((result) => {
            localStorage.setItem(
                'vendure-auth-token',
                result.headers.get('vendure-auth-token')
            )
            return result.json()
        })
        .then(({ data }) => {
            if (data.login.__typename === 'CurrentUser') {
                router.push('/')
            }
        })
        .catch((err) => {
            console.log(err)
        })
}
