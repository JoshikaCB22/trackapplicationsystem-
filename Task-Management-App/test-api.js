// Quick test script to verify the API is working
const axios = require('axios');

async function testAPI() {
  const baseURL = 'http://localhost:5000';
  
  console.log('Testing registration...');
  try {
    const response = await axios.post(`${baseURL}/api/auth/register`, {
      name: 'Test User',
      email: `test${Date.now()}@example.com`,
      password: 'password123'
    });
    console.log('✓ Registration successful!');
    console.log('Token received:', response.data.token ? 'Yes' : 'No');
    
    // Test login
    console.log('\nTesting login...');
    const loginResponse = await axios.post(`${baseURL}/api/auth/login`, {
      email: response.data.email,
      password: 'password123'
    });
    console.log('✓ Login successful!');
    console.log('Token received:', loginResponse.data.token ? 'Yes' : 'No');
    
  } catch (error) {
    console.error('✗ Error:', error.response?.data || error.message);
  }
}

testAPI();
