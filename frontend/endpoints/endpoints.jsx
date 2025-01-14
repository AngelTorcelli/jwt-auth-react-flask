const base_url = 'http://localhost:5000'

export const getRole = async () => {
    const response = await fetch(base_url +'/auth/verify-role', {
    method: 'GET',
    credentials: 'include',
    });

    if (response.ok) {
    const data = await response.json();
    return data.role;
    }
}

export const getProfile = async (role) => {
    const response = await fetch(base_url + '/profile/' + role, {
        method: 'GET',
        credentials: 'include',
    })

    if (response.ok) {
        const data = await response.json()
        return data.message
    }
}

export const logout = async () => {
    const response = await fetch(base_url + '/auth/logout', {
        method: 'POST',
        credentials: 'include',
    })

    if (response.ok) {
        return true
    }
}

export const login = async (email, password) => {
    const response = await fetch(base_url + '/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include', 
    });
    
        const data = await response.json();
        return data;   
}

export const register = async (email, password, role) => {
    const response = await fetch(base_url + '/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, role })
    })

    const data = await response.json()
    return data
}    