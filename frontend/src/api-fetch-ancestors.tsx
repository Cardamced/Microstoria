import { AncestorsResponse, AncestorResponse } from './types/types';

export async function getAncestors(): Promise<AncestorsResponse> {
    try {
        const response = await fetch('http://localhost:3009/ancestors');
        if (!response.ok) {
            throw new Error('Network response wasn\'t ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

export async function getAncestorsById(id: number): Promise<AncestorResponse> {
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
