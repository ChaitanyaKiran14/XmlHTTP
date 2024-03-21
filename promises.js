// Example function that returns a promise to simulate an asynchronous operation
function getDataFromServiceNow() {
    return new Promise(function(resolve, reject) {
        // Simulating an asynchronous operation (e.g., fetching data from a ServiceNow table)
        setTimeout(function() {
            // Simulated data retrieval
            var data = ['item1', 'item2', 'item3'];
            
            // Resolve the promise with the retrieved data
            resolve(data);
        }, 2000); // Simulating a delay of 2 seconds
    });
}

// Example usage of the function that returns a promise
getDataFromServiceNow()
    .then(function(data) {
        // Handle the resolved promise (success case)
        console.log('Data retrieved successfully:', data);
        // Further processing of the retrieved data, if needed
    })
    .catch(function(error) {
        // Handle any errors that occur during the promise execution
        console.error('Error retrieving data:', error);
    });
