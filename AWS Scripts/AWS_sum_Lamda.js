exports.handler = async (event) => {
    // Extract the numbers from the event object
    const num1 = event.num1;
    const num2 = event.num2;

    // Check if both num1 and num2 are provided
    if (typeof num1 === 'undefined' || typeof num2 === 'undefined') {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Both num1 and num2 are required' }),
        };
    }

    // Calculate the sum
    const sum = num1 + num2;

    // Return the result
    return {
        statusCode: 200,
        body: JSON.stringify({ result: sum }),
    };
};
