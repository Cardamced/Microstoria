// src/api.js

export async function getAncestors() {
    try {
        const response = await fetch('http://localhost:3009/ancestors');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

export async function getAncestorsById(id) {
    try {
        const response = await fetch(`http://localhost:3009/ancestors/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}
