import { AncestorsResponse, AncestorResponse } from './types/types';
// import { CreateAncestorDto } from './backend/src/ancestors/dto/create-ancestor.dto';

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

// export async function createAncestor(createAncestorDto: CreateAncestorDto): Promise<AncestorResponse> {
//     try {
//         const response = await fetch('http://localhost:3009/ancestors/new', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(createAncestorDto),
//         });
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error('Fetch error:', error);
//         throw error;
//     }
// }