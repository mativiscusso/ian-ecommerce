export const requestAuth = async (mutation, variables) => {
    fetch('http://localhost:4000/shop-api', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mutation, variables }),
    })
        .then((result) => {
            localStorage.setItem(
                'vendure-auth-token',
                result.headers.get('vendure-auth-token')
            )
            return result.json()
        })
        .then(({ data }) => {
            if (data) {
                return data
            }
        })
        .catch((err) => {
            console.log(err)
        })
}

export const formatURLImage = (image) => image.replace(/[\\]+/g, '/')
