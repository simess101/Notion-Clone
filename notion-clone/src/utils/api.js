// This is a simplified example of an API utility

const API_BASE_URL = 'https://api.example.com';

// Example function to fetch data from an API
export async function fetchData(endpoint) {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}
